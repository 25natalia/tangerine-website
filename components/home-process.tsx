"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ScrollCarousel } from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { capabilities, type Capability } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Un color de franja distinto por card, tomado únicamente de tokens reales
// del DS — nunca dos cards consecutivas comparten color. "Pink" no existe
// como familia propia del DS (igual que en el rediseño de Studio Values);
// se sustituye por --gold-400, el tono cálido más cercano. Con 7 capacidades
// y 6 colores pedidos, uno se repite (lime, en la posición 1 y 7 — no
// consecutivas).
const styleBySlug: Record<string, { bg: string; fg: string }> = {
  "brand-systems": { bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)" },
  "digital-experiences": { bg: "bg-(--tangerine-500)", fg: "text-white" },
  "product-design": { bg: "bg-(--purple-600)", fg: "text-white" },
  "creative-direction": { bg: "bg-(--info-600)", fg: "text-white" },
  "content-systems": { bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)" },
  growth: { bg: "bg-(--green-600)", fg: "text-white" },
  automation: { bg: "bg-(--lime-400)", fg: "text-(--neutral-1000)" },
};

// Misma idea que antes: una familia de public/illustrations/geometry/ por
// capacidad, sin repetir archivo. El pedido nombraba spring/leaf/ribbon/
// burst/circle/wave — el DS solo tiene destello/flor/hoja/leaf/semillas/
// spring como familias reales, así que se alternan esas seis.
const geometryBySlug: Record<string, string> = {
  "brand-systems": "/illustrations/geometry/destello-orange.svg",
  "digital-experiences": "/illustrations/geometry/flor-violet.svg",
  "product-design": "/illustrations/geometry/hoja-green.svg",
  "creative-direction": "/illustrations/geometry/leaf-yellow.svg",
  "content-systems": "/illustrations/geometry/spring-lime.svg",
  growth: "/illustrations/geometry/semillas-green.svg",
  automation: "/illustrations/geometry/spring-violet.svg",
};

function ExpandIndicator({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-(--border-subtle) text-(--icon-subtle) transition-colors duration-(--duration-base) ease-(--ease-standard) group-hover:border-(--border-strong) group-hover:text-(--icon-brand)"
    >
      <span className="absolute h-px w-3.5 bg-current" />
      <motion.span
        className="absolute h-3.5 w-px bg-current"
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  );
}

function WorkCard({
  cap,
  isOpen,
  onToggle,
}: {
  cap: Capability;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const style = styleBySlug[cap.slug];
  const descId = `${cap.slug}-description`;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={descId}
      onClick={onToggle}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-card text-left shadow-(--shadow-elevation-2) transition-shadow duration-(--duration-base) ease-(--ease-standard) hover:shadow-(--shadow-elevation-4)"
    >
      {/* Franja de color — altura fija (no un %), calculada para rondar
         20-25% de la altura del estado cerrado; el expandido crece con la
         descripción, así que no puede ser un porcentaje literal de "la
         card" sin también estirar la franja. */}
      <div className={cn("h-28 w-full shrink-0 sm:h-32", style.bg, style.fg)} />

      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-bold text-balance sm:text-2xl">{cap.name}</h3>
          <Image
            src={geometryBySlug[cap.slug]}
            alt=""
            width={64}
            height={64}
            className="w-10 shrink-0 select-none sm:w-12"
          />
        </div>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              id={descId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="text-pretty text-(--text-secondary)">{cap.resolves}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-auto flex justify-end pt-2">
          <ExpandIndicator open={isOpen} />
        </div>
      </div>
    </button>
  );
}

export function HomeProcess() {
  const [openSlug, setOpenSlug] = React.useState<string | null>(null);

  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
              Cómo trabajamos
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
              Siete formas distintas de aplicar la misma manera de pensar.
            </h2>
          </div>
          <Link href="/capabilities" className={cn(buttonVariants({ variant: "ghost" }), "shrink-0")}>
            Ver todas las capacidades
          </Link>
        </Reveal>

        <ScrollCarousel
          aria-label="Cómo trabajamos"
          draggable
          slideClassName="w-[85%] sm:w-[62%] lg:w-[calc(50%-0.75rem)]"
          slides={capabilities.map((cap) => (
            <WorkCard
              key={cap.slug}
              cap={cap}
              isOpen={openSlug === cap.slug}
              onToggle={() => setOpenSlug((s) => (s === cap.slug ? null : cap.slug))}
            />
          ))}
        />
      </Container>
    </section>
  );
}
