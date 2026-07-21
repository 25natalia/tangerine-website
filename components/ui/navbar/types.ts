import type { ComponentPropsWithoutRef } from "react";

/** Background treatment. @default "solid" */
export type NavbarVariant = "solid" | "transparent" | "blur";

/** Placement behavior. @default "static" */
export type NavbarPosition = "static" | "sticky" | "floating";

/**
 * Arrangement of Brand/Links/Actions. "split" needs two NavbarLinks groups
 * (left + right of a centered Brand) — see the docs page for the exact
 * composition each layout expects.
 * @default "start"
 */
export type NavbarLayout = "start" | "centered" | "split";

export interface NavbarProps extends ComponentPropsWithoutRef<"header"> {
  variant?: NavbarVariant;
  position?: NavbarPosition;
  layout?: NavbarLayout;
}

export interface NavbarLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  /** If omitted, derived from the current route via usePathname() (exact match). */
  active?: boolean;
}
