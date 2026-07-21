import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-(--radius-xs) border border-(--border-default) bg-background text-primary-foreground outline-none transition-[color,background-color,border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard)",
        "hover:not-data-disabled:border-(--border-brand)",
        "data-checked:border-(--interactive-default) data-checked:bg-(--interactive-default)",
        "data-indeterminate:border-(--interactive-default) data-indeterminate:bg-(--interactive-default)",
        "focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        "data-invalid:border-(--border-error)",
        "data-disabled:cursor-not-allowed data-disabled:border-(--border-disabled) data-disabled:bg-(--background-disabled) data-disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="group/indicator flex items-center justify-center data-unchecked:hidden">
        <Check className="size-3 group-data-indeterminate/indicator:hidden" />
        <Minus className="hidden size-3 group-data-indeterminate/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
