"use client";

import { Clock, Users, ShieldCheck, Lightbulb, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n/language-context";

const benefitIcons: Record<"users" | "shield" | "lightbulb", LucideIcon> = {
  users: Users,
  shield: ShieldCheck,
  lightbulb: Lightbulb,
};

/**
 * The trust-building companion to the form — never lets the visitor fill
 * out fields without knowing what happens next. Sticky on desktop so it
 * stays in view as the (longer) form scrolls past it.
 */
export function ContactSidebar() {
  const { t } = useLanguage();
  const copy = t.contact.sidebar;

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      <Card variant="outlined">
        <CardHeader className="items-center gap-2.5">
          <Clock className="size-4 text-(--icon-brand)" aria-hidden="true" />
          <CardTitle className="text-body font-semibold">{copy.responseTimeTitle}</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-body-sm text-(--text-secondary)">{copy.responseTimeBody}</p>
          <Badge variant="success" className="mt-1">
            {copy.responseTimeBadge}
          </Badge>
        </CardBody>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="text-body font-semibold">{copy.processTitle}</CardTitle>
        </CardHeader>
        <CardBody>
          <ol className="flex flex-col gap-4">
            {copy.steps.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="text-caption flex size-5 shrink-0 items-center justify-center rounded-full bg-(--background-brand-subtle) font-semibold text-(--text-brand)"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-body-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-caption mt-0.5 text-(--text-secondary)">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardBody>
      </Card>

      <Card variant="flat">
        <CardHeader>
          <CardTitle className="text-body font-semibold">{copy.whyTitle}</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="flex flex-col gap-3">
            {copy.benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon as "users" | "shield" | "lightbulb"];
              return (
                <li key={benefit.title} className="flex items-center gap-2.5">
                  <Icon className="size-4 shrink-0 text-(--icon-brand)" aria-hidden="true" />
                  <span className="text-body-sm text-foreground">{benefit.title}</span>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
