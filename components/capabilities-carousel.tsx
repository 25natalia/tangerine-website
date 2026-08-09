"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Carousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/templates/reveal";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Dictionary } from "@/lib/i18n/dictionaries/es";
import { cn } from "@/lib/utils";

type Capability = Dictionary["capabilities"]["list"][number];

const kicker = "font-display text-xs font-semibold tracking-wide uppercase opacity-70";

// Misma paleta cromática y vibrante que las cards de Filosofía del Home
// (components/home-philosophy.tsx: purple-600, tangerine-500, green-600,
// lime, gold, purple-800) — con dos ajustes deliberados frente a esa
// referencia, porque acá el pedido explícito es texto blanco en las siete
// cards sin excepción:
//   1. Ningún `bg-primary`/`text-primary-foreground`: ese par semántico
//      cambia con el tema (en oscuro, `--primary-foreground` se resuelve
//      casi negro) — mismo motivo por el que los banners ya quedaron en
//      tokens fijos. `brand-systems` pasa a `--purple-600` fijo.
//   2. `lime-400`/`gold-50` — los tonos exactos que usa el Home para sus
//      dos cards de texto oscuro — no sostienen blanco encima (muy claros).
//      Se usa la misma familia de color un escalón más oscuro (`-600`) en
//      vez de cambiar de paleta: sigue siendo el lime/gold de marca, ahora
//      con el contraste que blanco necesita.
// Un color extra (`info-600`, azul) cubre la séptima card que el Home no
// tiene. Nunca dos cards seguidas con el mismo color, tampoco de la última
// a la primera.
const styleBySlug: Record<string, { bg: string; fg: string }> = {
  "brand-systems": { bg: "bg-(--purple-600)", fg: "text-white" },
  "digital-experiences": { bg: "bg-(--tangerine-500)", fg: "text-white" },
  "product-design": { bg: "bg-(--green-600)", fg: "text-white" },
  "creative-direction": { bg: "bg-(--purple-800)", fg: "text-white" },
  "content-systems": { bg: "bg-(--info-600)", fg: "text-white" },
  growth: { bg: "bg-(--gold-600)", fg: "text-white" },
  automation: { bg: "bg-(--lime-600)", fg: "text-white" },
};

// Una figura geométrica de marca por capability (public/illustrations/geometry/
// — la misma familia destello/flor/hoja/leaf/semillas/spring que usan las
// cards de Filosofía en el Home, components/home-philosophy.tsx), en vez de
// mezclar mascota y deco/ como antes — mismo lenguaje visual que el Home,
// tal como pide el ajuste. Motivo distinto en cada posición consecutiva
// (nunca se repite de una card a la siguiente, tampoco de la última a la
// primera), color elegido para contrastar con el fondo propio de esa card
// (ver `styleBySlug`). Completamente estática — sin FloatingElement, a
// diferencia del resto del sitio: pedido explícito de este ajuste.
const illustrationBySlug: Record<string, { src: string; width: number; height: number }> = {
  "brand-systems": { src: "/illustrations/geometry/destello-yellow.svg", width: 180, height: 180 },
  "digital-experiences": { src: "/illustrations/geometry/flor-violet.svg", width: 153, height: 160 },
  "product-design": { src: "/illustrations/geometry/hoja-orange.svg", width: 130, height: 123 },
  "creative-direction": { src: "/illustrations/geometry/leaf-yellow.svg", width: 132, height: 132 },
  "content-systems": { src: "/illustrations/geometry/semillas-orange.svg", width: 174, height: 174 },
  growth: { src: "/illustrations/geometry/spring-green.svg", width: 160, height: 174 },
  automation: { src: "/illustrations/geometry/leaf-violet.svg", width: 132, height: 132 },
};

function CapabilityIllustration({ slug }: { slug: string }) {
  const illustration = illustrationBySlug[slug];
  if (!illustration) return null;
  return (
    <Image
      src={illustration.src}
      alt=""
      aria-hidden="true"
      width={illustration.width}
      height={illustration.height}
      className="h-auto w-40 sm:w-48 lg:w-56"
    />
  );
}

function CapabilityCard({
  cap,
  index,
  total,
  copy,
}: {
  cap: Capability;
  index: number;
  total: number;
  copy: Dictionary["capabilities"]["carousel"];
}) {
  const style = styleBySlug[cap.slug];
  return (
    <div
      className={cn(
        "relative isolate flex min-h-[28rem] flex-col justify-center gap-10 overflow-hidden rounded-(--radius-container) p-8 sm:p-12 lg:flex-row lg:items-center lg:gap-16 lg:p-16",
        style.bg,
        style.fg
      )}
    >
      <div className="relative z-[1] flex max-w-xl flex-col gap-6">
        <span className={kicker}>
          {copy.cardLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">{cap.name}</h2>
        <p className="text-body-lg text-pretty opacity-90">{cap.resolves}</p>
        <div className="mt-2 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <p className={kicker}>{copy.existsBecauseLabel}</p>
            <p className="text-pretty opacity-80">{cap.existsBecause}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className={kicker}>{copy.generatesValueLabel}</p>
            <p className="text-pretty opacity-80">{cap.generatesValue}</p>
          </div>
        </div>
      </div>

      <div className="relative flex shrink-0 items-center justify-center lg:ml-auto lg:size-56">
        <CapabilityIllustration slug={cap.slug} />
      </div>
    </div>
  );
}

export function CapabilitiesCarousel() {
  const { t } = useLanguage();
  const copy = t.capabilities.carousel;
  const capabilities = t.capabilities.list;

  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-12 max-w-xl sm:mb-16">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            {copy.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">{copy.title}</h2>
        </Reveal>

        {/* El ancho de la card (75-85%) se aplica en este wrapper, no vía
           `slideClassName` — las flechas del Carousel se posicionan
           relativas a su elemento raíz, no al viewport que `slideClassName`
           dimensiona, así que envolver el Carousel es lo que hace que las
           flechas terminen pegadas a los bordes de la card en vez de a los
           del Container completo. */}
        <div className="mx-auto w-[78%] sm:w-[82%] lg:w-[85%]">
          <Carousel
            aria-label={copy.ariaLabel}
            autoplay
            autoplayInterval={7000}
            slides={capabilities.map((cap, i) => (
              <CapabilityCard key={cap.slug} cap={cap} index={i} total={capabilities.length} copy={copy} />
            ))}
          />
        </div>
      </Container>
    </section>
  );
}
