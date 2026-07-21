import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** @default "default" */
export type BreadcrumbSize = "default" | "compact";

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  size?: BreadcrumbSize;
}

export interface BreadcrumbOverflowItem {
  href: string;
  label: ReactNode;
}

export interface BreadcrumbOverflowMenuProps {
  /** The hidden middle segments — rendered as real links inside the dropdown. */
  items: BreadcrumbOverflowItem[];
  className?: string;
}
