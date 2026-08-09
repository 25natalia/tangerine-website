"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import type { PortfolioData } from "@/lib/templates/portfolio";

const kicker = "font-display text-sm font-semibold tracking-wide text-white/60 uppercase";

/**
 * Mismo esqueleto que `CapabilitiesHero` (components/capabilities-hero.tsx,
 * la referencia explícita del pedido) — banner a página completa, kicker +
 * título + descripción + CTA a la izquierda, una sola ilustración
 * protagonista a la derecha. `bg-(--purple-600)`/`text-white` fijos — no
 * `bg-primary`/`text-primary-foreground`: esos tokens semánticos cambian
 * con el tema, y acá el pedido explícito es que los banners no cambien con
 * el modo oscuro. Mismo color en los cuatro banners del sitio a propósito.
 */
export function PortfolioHero({ data }: { data: PortfolioData }) {
  const { t } = useLanguage();

  return (
    <header className="relative overflow-hidden bg-(--purple-600) text-white">
      <Container
        size="wide"
        className="relative grid items-center gap-y-16 py-20 sm:py-28 md:grid-cols-[1fr_1fr] md:gap-x-12 lg:gap-x-16 lg:py-32"
      >
        <Reveal className="flex flex-col items-start text-left">
          <p className={kicker}>{data.eyebrow}</p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="text-body-lg mt-6 max-w-lg text-pretty text-white/85">{data.subtitle}</p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-10 bg-white text-(--purple-600) hover:bg-white/90")}
          >
            {t.common.ctaBuildTogether}
          </Link>
        </Reveal>

        <div className="relative flex justify-center md:justify-end">
          <FloatingElement
            className="w-full max-w-md md:max-w-none md:w-[85%]"
            floatY={10}
            floatDuration={6}
            floatRotate={2}
            repelStrength={0.4}
          >
            <Image
              src="/illustrations/banner/banner-work.svg"
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
    </header>
  );
}
