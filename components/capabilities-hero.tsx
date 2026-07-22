"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";
import { cn } from "@/lib/utils";

const kicker = "font-display text-sm font-semibold tracking-wide text-primary-foreground/60 uppercase";

/**
 * Mismo esqueleto de dos columnas que `StudioIntro` (mismo componente al
 * que el pedido apunta como referencia) — no el mismo contenido: eyebrow +
 * título + descripción + CTA a la izquierda, ilustración protagonista a la
 * derecha. Fondo `bg-primary` (el token semántico real del DS, no un
 * "primary" inventado) con `text-primary-foreground`, que ya resuelve
 * blanco en claro / casi-negro en oscuro automáticamente — AA garantizado
 * en los dos temas sin fijar un color a mano.
 */
export function CapabilitiesHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <Container
        size="wide"
        className="relative grid items-center gap-y-16 py-20 sm:py-28 md:grid-cols-[1fr_1fr] md:gap-x-12 lg:gap-x-16 lg:py-32"
      >
        <Reveal className="flex flex-col items-start text-left">
          <p className={kicker}>Capabilities</p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
            No ofrecemos una lista de servicios sueltos.
          </h1>
          <p className="text-body-lg mt-6 max-w-lg text-pretty text-primary-foreground/85">
            Del tipo que cualquiera podría contratar por separado sin que se note la diferencia.
            Ofrecemos capacidades: formas distintas de aplicar la misma manera de pensar a un
            problema distinto.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90")}
          >
            Construyamos algo juntos
          </Link>
        </Reveal>

        <div className="relative flex justify-center md:justify-end">
          {/* ~45-50% del ancho del hero en desktop (md:w-1/2 del contenedor
             de esta columna, que a su vez es la mitad del hero) — flotación
             ambiental muy suave + un `repelStrength` bajo porque, a
             diferencia de los acentos chicos que este mismo componente
             mueve en otras secciones, acá es la pieza protagonista: debe
             sentirse viva, no juguetona. */}
          <FloatingElement
            className="w-full max-w-md md:max-w-none md:w-[85%]"
            floatY={10}
            floatDuration={6}
            floatRotate={2}
            repelStrength={0.4}
          >
            <Image
              src="/illustrations/deco/tangerine-bana-strawy.svg"
              alt=""
              aria-hidden="true"
              width={1377}
              height={927}
              className="h-auto w-full"
              priority
            />
          </FloatingElement>
        </div>
      </Container>
    </section>
  );
}
