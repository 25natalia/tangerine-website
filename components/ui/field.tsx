import type { ComponentProps } from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  required,
  children,
  ...props
}: FieldPrimitive.Label.Props & { required?: boolean }) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn("text-label text-foreground data-disabled:text-(--text-disabled)", className)}
      {...props}
    >
      {children}
      {required ? <span className="text-(--text-error)"> *</span> : null}
    </FieldPrimitive.Label>
  );
}

function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn("text-helper text-(--text-secondary)", className)}
      {...props}
    />
  );
}

function FieldError({ className, children, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn("text-helper flex items-center gap-1 text-(--text-error)", className)}
      {...props}
    >
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </FieldPrimitive.Error>
  );
}

function FieldSuccess({ className, children, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-success"
      role="status"
      aria-live="polite"
      className={cn("text-helper flex items-center gap-1 text-(--text-success)", className)}
      {...props}
    >
      <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldSuccess };
