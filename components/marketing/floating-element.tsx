"use client";

import * as React from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface FloatingElementProps {
  children: ReactNode;
  /** Positioning/size/visibility — e.g. `"absolute -top-6 -left-8 w-24 hidden sm:block"`. */
  className?: string;
  /** Ambient vertical drift, in px, each way. @default 10 */
  floatY?: number;
  /** One full ambient loop, in seconds — vary per instance for a depth cue (small/light pieces drift faster). @default 5 */
  floatDuration?: number;
  /** Ambient rotation, in degrees, each way. @default 4 */
  floatRotate?: number;
  /** How far it displaces from the cursor while hovered, relative to the default. @default 1 */
  repelStrength?: number;
}

/**
 * A small decorative illustration that's alive even at rest (a slow,
 * looping float + tiny rotation) and reacts to the cursor while hovered —
 * nudged away from the pointer, then eased back, like a light object
 * suspended in the air rather than a real drag. Same technique
 * `MascotStage` already uses for its lean-toward-cursor effect
 * (pointer position → spring-smoothed motion values → transform), just
 * generalized so any small illustration can get it, not only the mascot.
 *
 * Two nested motion.div layers because the two motions are independent and
 * shouldn't fight each other: the outer one runs the ambient loop
 * (`animate` with repeating keyframes), the inner one holds the
 * spring-driven hover repel (`style` bound to motion values) — composing
 * them on separate elements means neither has to know the other exists.
 *
 * Fully static under prefers-reduced-motion: no ambient loop, no repel,
 * the illustration just sits in its resting position.
 */
export function FloatingElement({
  children,
  className,
  floatY = 10,
  floatDuration = 5,
  floatRotate = 4,
  repelStrength = 1,
}: FloatingElementProps) {
  const reduceMotion = usePrefersReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const repelX = useTransform(springX, [-1, 1], [-16 * repelStrength, 16 * repelStrength]);
  const repelY = useTransform(springY, [-1, 1], [-16 * repelStrength, 16 * repelStrength]);
  const repelRotate = useTransform(springX, [-1, 1], [-10 * repelStrength, 10 * repelStrength]);

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

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={reduceMotion ? undefined : { y: [0, -floatY, 0], rotate: [0, floatRotate, 0, -floatRotate, 0] }}
      transition={reduceMotion ? undefined : { duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div style={reduceMotion ? undefined : { x: repelX, y: repelY, rotate: repelRotate }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
