"use client";

import * as React from "react";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import type { BreadcrumbProps, BreadcrumbOverflowMenuProps } from "./types";

const BreadcrumbSizeContext = React.createContext<"default" | "compact">("default");

function Breadcrumb({ size = "default", className, ...props }: BreadcrumbProps) {
  return (
    <BreadcrumbSizeContext.Provider value={size}>
      <nav aria-label="Breadcrumb" className={className} {...props} />
    </BreadcrumbSizeContext.Provider>
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentPropsWithoutRef<"ol">) {
  const size = React.useContext(BreadcrumbSizeContext);
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center break-words text-(--text-secondary)",
        size === "compact" ? "gap-1 text-caption" : "gap-1.5 text-body-sm",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentPropsWithoutRef<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

function BreadcrumbLink({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "inline-flex items-center gap-1.5 outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:text-(--text-primary) focus-visible:rounded-(--radius-sm) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)",
        className
      )}
      {...props}
    />
  );
}

/** The current page — not a link, not focusable: there's nowhere for it to navigate to. */
function BreadcrumbPage({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("inline-flex items-center gap-1.5 font-medium text-(--text-primary)", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentPropsWithoutRef<"li">) {
  const size = React.useContext(BreadcrumbSizeContext);
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center text-(--icon-subtle)", className)}
      {...props}
    >
      {children ?? <ChevronRight className={size === "compact" ? "size-3" : "size-3.5"} />}
    </li>
  );
}

/** A static, non-interactive truncation marker — for the CSS-only Responsive variant. For an interactive collapse, use BreadcrumbOverflowMenu instead. */
function BreadcrumbEllipsis({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  const size = React.useContext(BreadcrumbSizeContext);
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center justify-center text-(--icon-subtle)", className)}
      {...props}
    >
      <MoreHorizontal className={size === "compact" ? "size-3.5" : "size-4"} />
    </span>
  );
}

/** A BreadcrumbLink preset for the first crumb — icon-only, with the label kept for screen readers. */
function BreadcrumbHome({
  label = "Inicio",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { label?: string }) {
  return (
    <BreadcrumbLink aria-label={label} className={className} {...props}>
      <Home className="size-3.5" aria-hidden="true" />
    </BreadcrumbLink>
  );
}

/** The interactive "Dropdown Overflow" — a real trigger + Popover listing the hidden middle segments as links. */
function BreadcrumbOverflowMenu({ items, className }: BreadcrumbOverflowMenuProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Mostrar rutas ocultas"
            className={cn("size-6 rounded-(--radius-sm)", className)}
          >
            <MoreHorizontal className="size-3.5" aria-hidden="true" />
          </Button>
        }
      />
      <PopoverContent side="bottom" align="start" className="w-auto min-w-40 p-1">
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-(--radius-sm) px-2.5 py-1.5 text-body-sm text-(--text-secondary) transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:bg-(--background-strong) hover:text-(--text-primary) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--border-focus)"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbHome,
  BreadcrumbOverflowMenu,
};
