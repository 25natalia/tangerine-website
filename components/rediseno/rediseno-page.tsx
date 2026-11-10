"use client";

// /rediseno — sin Navbar/Footer del sitio, igual que /links y /diagnostico.
// Arriba: qué es, cuándo cierra y cómo funciona (3 pasos). Si ya cerró, un
// estado de "inscripciones cerradas" en lugar del formulario.

import Link from "next/link";
import { CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Mascot } from "@/components/ui/mascot";
import { MinimalHeader, getBackTarget } from "@/components/minimal-header";
import { RedisenoForm } from "@/components/rediseno/rediseno-form";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { formatShortDate, INSTAGRAM_URL } from "@/content/links";
import { REDISENO_CIERRE, redisenoCopy } from "@/content/rediseno";

export interface RedisenoPageProps {
  open: boolean;
  daysLeft: number;
  origen: string;
  utmSource: string;
}

export function RedisenoPage({ open, daysLeft, origen, utmSource }: RedisenoPageProps) {
  const { locale } = useLanguage();
  const copy = redisenoCopy[locale];

  const closed = (
    <div className="flex flex-col items-center gap-5 py-8 text-center">
      <Mascot variant="3" alt="" className="w-28" />
      <h2 className="text-h3 font-display font-bold text-(--text-primary)">{copy.closedTitle}</h2>
      <p className="text-body text-pretty text-(--text-secondary)">{copy.closedBody}</p>
      <a href={INSTAGRAM_URL} className={cn(buttonVariants({ size: "lg" }))}>
        {copy.closedCta}
      </a>
      <Link href="/diagnostico" className="text-body-sm font-medium text-(--text-link) underline underline-offset-2">
        {locale === "es" ? "¿Quieres un diagnóstico gratis de tu marca?" : "Want a free review of your brand?"}
      </Link>
    </div>
  );

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-8 px-4 pt-5 pb-12">
        <MinimalHeader backLabel={copy.backToSite} back={getBackTarget(origen, locale, true)} />

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              <span className="text-caption font-semibold">{copy.eyebrow}</span>
            </Badge>
            {open ? (
              <span className="text-caption inline-flex items-center gap-1 font-semibold text-(--text-warning)">
                <CalendarClock aria-hidden="true" className="size-3.5" />
                {copy.deadline(daysLeft, formatShortDate(REDISENO_CIERRE, locale))}
              </span>
            ) : null}
          </div>
          <h1 className="text-h2 font-display font-bold text-balance text-(--text-primary)">{copy.title}</h1>
          <p className="text-body font-reading text-pretty text-(--text-secondary)">{copy.intro}</p>

          {open ? (
            <ol className="mt-2 grid gap-3 sm:grid-cols-3">
              {copy.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-3 rounded-(--radius-container) border border-(--border-subtle) bg-(--background-subtle) p-4 sm:flex-col sm:gap-2"
                >
                  <span
                    aria-hidden="true"
                    className="text-label flex size-7 shrink-0 items-center justify-center rounded-(--radius-full) bg-(--interactive-default) font-bold text-primary-foreground"
                  >
                    {i + 1}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-body-sm font-semibold text-(--text-primary)">{step.title}</span>
                    <span className="text-body-sm text-(--text-secondary)">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : null}
        </section>

        {open ? <RedisenoForm origen={origen} utmSource={utmSource} closedFallback={closed} /> : closed}
      </div>
    </main>
  );
}
