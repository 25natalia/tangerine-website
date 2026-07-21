import type { ReactNode } from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupPrimitive.Props & { orientation?: "horizontal" | "vertical" }) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex", orientation === "horizontal" ? "flex-row flex-wrap gap-6" : "flex-col gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full border border-(--border-default) bg-background text-primary-foreground outline-none transition-[color,background-color,border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard)",
        "hover:not-data-disabled:border-(--border-brand)",
        "data-checked:border-(--interactive-default) data-checked:bg-(--interactive-default)",
        "focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        "data-invalid:border-(--border-error)",
        "data-disabled:cursor-not-allowed data-disabled:border-(--border-disabled) data-disabled:bg-(--background-disabled) data-disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="flex items-center justify-center data-unchecked:hidden before:size-1.5 before:rounded-full before:bg-current" />
    </RadioPrimitive.Root>
  );
}

function RadioCard({
  className,
  children,
  ...props
}: RadioPrimitive.Root.Props & { children?: ReactNode }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-card"
      className={cn(
        "group/card relative flex flex-col gap-1 rounded-(--radius-container) border border-(--border-default) bg-background p-4 text-left outline-none transition-[color,background-color,border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard)",
        "hover:not-data-disabled:border-(--border-brand)",
        "data-checked:border-(--interactive-default) data-checked:bg-(--background-brand-subtle)",
        "focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        "data-disabled:cursor-not-allowed data-disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 flex size-4 shrink-0 items-center justify-center rounded-full border border-(--border-default) bg-background text-primary-foreground group-data-checked/card:border-(--interactive-default) group-data-checked/card:bg-(--interactive-default)"
      >
        <Check className="hidden size-3 group-data-checked/card:block" />
      </span>
      {children}
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem, RadioCard };
