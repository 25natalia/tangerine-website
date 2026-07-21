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
  /** [rest, peak] — how far in px it sits from its resting position at the edges (t=0/1) vs. mid-scroll. */
  x: [number, number];
  y: [number, number];
  width: number;
  height: number;
}

// 2 a la izquierda, 1 grande a la derecha, 2 acentos chicos de geometry —
// deliberadamente no espejadas: distinta altura, distinto offset, distinta
// magnitud de movimiento por pieza, para que la composición se sienta
// orgánica en vez de un mirror izquierda/derecha.
const decorations: DecoSpec[] = [
  { src: "/illustrations/geometry/hoja-lime.svg", className: "top-8 left-2 w-11", x: [90, 16], y: [26, 0], width: 130, height: 123 },
  { src: "/illustrations/deco/star-yellow.svg", className: "bottom-20 left-16 w-8", x: [64, 8], y: [-18, 0], width: 130, height: 130 },
  { src: "/illustrations/deco/window-tangerine-violet.svg", className: "top-1/4 -right-2 w-36 lg:w-44", x: [-120, -18], y: [22, 0], width: 500, height: 500 },
  { src: "/illustrations/geometry/destello-lime.svg", className: "bottom-8 left-32 w-6", x: [46, 4], y: [-12, 0], width: 180, height: 180 },
  { src: "/illustrations/geometry/semillas-yellow.svg", className: "top-1/2 right-24 w-6", x: [-56, -8], y: [14, 0], width: 174, height: 174 },
];

const STOPS = [0, 0.28, 0.72, 1];

/**
 * The transform for each piece is a direct, continuously-updating function
 * of `scrollYProgress` — not a `whileInView`/one-shot animation. The curve
 * has a shape, though, not a flat 0→1 ramp: it moves/grows in as the
 * section enters (t 0→0.28), holds while the section is comfortably in
 * view (0.28→0.72), and eases back out as it leaves (0.72→1) — matching
 * "aumenten al entrar, se mantengan mientras está visible, vuelvan al
 * salir" instead of a single linear drift across the whole scroll range.
 */
function DecoPiece({ spec, scrollYProgress }: { spec: DecoSpec; scrollYProgress: MotionValue<number> }) {
  const reduceMotion = usePrefersReducedMotion();
  const [restX, peakX] = spec.x;
  const [restY, peakY] = spec.y;

  const x = useTransform(scrollYProgress, STOPS, reduceMotion ? [0, 0, 0, 0] : [restX, peakX, peakX, restX]);
  const y = useTransform(scrollYProgress, STOPS, reduceMotion ? [0, 0, 0, 0] : [restY, peakY, peakY, restY]);
  const scale = useTransform(scrollYProgress, STOPS, reduceMotion ? [1, 1, 1, 1] : [1, 1.12, 1.12, 1]);
  const opacity = useTransform(scrollYProgress, STOPS, reduceMotion ? [1, 1, 1, 1] : [0.45, 1, 1, 0.45]);

  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute z-0 hidden lg:block", spec.className)}
      style={{ x, y, scale, opacity }}
    >
      <Image src={spec.src} alt="" width={spec.width} height={spec.height} className="h-auto w-full" />
    </motion.div>
  );
}

function FaqDecoration({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
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

      <Container size="content" className="relative z-10 py-24 sm:py-32">
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
