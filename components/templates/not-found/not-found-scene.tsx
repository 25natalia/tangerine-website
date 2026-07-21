"use client";

import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mascot } from "@/components/ui/mascot";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * "Ya encontramos el camino" as a single arrival beat, not a multi-second
 * wait — the mascot (pose `1`, the raised peace-sign hand) is already the
 * one true, settled illustration on screen. What sells "just arrived" is a
 * brief echo: an offset, translucent afterimage of that *exact same* pose
 * that appears with it and dissolves within half a second (opacity + scale,
 * never a second distinct pose) — a ripple, not two different mascots
 * fighting for the same spot. Crossfading between two *different* poses
 * (this used to open on pose `4`, the frown, and cross-fade to `1` after
 * 2.6s) briefly ghosted two different hand positions on top of each other,
 * which read as a rendering bug rather than an effect — using one pose for
 * both layers removes that ambiguity entirely.
 *
 * Cursor-lean and idle breathing/float reuse the same spring technique
 * already established in MascotStage/FooterMascotShowcase. Clicking (or
 * Enter/Space — it's a real `role="button"`) replays the echo + a small
 * sparkle as a repeatable easter egg.
 */
export function NotFoundScene() {
  const reduceMotion = usePrefersReducedMotion();
  const [echoKey, setEchoKey] = useState(0);
  const [sparkleKey, setSparkleKey] = useState(0);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 16 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 16 });
  const lean = useTransform(springX, [-1, 1], [-4, 4]);
  const rise = useTransform(springY, [-1, 1], [3, -3]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleClick() {
    if (reduceMotion) return;
    setEchoKey((k) => k + 1);
    setSparkleKey((k) => k + 1);
  }

  return (
    <div
      className="relative flex items-center justify-center py-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        aria-hidden="true"
        className="absolute size-[20rem] rounded-full bg-(--purple-100) opacity-50 blur-3xl sm:size-[24rem] dark:bg-(--purple-950) dark:opacity-30"
      />

      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Mascota de Tangerine Studio — hacé clic para un pequeño saludo"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative w-48 cursor-pointer outline-none select-none sm:w-56"
        style={reduceMotion ? undefined : { rotate: lean, y: rise }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, -1, 0, 1, 0] }}
          transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-[0_24px_40px_rgba(84,52,226,0.16)] dark:drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
        >
          <div className="relative">
            {!reduceMotion ? (
              <motion.div
                key={echoKey}
                aria-hidden="true"
                className="absolute inset-0"
                initial={{ opacity: 0.55, scale: 0.94, x: 10, y: -6 }}
                animate={{ opacity: 0, scale: 1.12, x: 0, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Mascot variant="1" alt="" className="w-full" />
              </motion.div>
            ) : null}

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Mascot variant="1" alt="Mascota de Tangerine Studio" className="w-full" />
            </motion.div>
          </div>
        </motion.div>

        {!reduceMotion ? (
          <motion.span
            key={sparkleKey}
            aria-hidden="true"
            className="absolute top-2 right-2 text-2xl"
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            animate={sparkleKey > 0 ? { opacity: [0, 1, 0], scale: [0.4, 1.1, 0.9], rotate: [-20, 0, 8] } : undefined}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            ✨
          </motion.span>
        ) : null}
      </motion.div>
    </div>
  );
}
