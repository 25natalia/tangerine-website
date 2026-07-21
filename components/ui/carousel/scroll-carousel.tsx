"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { ScrollCarouselProps } from "./types";

const GAP_PX = 24; // matches the track's gap-6

const arrowClass =
  "pointer-events-auto size-11 rounded-full border border-(--border-subtle) bg-(--surface-default) text-(--text-primary) shadow-(--shadow-elevation-1) transition-all duration-(--duration-base) ease-(--ease-standard) hover:-translate-y-0.5 hover:shadow-(--shadow-elevation-3) active:translate-y-0 active:scale-95 disabled:pointer-events-none disabled:opacity-(--opacity-disabled) disabled:shadow-(--shadow-elevation-1) disabled:hover:translate-y-0";

/**
 * A "peek" carousel — several slides visible at once (the consumer decides
 * how many via `slideClassName`'s width), advanced with real native
 * scrolling (`scrollBy`/scroll-snap) instead of a JS-measured track
 * transform. That sidesteps having to know each slide's pixel width up
 * front for responsive layouts, and gets touch scrolling, momentum, and
 * snap-to-slide on mobile for free from the browser instead of reimplementing
 * them. `Carousel` (single-slide, crossfade) is a different, deliberately
 * separate component — the interaction model here (arrows call `scrollBy`,
 * indicators are a coarse position readout) is different enough that
 * merging the two into one "mode" prop would make both harder to read.
 *
 * Same reduced-motion contract as `Carousel`: autoplay is fully off (not
 * just calmer) under prefers-reduced-motion, and manual scrolls jump
 * instantly instead of smooth-scrolling.
 */
export function ScrollCarousel({
  slides,
  autoplay = false,
  autoplayInterval = 6000,
  pauseOnHover = true,
  showArrows = true,
  showIndicators = true,
  className,
  slideClassName,
  ...props
}: ScrollCarouselProps) {
  const reduceMotion = usePrefersReducedMotion();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);
  const count = slides.length;

  const step = React.useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    return first ? first.getBoundingClientRect().width + GAP_PX : 0;
  }, []);

  const updateEdges = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setAtStart(scrollLeft <= 2);
    setAtEnd(scrollLeft >= scrollWidth - clientWidth - 2);
    const s = step();
    if (s > 0) setActiveIndex(Math.min(count - 1, Math.round(scrollLeft / s)));
  }, [count, step]);

  React.useEffect(() => {
    updateEdges();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateEdges]);

  const scrollByStep = React.useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const s = step();
      const maxLeft = track.scrollWidth - track.clientWidth;
      let target = track.scrollLeft + direction * s;
      if (target >= maxLeft - 2) target = maxLeft;
      if (target <= 2) target = 0;
      track.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion, step]
  );

  const autoplayActive = autoplay && !reduceMotion && !paused && count > 1;

  React.useEffect(() => {
    if (!autoplayActive) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByStep(1);
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayActive, autoplayInterval, atEnd, scrollByStep]);

  if (count === 0) return null;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {showArrows && count > 1 ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Anterior"
            disabled={atStart}
            onClick={() => scrollByStep(-1)}
            className={cn(arrowClass, "hidden shrink-0 sm:inline-flex")}
          >
            <ChevronLeft className="size-4" />
          </Button>
        ) : null}

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={props["aria-label"]}
          onScroll={updateEdges}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${count}`}
              className={cn("shrink-0 snap-start", slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>

        {showArrows && count > 1 ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Siguiente"
            disabled={atEnd}
            onClick={() => scrollByStep(1)}
            className={cn(arrowClass, "hidden shrink-0 sm:inline-flex")}
          >
            <ChevronRight className="size-4" />
          </Button>
        ) : null}
      </div>

      {showIndicators && count > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "h-1.5 rounded-full transition-all duration-(--duration-base) ease-(--ease-standard)",
                i === activeIndex ? "w-6 bg-(--interactive-default)" : "w-1.5 bg-(--border-default)"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
