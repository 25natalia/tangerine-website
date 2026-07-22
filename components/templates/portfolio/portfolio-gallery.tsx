"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/ui/search-bar";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { PortfolioProject } from "@/lib/templates/portfolio";
import { ProjectCard } from "./project-card";

const EASE = [0.22, 1, 0.36, 1] as const;
const ALL = "Todos";

/**
 * `Tabs` used purely as a filter control — one shared grid below reacts to
 * `category`, instead of `Tabs` swapping between per-category panels. Real
 * tab content would mean duplicating the grid seven times (once per
 * category, each pre-filtered), which is both more code and worse for
 * "preparado para crecer": a 50-project gallery shouldn't need seven
 * separately-maintained panels. See the README for the full reasoning.
 */
export function PortfolioGallery({ projects }: { projects: PortfolioProject[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const reduceMotion = usePrefersReducedMotion();

  const categories = useMemo(() => {
    const seen = new Set(projects.flatMap((p) => p.categories));
    return [ALL, ...Array.from(seen)];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = category === ALL || p.categories.includes(category as PortfolioProject["categories"][number]);
      const matchesQuery =
        !q ||
        p.client.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, category]);

  return (
    <Container size="wide" className="py-16 sm:py-20">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14">
        <SearchBar
          value={query}
          onValueChange={setQuery}
          placeholder="Buscar proyectos…"
          className="w-full sm:max-w-sm"
        />
        <Tabs variant="pills" value={category} onValueChange={(v) => setCategory(v as string)}>
          <TabsList className="flex-wrap">
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
          title="Ningún proyecto coincide."
          description="Probá con otro término, o quitá el filtro de categoría activo."
          action={{
            label: "Limpiar filtros",
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
