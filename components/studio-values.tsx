"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ScrollCarousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/templates/reveal";
import { cn } from "@/lib/utils";

// Mismos 6 valores reales (Volumen II), misma estructura y experiencia que
// Filosofía en el Home (components/home-philosophy.tsx) — carrusel,
// proporción de card, tipografía, hover — pero sin copiar su contenido: acá
// "meaning" (ya la oración más contundente de cada valor en el texto
// original) es toda la descripción visible, sin "notMeaning" ni mascot, tal
// como pide el alcance de esta ronda ("nombre + descripción, nada más").
// Combinaciones de color pedidas explícitamente por el usuario (lime+negro,
// morado+blanco, naranja+blanco, azul+blanco, verde+blanco) más dorado+negro
// en vez de "rosa" — el DS no tiene un primitivo rosa/rose, y agregar uno
// solo para esto rompería justo la consistencia que se pidió mantener.
const values: { name: string; meaning: string; bg: string; fg: string; geometry: string }[] = [
  { name: "Honestidad", meaning: "Decir lo que se piensa, incluso cuando cuesta, en el momento en que hace falta decirlo.", bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/destello-violet.svg" },
  { name: "Curiosidad", meaning: "El impulso genuino de entender algo antes de opinar sobre eso.", bg: "bg-(--purple-600)", fg: "text-white", geometry: "/illustrations/geometry/flor-lime.svg" },
  { name: "Empatía", meaning: "Diseñar para alguien real, no para un público abstracto ni para el propio gusto.", bg: "bg-(--tangerine-500)", fg: "text-white", geometry: "/illustrations/geometry/hoja-violet.svg" },
  { name: "Cuidado", meaning: "La atención puesta en cada decisión, sin importar cuántas se tomen a la vez.", bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/leaf-violet.svg" },
  { name: "Coraje", meaning: "Sostener una idea propia incluso cuando la opción segura sería más fácil de defender.", bg: "bg-(--info-600)", fg: "text-white", geometry: "/illustrations/geometry/semillas-yellow.svg" },
  { name: "Comunidad", meaning: "Entender que ningún resultado importante se construye completamente solo.", bg: "bg-(--green-600)", fg: "text-white", geometry: "/illustrations/geometry/spring-orange.svg" },
];

function ValueCard({ value }: { value: (typeof values)[number] }) {
  return (
    <div
      className={cn(
        "relative isolate flex h-64 w-full flex-col justify-between overflow-visible rounded-(--radius-container) p-6 shadow-(--shadow-elevation-2) transition-shadow duration-(--duration-base) ease-(--ease-standard) hover:shadow-(--shadow-elevation-4) sm:h-72 sm:p-8",
        value.bg,
        value.fg
      )}
    >
      <Image
        src={value.geometry}
        alt=""
        width={160}
        height={160}
        className="pointer-events-none absolute -top-5 right-4 w-24 select-none sm:w-28 lg:-top-6 lg:w-32"
      />

      <span className="font-display text-sm font-semibold tracking-wide uppercase opacity-70">{value.name}</span>

      <p className="max-w-[80%] text-pretty font-display text-xl leading-snug font-bold sm:text-2xl">
        {value.meaning}
      </p>
    </div>
  );
}

export function StudioValues() {
  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-10 max-w-xl sm:mb-14">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">Valores</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Lo que guía cada decisión, grande o pequeña.
          </h2>
        </Reveal>

        <ScrollCarousel
          aria-label="Valores de Tangerine Studio"
          autoplay
          autoplayInterval={6000}
          slideClassName="w-[82%] sm:w-[56%] lg:w-[44%]"
          slides={values.map((value) => (
            <ValueCard key={value.name} value={value} />
          ))}
        />
      </Container>
    </section>
  );
}
