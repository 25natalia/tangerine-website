"use client";

import * as React from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Mascot } from "@/components/ui/mascot";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { CursorTrail } from "./cursor-trail";

/** Rotated through, one per spawned sparkle — the DS's own accent range: purple, tangerine, lime, blue (info). */
const SPARKLE_COLORS = ["var(--purple-400)", "var(--tangerine-400)", "var(--lime-400)", "var(--info-400)"];

/**
 * The Hero's mascot composition, refined toward "one focal point, more air
 * around it" — a single mascot (Tangerine-2, hands forming a heart: the
 * clearest single gesture for cercanía+confianza), one quiet radial glow
 * as its stage (not layered with a second one from the parent Hero
 * anymore), and a real grounding shadow. No pattern texture behind it, no
 * second receded mascot, no ambient/unconditional floating accent dots —
 * those read as decoration with no message of their own, exactly what an
 * earlier pass of this component removed. The opt-in `sparkle` prop below
 * is a deliberately different thing: a cursor-proximity "magic" moment, not
 * ambient wallpaper — it only exists while a visitor is actually near the
 * mascot, discovered rather than always-on.
 *
 * Reacts to the cursor the same way `FooterMascotShowcase` does (lean
 * toward pointer position via spring-smoothed rotate/translate) — kept
 * intentionally not a literal blink: the artwork has no blink frame, and
 * this character's resting eyes are already drawn as closed, content
 * crescents, so a blink wouldn't read as a distinct animation on this
 * design even if faked.
 */
export function MascotStage({ sparkle = false }: { sparkle?: boolean }) {
  const reduceMotion = usePrefersReducedMotion();
  const stageRef = React.useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxRotate = useTransform(scrollY, [0, 700], [0, -3]);
  const parallaxY = useTransform(scrollY, [0, 700], [0, -14]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 16 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 16 });
  const lean = useTransform(springX, [-1, 1], [-4, 4]);
  const drift = useTransform(springX, [-1, 1], [-3, 3]);
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

  return (
    <div
      ref={stageRef}
      className="relative flex items-center justify-center py-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {sparkle ? (
        <CursorTrail
          targetRef={stageRef}
          colors={SPARKLE_COLORS}
          size={[4, 10]}
          blurPx={1.5}
          lifetimeMs={[1400, 2200]}
          spawnIntervalMs={90}
          organic
        />
      ) : null}

      {/* Stage glow — the mascot's only background element. A true radial
         gradient (not Tailwind's linear from/via/to) so it fades evenly in
         every direction instead of leaving a hard circular edge. Smaller
         and quieter than before so it reads as a soft anchor, not a second
         focal point competing with the mascot itself. */}
      <div
        aria-hidden="true"
        className="absolute size-[22rem] rounded-full opacity-50 blur-3xl sm:size-[26rem] dark:hidden"
        style={{
          background: "radial-gradient(circle at center, var(--purple-100), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute hidden size-[22rem] rounded-full opacity-30 blur-3xl sm:size-[26rem] dark:block"
        style={{
          background: "radial-gradient(circle at center, var(--purple-900), transparent 70%)",
        }}
      />

      {/* Grounding shadow — breathes opposite the mascot's float so it always
         reads as "resting", not detached from the stage */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 h-7 w-36 rounded-full bg-(--purple-950)/25 blur-xl sm:bottom-10 sm:w-44 dark:bg-black/45"
        animate={reduceMotion ? undefined : { scaleX: [1, 0.88, 1], opacity: [0.55, 0.35, 0.55] }}
        transition={reduceMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The mascot — the composition's only protagonist */}
      <motion.div
        className="relative w-64 sm:w-72 lg:w-96"
        style={reduceMotion ? undefined : { rotate: parallaxRotate, y: parallaxY }}
      >
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={reduceMotion ? undefined : { rotate: lean, x: drift, y: rise }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, -1, 0, 1, 0] }}
            transition={reduceMotion ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            className="drop-shadow-[0_30px_50px_rgba(84,52,226,0.18)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
          >
            <Mascot variant="2" alt="Mascota de Tangerine Studio" className="w-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
