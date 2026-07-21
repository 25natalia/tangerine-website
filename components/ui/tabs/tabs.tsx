"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { TabsProps, TabsVariant } from "./types";

const TabsVariantContext = React.createContext<TabsVariant>("underline");

function Tabs({ variant = "underline", orientation = "horizontal", className, ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        orientation={orientation}
        className={cn(orientation === "vertical" ? "flex gap-6" : "flex flex-col gap-4", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  );
}

const listVariants = cva("relative flex shrink-0 data-[orientation=vertical]:flex-col", {
  variants: {
    variant: {
      underline:
        "gap-1 border-b border-(--border-default) data-[orientation=horizontal]:overflow-x-auto data-[orientation=vertical]:w-48 data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
      pills:
        "gap-1 data-[orientation=horizontal]:overflow-x-auto data-[orientation=vertical]:w-48",
      segmented:
        "gap-1 rounded-(--radius-interactive) bg-(--background-subtle) p-1 data-[orientation=horizontal]:overflow-x-auto data-[orientation=vertical]:w-48",
      contained:
        "gap-1 border-b border-(--border-default) data-[orientation=horizontal]:overflow-x-auto data-[orientation=vertical]:w-48 data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0",
    },
  },
  defaultVariants: { variant: "underline" },
});

const indicatorClasses: Record<Exclude<TabsVariant, "contained">, string> = {
  underline: cn(
    "absolute rounded-full bg-(--interactive-default) transition-[translate,width,height] duration-(--duration-fast) ease-(--ease-standard)",
    "data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=horizontal]:translate-x-(--active-tab-left)",
    "data-[orientation=vertical]:right-0 data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:translate-y-(--active-tab-top)"
  ),
  pills: cn(
    "absolute -z-10 rounded-(--radius-pill) bg-(--interactive-default) transition-[translate,width,height] duration-(--duration-fast) ease-(--ease-standard)",
    "data-[orientation=horizontal]:top-0 data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=horizontal]:translate-x-(--active-tab-left)",
    "data-[orientation=vertical]:left-0 data-[orientation=vertical]:w-full data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:translate-y-(--active-tab-top)"
  ),
  segmented: cn(
    "absolute -z-10 rounded-(--radius-sm) bg-(--surface-default) shadow-(--shadow-elevation-1) transition-[translate,width,height] duration-(--duration-fast) ease-(--ease-standard)",
    "data-[orientation=horizontal]:top-0 data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=horizontal]:translate-x-(--active-tab-left)",
    "data-[orientation=vertical]:left-0 data-[orientation=vertical]:w-full data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:translate-y-(--active-tab-top)"
  ),
};

function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.List className={cn(listVariants({ variant }), className)} {...props}>
      {children}
      {variant === "contained" ? null : <TabsPrimitive.Indicator className={indicatorClasses[variant]} />}
    </TabsPrimitive.List>
  );
}

const tabVariants = cva(
  // Hover changes the surface only — text stays practically the same color
  // (a subtle background shift is enough of a cue; jumping all the way to
  // --text-primary read as too much movement for a hover state).
  "relative z-10 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-(--radius-sm) text-body-sm font-medium whitespace-nowrap text-(--text-secondary) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) data-disabled:pointer-events-none data-disabled:opacity-(--opacity-disabled)",
  {
    variants: {
      variant: {
        underline: "px-1 py-2.5 hover:not-data-active:bg-(--background-subtle) data-active:text-(--text-primary)",
        pills: "rounded-(--radius-pill) px-3.5 py-1.5 hover:not-data-active:bg-(--background-subtle) data-active:text-primary-foreground",
        segmented: "px-3 py-1.5 hover:not-data-active:bg-(--surface-default)/60 data-active:text-(--text-primary)",
        contained: cn(
          "-mb-px rounded-t-(--radius-sm) border border-transparent border-b-(--border-default) px-3.5 py-2",
          "hover:not-data-active:bg-(--background-subtle)",
          "data-active:border-(--border-default) data-active:border-b-(--surface-default) data-active:bg-(--surface-default) data-active:text-(--text-primary)",
          "data-[orientation=vertical]:mb-0 data-[orientation=vertical]:-mr-px data-[orientation=vertical]:rounded-t-none data-[orientation=vertical]:rounded-l-(--radius-sm) data-[orientation=vertical]:border-b-transparent data-[orientation=vertical]:border-r-(--border-default)",
          "data-[orientation=vertical]:data-active:border-r-(--surface-default) data-[orientation=vertical]:data-active:border-b-transparent"
        ),
      },
    },
    defaultVariants: { variant: "underline" },
  }
);

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  const variant = React.useContext(TabsVariantContext);
  return <TabsPrimitive.Tab className={cn(tabVariants({ variant }), className)} {...props} />;
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        "animate-in fade-in text-body-sm text-(--text-primary) outline-none duration-(--duration-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) data-[orientation=vertical]:flex-1",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTab, TabsPanel };
