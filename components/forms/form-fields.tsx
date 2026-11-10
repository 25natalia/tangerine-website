"use client";

// Campos compartidos por los formularios de una sola página (/diagnostico,
// /rediseno). No son componentes del Design System: son composiciones de
// Field, Input, Textarea, ChipGroup, RadioGroup y Checkbox del DS, sin tocar
// su interior. Todos los errores quedan asociados a su campo (aria) y todo se
// puede usar con teclado.

import * as React from "react";
import Link from "next/link";
import { AlertCircle, MessageCircle } from "lucide-react";

import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChipGroup, ChipToggle } from "@/components/ui/chip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Copiadas de components/ui/field.tsx (FieldLabel, FieldDescription, FieldError)
// y pasadas por el mismo cn(), para que leyendas y errores propios se vean
// idénticos a los de los campos del DS.
const LABEL_CLASSES = "text-label text-foreground";
const DESCRIPTION_CLASSES = "text-helper text-(--text-secondary)";
const ERROR_CLASSES = "text-helper flex items-center gap-1 text-(--text-error)";

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  // Google Tag Manager ya está en el layout raíz; Consent Mode decide si se mide.
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}

function RequiredMark() {
  return <span className="text-(--text-error)"> *</span>;
}

export function InlineError({ id, text }: { id: string; text: string | null }) {
  return (
    <p id={id} className={cn(ERROR_CLASSES)} aria-live="polite">
      {text ? (
        <>
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {text}
        </>
      ) : null}
    </p>
  );
}

/** Campo trampa: invisible para personas y lectores de pantalla. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string | null;
}

export function TextField({ id, label, description, required, error, onChange, ...input }: TextFieldProps) {
  return (
    <Field invalid={!!error} name={id}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <Input
        data-field={id}
        aria-required={required || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="h-11"
        {...input}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {error ? <FieldError match>{error}</FieldError> : null}
    </Field>
  );
}

export function TextareaField({
  id,
  label,
  description,
  required,
  maxLength,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: Omit<TextFieldProps, "type" | "inputMode" | "autoComplete">) {
  return (
    <Field invalid={!!error} name={id}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <Textarea
        data-field={id}
        aria-required={required || undefined}
        rows={4}
        autoResize
        showCount
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {error ? <FieldError match>{error}</FieldError> : null}
    </Field>
  );
}

/** WhatsApp en dos partes — indicativo editable + número — para que el cursor nunca quede antes del "+57". */
export function WhatsappField({
  label,
  description,
  countryCodeLabel,
  countryCode,
  onCountryCodeChange,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string;
  description: string;
  countryCodeLabel: string;
  countryCode: string;
  onCountryCodeChange: (v: string) => void;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error: string | null;
}) {
  return (
    <Field invalid={!!error} name="whatsapp">
      <FieldLabel required>{label}</FieldLabel>
      <div className="flex gap-2">
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-country-code"
          aria-label={countryCodeLabel}
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value.replace(/[^\d+]/g, "").slice(0, 5))}
          className="text-body h-11 w-20 shrink-0 rounded-(--radius-interactive) border border-(--border-default) bg-background px-3 text-center text-foreground outline-none transition-[color,border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard) focus-visible:border-(--border-focus) focus-visible:ring-3 focus-visible:ring-(--border-focus)/50"
        />
        <Input
          data-field="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          aria-required
          placeholder="300 123 4567"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className="h-11"
        />
      </div>
      <FieldDescription>{description}</FieldDescription>
      {error ? <FieldError match>{error}</FieldError> : null}
    </Field>
  );
}

/** Selección múltiple con chips: fieldset + legend para que el grupo tenga nombre. */
export function ChipsField({
  id,
  label,
  description,
  required,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (next: string[]) => void;
  error: string | null;
}) {
  return (
    <fieldset className="flex flex-col gap-1.5" aria-describedby={`${id}-desc ${id}-error`}>
      <legend className={cn(LABEL_CLASSES, "mb-1.5")}>
        {label}
        {required ? <RequiredMark /> : null}
      </legend>
      {description ? (
        <p id={`${id}-desc`} className={cn(DESCRIPTION_CLASSES, "-mt-1 mb-1")}>
          {description}
        </p>
      ) : null}
      <ChipGroup multiple value={value} onValueChange={(next) => onChange(next as string[])}>
        {options.map((option, i) => (
          <ChipToggle
            key={option.value}
            value={option.value}
            data-field={i === 0 ? id : undefined}
            // Respuesta al tocar: el chip se hunde un poco.
            className="text-body-sm min-h-9 px-3.5 transition-[scale,background-color,color] active:scale-95 motion-reduce:active:scale-100"
          >
            {option.label}
          </ChipToggle>
        ))}
      </ChipGroup>
      <InlineError id={`${id}-error`} text={error} />
    </fieldset>
  );
}

export function RadioField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className={cn(LABEL_CLASSES, "mb-2")}>{label}</legend>
      <RadioGroup orientation="horizontal" value={value} onValueChange={(v) => onChange(String(v))} className="gap-x-5 gap-y-3">
        {options.map((option) => (
          <label key={option.value} className="text-body-sm flex cursor-pointer items-center gap-2 text-(--text-primary)">
            <RadioGroupItem value={option.value} />
            {option.label}
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}

export function CheckboxField({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex cursor-pointer items-start gap-2.5">
        <Checkbox
          data-field={id}
          checked={checked}
          onCheckedChange={(next) => onChange(next === true)}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5"
        />
        <span className="text-body-sm text-(--text-secondary)">
          {children}
          <RequiredMark />
        </span>
      </label>
      <InlineError id={`${id}-error`} text={error} />
    </div>
  );
}

/** Enlace a la política, en pestaña nueva para no perder lo escrito. */
export function PolicyLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/privacidad" target="_blank" className="font-medium text-(--text-link) underline underline-offset-2">
      {children}
    </Link>
  );
}

export function SubmitError({ message, whatsappHref, whatsappLabel }: { message: string; whatsappHref: string; whatsappLabel: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-(--radius-container) border border-(--border-error) bg-(--background-subtle) p-4"
    >
      <p className="text-body-sm flex items-start gap-2 text-(--text-error)">
        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {message}
      </p>
      <a href={whatsappHref} className={cn(buttonVariants({ variant: "outline", size: "md" }), "self-start gap-2")}>
        <MessageCircle aria-hidden="true" />
        {whatsappLabel}
      </a>
    </div>
  );
}
