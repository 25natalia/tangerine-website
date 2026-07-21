"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";

import { cn } from "@/lib/utils";

type TextareaProps = ComponentProps<"textarea"> & {
  /** Grows with content instead of scrolling internally. */
  autoResize?: boolean;
  /** Shows a live character counter, paired with maxLength when present. */
  showCount?: boolean;
  /** Positive validation state (e.g. after an async check) — not a native HTML validity concept. */
  success?: boolean;
};

function resize(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

function Textarea({
  className,
  autoResize = false,
  showCount = false,
  success = false,
  maxLength,
  defaultValue,
  value,
  onInput,
  rows = 3,
  ...props
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [uncontrolledCount, setUncontrolledCount] = useState(
    () => String(defaultValue ?? "").length
  );
  const count = value !== undefined ? String(value).length : uncontrolledCount;

  useEffect(() => {
    if (autoResize && ref.current) resize(ref.current);
  }, [autoResize, value]);

  return (
    <div className="relative">
      <FieldPrimitive.Control
        render={
          <textarea
            ref={ref}
            rows={rows}
            maxLength={maxLength}
            defaultValue={defaultValue}
            value={value}
            onInput={(e) => {
              const el = e.currentTarget;
              setUncontrolledCount(el.value.length);
              if (autoResize) resize(el);
              onInput?.(e);
            }}
            className={cn(
              "text-body flex w-full rounded-(--radius-interactive) border border-(--border-default) bg-background px-3 py-2 text-foreground transition-[color,border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard) outline-none",
              "placeholder:text-(--text-tertiary)",
              "focus-visible:border-(--border-focus) focus-visible:ring-3 focus-visible:ring-(--border-focus)/50",
              "data-invalid:border-(--border-error) data-invalid:ring-3 data-invalid:ring-(--border-error)/20",
              "disabled:cursor-not-allowed disabled:border-(--border-disabled) disabled:bg-(--background-disabled) disabled:text-(--text-disabled) disabled:opacity-(--opacity-disabled)",
              "data-disabled:cursor-not-allowed data-disabled:border-(--border-disabled) data-disabled:bg-(--background-disabled) data-disabled:text-(--text-disabled) data-disabled:opacity-(--opacity-disabled)",
              success &&
                "border-(--border-success) focus-visible:border-(--border-success) focus-visible:ring-(--border-success)/20",
              autoResize ? "resize-none overflow-hidden" : "resize-y",
              showCount && "pb-6",
              className
            )}
            {...props}
          />
        }
      />
      {showCount ? (
        <span className="text-helper pointer-events-none absolute right-3 bottom-2 text-(--text-tertiary)">
          {count}
          {maxLength ? `/${maxLength}` : ""}
        </span>
      ) : null}
    </div>
  );
}

export { Textarea };
