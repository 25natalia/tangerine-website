"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass, LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { NotFoundScene } from "./not-found-scene";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface NotFoundCta {
  label: string;
  href: string;
  icon: "home" | "compass" | "grid";
  variant?: "primary" | "outline" | "ghost";
}

const iconMap = { home: Home, compass: Compass, grid: LayoutGrid };

const defaultCtas: NotFoundCta[] = [
  { label: "Volver al inicio", href: "/", icon: "home", variant: "primary" },
  { label: "Explorar Foundations", href: "/foundations", icon: "compass", variant: "outline" },
  { label: "Ver Components", href: "/components", icon: "grid", variant: "ghost" },
];

/**
 * Chrome-free on purpose — Navbar/Footer are composed around this by
 * whoever renders it (see `NotFoundPage` below and every other content
 * template's README in this system for the same reasoning). Three real
 * CTAs, not the brief's four: "Contactarnos" has no real destination on
 * this site yet, and a button pointing nowhere is worse than one fewer
 * button — the same "don't fabricate a link" discipline already applied
 * to Portfolio's `href`s.
 */
export function NotFoundTemplate({ ctas = defaultCtas }: { ctas?: NotFoundCta[] }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Container size="wide" className="flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center gap-10 py-20 text-center sm:gap-12">
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="font-display text-3xl font-bold text-(--text-brand) sm:text-4xl"
      >
        <motion.span
          className="inline-block"
          animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
          transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.span>
      </motion.p>

      <NotFoundScene />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        className="flex max-w-xl flex-col gap-4"
      >
        <h1 className="font-display text-3xl leading-[1.15] font-bold text-balance sm:text-5xl">
          Esta página se perdió. Nosotros ya encontramos el camino.
        </h1>
        <p className="text-body-lg text-pretty text-(--text-secondary)">
          Puede que el link esté roto, o quizás buscabas algo que todavía no existe. Mientras
          tanto, hay bastante para explorar por acá.
        </p>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {ctas.map((cta) => {
          const Icon = iconMap[cta.icon];
          return (
            <Link key={cta.href} href={cta.href} className={cn(buttonVariants({ variant: cta.variant ?? "outline", size: "lg" }))}>
              <Icon className="size-4" aria-hidden="true" />
              {cta.label}
            </Link>
          );
        })}
      </motion.div>
    </Container>
  );
}
