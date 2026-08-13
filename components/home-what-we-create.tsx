"use client";

import { motion } from "framer-motion";
import { Palette, LayoutTemplate, PenTool, Compass, PartyPopper, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup } from "@/components/templates/reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Dictionary } from "@/lib/i18n/dictionaries/es";
import { cn } from "@/lib/utils";

const iconBySlug: Record<string, LucideIcon> = {
  brands: Palette,
  "digital-products": LayoutTemplate,
  content: PenTool,
  strategy: Compass,
  experiences: PartyPopper,
};

const styleBySlug: Record<string, { bg: string; fg: string }> = {
  brands: { bg: "bg-(--tangerine-500)", fg: "text-white" },
  "digital-products": { bg: "bg-(--info-600)", fg: "text-white" },
  content: { bg: "bg-(--purple-600)", fg: "text-white" },
  strategy: { bg: "bg-(--green-600)", fg: "text-white" },
  experiences: { bg: "bg-(--gold-400)", fg: "text-(--neutral-1000)" },
};

type Category = Dictionary["home"]["whatWeCreate"]["categories"][number];

function CategoryCard({ category }: { category: Category }) {
  const reduceMotion = usePrefersReducedMotion();
  const Icon = iconBySlug[category.slug];
  const style = styleBySlug[category.slug];

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-full flex-col gap-4 rounded-[28px] border border-(--border-subtle) bg-card p-6 shadow-(--shadow-elevation-1) transition-shadow duration-(--duration-base) hover:shadow-(--shadow-elevation-3) sm:p-8"
    >
      <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-2xl", style.bg, style.fg)}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-display text-xl font-bold text-balance sm:text-2xl">{category.title}</h3>
        <p className="mt-2 text-pretty text-(--text-secondary)">{category.description}</p>
      </div>
    </motion.div>
  );
}

/**
 * La sexta card de la grilla — mismo contenedor que `CategoryCard` (mismo
 * alto, mismo padding, mismo radio), solo que con borde punteado en vez de
 * `bg-card` sólido y sin sombra, para que siga leyéndose distinta ("esto es
 * una invitación abierta, no una categoría más") sin dejar de ocupar
 * exactamente el mismo espacio que las otras cinco.
 */
function UnknownCard({ title, description }: { title: string; description: string }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-full flex-col gap-4 rounded-[28px] border-2 border-dashed border-(--border-strong) p-6 sm:p-8"
    >
      <motion.span
        aria-hidden="true"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-(--lime-400) text-(--neutral-1000)"
        whileHover={reduceMotion ? undefined : { rotate: 90 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Sparkles className="size-5" />
      </motion.span>
      <div>
        <h3 className="font-display text-xl font-bold text-balance sm:text-2xl">{title}</h3>
        <p className="mt-2 text-pretty text-(--text-secondary)">{description}</p>
      </div>
    </motion.div>
  );
}

/**
 * "¿Qué podemos crear juntas?" — responde de entrada la pregunta que el Hero
 * por sí solo deja ambigua ("¿qué hace Tangerine, exactamente?"), sin
 * encerrar al estudio en una sola categoría. Vive inmediatamente después de
 * HomeTicker (que a su vez va justo después del Hero) — el ancla del CTA
 * primario del Hero (`#que-creamos`) apunta acá, `scroll-mt-24` compensa el
 * Navbar sticky (mismo valor que `ContactTemplate` usa para su propio
 * ancla).
 *
 * Mismo lenguaje visual que `HomeProcess` (grid de cards, un color de acento
 * real del DS por card, nunca dos iguales seguidas) pero con un badge de
 * ícono en vez de una franja completa — para no leerse como una copia del
 * mismo patrón. La sexta card ("cosas que todavía no sabemos nombrar") vive
 * dentro de la misma grilla que las otras cinco, mismo tamaño exacto — ya no
 * es una pieza aparte full-width debajo. Sigue leyéndose distinta por el
 * borde punteado y el ícono de Sparkles con su propia reacción al hover, no
 * por ocupar más o menos espacio que el resto.
 */
export function HomeWhatWeCreate() {
  const { t } = useLanguage();
  const copy = t.home.whatWeCreate;

  return (
    <section id="que-creamos" className="scroll-mt-24">
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-10 flex max-w-2xl flex-col gap-6 sm:mb-14">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">{copy.title}</h2>
          <p className="text-body-lg text-pretty text-(--text-secondary)">{copy.body}</p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {copy.categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
          <UnknownCard title={copy.unknown.title} description={copy.unknown.description} />
        </RevealGroup>
      </Container>
    </section>
  );
}
