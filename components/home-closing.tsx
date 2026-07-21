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
 * Volumen I, citada literalmente, sin tocar), but staged as a deliberate
 * pause instead of a plain text block. Every illustration here is decorative
 * (empty alt, aria-hidden) and sits behind the phrase (z-0 vs. the
 * content's z-10) — `overflow-hidden` on the section is what turns the
 * negative-offset positions into the "partially cropped at the edge" look
 * the brief asks for, without ever risking a horizontal scrollbar.
 *
 * Sizes/positions are hand-placed, not a grid, on purpose — an organic
 * scatter was the explicit ask. Smaller pieces get a faster ambient loop
 * and a stronger cursor-repel (`repelStrength`) than the two big window
 * illustrations — lighter things read as moving more, which is the depth
 * cue the brief describes.
 */
export function HomeClosing() {
  return (
    <section className="relative overflow-hidden border-t border-(--border-subtle)">
      <FloatingElement
        className="absolute -top-8 -left-8 z-0 w-28 sm:-top-10 sm:-left-10 sm:w-36 lg:w-44"
        floatY={8}
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
        className="absolute -bottom-10 -right-8 z-0 hidden w-32 sm:block sm:w-40 lg:w-48"
        floatY={10}
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
        className="absolute bottom-12 left-[10%] z-0 hidden w-10 sm:block sm:w-12"
        floatY={12}
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
        className="absolute top-10 right-[12%] z-0 w-8 sm:w-10"
        floatY={14}
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
        className="absolute top-[36%] -right-3 z-0 hidden w-7 lg:block"
        floatY={16}
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
        className="absolute top-[18%] left-[16%] z-0 hidden w-6 lg:block"
        floatY={14}
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
        className="absolute bottom-[20%] right-[18%] z-0 hidden w-6 lg:block"
        floatY={12}
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
      <Container size="content" className="relative z-10 py-32 text-center sm:py-40 lg:py-48">
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
      </Container>
    </section>
  );
}
