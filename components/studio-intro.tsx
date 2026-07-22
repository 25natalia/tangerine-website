"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";

// La ilustración estilo Memoji de Natalia y Emy (public/illustrations/us/) —
// no es una fotografía real, es un asset ilustrado que el propio usuario
// señaló para este bloque. Ya trae su propio tratamiento editorial (dos
// tarjetas de color inclinadas, esquinas redondeadas, una por persona), así
// que no se le agrega otra tarjeta de color detrás — eso duplicaría el
// recurso en vez de reforzarlo.
const kicker = "font-display text-sm font-semibold tracking-wide text-(--neutral-1000)/60 uppercase";

export function StudioIntro() {
  return (
    <section className="relative overflow-hidden bg-(--lime-400) text-(--neutral-1000)">
      <Container
        size="wide"
        className="relative grid items-center gap-y-16 py-20 sm:py-28 md:grid-cols-[1fr_1fr] md:gap-x-12 lg:gap-x-20 lg:py-32"
      >
        <Reveal className="flex flex-col items-start text-left">
          <p className={kicker}>Studio</p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
            Dos personas que notaron algo que a nadie más parecía molestarle.
          </h1>
        </Reveal>

        <div className="relative flex justify-center md:justify-end">
          <FloatingElement
            className="absolute top-0 left-2 z-0 hidden w-10 sm:block sm:w-12"
            floatY={9}
            floatDuration={5.5}
            floatRotate={6}
            repelStrength={1}
          >
            <Image src="/illustrations/deco/star-violet.svg" alt="" width={130} height={130} className="h-auto w-full" />
          </FloatingElement>
          <FloatingElement
            className="absolute -bottom-2 right-4 z-0 hidden w-8 sm:block sm:w-10"
            floatY={8}
            floatDuration={4.5}
            floatRotate={-8}
            repelStrength={1.1}
          >
            <Image src="/illustrations/geometry/semillas-orange.svg" alt="" width={174} height={174} className="h-auto w-full" />
          </FloatingElement>

          <Image
            src="/illustrations/us/natalia-emy.svg"
            alt="Natalia García y Emy Dorado, fundadoras de Tangerine Studio"
            width={816}
            height={372}
            className="relative z-[1] h-auto w-full max-w-xl lg:max-w-2xl"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
