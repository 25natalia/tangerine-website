import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { VisualBlock } from "@/components/templates/shared/visual-block";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/lib/templates/portfolio";

const sizeConfig = {
  large: { aspect: "aspect-[16/10]", title: "text-2xl sm:text-3xl", showDescription: true, showServices: true },
  medium: { aspect: "aspect-[4/3]", title: "text-xl", showDescription: true, showServices: false },
  small: { aspect: "aspect-square", title: "text-lg", showDescription: false, showServices: false },
} as const;

/**
 * Deliberately restrained content — "no mostrar demasiada información,
 * solo despertar curiosidad." The card's job is to earn a click, not to
 * summarize the whole case study; `size="small"` doesn't even show a
 * description, and every size holds the CTA row back until hover so it
 * never competes with the image and title for attention at rest.
 *
 * Grid placement (column span) is deliberately not this component's
 * concern — it's presentation-only, unaware of the grid it happens to sit
 * in; PortfolioGallery's wrapper decides span so this card also works
 * standalone (e.g. the docs page's Anatomía preview).
 */
export function ProjectCard({ project }: { project: PortfolioProject }) {
  const config = sizeConfig[project.size];

  return (
    <a
      href={project.href ?? "#"}
      className="group/card relative flex h-full flex-col overflow-hidden rounded-(--radius-container) border border-(--border-subtle) bg-(--surface-default) transition-[border-color,box-shadow] duration-(--duration-base) ease-(--ease-standard) hover:border-(--border-brand) hover:shadow-(--shadow-elevation-3)"
    >
      <div className="relative overflow-hidden">
        <VisualBlock
          pattern={project.pattern}
          accent={project.accent}
          className={cn("w-full transition-transform duration-(--duration-slower) ease-(--ease-standard) group-hover/card:scale-105", config.aspect)}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-(--duration-base) ease-(--ease-standard) group-hover/card:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 inline-flex translate-y-1 items-center gap-1 rounded-(--radius-pill) bg-white px-3 py-1.5 text-caption font-semibold text-(--purple-700) opacity-0 shadow-(--shadow-elevation-2) transition-[opacity,transform] duration-(--duration-base) ease-(--ease-standard) group-hover/card:translate-y-0 group-hover/card:opacity-100"
        >
          View Case Study
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{project.category}</Badge>
          <span className="text-caption text-(--text-tertiary)">{project.year}</span>
        </div>
        <div>
          <p className="text-caption font-medium text-(--text-tertiary)">{project.client}</p>
          <h3 className={cn("font-display font-bold text-balance text-(--text-primary) transition-colors duration-(--duration-fast) ease-(--ease-standard) group-hover/card:text-(--text-brand)", config.title)}>
            {project.title}
          </h3>
        </div>
        {config.showDescription ? (
          <p className="text-body-sm line-clamp-2 text-(--text-secondary)">{project.description}</p>
        ) : null}
        {config.showServices ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.services.slice(0, 3).map((s) => (
              <Chip key={s} className="text-caption px-2.5 py-0.5">
                {s}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}
