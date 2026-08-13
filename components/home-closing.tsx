"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/**
 * The Home's closing moment — same phrase and CTAs as always (Misión,
 * Volumen I, citada literalmente, sin tocar), staged as a deliberate pause.
 * Every decorative illustration here (empty alt, aria-hidden) sits behind
 * the phrase — via DOM order, not z-index (see the phrase wrapper below for
 * why no `z-10` lives here).
 *
 * Deliberately centered — text-center, every element mx-auto'd — unlike the
 * left-aligned "Manifiesto block" pattern (`StudioManifesto`, `StudioOrigin`):
 * this is Home's one fully symmetric closing statement, framed by decorative
 * pieces on all eight compass points around it, and centering is what makes
 * that symmetry read as deliberate instead of accidental. Same
 * `mx-auto max-w-3xl` outer width as the Manifiesto pattern regardless, so
 * the block itself still sits inset the same amount from the page edges.
 *
 * Six small decorative pieces around the text wrapper (NE/N/E/S/SW/W) —
 * never two sharing the same corner. The two `deco/window-*` "ancla grande"
 * pieces (NW/SE) that used to sit here are gone: with the real
 * banner-capabilities illustration now sized up in the middle of this same
 * block, two more big illustrations competed with it instead of framing
 * it — only the small geometry/deco accents stay.
 *
 * Below the phrase (and above the CTAs) sits the illustration that used to
 * open the now-retired Capabilities page — Capabilities stopped being its
 * own section, so its illustration moved here instead of being deleted
 * along with the page. Theme-aware like `Mascot`: both the light
 * (`banner-capabilities-light.svg`) and dark (`banner-capabilities-dark.svg`)
 * variants render into the DOM, and Tailwind's `dark:` variant (driven by
 * the class next-themes sets on `<html>` before hydration) shows the right
 * one — no client-only `resolvedTheme` flash. Same `FloatingElement`
 * ambient float as every other banner illustration on the site (slow loop +
 * subtle cursor repel, both off under prefers-reduced-motion), centered
 * like everything else in this block and sized up for real visual weight —
 * the second thing on screen after the phrase, not a footnote to it.
 */
export function HomeClosing() {
  const { t } = useLanguage();
  const copy = t.home.closing;

  return (
    <section className="relative overflow-hidden">
      <Container size="wide" className="py-32 sm:py-40 lg:py-48">
        <div className="relative mx-auto max-w-3xl">
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
                {copy.title}
              </p>

              <div className="mt-10 flex justify-center">
                <FloatingElement
                  className="w-full max-w-[20rem] sm:max-w-[26rem]"
                  floatY={8}
                  floatDuration={6}
                  floatRotate={2}
                  repelStrength={0.5}
                >
                  <Image
                    src="/illustrations/banner/banner-capabilities-light.svg"
                    alt=""
                    aria-hidden="true"
                    width={1706}
                    height={1471}
                    className="h-auto w-full dark:hidden"
                  />
                  <Image
                    src="/illustrations/banner/banner-capabilities-dark.svg"
                    alt=""
                    aria-hidden="true"
                    width={1706}
                    height={1471}
                    className="hidden h-auto w-full dark:block"
                  />
                </FloatingElement>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/work" className={cn(buttonVariants({ size: "lg" }))}>
                  {copy.ctaWork}
                </Link>
                <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                  {copy.ctaContact}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
