"use client";

import { MinimalHeader, getBackTarget } from "@/components/minimal-header";
import { DiagnosticoForm, type DiagnosticoFormProps } from "@/components/diagnostico/diagnostico-form";
import { useLanguage } from "@/lib/i18n/language-context";
import { diagnosticoCopy } from "@/content/diagnostico";

// Sin Navbar/Footer del sitio (vive fuera de app/(marketing)), igual que /links.
export function DiagnosticoPage(props: DiagnosticoFormProps) {
  const { locale } = useLanguage();

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-8 px-4 pt-5 pb-12">
        <MinimalHeader backLabel={diagnosticoCopy[locale].backToSite} back={getBackTarget(props.origen, locale, true)} />
        <DiagnosticoForm {...props} />
      </div>
    </main>
  );
}
