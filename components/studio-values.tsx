"use client";

import { Container } from "@/components/ui/container";
import { Carousel } from "@/components/ui/carousel";
import { Mascot } from "@/components/ui/mascot";
import { PatternImage } from "@/components/patterns/pattern-image";
import { Reveal } from "@/components/templates/reveal";
import { getPattern, type PatternId } from "@/lib/patterns";
import type { MascotVariant } from "@/lib/mascot";
import { cn } from "@/lib/utils";

// Volumen II — Valores, citados literalmente. "meaning" se muestra como la
// frase destacada de la tarjeta (ya es, en el texto original, la oración
// más contundente de cada valor); "notMeaning" queda como la explicación de
// apoyo, con la misma etiqueta "No es" que la versión anterior de esta
// sección ya usaba ("Qué NO significa") — se acorta la etiqueta, no el
// contenido. No se agrega ninguna palabra nueva a lo que ya estaba escrito.
const values: { name: string; meaning: string; notMeaning: string; bg: string; pattern: PatternId; mascot: MascotVariant }[] = [
  {
    name: "Honestidad",
    meaning: "Decir lo que se piensa, incluso cuando cuesta, en el momento en que hace falta decirlo, no cuando resulta cómodo.",
    notMeaning: "Ser brusco, innecesariamente crítico o franco sin cuidado por cómo aterriza lo que se dice.",
    bg: "bg-(--tangerine-600)",
    pattern: "destello",
    mascot: "default",
  },
  {
    name: "Curiosidad",
    meaning: "El impulso genuino de entender algo antes de opinar sobre eso.",
    notMeaning: "Acumular información por acumularla, o investigar como excusa para posponer el trabajo real.",
    bg: "bg-(--purple-500)",
    pattern: "flor",
    mascot: "1",
  },
  {
    name: "Empatía",
    meaning: "Diseñar para alguien real, no para un público abstracto ni para el propio gusto.",
    notMeaning: "Darle a la persona lo que pide sin cuestionar si es lo que necesita.",
    bg: "bg-(--green-600)",
    pattern: "hoja",
    mascot: "2",
  },
  {
    name: "Cuidado",
    meaning: "La atención puesta en cada decisión, sin importar cuántas se tomen a la vez ni cuánto haya crecido el equipo.",
    notMeaning: "Perfeccionismo. El cuidado sabe cuándo algo está listo; el perfeccionismo nunca lo sabe.",
    bg: "bg-(--gold-500)",
    pattern: "semillas",
    mascot: "3",
  },
  {
    name: "Coraje",
    meaning: "Sostener una idea propia incluso cuando la opción segura sería más fácil de defender.",
    notMeaning: "La provocación sin propósito, ni la incomodidad como estrategia de marketing.",
    bg: "bg-(--info-600)",
    pattern: "destello",
    mascot: "4",
  },
  {
    name: "Comunidad",
    meaning: "Entender que ningún resultado importante se construye completamente solo.",
    notMeaning: "Consenso permanente ni evitar el desacuerdo por mantener la armonía.",
    bg: "bg-(--purple-800)",
    pattern: "flor",
    mascot: "default",
  },
];

function ValueCard({ value }: { value: (typeof values)[number] }) {
  const pattern = getPattern(value.pattern);
  return (
    <div
      className={cn(
        "relative flex h-auto min-h-[22rem] flex-col justify-between overflow-hidden rounded-(--radius-container) p-8 text-white shadow-(--shadow-elevation-3) sm:min-h-[19rem] sm:flex-row sm:items-center sm:gap-10 sm:p-12",
        value.bg
      )}
    >
      <PatternImage pattern={pattern} className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

      <div className="relative flex max-w-xl flex-col gap-5">
        <span className="font-display text-sm font-semibold tracking-wide uppercase opacity-70">{value.name}</span>
        <p className="font-display text-2xl leading-snug font-bold text-balance sm:text-3xl">{value.meaning}</p>
        <p className="text-pretty opacity-80">
          <span className="font-semibold">No es: </span>
          {value.notMeaning}
        </p>
      </div>

      <div className="relative mt-6 w-28 shrink-0 self-center opacity-95 sm:mt-0 sm:w-40">
        <Mascot variant={value.mascot} alt="" />
      </div>
    </div>
  );
}

export function StudioValues() {
  return (
    <section className="border-t border-(--border-subtle)">
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-12 max-w-xl sm:mb-16">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">Valores</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Lo que guía cada decisión, grande o pequeña.
          </h2>
        </Reveal>

        <Carousel
          aria-label="Valores de Tangerine Studio"
          autoplay
          autoplayInterval={6500}
          slides={values.map((value) => (
            <ValueCard key={value.name} value={value} />
          ))}
        />
      </Container>
    </section>
  );
}
