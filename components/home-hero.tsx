"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Mascot } from "@/components/ui/mascot";
import { PatternImage } from "@/components/patterns/pattern-image";
import { getPattern } from "@/lib/patterns";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

// Mosaico está documentado en el propio Design System como el patrón para
// "portada o momento de apertura" — no se reutiliza en ningún otro lugar de
// esta página (su propia ficha pide que no se repita en la misma pieza).
const mosaico = getPattern("mosaico");

export function HomeHero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <PatternImage
        pattern={mosaico}
        className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.1]"
        imgClassName="object-cover"
      />
      <Container size="hero" className="relative flex flex-col items-center gap-10 text-center">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 sm:w-48"
        >
          <Mascot alt="" />
        </motion.div>

        <div className="flex max-w-3xl flex-col gap-6">
          <h1 className="font-display text-4xl font-bold text-balance sm:text-5xl lg:text-6xl">
            Ayudamos a que las cosas, y las personas, recuerden cómo ser exactamente lo que son.
          </h1>
          <p className="text-body-lg mx-auto max-w-xl text-pretty text-(--text-secondary)">
            Tangerine existe porque el mundo tiene, cada vez más, marcas y personas que
            funcionan perfecto y dicen cada vez menos. No vendemos diseño. Construimos identidad.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/work" className={cn(buttonVariants({ size: "lg" }))}>
            Ver el trabajo
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
            Conversemos
          </Link>
        </div>
      </Container>
    </section>
  );
}
