"use client";

import * as React from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { MascotStage } from "@/components/marketing/mascot-stage";
import { CursorTrail } from "@/components/marketing/cursor-trail";
import { FloatingElement } from "@/components/marketing/floating-element";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// El mismo rango de acento que MascotStage usaba para su propio sparkle
// acotado al mascot — acá cubre todo el Hero, así que vive en este archivo
// en vez de importarse de allá.
const HERO_PARTICLE_COLORS = ["var(--purple-400)", "var(--tangerine-400)", "var(--lime-400)", "var(--info-400)"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Un poco más grandes que el size="lg" habitual (h-11) — este hero es el
// único lugar de la web donde el CTA necesita "más presencia, más aire"
// que el resto del sitio; el mismo ajuste puntual que el propio DS aplica
// en su Home Hero (ver components/marketing/home-hero.tsx allá).
const heroCtaSize = "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg";

function PrimaryCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.div className="inline-block" whileHover={{ y: -2 }} whileTap={{ y: 0, scale: 0.97 }}>
      <Link
        href={href}
        className={cn(
          buttonVariants({ size: "lg" }),
          heroCtaSize,
          "group/cta gap-2 shadow-(--shadow-elevation-2) transition-shadow duration-(--duration-base) hover:shadow-(--shadow-elevation-4)"
        )}
      >
        {children}
        <ArrowRight
          className="size-4 transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover/cta:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

function SecondaryCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.div className="inline-block" whileHover={{ y: -2 }} whileTap={{ y: 0, scale: 0.97 }}>
      <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), heroCtaSize)}>
        {children}
      </Link>
    </motion.div>
  );
}

export function HomeHero() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <CursorTrail
        targetRef={sectionRef}
        colors={HERO_PARTICLE_COLORS}
        size={[4, 16]}
        blurPx={1}
        lifetimeMs={[1200, 2400]}
        spawnIntervalMs={35}
        organic
      />

      <Container
        size="wide"
        className="relative grid items-center gap-y-14 pt-10 pb-24 sm:pt-14 sm:pb-28 lg:pt-20 lg:pb-32 md:grid-cols-[1fr_1.1fr] md:gap-x-10 lg:gap-x-16"
      >
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          className="flex flex-col items-start text-left"
        >
          <motion.div variants={fadeUp}>
            <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
              Tangerine Studio
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6">
            <h1 className="font-display text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
              Ayudamos a que las cosas, y las personas, recuerden cómo ser exactamente lo que son.
            </h1>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6">
            <p className="text-body-lg max-w-xl text-pretty text-(--text-secondary)">
              Tangerine existe porque el mundo tiene, cada vez más, marcas y personas que
              funcionan perfecto y dicen cada vez menos. No vendemos diseño. Construimos identidad.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryCTA href="/work">Ver nuestro trabajo</PrimaryCTA>
              <SecondaryCTA href="/contact">Construyamos algo juntos</SecondaryCTA>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="relative flex justify-center md:justify-end"
        >
          {/* Reemplaza el degradado morado que traía MascotStage por
             default (glow=false) — unas pocas piezas chicas a los lados de
             la mascota en vez de debajo. Solo desktop grande: "pocas, bien
             ubicadas, con bastante aire" no admite apretarlas en una
             columna angosta. */}
          <FloatingElement className="absolute top-[8%] left-[4%] z-0 hidden w-8 xl:block" floatY={9} floatDuration={5.5} floatRotate={5} repelStrength={1}>
            <Image src="/illustrations/geometry/flor-lime.svg" alt="" width={153} height={160} className="h-auto w-full" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-[16%] left-0 z-0 hidden w-6 xl:block" floatY={11} floatDuration={4.5} floatRotate={-8} repelStrength={1.2}>
            <Image src="/illustrations/deco/star-violet.svg" alt="" width={130} height={130} className="h-auto w-full" />
          </FloatingElement>
          <FloatingElement className="absolute top-[10%] right-0 z-0 hidden w-7 xl:block" floatY={10} floatDuration={5} floatRotate={7} repelStrength={1}>
            <Image src="/illustrations/geometry/hoja-orange.svg" alt="" width={130} height={123} className="h-auto w-full" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-[10%] right-[6%] z-0 hidden w-6 xl:block" floatY={8} floatDuration={6} floatRotate={-6} repelStrength={1.1}>
            <Image src="/illustrations/geometry/destello-violet.svg" alt="" width={180} height={180} className="h-auto w-full" />
          </FloatingElement>

          <MascotStage size="lg" glow={false} />
        </motion.div>
      </Container>
    </section>
  );
}
