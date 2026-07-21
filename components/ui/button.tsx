import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button text-button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-(--radius-interactive) border border-transparent bg-clip-padding whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-(--duration-fast) ease-(--ease-standard) outline-none select-none focus-visible:border-(--border-focus) focus-visible:ring-3 focus-visible:ring-(--border-focus)/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-(--opacity-disabled) aria-invalid:border-(--border-error) aria-invalid:ring-3 aria-invalid:ring-(--border-error)/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-(--interactive-default) text-primary-foreground hover:bg-(--interactive-hover) active:bg-(--interactive-active)",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-(--background-strong)",
        outline:
          "border-(--border-default) bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-(--border-error)/40 focus-visible:ring-(--border-error)/20",
        link: "text-(--text-link) underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-7 rounded-(--radius-sm) px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg: "h-11 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        "icon-sm": "size-7 rounded-(--radius-sm) [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonOwnProps = {
  /**
   * Shows a spinner and disables interaction while true. The label stays in
   * the accessible name (visually hidden) so screen readers don't lose it.
   */
  loading?: boolean;
};

function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & ButtonOwnProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          <span className="sr-only">{children}</span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
