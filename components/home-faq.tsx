"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/templates/reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

// Preguntas reales de un cliente evaluando contratar una agencia de diseño
// digital, no genéricas de plantilla. Respuestas ancladas en contenido ya
// real del sitio (capabilities.ts, el flujo real de Contact) — deliberadamente
// sin inventar nombres de herramientas, tarifas o plazos específicos que no
// están confirmados en el Brand OS todavía.
const faqs = [
  {
    question: "¿Qué tipo de proyectos desarrollan?",
    answer:
      "Desde sistemas de marca completos hasta productos y experiencias digitales — Brand Systems, Digital Experiences, Product Design, Creative Direction, Content Systems, Growth y Automation son las siete formas en las que aplicamos la misma manera de pensar a un problema distinto.",
  },
  {
    question: "¿Trabajan con startups o con empresas grandes?",
    answer:
      "Con ambas. No buscamos un tamaño de empresa específico, sino que haya una identidad real detrás para trabajar — el tamaño cambia el alcance del proyecto, no el criterio con el que lo encaramos.",
  },
  {
    question: "¿Qué herramientas utilizan?",
    answer:
      "Las que mejor se adapten a cada proyecto — priorizamos el resultado sobre el apego a una herramienta en particular. Lo que sí se mantiene siempre igual es el criterio: investigar antes de proponer, documentar las decisiones, y dejarte un sistema que tu equipo pueda sostener sin depender de nosotros.",
  },
  {
    question: "¿Cuánto dura un proyecto?",
    answer:
      "Depende directamente del alcance — un sistema de marca completo no dura lo mismo que una pieza puntual. Antes de arrancar definimos un cronograma real para ese proyecto específico, no una estimación genérica.",
  },
  {
    question: "¿Cómo funcionan los precios y las cotizaciones?",
    answer:
      "Cada cotización se arma después de entender tu proyecto, no antes — por eso no tenemos una tarifa fija publicada. Nos escribís por el formulario de contacto con el contexto de lo que necesitás, y desde ahí coordinamos la conversación que define el alcance y la propuesta.",
  },
];

interface DecoSpec {
  src: string;
  className: string;
  /** Resting (far) → arrived (near) offsets in px, applied 1:1 with scroll progress across the section's entrance. */
  x: [number, number];
  y: [number, number];
  /** Resting → arrived rotation in degrees. */
  rotate: [number, number];
  /** Adds a small infinite ambient float on top of the scroll transform, for "se sienten vivas". */
  float?: boolean;
  width: number;
  height: number;
}

// 2 a la izquierda, 3 a la derecha, mezclando deco/ y geometry/ sin repetir
// ninguna — a propósito nada espejado: cada pieza tiene su propia altura,
// magnitud y signo de rotación.
const decorations: DecoSpec[] = [
  { src: "/illustrations/geometry/spring-orange.svg", className: "top-6 left-6 w-9", x: [140, 20], y: [50, 0], rotate: [0, -8], width: 90, height: 90 },
  { src: "/illustrations/deco/star-green.svg", className: "bottom-16 left-16 w-6", x: [100, 10], y: [-30, 0], rotate: [0, 10], float: true, width: 130, height: 130 },
  { src: "/illustrations/geometry/leaf-orange.svg", className: "top-10 right-4 w-7", x: [-150, -20], y: [40, 0], rotate: [0, 9], width: 80, height: 80 },
  { src: "/illustrations/geometry/destello-yellow.svg", className: "top-1/2 right-14 w-6", x: [-110, -15], y: [-35, 0], rotate: [0, -10], width: 180, height: 180 },
  { src: "/illustrations/geometry/semillas-violet.svg", className: "bottom-8 right-24 w-6", x: [-90, -8], y: [25, 0], rotate: [0, 7], float: true, width: 174, height: 174 },
];

/**
 * The transform is a direct, continuously-updating function of
 * `scrollYProgress` — not a `whileInView`/one-shot animation. Unlike the
 * previous pass, the scroll range itself (`useScroll`'s `offset` on
 * `FaqDecoration`) is bounded to one viewport-height's worth of scroll —
 * from the section's top touching the viewport's bottom edge, to the
 * section's top reaching 15% down the viewport — instead of the section's
 * entire time on screen. A shorter, section-relative range is what actually
 * makes the motion read as tied to "scrolling into the FAQ" rather than a
 * barely-perceptible drift spread across a much longer distance.
 *
 * `float` pieces get a second, independent motion layer — a small ambient
 * loop nested inside the scroll-driven one, so the two transforms don't
 * fight (each owns its own wrapping element). Both layers collapse under
 * prefers-reduced-motion: the scroll transform holds its resting value, the
 * float loop simply doesn't run.
 */
function DecoPiece({ spec, scrollYProgress }: { spec: DecoSpec; scrollYProgress: MotionValue<number> }) {
  const reduceMotion = usePrefersReducedMotion();
  const [restX, nearX] = spec.x;
  const [restY, nearY] = spec.y;
  const [restRotate, nearRotate] = spec.rotate;

  const x = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [restX, nearX]);
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [restY, nearY]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [restRotate, nearRotate]);
  const opacity = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.35, 1]);

  const image = <Image src={spec.src} alt="" width={spec.width} height={spec.height} className="h-auto w-full" />;

  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute z-0 hidden lg:block", spec.className)}
      style={{ x, y, scale, rotate, opacity }}
    >
      {spec.float ? (
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {image}
        </motion.div>
      ) : (
        image
      )}
    </motion.div>
  );
}

function FaqDecoration({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.15"] });
  return (
    <>
      {decorations.map((spec) => (
        <DecoPiece key={spec.src} spec={spec} scrollYProgress={scrollYProgress} />
      ))}
    </>
  );
}

export function HomeFaq() {
  const sectionRef = React.useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <FaqDecoration sectionRef={sectionRef} />

      {/* No z-index here — the Navbar's own z-index is the DS's reserved
         `--z-sticky` (10), and Tailwind's numeric scale (z-10, z-20…) mirrors
         those exact reserved values, so a bare `z-10` here would tie with
         the Navbar and — being later in the DOM — win, painting over a
         sticky header during scroll. `relative` alone is enough: a
         `position:relative` element with no explicit z-index still paints
         after its earlier `position:absolute z-0` siblings (this section's
         decorations) in DOM order, at the same default stacking tier —
         same visual result, without ever holding a z-index value that could
         collide with page-level chrome. */}
      <Container size="content" className="relative py-24 sm:py-32">
        <Reveal className="mb-12 max-w-xl sm:mb-16">
          <p className="font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
            Antes de escribirnos, esto puede ahorrarte una vuelta.
          </h2>
        </Reveal>

        <Reveal>
          <Accordion variant="faq" size="md" icon="plus-minus" hiddenUntilFound>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger title={faq.question} />
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
