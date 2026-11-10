"use client";

// Confirmación en la misma página tras enviar un formulario. Microanimación
// suave: la mascota entra con un pequeño rebote, el texto y el botón aparecen
// justo después. El foco va al título para que lectores de pantalla lo anuncien.

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Mascot } from "@/components/ui/mascot";
import { buttonVariants } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FormSuccess({
  title,
  body,
  ctaLabel,
  ctaHref = "/work",
  back,
}: {
  title: string;
  body?: string;
  ctaLabel: string;
  ctaHref?: string;
  /** Enlace secundario para volver a donde estaba (links o inicio). */
  back?: { href: string; label: string };
}) {
  const reduceMotion = usePrefersReducedMotion();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <motion.div
        initial={reduceMotion ? false : { scale: 0.6, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, -2, 0, 2, 0] }}
          transition={reduceMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <Mascot variant="2" alt="" className="w-32 sm:w-40" />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-3"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
      >
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-h3 font-display font-bold text-balance text-(--text-primary) outline-none"
        >
          {title}
        </h1>
        {body ? <p className="text-body text-pretty text-(--text-secondary)">{body}</p> : null}
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
      >
        <Link href={ctaHref} className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
          {ctaLabel}
          <ArrowRight aria-hidden="true" />
        </Link>
      </motion.div>

      {back ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <Link href={back.href} className={cn(buttonVariants({ variant: "ghost", size: "md" }), "gap-1.5")}>
            <ArrowLeft aria-hidden="true" />
            {back.label}
          </Link>
        </motion.div>
      ) : null}
    </div>
  );
}
