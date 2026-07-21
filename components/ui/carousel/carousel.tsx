"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { CarouselProps } from "./types";

const EASE = [0.22, 1, 0.36, 1] as const;

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -32 : 32 }),
};

/**
 * A single-slide-visible carousel — autoplay + pause-on-hover/focus + manual
 * arrows + indicators, content-agnostic (each slide is just a `ReactNode`,
 * no assumptions about what's inside). Built because nothing like this
 * existed yet in the DS; every other primitive here (Tabs, Accordion) was
 * reused as-is instead of reinvented.
 *
 * Autoplay is a no-op under prefers-reduced-motion — not just eased
 * differently, entirely off. An element that keeps moving on its own is
 * exactly what WCAG 2.2.2 (Pause, Stop, Hide) and reduced-motion visitors
 * both flag, so reduced motion means "fully manual", not "same autoplay,
 * calmer transition."
 */
export function Carousel({
  slides,
  autoplay = false,
  autoplayInterval = 6000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showIndicators = true,
  className,
  slideClassName,
  ...props
}: CarouselProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [[index, direction], setSlide] = React.useState<[number, number]>([0, 0]);
  const [paused, setPaused] = React.useState(false);
  const count = slides.length;

  const goTo = React.useCallback(
    (nextIndex: number, dir: number) => {
      setSlide(() => {
        if (loop) return [(nextIndex + count) % count, dir];
        return [Math.min(Math.max(nextIndex, 0), count - 1), dir];
      });
    },
    [count, loop]
  );

  const next = React.useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = React.useCallback(() => goTo(index - 1, -1), [goTo, index]);

  const autoplayActive = autoplay && !reduceMotion && !paused && count > 1;

  React.useEffect(() => {
    if (!autoplayActive) return;
    const id = setInterval(() => goTo(index + 1, 1), autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayActive, autoplayInterval, goTo, index]);

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={props["aria-label"]}
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={cn("relative overflow-hidden", slideClassName)}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={reduceMotion ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: EASE }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${count}`}
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && count > 1 ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Anterior"
            onClick={prev}
            className="pointer-events-auto bg-background/80 backdrop-blur"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Siguiente"
            onClick={next}
            className="pointer-events-auto bg-background/80 backdrop-blur"
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}

      {showIndicators && count > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la diapositiva ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-(--duration-base) ease-(--ease-standard)",
                i === index ? "w-6 bg-(--interactive-default)" : "w-1.5 bg-(--border-default) hover:bg-(--icon-subtle)"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
