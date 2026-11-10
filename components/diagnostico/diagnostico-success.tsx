"use client";

import { FormSuccess } from "@/components/forms/form-success";
import { getBackTarget } from "@/components/minimal-header";
import { useLanguage } from "@/lib/i18n/language-context";
import { diagnosticoCopy } from "@/content/diagnostico";

export function DiagnosticoSuccess({ name, waitlist, origen }: { name: string; waitlist: boolean; origen: string }) {
  const { locale } = useLanguage();
  const copy = diagnosticoCopy[locale];

  return (
    <FormSuccess
      title={waitlist ? copy.successWaitlistTitle(name) : copy.successTitle(name)}
      body={waitlist ? copy.successWaitlistBody : undefined}
      ctaLabel={copy.successCta}
      back={getBackTarget(origen, locale)}
    />
  );
}
