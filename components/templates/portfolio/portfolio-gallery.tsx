"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import type { PortfolioProject } from "@/lib/templates/portfolio";
import { ProjectCard } from "./project-card";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * `Tabs` used purely as a filter control — one shared grid below reacts to
 * `category`, instead of `Tabs` swapping between per-category panels. Real
 * tab content would mean duplicating the grid seven times (once per
 * category, each pre-filtered), which is both more code and worse for
 * "preparado para crecer": a 50-project gallery shouldn't need seven
 * separately-maintained panels. See the README for the full reasoning.
 *
 * The text field is a plain `Input`, not the official `SearchBar` — this is
 * a pure client-side list filter, not an autocomplete/combobox. `SearchBar`
 * is built on Base UI's Autocomplete and opens its own suggestions popup on
 * click (`openOnInputClick`); since this gallery never feeds it real
 * `suggestions`, that popup always renders its empty state right under the
 * input, before the visitor has typed anything — reading as "search always
 * says no results". A plain `Input` (styled the same way, with a leading
 * icon) has no popup at all, so the grid's own `EmptyState` below is the
 * only "no matches" message that can ever show.
 */
export function PortfolioGallery({ projects }: { projects: PortfolioProject[] }) {
  const { t } = useLanguage();
  const copy = t.portfolio.gallery;
  const ALL = copy.allLabel;
  const [query, setQuery] = useState("");
  // Guarda el valor crudo elegido en el Tab, sin sincronizarlo con `ALL` vía
  // efecto: `ALL` cambia con el idioma ("Todos" / "All"), así que en vez de
  // resetear el estado cuando cambia el idioma, `activeCategory` (abajo) lo
  // deriva en cada render — si `category` ya no aparece en la lista vigente
  // de categorías (p. ej. quedó en el idioma anterior), se trata como "todos"
  // automáticamente, sin un setState adicional.
  const [category, setCategory] = useState<string | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  const categories = useMemo(() => {
    const seen = new Set(projects.flatMap((p) => p.categories));
    return [ALL, ...Array.from(seen)];
  }, [projects, ALL]);

  const activeCategory = category !== null && categories.includes(category) ? category : ALL;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === ALL || p.categories.includes(activeCategory as PortfolioProject["categories"][number]);
      // Coincide por cliente, título, descripción, categorías (tags) y
      // servicios (palabras clave del proyecto) — no solo por el nombre del
      // cliente o el título, como antes.
      const matchesQuery =
        !q ||
        p.client.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q)) ||
        p.services.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, activeCategory, ALL]);

  return (
    <Container size="wide" className="py-16 sm:py-20">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14">
        <div className="relative w-full sm:max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-(--icon-subtle)"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
            className="h-11 pl-10"
          />
        </div>
        {/* Sin `flex-wrap`: la variante "pills" del Tabs ya trae scroll
           horizontal (`overflow-x-auto`) para una sola fila — envolver a
           varias filas rompía el indicador de la pill activa, que se
           posiciona asumiendo una sola fila (top-0 + h-full + solo
           translate-x, sin translate-y), así que en 2+ filas terminaba
           ocupando el alto completo de todas las filas a la vez. */}
        <Tabs variant="pills" value={activeCategory} onValueChange={(v) => setCategory(v as string)}>
          <TabsList>
            {categories.map((c) => (
              <TabsTab key={c} value={c}>
                {c}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          variant="search"
          size="sm"
          title={copy.emptyTitle}
          description={copy.emptyDescription}
          action={{
            label: copy.clearFiltersLabel,
            onClick: () => {
              setQuery("");
              setCategory(ALL);
            },
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              className={project.size === "large" ? "sm:col-span-2" : undefined}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: Math.min(i, 6) * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}
    </Container>
  );
}
