"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  Palette,
  LayoutTemplate,
  Smartphone,
  Blocks,
  ShoppingCart,
  PenTool,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem, RadioCard } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "@/components/ui/mascot";
import { useLanguage } from "@/lib/i18n/language-context";

type FormStatus = "idle" | "submitting" | "success" | "error";

const projectTypeIcons: Record<string, LucideIcon> = {
  palette: Palette,
  layout: LayoutTemplate,
  smartphone: Smartphone,
  component: Blocks,
  cart: ShoppingCart,
  pen: PenTool,
  sparkles: Sparkles,
};

export interface ContactFormProps {
  /**
   * Called with the submitted FormData once native validation already
   * passed. Resolve to move to the Success state; throw/reject to fall back
   * to Error (the visitor stays on the form, with their input intact, and
   * can retry). Defaults to the same simulated delay this template has
   * always demoed with — a real consumer wires a real endpoint by passing
   * this prop, never by forking the component.
   */
  onSubmit?: (data: FormData) => Promise<void>;
}

/**
 * The form is left fully uncontrolled on purpose — every field is a real,
 * form-participating native control (Input/Textarea/RadioGroup/Checkbox all
 * back onto native elements). That means the browser's own constraint
 * validation blocks submission before `onSubmit` ever fires, so this
 * component never has to re-implement "is this actually valid" — it only
 * has to react to a submit that already passed. `FormData` reads the one
 * value the success state needs (the visitor's name); nothing else needs
 * to be lifted into React state.
 */
export function ContactForm({ onSubmit }: ContactFormProps = {}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [formKey, setFormKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { t } = useLanguage();
  const copy = t.contact.form;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmittedName(String(data.get("name") ?? "").trim());
    setStatus("submitting");
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // No consumer-provided endpoint — the delay simulates a real
        // request so the Loading state (and the transition into it) is
        // honestly demoed, the same behavior this template has always had.
        await new Promise<void>((resolve) => {
          timeoutRef.current = setTimeout(resolve, 1400);
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleReset() {
    setStatus("idle");
    setSubmittedName("");
    setFormKey((k) => k + 1);
  }

  if (status === "success") {
    return (
      <Card variant="outlined" className="flex flex-col items-center gap-5 p-8 text-center sm:p-12">
        <Mascot variant="3" className="w-28 sm:w-32" alt="" />
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {submittedName ? copy.successThanksNamed(submittedName) : copy.successThanksGeneric}
          </h2>
          <p className="text-body mt-3 max-w-md text-pretty text-(--text-secondary)">{copy.successBody}</p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          {copy.successCta}
        </Button>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <form key={formKey} onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-12">
        {/* ================= INFORMACIÓN BÁSICA ================= */}
        <section className="flex flex-col gap-5">
          <h2 className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">
            {copy.sectionBasic}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field validationMode="onChange">
              <FieldLabel required>{copy.nameLabel}</FieldLabel>
              <Input name="name" required placeholder={copy.namePlaceholder} autoComplete="name" />
              <FieldError match="valueMissing">{copy.nameError}</FieldError>
            </Field>
            <Field validationMode="onChange">
              <FieldLabel required>{copy.companyLabel}</FieldLabel>
              <Input name="company" required placeholder={copy.companyPlaceholder} autoComplete="organization" />
              <FieldError match="valueMissing">{copy.companyError}</FieldError>
            </Field>
            <Field validationMode="onChange">
              <FieldLabel required>{copy.emailLabel}</FieldLabel>
              <Input name="email" required type="email" placeholder={copy.emailPlaceholder} autoComplete="email" />
              <FieldError match="valueMissing">{copy.emailErrorRequired}</FieldError>
              <FieldError match="typeMismatch">{copy.emailErrorInvalid}</FieldError>
            </Field>
            <Field>
              <FieldLabel>{copy.phoneLabel}</FieldLabel>
              <Input name="phone" type="tel" placeholder={copy.phonePlaceholder} autoComplete="tel" />
              <FieldDescription>{copy.phoneDescription}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>{copy.websiteLabel}</FieldLabel>
              <Input name="website" type="url" placeholder={copy.websitePlaceholder} autoComplete="url" />
              <FieldDescription>{copy.websiteDescription}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>{copy.linkedinLabel}</FieldLabel>
              <Input name="linkedin" type="url" placeholder={copy.linkedinPlaceholder} />
              <FieldDescription>{copy.linkedinDescription}</FieldDescription>
            </Field>
          </div>
        </section>

        {/* ================= PROYECTO ================= */}
        <section className="flex flex-col gap-5">
          <h2 className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">
            {copy.sectionProject}
          </h2>
          <Field validationMode="onChange">
            <FieldLabel required>{copy.projectTypeLabel}</FieldLabel>
            <RadioGroup name="projectType" required orientation="horizontal" className="flex-wrap gap-3">
              {copy.projectTypeOptions.map((option) => {
                const Icon = projectTypeIcons[option.icon];
                return (
                  <RadioCard
                    key={option.value}
                    value={option.value}
                    aria-labelledby={`project-type-${option.value}-label`}
                    className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)]"
                  >
                    <Icon className="size-5 text-(--icon-brand)" aria-hidden="true" />
                    <span id={`project-type-${option.value}-label`} className="text-body-sm mt-1 font-medium text-foreground">
                      {option.label}
                    </span>
                  </RadioCard>
                );
              })}
            </RadioGroup>
            <FieldError match="valueMissing">{copy.projectTypeError}</FieldError>
          </Field>
        </section>

        {/* ================= PRESUPUESTO Y TIEMPOS ================= */}
        <section className="flex flex-col gap-5">
          <h2 className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">
            {copy.sectionBudget}
          </h2>
          <Field validationMode="onChange">
            <div className="flex items-center gap-1.5">
              <FieldLabel required>{copy.budgetLabel}</FieldLabel>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button type="button" aria-label={copy.budgetTooltipAriaLabel} className="text-(--icon-subtle)">
                      <Info className="size-3.5" />
                    </button>
                  }
                />
                <TooltipContent>{copy.budgetTooltip}</TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup name="budget" required className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {copy.budgetOptions.map((option) => (
                <RadioCard
                  key={option.value}
                  value={option.value}
                  aria-labelledby={
                    option.description
                      ? `budget-${option.value}-label budget-${option.value}-desc`
                      : `budget-${option.value}-label`
                  }
                >
                  <span id={`budget-${option.value}-label`} className="text-body-sm font-medium text-foreground">
                    {option.label}
                  </span>
                  {option.description ? (
                    <span id={`budget-${option.value}-desc`} className="text-caption mt-0.5 text-(--text-secondary)">
                      {option.description}
                    </span>
                  ) : null}
                </RadioCard>
              ))}
            </RadioGroup>
            <FieldError match="valueMissing">{copy.budgetError}</FieldError>
          </Field>

          <Field>
            <FieldLabel>{copy.timelineLabel}</FieldLabel>
            <RadioGroup name="timeline" orientation="horizontal">
              {copy.timelineOptions.map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-2 text-body-sm">
                  <RadioGroupItem value={option.value} aria-labelledby={`timeline-${option.value}-label`} />
                  <span id={`timeline-${option.value}-label`}>{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </Field>
        </section>

        {/* ================= EL PROYECTO EN TUS PALABRAS ================= */}
        <section className="flex flex-col gap-5">
          <h2 className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">
            {copy.sectionMore}
          </h2>
          <Field validationMode="onChange">
            <FieldLabel required>{copy.messageLabel}</FieldLabel>
            <Textarea
              name="message"
              required
              rows={5}
              autoResize
              showCount
              maxLength={600}
              placeholder={copy.messagePlaceholder}
            />
            <FieldError match="valueMissing">{copy.messageError}</FieldError>
          </Field>

          <Field>
            <FieldLabel>{copy.referralLabel}</FieldLabel>
            <Select name="referral">
              <SelectTrigger className="sm:max-w-xs">
                <SelectValue placeholder={copy.referralPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {copy.referralOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </section>

        {/* ================= ACEPTACIÓN Y ENVÍO ================= */}
        <section className="flex flex-col gap-6">
          <Field validationMode="onChange">
            <label className="flex items-start gap-2.5">
              <Checkbox name="accepted" required className="mt-0.5" />
              <span className="text-body-sm text-(--text-secondary)">{copy.acceptLabel}</span>
            </label>
            <FieldError match="valueMissing">{copy.acceptError}</FieldError>
          </Field>

          <div className="flex flex-col items-start gap-3">
            <Button type="submit" size="lg" loading={status === "submitting"} className="gap-2">
              {copy.submitCta}
            </Button>
            {status === "error" ? (
              <p role="alert" className="text-caption flex items-center gap-1.5 text-(--text-error)">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                {copy.submitError}
              </p>
            ) : (
              <p className="text-caption flex items-center gap-1.5 text-(--text-tertiary)">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                {copy.disclaimerNoCommitment}
              </p>
            )}
          </div>
        </section>
      </form>
    </TooltipProvider>
  );
}
