"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cva } from "class-variance-authority";
import { Menu, Moon, Search, Sun, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { ContainerSize } from "@/components/ui/container";
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerContent,
  DrawerCloseButton,
} from "@/components/ui/drawer";
import type { NavbarProps, NavbarLinkProps } from "./types";

const navbarVariants = cva(
  "w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-(--duration-base) ease-(--ease-standard)",
  {
    variants: {
      variant: {
        solid: "border-b border-(--border-default) bg-(--surface-default)",
        transparent: "border-b border-transparent bg-transparent",
        blur: "border-b border-(--border-subtle) bg-(--surface-default)/70 backdrop-blur-(--blur-surface)",
      },
      position: {
        static: "relative",
        sticky: "sticky top-0 z-(--z-sticky)",
        floating:
          "fixed inset-x-0 top-4 z-(--z-sticky) mx-auto w-[calc(100%-2rem)] max-w-(--container-wide) rounded-(--radius-container)",
      },
      scrolled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "solid", scrolled: true, className: "shadow-(--shadow-elevation-2)" },
      {
        variant: "transparent",
        scrolled: true,
        className:
          "border-(--border-default) bg-(--surface-default)/95 shadow-(--shadow-elevation-2) backdrop-blur-(--blur-surface)",
      },
      { variant: "blur", scrolled: true, className: "shadow-(--shadow-elevation-2)" },
      { position: "floating", className: "border border-(--border-default)" },
    ],
    defaultVariants: { variant: "solid", position: "static", scrolled: false },
  }
);

const layoutClasses = {
  start: "flex items-center justify-between gap-4",
  centered: "grid grid-cols-3 items-center gap-4",
  split: "grid grid-cols-[1fr_auto_1fr] items-center gap-6",
} as const;

/**
 * Mirrors what `position: sticky` itself uses as its containing reference —
 * the nearest scrollable ancestor, or the window if there isn't one. Matters
 * for the Dashboard surface, where Navbar often lives inside a scrollable
 * content pane rather than the document itself.
 */
function getScrollParent(node: HTMLElement | null): HTMLElement | Window {
  let el = node?.parentElement ?? null;
  while (el) {
    const { overflowY } = getComputedStyle(el);
    if (overflowY === "auto" || overflowY === "scroll") return el;
    el = el.parentElement;
  }
  return window;
}

function Navbar({
  variant = "solid",
  position = "static",
  layout = "start",
  containerSize = "wide",
  className,
  children,
  ...props
}: NavbarProps & { containerSize?: ContainerSize }) {
  const [scrolled, setScrolled] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (position === "static" && variant !== "transparent") return;
    const scrollParent = getScrollParent(headerRef.current);
    const onScroll = () => {
      const scrollTop = scrollParent === window ? window.scrollY : (scrollParent as HTMLElement).scrollTop;
      setScrolled(scrollTop > 8);
    };
    onScroll();
    scrollParent.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollParent.removeEventListener("scroll", onScroll);
  }, [position, variant]);

  return (
    <header
      ref={headerRef}
      data-variant={variant}
      data-position={position}
      data-layout={layout}
      data-scrolled={scrolled || undefined}
      className={cn(navbarVariants({ variant, position, scrolled }), className)}
      {...props}
    >
      <Container size={containerSize}>
        <div className={cn("h-16", layoutClasses[layout])}>{children}</div>
      </Container>
    </header>
  );
}

function NavbarBrand({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "flex shrink-0 items-center gap-2 text-body font-bold text-(--text-primary) outline-none focus-visible:rounded-(--radius-sm) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)",
        className
      )}
      {...props}
    />
  );
}

function NavbarLinks({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label="Principal"
      className={cn("hidden items-center gap-1 lg:flex lg:justify-self-center", className)}
      {...props}
    />
  );
}

function NavbarLink({ href, active, className, children, ...props }: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = active ?? pathname === href;

  return (
    <a
      href={href}
      data-active={isActive || undefined}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group/navlink relative px-3 py-2 text-body-sm font-medium text-(--text-secondary) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:text-(--text-primary) focus-visible:rounded-(--radius-sm) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) data-active:text-(--text-primary)",
        className
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-3 -bottom-px h-px origin-center scale-x-0 bg-(--interactive-default) transition-transform duration-(--duration-fast) ease-(--ease-standard) group-hover/navlink:scale-x-100 group-data-active/navlink:scale-x-100"
      />
    </a>
  );
}

function NavbarActions({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex shrink-0 items-center gap-2 lg:justify-self-end", className)} {...props} />;
}

function NavbarSearchTrigger({
  className,
  shortcut = "⌘K",
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { shortcut?: string | null }) {
  return (
    <button
      type="button"
      aria-label={typeof children === "string" ? children : "Buscar"}
      className={cn(
        "inline-flex h-9 min-w-0 shrink items-center gap-2 rounded-(--radius-interactive) border border-(--border-default) bg-(--background-subtle) px-3 text-body-sm text-(--text-secondary) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:border-(--border-brand) hover:text-(--text-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus) sm:w-44 lg:w-56",
        className
      )}
      {...props}
    >
      <Search className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="hidden flex-1 text-left sm:inline">{children ?? "Buscar…"}</span>
      {shortcut ? (
        <kbd className="hidden rounded-(--radius-xs) border border-(--border-default) bg-(--surface-default) px-1.5 py-0.5 font-mono text-[11px] text-(--text-tertiary) sm:inline-block">
          {shortcut}
        </kbd>
      ) : null}
    </button>
  );
}

function NavbarThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Cambiar tema"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={className}
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </Button>
  );
}

function NavbarMobileMenu({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer side="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        }
      />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup className={cn("w-full max-w-xs", className)}>
            <DrawerCloseButton />
            <DrawerContent className="flex flex-col gap-1 pt-2">{children}</DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  );
}

export {
  Navbar,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
  NavbarSearchTrigger,
  NavbarThemeToggle,
  NavbarMobileMenu,
  navbarVariants,
};
