import type { ReactNode } from "react";

export type AccordionVariant = "default" | "filled" | "bordered" | "ghost" | "card" | "faq";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionIconType = "chevron-down" | "chevron-right" | "plus-minus";

export interface AccordionProps {
  /** @default "default" */
  variant?: AccordionVariant;
  /** @default "md" */
  size?: AccordionSize;
  /** The trailing expand indicator. @default "chevron-down" */
  icon?: AccordionIconType;
  /** Whether more than one item can be open at once. @default false */
  multiple?: boolean;
  /**
   * When `multiple` is false, whether the single open item can be collapsed
   * down to none. Set false for a "always one section open" accordion
   * (e.g. Settings). @default true
   */
  collapsible?: boolean;
  /** Controlled open item value(s). */
  value?: string[];
  /** Uncontrolled initial open item value(s). */
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /**
   * Keeps every panel's content in the DOM (native `hidden="until-found"`)
   * even while collapsed, instead of unmounting it — so closed panels stay
   * indexable by search engines and reachable with the browser's own
   * Ctrl+F / Cmd+F. Worth it for content that should be findable even
   * closed (FAQ answers); leave off elsewhere, since it's real DOM weight
   * for every item, not just the open one. @default false
   */
  hiddenUntilFound?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface AccordionItemProps {
  /** Unique identifier — what `value`/`defaultValue` reference. */
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface AccordionTriggerProps {
  title: ReactNode;
  /** Optional supporting line under the title. */
  description?: ReactNode;
  /** Optional icon/avatar before the title. */
  leadingIcon?: ReactNode;
  className?: string;
}

export interface AccordionContentProps {
  children?: ReactNode;
  /** A row of actions (buttons, links) rendered at the end of the panel — e.g. an FAQ "¿Fue útil?" row. */
  actions?: ReactNode;
  /** Divider between `children` and `actions`. Only relevant when `actions` is set. @default true */
  divider?: boolean;
  className?: string;
}
