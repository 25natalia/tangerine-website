"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Carousel } from "@/components/ui/carousel";
import { PatternImage } from "@/components/patterns/pattern-image";
import { Reveal } from "@/components/templates/reveal";
import { getPattern, type PatternId } from "@/lib/patterns";
import { cn } from "@/lib/utils";

// Seis creencias reales de Tangerine Studio (Brand OS, Volumen II —
// "Creencias"), citadas literalmente — igual que antes de este rediseño,
// solo cambia la presentación. bg/pattern/illustration son decisiones de
// composición visual (colores y patrones reales del DS, sin inventar
// tokens), no contenido de marca — no hay una "explicación" adicional por
// creencia documentada en el Brand OS, así que cada tarjeta se sostiene en
// la frase misma en vez de rellenarse con texto de relleno.
const beliefs: { text: string; bg: string; fg: string; pattern: PatternId; illustration: string }[] = [
  { text: "La creatividad se aprende.", bg: "bg-(--purple-600)", fg: "text-white", pattern: "flor", illustration: "/illustrations/hojas/hojas-1.png" },
  { text: "La identidad vale más que la tendencia.", bg: "bg-(--tangerine-500)", fg: "text-white", pattern: "destello", illustration: "/illustrations/hojas/hojas-2.png" },
  { text: "La curiosidad precede a la innovación.", bg: "bg-(--green-600)", fg: "text-white", pattern: "hoja", illustration: "/illustrations/hojas/hojas-3.png" },
  { text: "El proceso importa tanto como el resultado.", bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)", pattern: "semillas", illustration: "/illustrations/hojas/hojas-4.png" },
  { text: "El miedo a equivocarse cuesta más que el error mismo.", bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)", pattern: "flor", illustration: "/illustrations/hojas/hojas-5.png" },
  { text: "Nadie recuerda lo perfecto; recuerda lo verdadero.", bg: "bg-(--purple-800)", fg: "text-white", pattern: "destello", illustration: "/illustrations/hojas/hojas-7.png" },
];

function BeliefCard({ belief, index }: { belief: (typeof beliefs)[number]; index: number }) {
  const pattern = getPattern(belief.pattern);
  return (
    <div
      className={cn(
        "relative flex h-[26rem] flex-col justify-between overflow-hidden rounded-(--radius-container) p-8 sm:h-[28rem] sm:p-12",
        belief.bg,
        belief.fg
      )}
    >
      <PatternImage
        pattern={pattern}
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
      />

      <div className="relative flex items-start justify-between">
        <span className="font-display text-sm font-semibold tracking-wide uppercase opacity-70">
          Creencia {String(index + 1).padStart(2, "0")} / {String(beliefs.length).padStart(2, "0")}
        </span>
        <Image
          src={belief.illustration}
          alt=""
          width={64}
          height={64}
          className="size-12 shrink-0 opacity-90 sm:size-16"
        />
      </div>

      <p className="relative max-w-xl font-display text-3xl leading-[1.15] font-bold text-balance sm:text-4xl lg:text-5xl">
        {belief.text}
      </p>
    </div>
  );
}

export function HomePhilosophy() {
  return (
    <section className="bg-(--background-inverse) text-(--text-inverse)">
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-12 flex max-w-2xl flex-col gap-6 sm:mb-16">
          <p className="font-display text-sm font-semibold tracking-wide text-(--tangerine-400) uppercase">
            Filosofía
          </p>
          <p className="font-display text-3xl font-bold text-balance sm:text-4xl">
            Las restricciones no limitan, revelan.
          </p>
          <p className="text-body-lg text-pretty text-(--neutral-300)">
            Un límite real, mirado de frente en vez de evitado, casi siempre esconde la mejor
            respuesta posible. Seis creencias sostienen esa idea.
          </p>
        </Reveal>

        <Carousel
          aria-label="Creencias de Tangerine Studio"
          autoplay
          autoplayInterval={6000}
          slides={beliefs.map((belief, i) => (
            <BeliefCard key={belief.text} belief={belief} index={i} />
          ))}
        />
      </Container>
    </section>
  );
}
