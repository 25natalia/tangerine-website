"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const kicker = "font-display text-sm font-semibold tracking-wide text-white/60 uppercase";

/**
 * Mismo esqueleto de dos columnas que `StudioIntro` (mismo componente al
 * que el pedido apunta como referencia) — no el mismo contenido: eyebrow +
 * título + descripción + CTA a la izquierda, ilustración protagonista a la
 * derecha. `bg-(--purple-600)`/`text-white` fijos — no `bg-primary`/
 * `text-primary-foreground`: esos tokens semánticos cambian con el tema
 * (`--primary` pasa a `--purple-400` y `--primary-foreground` a casi-negro
 * en oscuro), y acá el pedido explícito es que los banners no cambien con
 * el modo oscuro — mismo color, mismo texto blanco, siempre.
 */
export function CapabilitiesHero() {
  const { t } = useLanguage();
  const copy = t.capabilities.hero;

  return (
    <section className="relative overflow-hidden bg-(--purple-600) text-white">
      <Container
        size="wide"
        className="relative grid items-center gap-y-16 py-20 sm:py-28 md:grid-cols-[1fr_1fr] md:gap-x-12 lg:gap-x-16 lg:py-32"
      >
        <Reveal className="flex flex-col items-start text-left">
          <p className={kicker}>{copy.kicker}</p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="text-body-lg mt-6 max-w-lg text-pretty text-white/85">{copy.body}</p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-10 bg-white text-(--purple-600) hover:bg-white/90")}
          >
            {copy.cta}
          </Link>
        </Reveal>

        <div className="relative flex justify-center md:justify-end">
          {/* ~45-50% del ancho del hero en desktop (md:w-1/2 del contenedor
             de esta columna, que a su vez es la mitad del hero) — flotación
             ambiental muy suave + un `repelStrength` bajo porque, a
             diferencia de los acentos chicos que este mismo componente
             mueve en otras secciones, acá es la pieza protagonista: debe
             sentirse viva, no juguetona. */}
          <FloatingElement
            className="w-full max-w-md md:max-w-none md:w-[85%]"
            floatY={10}
            floatDuration={6}
            floatRotate={2}
            repelStrength={0.4}
          >
            <Image
              src="/illustrations/banner/banner-capabilities.svg"
              alt=""
              aria-hidden="true"
              width={1706}
              height={1471}
              className="h-auto w-full"
              priority
            />
          </FloatingElement>
        </div>
      </Container>
    </section>
  );
}
