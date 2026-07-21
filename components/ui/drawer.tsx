"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type DrawerSide = "left" | "right" | "bottom";

const DrawerSideContext = React.createContext<DrawerSide>("right");

/**
 * side controls both the swipe-to-dismiss direction and the slide-in edge —
 * Base UI's Drawer has no built-in "side" concept (positioning is left to
 * styles), so this is the one thing this wrapper adds on top of the primitive.
 */
function Drawer({
  side = "right",
  children,
  ...props
}: DrawerPrimitive.Root.Props & { side?: DrawerSide }) {
  return (
    <DrawerSideContext.Provider value={side}>
      <DrawerPrimitive.Root swipeDirection={side === "bottom" ? "down" : side} {...props}>
        {children}
      </DrawerPrimitive.Root>
    </DrawerSideContext.Provider>
  );
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger {...props} />;
}

function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal {...props} />;
}

function DrawerBackdrop({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-(--z-overlay) bg-(--overlay-scrim) transition-opacity duration-(--duration-slow) ease-(--ease-standard)",
        "data-starting-style:opacity-0 data-ending-style:opacity-0 data-swiping:duration-0",
        className
      )}
      {...props}
    />
  );
}

const viewportSideClasses: Record<DrawerSide, string> = {
  left: "items-stretch justify-start",
  right: "items-stretch justify-end",
  bottom: "items-end justify-center",
};

function DrawerViewport({ className, ...props }: DrawerPrimitive.Viewport.Props) {
  const side = React.useContext(DrawerSideContext);
  return (
    <DrawerPrimitive.Viewport
      className={cn("fixed inset-0 z-(--z-modal) flex", viewportSideClasses[side], className)}
      {...props}
    />
  );
}

const popupSideClasses: Record<DrawerSide, string> = {
  left: cn(
    "h-full w-full max-w-sm border-r border-(--border-default)",
    "[transform:translateX(var(--drawer-swipe-movement-x,0px))]",
    "data-starting-style:[transform:translateX(calc(-100%-1rem))] data-ending-style:[transform:translateX(calc(-100%-1rem))]"
  ),
  right: cn(
    "h-full w-full max-w-sm border-l border-(--border-default)",
    "[transform:translateX(var(--drawer-swipe-movement-x,0px))]",
    "data-starting-style:[transform:translateX(calc(100%+1rem))] data-ending-style:[transform:translateX(calc(100%+1rem))]"
  ),
  bottom: cn(
    "w-full max-w-full rounded-t-(--radius-overlay) border-t border-(--border-default)",
    "max-h-[85vh]",
    "[transform:translateY(var(--drawer-swipe-movement-y,0px))]",
    "data-starting-style:[transform:translateY(calc(100%+1rem))] data-ending-style:[transform:translateY(calc(100%+1rem))]"
  ),
};

function DrawerPopup({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
  const side = React.useContext(DrawerSideContext);
  return (
    <DrawerPrimitive.Popup
      className={cn(
        "relative flex flex-col bg-(--surface-default) p-6 text-(--text-primary) shadow-(--shadow-elevation-4) outline-none",
        "overflow-y-auto overscroll-contain",
        "transition-transform duration-(--duration-slow) ease-(--ease-standard) data-swiping:duration-0 data-swiping:select-none",
        popupSideClasses[side],
        className
      )}
      {...props}
    >
      {side === "bottom" ? (
        <div
          aria-hidden="true"
          className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-(--radius-pill) bg-(--background-strong)"
        />
      ) : null}
      {children}
    </DrawerPrimitive.Popup>
  );
}

function DrawerContent({ className, ...props }: DrawerPrimitive.Content.Props) {
  return <DrawerPrimitive.Content className={cn("flex-1", className)} {...props} />;
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      className={cn("text-title mb-1 pr-8 font-bold text-(--text-primary)", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-body-sm mb-6 pr-8 text-(--text-secondary)", className)}
      {...props}
    />
  );
}

/**
 * Unstyled — meant to be composed via `render` (e.g. with Button) for an
 * explicit action-row close button. For the default corner-X, use
 * DrawerCloseButton instead: this one intentionally adds no positioning so
 * it doesn't fight whatever it's composed with.
 */
function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close {...props} />;
}

function DrawerCloseButton({ className, children, ...props }: DrawerPrimitive.Close.Props) {
  return (
    <DrawerPrimitive.Close
      className={cn(
        "absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-(--radius-full) text-(--icon-subtle) transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:bg-(--background-strong) hover:text-(--icon-default) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Cerrar</span>
        </>
      )}
    </DrawerPrimitive.Close>
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerPopup,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerCloseButton,
};
export type { DrawerSide };
