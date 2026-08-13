"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/templates/reveal";
import { FloatingElement } from "@/components/marketing/floating-element";
import { useLanguage } from "@/lib/i18n/language-context";

// Nueva ilustración de cuerpo entero de Natalia y Emy
// (public/illustrations/banner/banner-aboutus.svg), reemplaza la versión
// anterior estilo Memoji (public/illustrations/us/natalia-emy.svg, ya
// borrada — era el único archivo de esa carpeta y nada más la
// referenciaba). A diferencia de la anterior, esta no trae su propio marco
// editorial, así que ahora sí lleva geometrías `FloatingElement` alrededor
// — mismo mecanismo que el resto del sitio (loop ambiental + resorte al
// pasar el cursor cerca), en colores que no sean violeta (se perderían
// contra `bg-(--purple-600)` del banner). Las 4 llevan `z-[1]` (no `z-0`):
// sus posiciones caen dentro del bounding box de la ilustración principal,
// que se renderiza después en el DOM sin z-index explícito — sin el bump
// la ilustración gana el hit-test ahí donde se superponen y bloquea el
// hover de la geometría de abajo (mismo bug que ya se dio, y se corrigió
// así, con las geometrías del Hero).
//
// `bg-(--purple-600)`/`text-white` fijos — no `bg-primary`/
// `text-primary-foreground`: esos tokens semánticos cambian con el tema
// (`--primary` pasa a `--purple-400` y `--primary-foreground` a casi-negro
// en oscuro), y acá el pedido explícito es que los banners no cambien con
// el modo oscuro. Mismo color en los cuatro banners del sitio a propósito.
const kicker = "font-display text-sm font-semibold tracking-wide text-white/60 uppercase";

export function StudioIntro() {
  const { t } = useLanguage();
  const copy = t.studio.intro;

  return (
    <section className="relative overflow-hidden bg-(--purple-600) text-white">
      <Container
        size="wide"
        className="relative grid items-center gap-y-16 py-20 sm:py-28 md:grid-cols-[1fr_1fr] md:gap-x-12 lg:gap-x-20 lg:py-32"
      >
        <Reveal className="flex flex-col items-start text-left">
          <p className={kicker}>{copy.kicker}</p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
        </Reveal>

        <div className="relative flex justify-center md:justify-end">
          <FloatingElement
            className="absolute top-[4%] left-[6%] z-[1] hidden w-9 sm:block sm:w-11"
            floatY={9}
            floatDuration={5}
            floatRotate={6}
            repelStrength={1.1}
          >
            <Image
              src="/illustrations/geometry/flor-lime.svg"
              alt=""
              width={153}
              height={160}
              className="h-auto w-full"
            />
          </FloatingElement>
          <FloatingElement
            className="absolute top-[2%] right-[8%] z-[1] hidden w-7 lg:block"
            floatY={10}
            floatDuration={4.5}
            floatRotate={-8}
            repelStrength={1.2}
          >
            <Image
              src="/illustrations/deco/star-orange.svg"
              alt=""
              width={130}
              height={130}
              className="h-auto w-full"
            />
          </FloatingElement>
          <FloatingElement
            className="absolute bottom-[6%] left-0 z-[1] hidden w-8 lg:block"
            floatY={8}
            floatDuration={5.5}
            floatRotate={7}
            repelStrength={1}
          >
            <Image
              src="/illustrations/geometry/semillas-yellow.svg"
              alt=""
              width={174}
              height={174}
              className="h-auto w-full"
            />
          </FloatingElement>
          <FloatingElement
            className="absolute right-[2%] bottom-[2%] z-[1] hidden w-8 sm:block sm:w-10"
            floatY={11}
            floatDuration={4}
            floatRotate={-6}
            repelStrength={1.3}
          >
            <Image
              src="/illustrations/geometry/hoja-yellow.svg"
              alt=""
              width={130}
              height={123}
              className="h-auto w-full"
            />
          </FloatingElement>

          <Image
            src="/illustrations/banner/banner-aboutus.svg"
            alt={copy.imageAlt}
            width={1479}
            height={1464}
            className="relative h-auto w-full max-w-md lg:max-w-lg"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
