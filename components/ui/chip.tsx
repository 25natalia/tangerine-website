"use client";

import type { ComponentProps } from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Static chip — a tag, optionally dismissible. Used for Input Chip
 * (rendered inside a text-field-like container) and standalone Dismissible
 * chips. Not a toggle: it doesn't have a pressed/selected state.
 */
function Chip({
  className,
  children,
  onDismiss,
  dismissLabel = "Quitar",
  ...props
}: ComponentProps<"span"> & { onDismiss?: () => void; dismissLabel?: string }) {
  return (
    <span
      data-slot="chip"
      className={cn(
        "text-body-sm inline-flex items-center gap-1 rounded-(--radius-pill) border border-(--border-default) bg-secondary py-1 pl-3 text-secondary-foreground",
        onDismiss ? "pr-1" : "pr-3",
        className
      )}
      {...props}
    >
      {children}
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="flex size-5 shrink-0 items-center justify-center rounded-full text-(--icon-subtle) transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:bg-(--background-strong) hover:text-(--icon-default)"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </span>
  );
}

/**
 * Toggleable chip — a two-state button. Used for Filter Chip
 * (ChipGroup multiple) and Choice Chip (ChipGroup single-select).
 */
function ChipToggle({ className, children, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="chip-toggle"
      className={cn(
        "group/chip text-body-sm inline-flex items-center gap-1 rounded-(--radius-pill) border border-transparent bg-(--purple-50) px-3 py-1 text-(--purple-700) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) dark:bg-(--purple-950) dark:text-(--purple-300)",
        "hover:not-data-disabled:not-data-pressed:bg-(--purple-100) dark:hover:not-data-disabled:not-data-pressed:bg-(--purple-900)",
        "data-pressed:bg-(--purple-200) data-pressed:text-(--purple-900) dark:data-pressed:bg-(--purple-600) dark:data-pressed:text-white",
        "focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        "data-disabled:cursor-not-allowed data-disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <Check className="hidden size-3 group-data-pressed/chip:block" />
      {children}
    </TogglePrimitive>
  );
}

function ChipGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
  return (
    <ToggleGroupPrimitive
      data-slot="chip-group"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  );
}

export { Chip, ChipToggle, ChipGroup };
