import type { PortfolioData } from "@/lib/templates/portfolio";
import { PortfolioHero } from "./portfolio-hero";
import { FeaturedProject } from "./featured-project";
import { PortfolioGallery } from "./portfolio-gallery";
import { PortfolioStats } from "./portfolio-stats";
import { PortfolioTimeline } from "./portfolio-timeline";

/**
 * `projects[0]` is always the featured project — a real, unambiguous
 * "first" beats a `featured: true` flag that two entries could carry by
 * mistake. The gallery gets everything else. Growing from 12 to 100
 * projects changes nothing here: still one featured, still one gallery,
 * still one grid — see the README's "Preparado para crecer" section.
 *
 * `showTimeline` defaults to on; a single-year portfolio (a brand-new
 * studio, or a narrow date range) can turn it off since a Timeline with
 * one entry says nothing a year label on each card doesn't already say.
 */
export function PortfolioTemplate({ data, showTimeline = true }: { data: PortfolioData; showTimeline?: boolean }) {
  const [featured, ...rest] = data.projects;

  return (
    <article>
      <PortfolioHero data={data} />
      {featured ? <FeaturedProject project={featured} /> : null}
      <PortfolioGallery projects={rest} />
      <PortfolioStats stats={data.sectionStats} />
      {showTimeline ? <PortfolioTimeline projects={data.projects} /> : null}
    </article>
  );
}
