"use client";

// Shared scroll-reveal wrapper for template pages — every section fades/lifts
// in once as it enters the viewport. One shared implementation so all 10
// templates move identically instead of each hand-rolling its own
// IntersectionObserver. Not a Design System component: this is template-layer
// motion infrastructure, same tier as components/marketing/mascot-stage.tsx.

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const reduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

/** Applies the same fade/lift to each direct child, staggered — for grids of cards where wrapping every item in <Reveal> individually would be noisy. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={variants} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
