import type { ComponentPropsWithoutRef, ElementType, HTMLAttributes, ReactNode } from "react";

/** Visual surface treatment. */
export type CardVariant = "elevated" | "outlined" | "flat";

/**
 * Behavior mode. Each renders as the element that gives it correct native
 * keyboard semantics for free — never a <div role="button"> with hand-rolled
 * keydown handling:
 * - static / interactive → whatever `as` says (default "div")
 * - selectable           → <button type="button" aria-pressed>
 * - clickable            → <a href> if `href` is set, otherwise <button type="button">
 */
export type CardInteraction = "static" | "interactive" | "selectable" | "clickable";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  /** @default "elevated" */
  variant?: CardVariant;
  /** @default "static" */
  interaction?: CardInteraction;
  /** The tag to render as — only consulted for "static"/"interactive"; selectable/clickable pick their own. */
  as?: ElementType;
  /** interaction="selectable" only — controlled selected state. */
  selected?: boolean;
  /** interaction="selectable" only — uncontrolled initial selected state. */
  defaultSelected?: boolean;
  /** interaction="selectable" only. */
  onSelectedChange?: (selected: boolean) => void;
  /** interaction="clickable" only — renders the card as <a href>. */
  href?: string;
  /** interaction="clickable" | "selectable" — click handler (selectable also receives the next selected state via onSelectedChange). */
  onClick?: () => void;
  disabled?: boolean;
  /**
   * Replaces children with skeleton placeholders sized to a typical
   * header/body/footer, built from the same Skeleton primitive used by
   * SkeletonCard — not a second implementation of the pulse animation.
   */
  loading?: boolean;
  children?: ReactNode;
}

export type CardMediaAspect = "video" | "square" | "portrait" | "wide";

export interface CardMediaProps extends ComponentPropsWithoutRef<"div"> {
  /** @default "video" (16/9) */
  aspect?: CardMediaAspect;
  /** Subtly scales the media on hover of the nearest Card ancestor (Card always carries `group`). */
  zoomOnHover?: boolean;
}
