"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/templates/reveal";
import { capabilities } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

// Un SVG distinto de public/illustrations/geometry/ por capacidad — apoyo
// visual chico, no protagonista (a diferencia de Filosofía). Ninguna
// combinación motivo+color se repite acá ni coincide con las que ya usa
// Filosofía en la misma Home.
const geometryBySlug: Record<string, string> = {
  "brand-systems": "/illustrations/geometry/destello-orange.svg",
  "digital-experiences": "/illustrations/geometry/flor-violet.svg",
  "product-design": "/illustrations/geometry/semillas-green.svg",
  "creative-direction": "/illustrations/geometry/hoja-yellow.svg",
  "content-systems": "/illustrations/geometry/flor-lime.svg",
  growth: "/illustrations/geometry/destello-green.svg",
  automation: "/illustrations/geometry/semillas-violet.svg",
};

const kickerSm = "font-display text-xs font-semibold tracking-wide text-(--text-brand) uppercase";

export function HomeProcess() {
  return (
    <section className="border-t border-(--border-subtle)">
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-10 max-w-xl sm:mb-14">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            Cómo trabajamos
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Siete formas distintas de aplicar la misma manera de pensar.
          </h2>
        </Reveal>

        {/* Cada celda es su propio Accordion de un solo item — así cada una
           expande de forma independiente dentro de la grilla (el Accordion
           del DS no tiene, ni necesita, un "modo grilla" propio: 7 raíces
           de un item resuelven esto sin inventar nada nuevo). */}
        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <Accordion key={cap.slug} variant="card" size="md" icon="chevron-down" hiddenUntilFound>
              <AccordionItem value={cap.slug}>
                <AccordionTrigger
                  title={cap.name}
                  trailingIcon={
                    <Image
                      src={geometryBySlug[cap.slug]}
                      alt=""
                      width={56}
                      height={56}
                      className="size-6 sm:size-7"
                    />
                  }
                />
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <p className={kickerSm}>Resuelve</p>
                      <p className="text-pretty text-(--text-secondary)">{cap.resolves}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className={kickerSm}>Existe porque</p>
                      <p className="text-pretty text-(--text-secondary)">{cap.existsBecause}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className={kickerSm}>Genera valor</p>
                      <p className="text-pretty text-(--text-secondary)">{cap.generatesValue}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <Link href="/capabilities" className={cn(buttonVariants({ variant: "outline" }))}>
            Ver todas las capacidades
          </Link>
        </div>
      </Container>
    </section>
  );
}
