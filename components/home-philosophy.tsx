"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ScrollCarousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/templates/reveal";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Dictionary } from "@/lib/i18n/dictionaries/es";
import { cn } from "@/lib/utils";

// Seis creencias reales de Tangerine Studio (Brand OS, Volumen II —
// "Creencias"), citadas literalmente — solo cambia la presentación, otra
// vez. El texto vive en el diccionario ES/EN (lib/i18n/dictionaries), acá
// solo quedan las decisiones de composición visual (colores reales del DS,
// SVG de public/illustrations/geometry/ — variantes de un solo motivo
// grande de los mismos 4 patrones satélite de siempre: destello/flor/
// hoja/semillas), nunca contenido inventado. Ningún motivo se repite en la
// posición inmediatamente siguiente. El estilo se asocia por `id` (estable
// entre idiomas), no por el texto en sí.
const beliefStyles: Record<string, { bg: string; fg: string; geometry: string }> = {
  "creativity-learned": { bg: "bg-(--purple-600)", fg: "text-white", geometry: "/illustrations/geometry/semillas-lime.svg" },
  "identity-over-trend": { bg: "bg-(--tangerine-500)", fg: "text-white", geometry: "/illustrations/geometry/hoja-green.svg" },
  "curiosity-innovation": { bg: "bg-(--green-600)", fg: "text-white", geometry: "/illustrations/geometry/flor-yellow.svg" },
  "process-matters": { bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/destello-violet.svg" },
  "fear-of-mistakes": { bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/semillas-orange.svg" },
  "true-over-perfect": { bg: "bg-(--purple-800)", fg: "text-white", geometry: "/illustrations/geometry/flor-orange.svg" },
};

type Belief = Dictionary["home"]["philosophy"]["beliefs"][number];

function BeliefCard({ belief, index, total, cardLabel }: { belief: Belief; index: number; total: number; cardLabel: string }) {
  const style = beliefStyles[belief.id];
  return (
    <div
      className={cn(
        // `isolate` scopes the geometry image's absolute positioning to this
        // card only. The title/text below it don't need their own z-index —
        // they just come after the image in DOM order, which alone puts
        // them on top; an explicit z-10 there would be redundant, and
        // Tailwind's z-10 happens to be the exact value the Navbar reserves
        // for its own sticky z-index, so it's worth not reaching for it
        // out of habit.
        "relative isolate flex h-64 w-full flex-col justify-between overflow-visible rounded-(--radius-container) p-6 shadow-(--shadow-elevation-2) transition-shadow duration-(--duration-base) ease-(--ease-standard) hover:shadow-(--shadow-elevation-4) sm:h-72 sm:p-8",
        style.bg,
        style.fg
      )}
    >
      <Image
        src={style.geometry}
        alt=""
        width={160}
        height={160}
        className="pointer-events-none absolute -top-5 right-4 w-24 select-none sm:w-28 lg:-top-6 lg:w-32"
      />

      <span className="font-display text-sm font-semibold tracking-wide uppercase opacity-70">
        {cardLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <p className="max-w-[80%] text-pretty font-display text-xl leading-snug font-bold sm:text-2xl">
        {belief.text}
      </p>
    </div>
  );
}

export function HomePhilosophy() {
  const { t } = useLanguage();
  const copy = t.home.philosophy;

  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-10 flex max-w-2xl flex-col gap-6 sm:mb-14">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            {copy.eyebrow}
          </p>
          <p className="font-display text-3xl font-bold text-balance sm:text-4xl">{copy.title}</p>
          <p className="font-reading text-body-lg text-pretty text-(--text-secondary)">{copy.body}</p>
        </Reveal>

        <ScrollCarousel
          aria-label={copy.ariaLabel}
          autoplay
          autoplayInterval={5000}
          slideClassName="w-[82%] sm:w-[56%] lg:w-[44%]"
          slides={copy.beliefs.map((belief, i) => (
            <BeliefCard key={belief.id} belief={belief} index={i} total={copy.beliefs.length} cardLabel={copy.cardLabel} />
          ))}
        />
      </Container>
    </section>
  );
}
