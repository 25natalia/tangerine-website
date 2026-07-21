"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import type { CardProps, CardMediaProps } from "./types";

const cardVariants = cva(
  "group/card relative flex flex-col overflow-hidden rounded-(--radius-container) text-left transition-[transform,box-shadow,border-color,background-color] duration-(--duration-fast) ease-(--ease-standard) outline-none",
  {
    variants: {
      variant: {
        elevated: "border border-transparent bg-card text-card-foreground shadow-(--shadow-elevation-1)",
        outlined: "border border-(--border-default) bg-card text-card-foreground shadow-none",
        flat: "border border-transparent bg-(--background-subtle) text-card-foreground shadow-none",
      },
      interaction: {
        static: "",
        interactive: "",
        selectable: "cursor-pointer focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        clickable: "cursor-pointer focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
      },
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "pointer-events-none cursor-not-allowed opacity-(--opacity-disabled)",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "elevated",
        interaction: ["interactive", "selectable", "clickable"],
        disabled: false,
        className: "hover:-translate-y-0.5 hover:shadow-(--shadow-elevation-3) active:translate-y-0",
      },
      {
        variant: "outlined",
        interaction: ["interactive", "selectable", "clickable"],
        disabled: false,
        className: "hover:border-(--border-brand)",
      },
      {
        variant: "flat",
        interaction: ["interactive", "selectable", "clickable"],
        disabled: false,
        className: "hover:bg-(--background-strong)",
      },
      { variant: "elevated", selected: true, className: "border-(--interactive-default) shadow-(--shadow-elevation-3)" },
      { variant: "outlined", selected: true, className: "border-(--interactive-default) bg-(--background-brand-subtle)" },
      { variant: "flat", selected: true, className: "bg-(--background-brand-subtle)" },
    ],
    defaultVariants: {
      variant: "elevated",
      interaction: "static",
      selected: false,
      disabled: false,
    },
  }
);

function SelectedIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-3 right-3 z-10 flex size-5 shrink-0 items-center justify-center rounded-full border border-(--border-default) bg-card transition-colors duration-(--duration-fast) ease-(--ease-standard)",
        selected && "border-(--interactive-default) bg-(--interactive-default)"
      )}
    >
      <Check className={cn("size-3 text-primary-foreground", !selected && "hidden")} />
    </span>
  );
}

/** Generic header+body+footer placeholder — built from the same Skeleton bone as SkeletonCard, not a second pulse implementation. */
function CardSkeletonContent() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <Skeleton className="h-8 w-24 rounded-(--radius-interactive)" />
    </div>
  );
}

function Card({
  variant = "elevated",
  interaction = "static",
  as,
  selected,
  defaultSelected = false,
  onSelectedChange,
  href,
  onClick,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: CardProps) {
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultSelected);
  const isSelected = selected ?? uncontrolledSelected;

  const classes = cn(
    cardVariants({
      variant,
      interaction,
      disabled,
      selected: interaction === "selectable" && isSelected,
    }),
    className
  );

  if (loading) {
    return (
      <div className={classes} role="status" aria-label="Cargando" {...props}>
        <CardSkeletonContent />
      </div>
    );
  }

  if (interaction === "clickable") {
    if (href) {
      return (
        <a
          href={href}
          className={classes}
          aria-disabled={disabled || undefined}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            onClick?.();
          }}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <button type="button" className={classes} disabled={disabled} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  if (interaction === "selectable") {
    return (
      <button
        type="button"
        aria-pressed={isSelected}
        disabled={disabled}
        className={classes}
        onClick={() => {
          const next = !isSelected;
          if (selected === undefined) setUncontrolledSelected(next);
          onSelectedChange?.(next);
          onClick?.();
        }}
        {...props}
      >
        <SelectedIndicator selected={isSelected} />
        {children}
      </button>
    );
  }

  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

const mediaAspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
} as const;

function CardMedia({ aspect = "video", zoomOnHover = false, className, children, ...props }: CardMediaProps) {
  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden bg-(--background-subtle)",
        mediaAspectClasses[aspect],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "size-full",
          zoomOnHover &&
            "transition-transform duration-(--duration-slow) ease-(--ease-standard) group-hover/card:scale-105"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex items-start gap-3 p-4 pb-0", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<"h3">) {
  return <h3 className={cn("text-title font-bold text-card-foreground", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-body-sm text-(--text-secondary)", className)} {...props} />;
}

function CardBody({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex-1 space-y-2 p-4", className)} {...props} />;
}

// No divider by default — a simple card (an action row under a couple lines
// of text) reads cleaner without one. Add border-t border-(--border-subtle)
// back explicitly only where a footer is genuinely separating dense content
// (a table-like list, an analytics card with several rows) from an action.
function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex items-center gap-2 p-4", className)} {...props} />;
}

function CardActions({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex items-center gap-2", className)} {...props} />;
}

export {
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  CardActions,
  cardVariants,
};
