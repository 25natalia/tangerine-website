"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ScrollCarousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/templates/reveal";
import { cn } from "@/lib/utils";

// Seis creencias reales de Tangerine Studio (Brand OS, Volumen II —
// "Creencias"), citadas literalmente — solo cambia la presentación, otra
// vez. bg/geometry son decisiones de composición visual (colores reales del
// DS, SVG de public/illustrations/geometry/ — variantes de un solo motivo
// grande de los mismos 4 patrones satélite de siempre: destello/flor/
// hoja/semillas), nunca contenido inventado. Ningún motivo se repite en la
// posición inmediatamente siguiente.
const beliefs: { text: string; bg: string; fg: string; geometry: string }[] = [
  { text: "La creatividad se aprende.", bg: "bg-(--purple-600)", fg: "text-white", geometry: "/illustrations/geometry/semillas-lime.svg" },
  { text: "La identidad vale más que la tendencia.", bg: "bg-(--tangerine-500)", fg: "text-white", geometry: "/illustrations/geometry/hoja-green.svg" },
  { text: "La curiosidad precede a la innovación.", bg: "bg-(--green-600)", fg: "text-white", geometry: "/illustrations/geometry/flor-yellow.svg" },
  { text: "El proceso importa tanto como el resultado.", bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/destello-violet.svg" },
  { text: "El miedo a equivocarse cuesta más que el error mismo.", bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/semillas-orange.svg" },
  { text: "Nadie recuerda lo perfecto; recuerda lo verdadero.", bg: "bg-(--purple-800)", fg: "text-white", geometry: "/illustrations/geometry/flor-orange.svg" },
];

function BeliefCard({ belief, index }: { belief: (typeof beliefs)[number]; index: number }) {
  return (
    <div
      className={cn(
        "relative isolate flex h-64 w-full flex-col justify-between overflow-visible rounded-(--radius-container) p-6 shadow-(--shadow-elevation-2) transition-[transform,box-shadow] duration-(--duration-base) ease-(--ease-standard) hover:-translate-y-1 hover:scale-[1.015] hover:shadow-(--shadow-elevation-4) sm:h-72 sm:p-8",
        belief.bg,
        belief.fg
      )}
    >
      <Image
        src={belief.geometry}
        alt=""
        width={160}
        height={160}
        className="pointer-events-none absolute -top-5 right-4 w-24 select-none sm:w-28 lg:-top-6 lg:w-32"
      />

      <span className="relative z-10 font-display text-sm font-semibold tracking-wide uppercase opacity-70">
        Creencia {String(index + 1).padStart(2, "0")} / {String(beliefs.length).padStart(2, "0")}
      </span>

      <p className="relative z-10 max-w-[80%] text-pretty font-display text-xl leading-snug font-bold sm:text-2xl">
        {belief.text}
      </p>
    </div>
  );
}

export function HomePhilosophy() {
  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-10 flex max-w-2xl flex-col gap-6 sm:mb-14">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            Filosofía
          </p>
          <p className="font-display text-3xl font-bold text-balance sm:text-4xl">
            Las restricciones no limitan, revelan.
          </p>
          <p className="text-body-lg text-pretty text-(--text-secondary)">
            Un límite real, mirado de frente en vez de evitado, casi siempre esconde la mejor
            respuesta posible. Seis creencias sostienen esa idea.
          </p>
        </Reveal>

        <ScrollCarousel
          aria-label="Creencias de Tangerine Studio"
          autoplay
          autoplayInterval={5000}
          slideClassName="w-[82%] sm:w-[56%] lg:w-[44%]"
          slides={beliefs.map((belief, i) => (
            <BeliefCard key={belief.text} belief={belief} index={i} />
          ))}
        />
      </Container>
    </section>
  );
}
