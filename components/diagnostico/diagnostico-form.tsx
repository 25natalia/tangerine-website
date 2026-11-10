"use client";

// Formulario de /diagnostico. Un solo paso, con los campos compartidos de
// components/forms/form-fields.tsx (composiciones de los componentes del DS).
// Estado en memoria — no se guarda nada en el navegador. La validación es la
// misma que corre en el servidor (lib/diagnostico/validation.ts).

import * as React from "react";

import { Button } from "@/components/ui/button";
import { DiagnosticoSuccess } from "@/components/diagnostico/diagnostico-success";
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
import {
  AREA_OPTIONS,
  CONCERN_MAX,
  CUPOS_DISPONIBLES,
  REFERRAL_OPTIONS,
  areaLabels,
  diagnosticoCopy,
  referralLabels,
} from "@/content/diagnostico";
import { validateDiagnostico, type DiagnosticoErrors, type DiagnosticoInput } from "@/lib/diagnostico/validation";
import { sendDiagnostico } from "@/lib/actions/send-diagnostico";

const WHATSAPP_HELP = `https://wa.me/573028649295?text=${encodeURIComponent(
  "Hola Tangerine, quería pedir el diagnóstico gratis pero el formulario me dio error."
)}`;

type Status = "idle" | "submitting" | "success" | "error" | "rate_limit";

/** Orden de los campos en pantalla — para llevar el foco al primer error. */
const FIELD_ORDER: (keyof DiagnosticoInput)[] = [
  "name",
  "email",
  "whatsapp",
  "brand",
  "areas",
  "link",
  "concern",
  "referral",
  "consent",
];

export interface DiagnosticoFormProps {
  /** "links" si la persona llega desde /links, si no "directo". */
  origen: string;
  utmSource: string;
}

export function DiagnosticoForm({ origen, utmSource }: DiagnosticoFormProps) {
  const { locale } = useLanguage();
  const copy = diagnosticoCopy[locale];
  const waitlist = !CUPOS_DISPONIBLES;

  const [values, setValues] = React.useState<DiagnosticoInput>(() => ({
    name: "",
    email: "",
    whatsapp: "",
    brand: "",
    areas: [],
    link: "",
    concern: "",
    referral: origen === "links" || utmSource.toLowerCase() === "instagram" ? "instagram" : "",
    consent: false,
  }));
  const [countryCode, setCountryCode] = React.useState("+57");
  const [touched, setTouched] = React.useState<Partial<Record<keyof DiagnosticoInput, boolean>>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState<DiagnosticoErrors>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [honeypot, setHoneypot] = React.useState("");
  const startedAt = React.useRef<number | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  /** Lo que se valida y se envía: el WhatsApp completo, indicativo + número. */
  const full: DiagnosticoInput = { ...values, whatsapp: `${countryCode} ${values.whatsapp}`.trim() };
  const errors = { ...validateDiagnostico(full), ...serverErrors };
  const errorText = (key: keyof DiagnosticoInput) => {
    const code = submitted || touched[key] ? errors[key] : undefined;
    return code ? copy.errors[code] : null;
  };

  function markStarted() {
    if (startedAt.current !== null) return;
    startedAt.current = Date.now();
    trackEvent("diagnostico_inicio", { origen });
  }

  function set<K extends keyof DiagnosticoInput>(key: K, value: DiagnosticoInput[K]) {
    markStarted();
    setValues((v) => ({ ...v, [key]: value }));
    setServerErrors((e) => ({ ...e, [key]: undefined }));
  }

  const touch = (key: keyof DiagnosticoInput) => setTouched((t) => ({ ...t, [key]: true }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const firstInvalid = FIELD_ORDER.find((key) => validateDiagnostico(full)[key]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const data = new FormData();
    data.set("name", full.name);
    data.set("email", full.email);
    data.set("whatsapp", full.whatsapp);
    data.set("brand", full.brand);
    for (const area of full.areas) data.append("areas", area);
    data.set("link", full.link);
    data.set("concern", full.concern);
    data.set("referral", full.referral);
    data.set("consent", full.consent ? "true" : "false");
    data.set("company_website", honeypot);
    data.set("origen", origen);
    data.set("utm_source", utmSource);
    data.set("_page", window.location.href);
    data.set("_startedAt", String(startedAt.current ?? 0));

    try {
      const result = await sendDiagnostico(data);
      if (result.ok) {
        trackEvent("diagnostico_enviado", { origen, lista_espera: waitlist });
        setStatus("success");
        window.scrollTo(0, 0);
        return;
      }
      if (result.error === "validation") {
        setServerErrors(result.fields);
        setStatus("idle");
        return;
      }
      setStatus(result.error === "rate_limit" ? "rate_limit" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <DiagnosticoSuccess name={values.name.trim().split(/\s+/)[0]} waitlist={waitlist} origen={origen} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-h2 font-display font-bold text-balance text-(--text-primary)">
          {waitlist ? copy.waitlistTitle : copy.title}
        </h1>
        <p className="text-body font-reading text-pretty text-(--text-secondary)">
          {waitlist ? copy.waitlistIntro : copy.intro}
        </p>
      </div>

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
        <ChipsField
          id="areas"
          label={copy.areasLabel}
          description={copy.areasDescription}
          required
          options={AREA_OPTIONS.map((a) => ({ value: a, label: areaLabels[locale][a] }))}
          value={values.areas}
          onChange={(next) => {
            set("areas", next);
            touch("areas");
          }}
          error={errorText("areas")}
        />
        <TextField
          id="link"
          label={copy.linkLabel}
          description={copy.linkDescription}
          inputMode="url"
          autoComplete="url"
          placeholder={copy.linkPlaceholder}
          value={values.link}
          onChange={(v) => set("link", v)}
          onBlur={() => touch("link")}
          error={errorText("link")}
        />
        <TextareaField
          id="concern"
          label={copy.concernLabel}
          maxLength={CONCERN_MAX}
          placeholder={copy.concernPlaceholder}
          value={values.concern}
          onChange={(v) => set("concern", v)}
          onBlur={() => touch("concern")}
          error={errorText("concern")}
        />
        <RadioField
          label={copy.referralLabel}
          options={REFERRAL_OPTIONS.map((o) => ({ value: o, label: referralLabels[locale][o] }))}
          value={values.referral}
          onChange={(v) => set("referral", v)}
        />
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
          {waitlist ? copy.submitWaitlist : copy.submit}
        </Button>
      </form>
    </div>
  );
}
