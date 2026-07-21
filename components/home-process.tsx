"use client";

import Link from "next/link";
import { Layers, Globe, LayoutGrid, Compass, PenLine, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { capabilities } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

const iconBySlug: Record<string, LucideIcon> = {
  "brand-systems": Layers,
  "digital-experiences": Globe,
  "product-design": LayoutGrid,
  "creative-direction": Compass,
  "content-systems": PenLine,
  growth: TrendingUp,
  automation: Zap,
};

function CapabilityIcon({ slug }: { slug: string }) {
  const Icon = iconBySlug[slug] ?? Layers;
  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-(--purple-100) text-(--purple-600) dark:bg-(--purple-950) dark:text-(--purple-300)">
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

export function HomeProcess() {
  return (
    <section className="border-t border-(--border-subtle)">
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-12 max-w-xl sm:mb-16">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            Cómo trabajamos
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Siete formas distintas de aplicar la misma manera de pensar.
          </h2>
        </Reveal>

        <Reveal>
          <Accordion variant="card" size="lg" icon="chevron-down" hiddenUntilFound>
            {capabilities.map((cap) => (
              <AccordionItem key={cap.slug} value={cap.slug}>
                <AccordionTrigger
                  title={cap.name}
                  description={cap.resolves}
                  leadingIcon={<CapabilityIcon slug={cap.slug} />}
                />
                <AccordionContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
                        Existe porque
                      </p>
                      <p className="text-pretty text-(--text-secondary)">{cap.existsBecause}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
                        Genera valor
                      </p>
                      <p className="text-pretty text-(--text-secondary)">{cap.generatesValue}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <div className="mt-10">
          <Link href="/capabilities" className={cn(buttonVariants({ variant: "outline" }))}>
            Ver todas las capacidades
          </Link>
        </div>
      </Container>
    </section>
  );
}
