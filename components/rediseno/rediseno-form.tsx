"use client";

// Formulario de /rediseno. Mismo armado que /diagnostico (campos compartidos de
// components/forms/form-fields.tsx), con su propia validación compartida con el
// servidor (lib/rediseno/validation.ts). Nada se guarda en el navegador.

import * as React from "react";

import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/forms/form-success";
import { getBackTarget } from "@/components/minimal-header";
import {
  CheckboxField,
  ChipsField,
  Honeypot,
  PolicyLink,
  RadioField,
  SubmitError,
  TextField,
  TextareaField,
  WhatsappField,
  trackEvent,
} from "@/components/forms/form-fields";
import { useLanguage } from "@/lib/i18n/language-context";
import { ITEM_OPTIONS, WHY_MAX, itemLabels, redisenoCopy } from "@/content/rediseno";
import { REFERRAL_OPTIONS, referralLabels } from "@/content/diagnostico";
import { validateRediseno, type RedisenoErrors, type RedisenoInput } from "@/lib/rediseno/validation";
import { sendRediseno } from "@/lib/actions/send-rediseno";

const WHATSAPP_HELP = `https://wa.me/573028649295?text=${encodeURIComponent(
  "Hola Tangerine, quería inscribir mi marca al rediseño express pero el formulario me dio error."
)}`;

type Status = "idle" | "submitting" | "success" | "error" | "rate_limit" | "closed";

const FIELD_ORDER: (keyof RedisenoInput)[] = [
  "name",
  "email",
  "whatsapp",
  "brand",
  "instagram",
  "sector",
  "items",
  "why",
  "referral",
  "publishConsent",
  "consent",
];

export interface RedisenoFormProps {
  origen: string;
  utmSource: string;
  /** Se muestra en lugar del formulario si la convocatoria cierra con la página abierta. */
  closedFallback: React.ReactNode;
}

export function RedisenoForm({ origen, utmSource, closedFallback }: RedisenoFormProps) {
  const { locale } = useLanguage();
  const copy = redisenoCopy[locale];

  const [values, setValues] = React.useState<RedisenoInput>(() => ({
    name: "",
    email: "",
    whatsapp: "",
    brand: "",
    instagram: "",
    sector: "",
    items: [],
    why: "",
    referral: origen === "links" || utmSource.toLowerCase() === "instagram" ? "instagram" : "",
    publishConsent: false,
    consent: false,
  }));
  const [countryCode, setCountryCode] = React.useState("+57");
  const [touched, setTouched] = React.useState<Partial<Record<keyof RedisenoInput, boolean>>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState<RedisenoErrors>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [honeypot, setHoneypot] = React.useState("");
  const startedAt = React.useRef<number | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const full: RedisenoInput = { ...values, whatsapp: `${countryCode} ${values.whatsapp}`.trim() };
  const errors = { ...validateRediseno(full), ...serverErrors };
  const errorText = (key: keyof RedisenoInput) => {
    const code = submitted || touched[key] ? errors[key] : undefined;
    return code ? copy.errors[code] : null;
  };

  function markStarted() {
    if (startedAt.current !== null) return;
    startedAt.current = Date.now();
    trackEvent("rediseno_inicio", { origen });
  }

  function set<K extends keyof RedisenoInput>(key: K, value: RedisenoInput[K]) {
    markStarted();
    setValues((v) => ({ ...v, [key]: value }));
    setServerErrors((e) => ({ ...e, [key]: undefined }));
  }

  const touch = (key: keyof RedisenoInput) => setTouched((t) => ({ ...t, [key]: true }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const firstInvalid = FIELD_ORDER.find((key) => validateRediseno(full)[key]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const data = new FormData();
    for (const key of ["name", "email", "whatsapp", "brand", "instagram", "sector", "why", "referral"] as const) {
      data.set(key, full[key]);
    }
    for (const item of full.items) data.append("items", item);
    data.set("publishConsent", full.publishConsent ? "true" : "false");
    data.set("consent", full.consent ? "true" : "false");
    data.set("company_website", honeypot);
    data.set("origen", origen);
    data.set("utm_source", utmSource);
    data.set("_page", window.location.href);
    data.set("_startedAt", String(startedAt.current ?? 0));

    try {
      const result = await sendRediseno(data);
      if (result.ok) {
        trackEvent("rediseno_enviado", { origen });
        setStatus("success");
        window.scrollTo(0, 0);
        return;
      }
      if (result.error === "validation") {
        setServerErrors(result.fields);
        setStatus("idle");
        return;
      }
      setStatus(result.error === "send" ? "error" : result.error);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <FormSuccess
        title={copy.successTitle(values.name.trim().split(/\s+/)[0], values.brand.trim())}
        body={copy.successBody}
        ctaLabel={copy.successCta}
        back={getBackTarget(origen, locale)}
      />
    );
  }
  if (status === "closed") return <>{closedFallback}</>;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <p className="text-caption text-(--text-tertiary)">{copy.requiredNote}</p>
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <TextField
        id="name"
        label={copy.nameLabel}
        required
        autoComplete="name"
        value={values.name}
        onChange={(v) => set("name", v)}
        onBlur={() => touch("name")}
        error={errorText("name")}
      />
      <TextField
        id="email"
        label={copy.emailLabel}
        required
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={copy.emailPlaceholder}
        value={values.email}
        onChange={(v) => set("email", v)}
        onBlur={() => touch("email")}
        error={errorText("email")}
      />
      <WhatsappField
        label={copy.whatsappLabel}
        description={copy.whatsappDescription}
        countryCodeLabel={copy.countryCodeLabel}
        countryCode={countryCode}
        onCountryCodeChange={(v) => {
          markStarted();
          setCountryCode(v);
        }}
        value={values.whatsapp}
        onChange={(v) => set("whatsapp", v)}
        onBlur={() => touch("whatsapp")}
        error={errorText("whatsapp")}
      />
      <TextField
        id="brand"
        label={copy.brandLabel}
        required
        autoComplete="organization"
        value={values.brand}
        onChange={(v) => set("brand", v)}
        onBlur={() => touch("brand")}
        error={errorText("brand")}
      />
      <TextField
        id="instagram"
        label={copy.instagramLabel}
        description={copy.instagramDescription}
        required
        inputMode="url"
        placeholder={copy.instagramPlaceholder}
        value={values.instagram}
        onChange={(v) => set("instagram", v)}
        onBlur={() => touch("instagram")}
        error={errorText("instagram")}
      />
      <TextField
        id="sector"
        label={copy.sectorLabel}
        required
        maxLength={200}
        placeholder={copy.sectorPlaceholder}
        value={values.sector}
        onChange={(v) => set("sector", v)}
        onBlur={() => touch("sector")}
        error={errorText("sector")}
      />
      <ChipsField
        id="items"
        label={copy.itemsLabel}
        description={copy.itemsDescription}
        required
        options={ITEM_OPTIONS.map((i) => ({ value: i, label: itemLabels[locale][i] }))}
        value={values.items}
        onChange={(next) => {
          set("items", next);
          touch("items");
        }}
        error={errorText("items")}
      />
      <TextareaField
        id="why"
        label={copy.whyLabel}
        required
        maxLength={WHY_MAX}
        placeholder={copy.whyPlaceholder}
        value={values.why}
        onChange={(v) => set("why", v)}
        onBlur={() => touch("why")}
        error={errorText("why")}
      />
      <RadioField
        label={copy.referralLabel}
        options={REFERRAL_OPTIONS.map((o) => ({ value: o, label: referralLabels[locale][o] }))}
        value={values.referral}
        onChange={(v) => set("referral", v)}
      />
      <CheckboxField
        id="publishConsent"
        checked={values.publishConsent}
        onChange={(checked) => {
          set("publishConsent", checked);
          touch("publishConsent");
        }}
        error={errorText("publishConsent")}
      >
        {copy.publishConsent}
      </CheckboxField>
      <CheckboxField
        id="consent"
        checked={values.consent}
        onChange={(checked) => {
          set("consent", checked);
          touch("consent");
        }}
        error={errorText("consent")}
      >
        {copy.consentBefore}
        <PolicyLink>{copy.consentLink}</PolicyLink>
        {copy.consentAfter}
      </CheckboxField>

      {status === "error" || status === "rate_limit" ? (
        <SubmitError
          message={status === "rate_limit" ? copy.rateLimitError : copy.sendError}
          whatsappHref={WHATSAPP_HELP}
          whatsappLabel={copy.sendErrorWhatsapp}
        />
      ) : null}

      <Button type="submit" size="lg" loading={status === "submitting"} className="w-full sm:w-auto sm:self-start">
        {copy.submit}
      </Button>
    </form>
  );
}
