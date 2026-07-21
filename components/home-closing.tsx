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
 * behind the phrase (z-0 vs. the content's z-10).
 *
 * Unlike the first pass, the floats are positioned relative to the same
 * `max-w-2xl` wrapper as the text itself — not the full section — so their
 * offsets read as "close to the message" (tens of px past the text's own
 * edges) instead of scattered at the viewport's corners. `overflow-hidden`
 * on the section still crops anything that pokes past it, so nothing risks
 * a horizontal scrollbar.
 */
export function HomeClosing() {
  return (
    <section className="relative overflow-hidden">
      <Container size="content" className="py-32 sm:py-40 lg:py-48">
        <div className="relative mx-auto max-w-2xl">
          <FloatingElement
            className="absolute -top-10 -left-12 z-0 w-20 sm:-top-14 sm:-left-20 sm:w-28 lg:w-32"
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

          <FloatingElement
            className="absolute -bottom-12 -right-12 z-0 hidden w-24 sm:-right-20 sm:block sm:w-32 lg:w-36"
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

          <FloatingElement
            className="absolute bottom-2 -left-10 z-0 hidden w-8 sm:block sm:w-10"
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

          <FloatingElement
            className="absolute -top-6 -right-9 z-0 w-7 sm:w-9"
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

          <FloatingElement
            className="absolute top-1/3 -right-16 z-0 hidden w-6 lg:block"
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

          <FloatingElement
            className="absolute top-10 -left-16 z-0 hidden w-5 lg:block"
            floatY={13}
            floatDuration={4.5}
            floatRotate={14}
            repelStrength={1.3}
          >
            <Image
              src="/illustrations/geometry/semillas-lime.svg"
              alt=""
              aria-hidden="true"
              width={174}
              height={174}
              className="h-auto w-full"
            />
          </FloatingElement>

          <FloatingElement
            className="absolute bottom-14 right-[6%] z-0 hidden w-5 lg:block"
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

          {/* Cierre — Misión, Volumen I, citado literalmente. */}
          <div className="relative z-10 text-center">
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
