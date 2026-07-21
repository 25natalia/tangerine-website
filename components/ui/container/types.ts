import type { ElementType, HTMLAttributes } from "react";

/**
 * The 10 requested variants. Six are raw widths (fluid, narrow, reading,
 * content, default, wide, dashboard, full); hero and landing are semantic
 * presets — a width paired with a vertical-padding recipe — not new widths
 * of their own. See container.tsx for exactly which width each maps to.
 */
export type ContainerSize =
  | "fluid"
  | "narrow"
  | "reading"
  | "content"
  | "default"
  | "wide"
  | "dashboard"
  | "full"
  | "hero"
  | "landing";

/** Elements it makes sense to render a page-layout wrapper as. */
export type ContainerElement = "div" | "section" | "main" | "article" | "header" | "footer";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Which of the 10 size/recipe variants to render. @default "default" */
  size?: ContainerSize;
  /** The tag Container renders as. @default "div" */
  as?: ContainerElement | ElementType;
}
