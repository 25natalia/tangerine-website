"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/templates/reveal";
import { capabilities } from "@/lib/capabilities";
import { cn } from "@/lib/utils";

// Un SVG distinto por capacidad, mezclando varias familias de
// public/illustrations/geometry/ (destello/flor/hoja/leaf/spring/semillas)
// para que cada una tenga identidad propia en vez de repetir siempre la
// misma figura. Ninguna combinación coincide con las que ya usa Filosofía
// en la misma Home.
const geometryBySlug: Record<string, string> = {
  "brand-systems": "/illustrations/geometry/destello-orange.svg",
  "digital-experiences": "/illustrations/geometry/flor-violet.svg",
  "product-design": "/illustrations/geometry/hoja-green.svg",
  "creative-direction": "/illustrations/geometry/leaf-yellow.svg",
  "content-systems": "/illustrations/geometry/spring-lime.svg",
  growth: "/illustrations/geometry/semillas-green.svg",
  automation: "/illustrations/geometry/spring-violet.svg",
};

// Una frase de una sola línea por capacidad — versión comprimida de
// `resolves` (mismo sentido, sin agregar ninguna afirmación nueva), no un
// campo del Brand OS en sí. `resolves` completo se sigue mostrando, sin
// recortar, dentro del panel expandido.
const teaserBySlug: Record<string, string> = {
  "brand-systems": "Marcas que dicen lo mismo en todas partes.",
  "digital-experiences": "La primera impresión que genera confianza.",
  "product-design": "Que lo prometido sea lo que se entrega.",
  "creative-direction": "Una sola voz, sin importar quién ejecute.",
  "content-systems": "Contenido consistente, no producido al apuro.",
  growth: "Traducir identidad sólida en resultados.",
  automation: "Menos tareas repetitivas, más criterio humano.",
};

const kickerSm = "font-display text-xs font-semibold tracking-wide text-(--text-brand) uppercase";

export function HomeProcess() {
  return (
    <section>
      <Container size="wide" className="py-24 sm:py-32">
        <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
              Cómo trabajamos
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
              Siete formas distintas de aplicar la misma manera de pensar.
            </h2>
          </div>
          <Link href="/capabilities" className={cn(buttonVariants({ variant: "ghost" }), "shrink-0")}>
            Ver todas las capacidades
          </Link>
        </Reveal>

        {/* flex-wrap (no grid) para que la última fila de 3 quede centrada
           en vez de pegada a la izquierda con una columna vacía — cada
           celda es su propio Accordion de un solo item, igual que antes. */}
        <RevealGroup className="flex flex-wrap justify-center gap-4">
          {capabilities.map((cap) => (
            <Accordion
              key={cap.slug}
              variant="card"
              size="md"
              icon="chevron-down"
              hiddenUntilFound
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <AccordionItem value={cap.slug}>
                <AccordionTrigger
                  title={cap.name}
                  description={teaserBySlug[cap.slug]}
                  leadingIcon={
                    <Image
                      src={geometryBySlug[cap.slug]}
                      alt=""
                      width={64}
                      height={64}
                      className="size-8"
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
                      <p className={kickerSm}>Genera valor</p>
                      <p className="text-pretty text-(--text-secondary)">{cap.generatesValue}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
