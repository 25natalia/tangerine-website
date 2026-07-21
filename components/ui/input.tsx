import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "text-body flex h-9 w-full min-w-0 rounded-(--radius-interactive) border border-(--border-default) bg-background px-3 text-foreground transition-[color,border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard) outline-none",
        "placeholder:text-(--text-tertiary)",
        "file:me-2 file:h-7 file:rounded-(--radius-sm) file:border-0 file:bg-secondary file:px-2.5 file:text-(--text-secondary)",
        "focus-visible:border-(--border-focus) focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
        "data-invalid:border-(--border-error) data-invalid:ring-3 data-invalid:ring-(--border-error)/20",
        "data-disabled:cursor-not-allowed data-disabled:border-(--border-disabled) data-disabled:bg-(--background-disabled) data-disabled:text-(--text-disabled) data-disabled:opacity-(--opacity-disabled)",
        "disabled:cursor-not-allowed disabled:border-(--border-disabled) disabled:bg-(--background-disabled) disabled:text-(--text-disabled) disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    />
  );
}

export { Input };
