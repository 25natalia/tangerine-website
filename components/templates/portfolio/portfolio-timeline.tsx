import { Container } from "@/components/ui/container";
import type { PortfolioProject } from "@/lib/templates/portfolio";

/**
 * Optional, per the brief ("Opcionalmente mostrar los proyectos por año")
 * — PortfolioTemplate only renders this when the consumer opts in (see
 * `showTimeline`). Groups by `year` and lists just client + title per
 * project: the gallery above already did the visual/curiosity job: this
 * section's job is pure chronology, so it stays text-first and quiet.
 */
export function PortfolioTimeline({ projects }: { projects: PortfolioProject[] }) {
  const years = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <Container size="wide" className="py-16 sm:py-20">
      <p className="text-overline text-(--text-brand) uppercase">Timeline</p>
      <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Proyectos por año</h2>
      <div className="mt-10 flex flex-col gap-10">
        {years.map((year) => {
          const yearProjects = projects.filter((p) => p.year === year);
          return (
            <div key={year} className="grid grid-cols-1 gap-4 border-t border-(--border-subtle) pt-6 sm:grid-cols-[8rem_1fr]">
              <span className="font-display text-4xl font-bold text-(--text-tertiary)">{year}</span>
              <ul className="flex flex-col gap-3">
                {yearProjects.map((p) => (
                  <li key={p.slug} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <a href={p.href ?? "#"} className="text-body font-semibold text-(--text-primary) hover:text-(--text-brand)">
                      {p.title}
                    </a>
                    <span className="text-caption text-(--text-tertiary)">{p.client} · {p.categories.join(", ")}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
