"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { Mascot } from "@/components/ui/mascot";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { FooterMascotShowcaseProps } from "./types";

const CLICK_REACTION_MS = 1100;

/**
 * The Footer's hero element — reuses the official `<Mascot />` (no
 * hardcoded asset paths, light/dark handled entirely inside it, same as
 * every other use of Mascot this session) and layers real interaction on
 * top, honestly scoped to what a flat static illustration can actually do:
 *
 * - **"Levantar una mano"**: a real pose swap, `default` → `1` (the peace
 *   sign / raised-hand artwork) cross-fades in on hover. Not a fake frame.
 * - **"Inclinarse un poco" + rotar sutilmente**: the mascot leans toward the
 *   cursor — a Z-axis rotate + slight translate driven by pointer position
 *   relative to its own center, springed for smoothness.
 * - **Bounce**: a spring scale/y pop on hover-enter.
 * - **Respirar / flotar**: a slow, continuous idle breathing + float loop,
 *   identical technique to the Home hero's `MascotStage`.
 * - **Easter egg**: clicking swaps to a third pose (`3`, hands together —
 *   a "gracias" gesture) with a quick spin, then reverts on its own.
 *
 * What this deliberately does *not* fake: a literal blink or a widening
 * smile. The artwork has no such frame, and drawing one specifically for a
 * hover state would be a new illustration, not an interaction — see the
 * README for the full reasoning.
 */
function FooterMascotShowcase({
  idleVariant = "default",
  hoverVariant = "1",
  clickVariant = "3",
  className,
}: FooterMascotShowcaseProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 15 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 15 });
  const lean = useTransform(springX, [-1, 1], [-6, 6]);
  const rise = useTransform(springY, [-1, 1], [4, -4]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    setHovered(false);
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleClick() {
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    setClicked(true);
    clickTimeoutRef.current = setTimeout(() => setClicked(false), CLICK_REACTION_MS);
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Mascota de Tangerine Studio — un pequeño saludo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      whileHover={reduceMotion ? undefined : { scale: 1.04, y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cn("relative inline-block w-48 cursor-pointer outline-none select-none sm:w-56", className)}
      style={reduceMotion ? undefined : { rotate: lean, y: rise }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, -1, 0, 1, 0] }}
        transition={reduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="drop-shadow-[0_24px_40px_rgba(84,52,226,0.16)] dark:drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
      >
        {/* Three poses stacked in place — opacity cross-fades between them
           instead of mount/unmount, so there's never a blank frame. */}
        <div className="relative">
          <Mascot variant={idleVariant} alt="" className="w-full" />
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: clicked ? 0 : hovered ? 1 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <Mascot variant={hoverVariant} alt="" className="w-full" />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: clicked ? 1 : 0, rotate: clicked ? [0, 12, -8, 0] : 0 }}
            transition={{ duration: clicked ? 0.6 : 0.25, ease: "easeOut" }}
          >
            <Mascot variant={clickVariant} alt="" className="w-full" />
          </motion.div>
        </div>
      </motion.div>
      <span className="sr-only">Pasá el mouse o hacé clic para un saludo.</span>
    </motion.div>
  );
}

export { FooterMascotShowcase };
