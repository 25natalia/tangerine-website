"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ScrollCarousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/templates/reveal";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Dictionary } from "@/lib/i18n/dictionaries/es";
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
// solo para esto rompería justo la consistencia que se pidió mantener. El
// texto vive en el diccionario ES/EN, asociado por `id` (estable entre
// idiomas).
const valueStyles: Record<string, { bg: string; fg: string; geometry: string }> = {
  honesty: { bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/destello-violet.svg" },
  curiosity: { bg: "bg-(--purple-600)", fg: "text-white", geometry: "/illustrations/geometry/flor-lime.svg" },
  empathy: { bg: "bg-(--tangerine-500)", fg: "text-white", geometry: "/illustrations/geometry/hoja-violet.svg" },
  care: { bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)", geometry: "/illustrations/geometry/leaf-violet.svg" },
  courage: { bg: "bg-(--info-600)", fg: "text-white", geometry: "/illustrations/geometry/semillas-yellow.svg" },
  community: { bg: "bg-(--green-600)", fg: "text-white", geometry: "/illustrations/geometry/spring-orange.svg" },
};

type StudioValue = Dictionary["studio"]["values"]["items"][number];

function ValueCard({ value }: { value: StudioValue }) {
  const style = valueStyles[value.id];
  return (
    <div
      className={cn(
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

      <span className="font-display text-sm font-semibold tracking-wide uppercase opacity-70">{value.name}</span>

      <p className="max-w-[80%] text-pretty font-display text-xl leading-snug font-bold sm:text-2xl">
        {value.meaning}
      </p>
    </div>
  );
}

export function StudioValues() {
  const { t } = useLanguage();
  const copy = t.studio.values;

  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-10 max-w-xl sm:mb-14">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            {copy.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">{copy.title}</h2>
        </Reveal>

        <ScrollCarousel
          aria-label={copy.ariaLabel}
          autoplay
          autoplayInterval={6000}
          slideClassName="w-[82%] sm:w-[56%] lg:w-[44%]"
          slides={copy.items.map((value) => (
            <ValueCard key={value.id} value={value} />
          ))}
        />
      </Container>
    </section>
  );
}
