import { Clock, Users, ShieldCheck, Lightbulb, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { processSteps, benefits } from "@/lib/templates/contact-data";

const benefitIcons: Record<(typeof benefits)[number]["icon"], LucideIcon> = {
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
  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      <Card variant="outlined">
        <CardHeader className="items-center gap-2.5">
          <Clock className="size-4 text-(--icon-brand)" aria-hidden="true" />
          <CardTitle className="text-body font-semibold">Tiempo de respuesta</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="text-body-sm text-(--text-secondary)">
            Respondemos cada mensaje en menos de 24 horas hábiles.
          </p>
          <Badge variant="success" className="mt-1">
            &lt; 24 horas hábiles
          </Badge>
        </CardBody>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle className="text-body font-semibold">Nuestro proceso</CardTitle>
        </CardHeader>
        <CardBody>
          <ol className="flex flex-col gap-4">
            {processSteps.map((step, i) => (
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
          <CardTitle className="text-body font-semibold">Por qué Tangerine</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="flex flex-col gap-3">
            {benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon];
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
