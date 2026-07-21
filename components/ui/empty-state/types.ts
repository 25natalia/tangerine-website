import type { ReactNode } from "react";
import type { MascotVariant } from "@/lib/mascot";
import type { EmptyStateVariant } from "@/lib/empty-states";

export type { EmptyStateVariant };
export type EmptyStateSize = "sm" | "md" | "lg";
export type EmptyStateAlign = "center" | "left";

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  /** Renders the action as a real `<a>` instead of a `<button>`. */
  href?: string;
}

export interface EmptyStateProps {
  /** Which preset content + mascot pose to start from. @default "generic" */
  variant?: EmptyStateVariant;
  /** @default "md" */
  size?: EmptyStateSize;
  /** @default "center" */
  align?: EmptyStateAlign;
  /** Overrides the preset's mascot pose. */
  mascotVariant?: MascotVariant;
  /** Overrides the preset's headline. */
  title?: ReactNode;
  /**
   * The heading tag rendered for `title` — controls document semantics
   * independent of visual size (a Small EmptyState inside a Card is rarely
   * the page's only h1). @default "h4" at sm, "h3" at md, "h2" at lg.
   */
  titleAs?: "h1" | "h2" | "h3" | "h4" | "p";
  /** Overrides the preset's description. */
  description?: ReactNode;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  /** Rendered above the headline — typically a status <Badge>. */
  badge?: ReactNode;
  /** Replaces the mascot entirely — a real screenshot, a custom graphic. */
  illustration?: ReactNode;
  className?: string;
}
