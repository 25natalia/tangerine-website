import type { ReactNode } from "react";
import type { MascotVariant } from "@/lib/mascot";

/**
 * The 5 named in the brief map to a real, structural axis — how much
 * ceremony the footer gets, not just a color swap. See the README for
 * exactly which zones/motion each one turns on or off.
 * @default "creative"
 */
export type FooterVariant = "creative" | "corporate" | "minimal" | "documentation" | "product";

export interface FooterProps {
  variant?: FooterVariant;
  className?: string;
  children?: ReactNode;
}

export interface FooterMascotShowcaseProps {
  /** Resting pose. @default "default" */
  idleVariant?: MascotVariant;
  /** Pose swapped in on hover — the literal "raise a hand" from the brief. @default "1" */
  hoverVariant?: MascotVariant;
  /** Pose swapped in briefly on click, the easter egg. @default "3" */
  clickVariant?: MascotVariant;
  className?: string;
}

export interface FooterLinkGroupProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export interface FooterLinkProps {
  href: string;
  children?: ReactNode;
  className?: string;
}

export interface FooterSocialLinkProps {
  label: string;
  href: string;
  /** Short monogram shown in the badge — see README for why badges, not brand-logo SVGs. */
  monogram: string;
  className?: string;
}

export interface FooterTickerProps {
  items: string[];
  /** Full loop duration in seconds — lower is faster. @default 32 */
  duration?: number;
  className?: string;
}
