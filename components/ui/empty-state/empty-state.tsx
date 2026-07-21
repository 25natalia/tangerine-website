"use client";

import { motion } from "framer-motion";
import { Mascot } from "@/components/ui/mascot";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { emptyStatePresets } from "@/lib/empty-states";
import type { EmptyStateProps, EmptyStateAction } from "./types";

const EASE = [0.22, 1, 0.36, 1] as const;

const sizeConfig = {
  sm: {
    root: "gap-3 px-5 py-8",
    mascot: "w-16",
    title: "text-body-lg font-semibold",
    description: "text-body-sm max-w-xs",
    actions: "gap-2",
    defaultTitleAs: "h4" as const,
  },
  md: {
    root: "gap-4 px-8 py-12",
    mascot: "w-28 sm:w-32",
    title: "text-h3 font-bold",
    description: "text-body max-w-sm",
    actions: "gap-3",
    defaultTitleAs: "h3" as const,
  },
  lg: {
    root: "gap-5 px-8 py-20",
    mascot: "w-44 sm:w-56",
    title: "text-h1 font-bold",
    description: "text-body-lg max-w-md",
    actions: "gap-3",
    defaultTitleAs: "h2" as const,
  },
} satisfies Record<string, { root: string; mascot: string; title: string; description: string; actions: string; defaultTitleAs: "h1" | "h2" | "h3" | "h4" }>;

/**
 * Renders an action as what it actually is: a real `<a>` (styled with
 * buttonVariants) when it navigates via `href`, a real `<button>` (Base UI's
 * Button) when it runs a handler — never Base UI's Button with a `render`
 * prop pretending to be a link, which forces role="button" regardless of
 * what it renders as. Same rule already applied to Navbar's CTA and the
 * Tangerine Face download button elsewhere in this system.
 */
function ActionButton({ action, variant }: { action: EmptyStateAction; variant: "primary" | "outline" }) {
  if (action.href) {
    return (
      <a href={action.href} className={cn(buttonVariants({ variant }))}>
        {action.label}
      </a>
    );
  }
  return (
    <Button variant={variant} onClick={action.onClick}>
      {action.label}
    </Button>
  );
}

/**
 * The official Empty State system — every "nothing here" moment across
 * Tangerine products routes through this component instead of a one-off
 * icon+text stack. Content comes from a preset (lib/empty-states.ts) unless
 * overridden; the mascot pose is picked per-preset for emotional fit
 * (Error/Offline get the one sad pose, Success gets the big celebratory
 * one) — never a fixed pose regardless of context.
 *
 * Motion is layered on the same way MascotStage does it for the Home hero:
 * an entrance (fade + rise + tiny scale) wrapping a continuous, very
 * subtle float + breathing tilt — both skipped entirely under
 * prefers-reduced-motion, never touching <Mascot />'s own theme logic.
 */
export function EmptyState({
  variant = "generic",
  size = "md",
  align = "center",
  mascotVariant,
  title,
  titleAs,
  description,
  action,
  secondaryAction,
  badge,
  illustration,
  className,
}: EmptyStateProps) {
  const reduceMotion = usePrefersReducedMotion();
  const preset = emptyStatePresets[variant];
  const config = sizeConfig[size];
  const TitleTag = titleAs ?? config.defaultTitleAs;

  const resolvedTitle = title ?? preset.title;
  const resolvedDescription = description ?? preset.description;
  const resolvedMascotVariant = mascotVariant ?? preset.mascotVariant;

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        config.root,
        className
      )}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [0, -0.6, 0, 0.6, 0] }}
          transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {illustration ?? <Mascot variant={resolvedMascotVariant} className={config.mascot} />}
        </motion.div>
      </motion.div>

      {badge ? <div>{badge}</div> : null}

      <div className={cn("flex flex-col gap-2", align === "center" && "items-center")}>
        <TitleTag className={cn("text-balance", config.title)}>{resolvedTitle}</TitleTag>
        {resolvedDescription ? (
          <p className={cn("text-pretty text-(--text-secondary)", config.description)}>{resolvedDescription}</p>
        ) : null}
      </div>

      {action || secondaryAction ? (
        <div className={cn("flex flex-wrap items-center", align === "center" && "justify-center", config.actions)}>
          {action ? <ActionButton action={action} variant="primary" /> : null}
          {secondaryAction ? <ActionButton action={secondaryAction} variant="outline" /> : null}
        </div>
      ) : null}
    </div>
  );
}
