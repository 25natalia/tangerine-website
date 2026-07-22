// The Portfolio Gallery template's data model — plain data, no JSX, same
// separation as lib/templates/case-study.ts. A gallery of 10, 50 or 100
// projects is the same array with more entries; nothing about the
// components below changes shape as it grows (see the README's "Preparado
// para crecer" section).

import type { PatternId } from "@/lib/patterns";
import type { TemplateAccent, VisualBlockVideo } from "@/components/templates/shared/visual-block";

export type PortfolioCategory =
  | "Branding"
  | "UX/UI"
  | "Landing Pages"
  | "Design Systems"
  | "Research"
  | "Product Design"
  | "E-commerce"
  | "Página web";

export type PortfolioProjectStatus = "Live" | "En proceso" | "Archivado";

/**
 * Only three sizes — "large"/"medium"/"small" — not a free-form grid-span
 * number. Three is enough to break monotony (the brief's actual ask) while
 * staying predictable at any project count; a free-form span invites a
 * ragged, accidentally-unbalanced grid once someone adds project #47.
 */
export type PortfolioProjectSize = "large" | "medium" | "small";

export interface PortfolioProject {
  slug: string;
  client: string;
  title: string;
  /** One or more — a project can be both Branding and E-commerce at once. Also drives PortfolioGallery's category filter (a project matches a tab if any of its categories does). */
  categories: PortfolioCategory[];
  year: string;
  services: string[];
  description: string;
  status: PortfolioProjectStatus;
  pattern: PatternId;
  accent: TemplateAccent;
  size: PortfolioProjectSize;
  /** Where "View Case Study" points — a real route if one exists, otherwise omit and the card shows no CTA link. */
  href?: string;
  /** Real project footage for the card's cover, replacing `pattern` when present — see `VisualBlock`'s `video` mode. `pattern`/`accent` stay set regardless, so removing this later falls straight back to the placeholder instead of leaving the project cover-less. */
  coverVideo?: VisualBlockVideo;
}

export interface PortfolioStat {
  value: string;
  label: string;
}

export interface PortfolioData {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroStats: PortfolioStat[];
  /** The Stats section further down the page — deliberately a separate list from heroStats, which stay to exactly 3 by design (see PortfolioHero). */
  sectionStats: PortfolioStat[];
  projects: PortfolioProject[];
}
