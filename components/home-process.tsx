"use client";

import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup } from "@/components/templates/reveal";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Dictionary } from "@/lib/i18n/dictionaries/es";
import { cn } from "@/lib/utils";

// Un color de franja distinto por paso, tomado únicamente de tokens reales
// del DS — nunca dos seguidas iguales. Con exactamente 6 pasos y 6 colores
// reales disponibles (Orange/Lime/Purple/Blue/Green/Yellow), no hace falta
// repetir ni sustituir ninguno. El estilo se asocia por `slug` (estable
// entre idiomas) — el texto vive en el diccionario ES/EN
// (lib/i18n/dictionaries), antes en lib/process.ts.
const styleBySlug: Record<string, { bg: string; fg: string }> = {
  discover: { bg: "bg-(--tangerine-500)", fg: "text-white" },
  design: { bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)" },
  build: { bg: "bg-(--purple-600)", fg: "text-white" },
  test: { bg: "bg-(--info-600)", fg: "text-white" },
  iterate: { bg: "bg-(--green-600)", fg: "text-white" },
  deliver: { bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)" },
};

type ProcessStep = Dictionary["process"]["steps"][number];

function ProcessCard({ step }: { step: ProcessStep }) {
  const style = styleBySlug[step.slug];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-(--border-subtle) bg-card shadow-(--shadow-elevation-1)">
      {/* Franja de encabezado — altura fija, no un %: al no tener
         ilustración ni descripción expandible, el resto de la card ya es
         corto por sí solo, así que un valor bajo y fijo es lo que la
         mantiene rondando el 15-20% pedido sin depender de cuánto texto
         traiga cada paso. */}
      <div className={cn("h-10 w-full shrink-0 sm:h-12", style.bg, style.fg)} />
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
        <h3 className="font-display text-xl font-bold text-balance sm:text-2xl">{step.title}</h3>
        <p className="line-clamp-3 text-pretty text-(--text-secondary)">{step.description}</p>
      </div>
    </div>
  );
}

export function HomeProcess() {
  const { t } = useLanguage();
  const copy = t.home.process;

  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-8 max-w-xl sm:mb-10">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">{copy.title}</h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {t.process.steps.map((step) => (
            <ProcessCard key={step.slug} step={step} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
