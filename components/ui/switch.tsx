import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "inline-flex shrink-0 items-center rounded-full border border-transparent bg-(--border-strong) p-0.5 outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard)",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// Track has both a border (1px) and p-0.5 padding (2px) insetting the
// thumb's start position — 3px per side, not just the 2px padding. The
// translate distance is content-width minus thumb-width, which comes out
// to a .5 step (2.5/3.5/4.5) once that 1px border is actually accounted
// for; using the whole-number spacing step overshoots by 2px and left the
// thumb sitting closer to the right edge in "on" than to the left edge in
// "off".
const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-(--surface-default) shadow-(--shadow-elevation-1) transition-transform duration-(--duration-fast) ease-(--ease-standard)",
  {
    variants: {
      size: {
        sm: "size-3 data-checked:translate-x-2.5",
        md: "size-4 data-checked:translate-x-3.5",
        lg: "size-5 data-checked:translate-x-4.5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

function Switch({
  className,
  size,
  ...props
}: SwitchPrimitive.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        switchVariants({ size }),
        "data-checked:bg-(--interactive-default)",
        "focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        "data-invalid:bg-(--border-error)",
        "data-disabled:cursor-not-allowed data-disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={thumbVariants({ size })} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
