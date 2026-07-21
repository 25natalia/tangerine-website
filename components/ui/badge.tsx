import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "text-caption inline-flex w-fit shrink-0 items-center gap-1.5 rounded-(--radius-pill) px-2 py-0.5 font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success/10 text-(--text-success)",
        warning: "bg-warning/10 text-(--text-warning)",
        error: "bg-destructive/10 text-(--text-error)",
        neutral: "bg-(--background-subtle) text-(--text-secondary)",
        outline: "border border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * A real, clearly-visible circle for "● Online"-style badges — not the
 * absolutely-positioned corner dot Avatar uses (that one marks a person;
 * this one sits inline before a label, so it needs its own breathing room
 * from the text rather than a ring/overlap treatment).
 *
 * Always bg-current — it inherits whatever text color the surrounding
 * Badge variant already resolved to, rather than a hardcoded semantic
 * token. That's what makes it correct automatically on every variant: white
 * on a solid `primary` badge (white text), green on `success` (green text),
 * gray on `neutral`, etc. A hardcoded brand-purple dot on a solid
 * primary-purple badge is exactly how this lost contrast before.
 */
function BadgeDot({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full bg-current", className)} />
  );
}

export { Badge, badgeVariants, BadgeDot };
