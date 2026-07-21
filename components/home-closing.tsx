"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";
import { cn } from "@/lib/utils";

/**
 * The Home's closing moment — same phrase and CTAs as always (Misión,
 * Volumen I, citada literalmente, sin tocar), staged as a deliberate pause.
 * Every illustration here is decorative (empty alt, aria-hidden) and sits
 * behind the phrase — via DOM order, not z-index (see the phrase wrapper
 * below for why no `z-10` lives here).
 *
 * Eight pieces, one per compass position around the `max-w-2xl` text
 * wrapper (NW/NE/N/E/SE/S/SW/W) — never two sharing the same corner, which
 * is what caused the previous pass to read as clumped. Distance from the
 * text varies on purpose (the two `deco/window-*` anchors and the N/S pair
 * sit farther out; the smaller pieces sit closer), and every family
 * (deco, geometry/flor, geometry/leaf, geometry/spring) is represented at
 * least once instead of leaning on the same one or two files.
 */
export function HomeClosing() {
  return (
    <section className="relative overflow-hidden">
      <Container size="content" className="py-32 sm:py-40 lg:py-48">
        <div className="relative mx-auto max-w-2xl">
          {/* NW — ancla grande, la más alejada del texto */}
          <FloatingElement
            className="absolute -top-12 -left-16 z-0 w-20 sm:-top-16 sm:-left-24 sm:w-28 lg:w-32"
            floatY={7}
            floatDuration={7}
            floatRotate={3}
            repelStrength={0.6}
          >
            <Image
              src="/illustrations/deco/window-tangerine-lime.svg"
              alt=""
              aria-hidden="true"
              width={500}
              height={500}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* NE — chica, cerca */}
          <FloatingElement
            className="absolute -top-8 -right-10 z-0 w-7 sm:-right-14 sm:w-9"
            floatY={13}
            floatDuration={4}
            floatRotate={10}
            repelStrength={1.3}
          >
            <Image
              src="/illustrations/deco/star-orange.svg"
              alt=""
              aria-hidden="true"
              width={130}
              height={130}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* N — geometry/leaf, arriba y centrada, la más alejada del bloque */}
          <FloatingElement
            className="absolute -top-24 left-[40%] z-0 hidden w-6 lg:block"
            floatY={12}
            floatDuration={5}
            floatRotate={-8}
            repelStrength={1.1}
          >
            <Image
              src="/illustrations/geometry/leaf-yellow.svg"
              alt=""
              aria-hidden="true"
              width={80}
              height={80}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* E — chica, media distancia */}
          <FloatingElement
            className="absolute top-[30%] -right-20 z-0 hidden w-6 lg:block"
            floatY={15}
            floatDuration={3.5}
            floatRotate={12}
            repelStrength={1.4}
          >
            <Image
              src="/illustrations/deco/star-violet.svg"
              alt=""
              aria-hidden="true"
              width={130}
              height={130}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* SE — ancla grande, alejada */}
          <FloatingElement
            className="absolute -bottom-14 -right-16 z-0 hidden w-24 sm:-right-24 sm:block sm:w-32 lg:w-36"
            floatY={9}
            floatDuration={8}
            floatRotate={-3}
            repelStrength={0.6}
          >
            <Image
              src="/illustrations/deco/window-sandy-green.svg"
              alt=""
              aria-hidden="true"
              width={500}
              height={500}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* S — geometry/spring, abajo y centrada, alejada */}
          <FloatingElement
            className="absolute -bottom-24 left-[56%] z-0 hidden w-6 lg:block"
            floatY={12}
            floatDuration={4.5}
            floatRotate={9}
            repelStrength={1.1}
          >
            <Image
              src="/illustrations/geometry/spring-lime.svg"
              alt=""
              aria-hidden="true"
              width={90}
              height={90}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* SW — chica, cerca */}
          <FloatingElement
            className="absolute bottom-0 -left-12 z-0 hidden w-8 sm:block sm:w-10"
            floatY={11}
            floatDuration={5}
            floatRotate={6}
            repelStrength={1}
          >
            <Image
              src="/illustrations/deco/hoja.svg"
              alt=""
              aria-hidden="true"
              width={64}
              height={64}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* W — geometry/flor, media distancia */}
          <FloatingElement
            className="absolute top-[68%] -left-20 z-0 hidden w-5 lg:block"
            floatY={11}
            floatDuration={4}
            floatRotate={-12}
            repelStrength={1.3}
          >
            <Image
              src="/illustrations/geometry/flor-violet.svg"
              alt=""
              aria-hidden="true"
              width={153}
              height={160}
              className="h-auto w-full"
            />
          </FloatingElement>

          {/* Cierre — Misión, Volumen I, citado literalmente. No z-index:
             the Navbar's own is the DS's reserved `--z-sticky` (10), and
             Tailwind's z-10 is that same numeric value — tying with it and,
             being later in the DOM, winning during scroll. `relative` with
             no explicit z paints after the earlier absolute z-0 FloatingElements
             above in normal DOM order, at the same default stacking tier —
             same visual result, no reserved value at risk. */}
          <div className="relative text-center">
            <Reveal>
              <p className="font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
                La posibilidad de construir algo que nadie más podría haber construido de esa
                forma exacta.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/work" className={cn(buttonVariants({ size: "lg" }))}>
                  Ver el trabajo
                </Link>
                <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                  Contacto
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
