"use client";

// Botón de enlace de /links. Contenido propio de la web, no un componente del
// Design System: compone `Card` (interaction="clickable") tal cual viene del
// DS y le agrega por fuera — vía className y elementos hijos — el barrido de
// fondo, la flecha y el ripple. No toca nada del interior de Card (regla 4 de
// ARCHITECTURE.md).

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarClock,
  LayoutGrid,
  MessageCircle,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { LinkIcon } from "@/content/links";

const icons: Record<LinkIcon, LucideIcon> = {
  sparkles: Sparkles,
  whatsapp: MessageCircle,
  projects: LayoutGrid,
  redesign: WandSparkles,
};

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface LinkButtonProps {
  href: string;
  icon: LinkIcon;
  title: string;
  subtitle: string;
  badge?: string;
  featured?: boolean;
  /** Muestra un punto que late junto a la etiqueta (cupos limitados). */
  urgent?: boolean;
  /** Línea de fecha límite dentro de la card, bajo el subtítulo. */
  deadline?: string;
}

export function LinkButton({
  href,
  icon,
  title,
  subtitle,
  badge,
  featured = false,
  urgent = false,
  deadline,
}: LinkButtonProps) {
  const Icon = icons[icon];
  const reduceMotion = usePrefersReducedMotion();
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const nextId = React.useRef(0);

  // Enlaces todavía sin URL real ("[URL_...]") — no navegar a una ruta rota.
  const safeHref = href.startsWith("[") ? "#" : href;

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    // Ripple en cualquier clic o toque: confirma que se registró la acción.
    if (reduceMotion || event.button > 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = {
      id: nextId.current++,
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((current) => [...current, ripple]);
  }

  return (
    <div className="group/link relative h-full">
      <Card
        interaction="clickable"
        href={safeHref}
        onPointerDown={handlePointerDown}
        className={cn(
          // Hover más marcado que el default de Card: sube 4px (no 2px) con sombra
          // elevation-4, y `translate` va en la transición — Card solo anima
          // `transform`, pero Tailwind v4 mueve con la propiedad `translate`, así
          // que sin esto la tarjeta saltaba en vez de deslizarse.
          // Al presionar (mouse o dedo) se hunde: baja, se encoge un poco y pierde
          // sombra — la respuesta física del clic, también en el celular.
          "isolate h-full min-h-26 w-full justify-center transition-[translate,scale,box-shadow,border-color,background-color] duration-(--duration-base) hover:-translate-y-1 hover:shadow-(--shadow-elevation-4) active:translate-y-0 active:scale-[0.98] active:shadow-(--shadow-elevation-1) active:duration-(--duration-instant) motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 [-webkit-tap-highlight-color:transparent]",
          featured
            ? "bg-(color:--interactive-default) text-primary-foreground shadow-(--shadow-elevation-2)"
            : "border-(--border-subtle) hover:border-(--border-brand)",
        )}
      >
        {/* Barrido de fondo en hover (Tailwind v4 solo aplica hover en dispositivos que lo soportan). */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover/card:scale-x-100 motion-reduce:transition-none",
            featured
              ? "bg-(--interactive-hover)"
              : "bg-(--background-brand-subtle)",
          )}
        />

        {/* Destello del botón principal: una franja de luz suave que lo cruza cada
          pocos segundos, como un reflejo sobre una superficie brillante. */}
        {featured && !reduceMotion ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-2/5 -skew-x-12 bg-linear-to-r from-transparent via-primary-foreground/35 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "320%" }}
            transition={{
              duration: 1.6,
              ease: [0.4, 0, 0.2, 1],
              repeat: Infinity,
              repeatDelay: 2.4,
            }}
          />
        ) : null}

        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -z-10 rounded-full",
                featured
                  ? "bg-primary-foreground/25"
                  : "bg-(--interactive-default)/20",
              )}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
              onAnimationComplete={() =>
                setRipples((current) =>
                  current.filter((r) => r.id !== ripple.id),
                )
              }
            />
          ))}
        </AnimatePresence>

        <span className="flex items-center gap-3 p-4">
          <span
            aria-hidden="true"
            className={cn(
              // El ícono "salta" un poco en hover: escala y se inclina con el spring del sistema.
              "flex size-11 shrink-0 items-center justify-center rounded-(--radius-full) transition-[scale,rotate,background-color,color] duration-(--duration-slow) ease-(--ease-spring) group-hover/card:scale-110 group-hover/card:-rotate-6 group-active/card:scale-95 motion-reduce:transition-none",
              featured
                ? "bg-primary-foreground/15 text-primary-foreground"
                : "bg-(--background-brand-subtle) text-(--text-brand) group-hover/card:bg-(--interactive-default) group-hover/card:text-primary-foreground",
            )}
          >
            <Icon className="size-5" />
          </span>

          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            {/* Tamaño y color sin cn(): tailwind-merge no conoce text-subtitle /
              text-body-sm y los borra al verlos junto a una clase de color. */}
            <span
              className={`text-subtitle font-semibold transition-colors duration-(--duration-base) ${featured ? "text-primary-foreground" : "text-(--text-primary) group-hover/card:text-(--text-brand)"}`}
            >
              {title}
            </span>
            <span
              className={`text-body-sm ${featured ? "text-primary-foreground/80" : "text-(--text-secondary)"}`}
            >
              {subtitle}
            </span>
            {deadline ? (
              <span
                className={`text-caption mt-1 inline-flex items-center gap-1 font-semibold ${featured ? "text-primary-foreground" : "text-(--text-warning)"}`}
              >
                <CalendarClock aria-hidden="true" className="size-3.5" />
                {deadline}
              </span>
            ) : null}
            {badge ? <span className="sr-only">{badge}</span> : null}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-(--radius-full) transition-transform duration-(--duration-slow) ease-(--ease-spring) group-hover/card:translate-x-0.5 group-hover/card:rotate-45 group-active/card:translate-x-1 motion-reduce:transition-none",
              featured ? "text-primary-foreground" : "text-(--text-brand)",
            )}
          >
            <ArrowUpRight className="size-5" />
          </span>
        </span>
      </Card>

      {/* Etiqueta fuera de la Card (que recorta con overflow-hidden) para que
          sobresalga del borde superior sin tapar el contenido. Acompaña la
          elevación del hover. */}
      {badge ? (
        <Badge
          aria-hidden="true"
          variant="secondary"
          className={cn(
            "pointer-events-none absolute -top-2.5 right-4 z-10 gap-1.5 px-2.5 py-0.5 shadow-(--shadow-elevation-2) transition-transform duration-(--duration-fast) ease-(--ease-standard) group-hover/link:-translate-y-0.5",
            featured
              ? "bg-(--brand-tangerine) text-(--neutral-1000)"
              : "border border-(--border-default) bg-(--background-default) text-(--text-warning)",
          )}
        >
          {urgent ? (
            <span className="relative flex size-1.5 shrink-0">
              {!reduceMotion ? (
                <motion.span
                  className="absolute inset-0 rounded-full bg-current"
                  animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ) : null}
              <span className="relative size-1.5 rounded-full bg-current" />
            </span>
          ) : null}
          {/* text-caption en su propio span: dentro de Badge, cn() lo borra al
              combinarlo con el color de la variante. */}
          <span className="text-caption font-semibold">{badge}</span>
        </Badge>
      ) : null}
    </div>
  );
}
