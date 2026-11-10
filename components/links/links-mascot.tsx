"use client";

// Mascota animada de /links. Mismo lenguaje de movimiento que MascotStage
// (Home): flota suave con un leve balanceo, sombra que "respira" al revés del
// flote y se eleva en hover. Se agrega un saltito con giro al tocarla, que es
// la interacción que de verdad existe en el celular. MascotStage no se reutiliza
// porque su tamaño mínimo (w-64) y su variante fija no caben en esta página.

import * as React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Mascot } from "@/components/ui/mascot";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function LinksMascot() {
  const reduceMotion = usePrefersReducedMotion();
  const hop = useAnimationControls();

  function handleTap() {
    if (reduceMotion) return;
    hop.start({
      y: [0, -18, 0, -6, 0],
      rotate: [0, -8, 6, -3, 0],
      transition: { duration: 0.7, ease: "easeOut" },
    });
  }

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        type="button"
        aria-label="Tangerine"
        onTap={handleTap}
        whileHover={reduceMotion ? undefined : { y: -4, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative z-10 w-32 cursor-pointer rounded-(--radius-full) outline-none [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--border-focus) lg:w-52"
      >
        <motion.div animate={hop}>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, -2, 0, 2, 0] }}
            transition={reduceMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mascot alt="" className="w-full" />
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Sombra de apoyo: se encoge cuando la mascota sube. */}
      <motion.div
        aria-hidden="true"
        className="-mt-1 h-3 w-20 rounded-full bg-(--purple-950)/20 blur-md lg:h-4 lg:w-32 dark:bg-black/45"
        animate={reduceMotion ? undefined : { scaleX: [1, 0.85, 1], opacity: [0.6, 0.4, 0.6] }}
        transition={reduceMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
