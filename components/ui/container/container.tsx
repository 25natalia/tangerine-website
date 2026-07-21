import type { ElementType } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { ContainerProps } from "./types";

/**
 * Horizontal padding, responsive at xs/sm/lg, expressed with max() against
 * env(safe-area-inset-*) so the gutter never gets thinner than the device's
 * notch/home-indicator safe area — it can only ever grow past the base value.
 */
const paddingX =
  "pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))] " +
  "sm:pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-[max(1.5rem,env(safe-area-inset-left))] " +
  "lg:pr-[max(2rem,env(safe-area-inset-right))] lg:pl-[max(2rem,env(safe-area-inset-left))]";

/** Dashboard shells own their own chrome spacing — a flatter, lower-ceiling padding scale. */
const paddingXDashboard =
  "pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))] " +
  "lg:pr-[max(1.5rem,env(safe-area-inset-right))] lg:pl-[max(1.5rem,env(safe-area-inset-left))]";

/** Full-bleed content still respects the safe area — it just has no minimum gutter to fall back to. */
const paddingXFull = "pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      fluid: cn("max-w-none", paddingX),
      narrow: cn("max-w-(--container-narrow)", paddingX),
      reading: cn("max-w-(--container-reading)", paddingX),
      content: cn("max-w-(--container-content)", paddingX),
      default: cn("max-w-(--container-default)", paddingX),
      wide: cn("max-w-(--container-wide)", paddingX),
      dashboard: cn("max-w-(--container-dashboard)", paddingXDashboard),
      full: cn("max-w-none", paddingXFull),
      hero: cn(
        "max-w-(--container-wide)",
        paddingX,
        "py-(--spacing-section-sm) lg:py-(--spacing-section-lg)"
      ),
      landing: cn(
        "max-w-(--container-wide)",
        paddingX,
        "py-(--spacing-layout-md) lg:py-(--spacing-layout-lg)"
      ),
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function Container({ as, size, className, children, ...props }: ContainerProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </Tag>
  );
}

export { Container, containerVariants };
