import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Popover(props: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/**
 * No arrow — a clean floating panel (border + shadow carry the elevation).
 * Surface is a deliberate neutral (Gray 50 / Gray 900 text) rather than a
 * Primary tint: Popover holds arbitrary content, so it stays quiet and lets
 * Primary keep its meaning for actual interactive/selected states elsewhere.
 * Dark mode uses Gray 900 (not the darker Gray 950 other raised surfaces
 * use) so it reads as clearly elevated against the page instead of nearly
 * merging with it.
 */
function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "side" | "align" | "sideOffset">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-(--z-dropdown)"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "w-(--popup-width,auto) max-w-[min(24rem,90vw)] origin-[var(--transform-origin)] rounded-(--radius-overlay) border border-(--border-default) bg-(--neutral-50) p-5 text-(--neutral-900) shadow-(--shadow-elevation-3) outline-none transition-[transform,opacity] duration-(--duration-fast) ease-(--ease-standard) dark:bg-(--neutral-900) dark:text-(--neutral-0)",
            "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      className={cn("text-title mb-1 pr-6 font-bold text-(--text-primary)", className)}
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      className={cn("text-body-sm pr-6 text-(--text-secondary)", className)}
      {...props}
    />
  );
}

/**
 * Unstyled — meant to be composed via `render` (e.g. with Button) for an
 * explicit action, mirroring DrawerClose. For the default corner-X, use
 * PopoverCloseButton instead: it hardcodes absolute positioning that would
 * fight whatever it's composed with.
 */
function PopoverClose(props: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close {...props} />;
}

function PopoverCloseButton({ className, children, ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      className={cn(
        "absolute top-3 right-3 inline-flex size-6 items-center justify-center rounded-(--radius-full) text-(--icon-subtle) transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:bg-(--background-strong) hover:text-(--icon-default) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <X className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Cerrar</span>
        </>
      )}
    </PopoverPrimitive.Close>
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverCloseButton,
};
