"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Deliberately small — the brief asks for a "Hero pequeño", and this page's
 * actual job starts at the form below. A big editorial Hero here would
 * compete with the thing the visitor came to do.
 */
export function ContactHero() {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <header className="border-b border-(--border-subtle)">
      <Container size="wide" className="pt-6 pb-12 sm:pt-8 sm:pb-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contacto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-8 max-w-3xl sm:mt-10"
        >
          <h1 className="font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl lg:text-6xl">
            Construyamos algo con criterio.
          </h1>
          <p className="text-body-lg mt-5 max-w-xl text-pretty text-(--text-secondary)">
            Antes de proponer una solución, queremos entender tu proyecto. Contanos qué estás
            construyendo y te respondemos con los próximos pasos, no con un formulario genérico.
          </p>
        </motion.div>
      </Container>
    </header>
  );
}
