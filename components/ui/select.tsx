import type { ComponentProps } from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectPrimitive.Root.Props<Value, Multiple>
) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "text-body flex h-9 w-full items-center justify-between gap-2 rounded-(--radius-interactive) border border-(--border-default) bg-background px-3 text-foreground outline-none transition-[color,border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard)",
        "data-popup-open:border-(--border-focus)",
        "focus-visible:border-(--border-focus) focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        "data-disabled:cursor-not-allowed data-disabled:border-(--border-disabled) data-disabled:bg-(--background-disabled) data-disabled:text-(--text-disabled) data-disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="shrink-0 text-(--icon-subtle)">
        <ChevronsUpDown className="size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("min-w-0 truncate text-left data-placeholder:text-(--text-tertiary)", className)}
      {...props}
    />
  );
}

function SelectContent({ className, children, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner sideOffset={4} className="z-(--z-dropdown) outline-none select-none">
        <SelectPrimitive.ScrollUpArrow className="flex h-4 w-full items-center justify-center text-(--icon-subtle)">
          <ChevronUp className="size-3.5" />
        </SelectPrimitive.ScrollUpArrow>
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "max-h-[var(--available-height)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-(--radius-overlay) border border-(--border-default) bg-(--neutral-0) p-1.5 text-(--neutral-900) shadow-(--shadow-dropdown) outline-none dark:bg-(--neutral-900) dark:text-(--neutral-0)",
            className
          )}
          {...props}
        >
          <SelectPrimitive.List className="flex flex-col gap-0.5">{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
        <SelectPrimitive.ScrollDownArrow className="flex h-4 w-full items-center justify-center text-(--icon-subtle)">
          <ChevronDown className="size-3.5" />
        </SelectPrimitive.ScrollDownArrow>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "text-body relative flex cursor-default items-center gap-2 rounded-(--radius-sm) py-2 pr-3 pl-7 outline-none select-none",
        "data-highlighted:bg-(--background-brand-subtle) data-highlighted:text-(--text-brand)",
        "data-disabled:pointer-events-none data-disabled:text-(--text-disabled)",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex items-center">
        <Check className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectGroup(props: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectGroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn("text-caption px-2 py-1.5 text-(--text-tertiary)", className)}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
};
