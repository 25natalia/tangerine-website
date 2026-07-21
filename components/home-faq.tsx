"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/templates/reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

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

/**
 * Scroll-linked, not autoplaying: each piece's horizontal position is a
 * direct function of how far the section has scrolled through the
 * viewport (`scrollYProgress`), not a time-based loop like FloatingElement
 * — the brief specifically asked for parallax tied to scroll, not another
 * ambient animation. Positioned in the gutter outside the `size="content"`
 * column (only from `lg`, where that gutter actually exists), so they can
 * never overlap the accordion regardless of scroll position.
 */
function FaqDecoration({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const leftUpperX = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 22]);
  const leftLowerX = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 15]);
  const rightUpperX = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -22]);
  const rightLowerX = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -15]);

  return (
    <>
      <motion.div aria-hidden="true" className="absolute top-6 left-4 z-0 hidden w-10 lg:block" style={{ x: leftUpperX }}>
        <Image src="/illustrations/geometry/hoja-lime.svg" alt="" width={130} height={123} className="h-auto w-full" />
      </motion.div>
      <motion.div aria-hidden="true" className="absolute bottom-10 left-10 z-0 hidden w-8 lg:block" style={{ x: leftLowerX }}>
        <Image src="/illustrations/deco/star-yellow.svg" alt="" width={130} height={130} className="h-auto w-full" />
      </motion.div>
      <motion.div aria-hidden="true" className="absolute top-10 right-8 z-0 hidden w-8 lg:block" style={{ x: rightUpperX }}>
        <Image src="/illustrations/deco/star-green.svg" alt="" width={130} height={130} className="h-auto w-full" />
      </motion.div>
      <motion.div aria-hidden="true" className="absolute bottom-4 right-4 z-0 hidden w-10 lg:block" style={{ x: rightLowerX }}>
        <Image src="/illustrations/geometry/destello-lime.svg" alt="" width={180} height={180} className="h-auto w-full" />
      </motion.div>
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
