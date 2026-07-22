import type { ReactNode } from "react";

export interface CarouselProps {
  /** One element per slide. */
  slides: ReactNode[];
  /** Advances automatically while true (and not hovered/focused, and the visitor has no reduced-motion preference). @default false */
  autoplay?: boolean;
  /** Ms between auto-advances. @default 6000 */
  autoplayInterval?: number;
  /** Pauses autoplay while the pointer is over the carousel. @default true */
  pauseOnHover?: boolean;
  /** Whether "next" from the last slide wraps to the first (and vice versa). @default true */
  loop?: boolean;
  /** @default true */
  showArrows?: boolean;
  /** @default true */
  showIndicators?: boolean;
  /** Accessible name for the carousel region — required, there's no visible heading Carousel can borrow one from. */
  "aria-label": string;
  className?: string;
  /** Applied to the slide's outer wrapper (not the slide content itself). */
  slideClassName?: string;
}

export interface ScrollCarouselProps {
  /** One element per slide. */
  slides: ReactNode[];
  /** Advances automatically while true (and not hovered/focused, and the visitor has no reduced-motion preference). @default false */
  autoplay?: boolean;
  /** Ms between auto-advances. @default 6000 */
  autoplayInterval?: number;
  /** Pauses autoplay while the pointer is over the carousel. @default true */
  pauseOnHover?: boolean;
  /** @default true */
  showArrows?: boolean;
  /** @default true */
  showIndicators?: boolean;
  /** Accessible name for the carousel region — required, there's no visible heading to borrow one from. */
  "aria-label": string;
  className?: string;
  /**
   * Applied to each slide's wrapper — this is how a consumer controls how
   * many are visible at once (e.g. `"w-[85%] sm:w-[60%] lg:w-[calc(50%-0.75rem)]"`).
   * ScrollCarousel doesn't assume a slide count per view itself.
   */
  slideClassName?: string;
  /**
   * Lets a mouse pointer click-and-drag the track to scroll it, in addition
   * to native touch/trackpad scrolling (which already works regardless of
   * this prop). Off by default since it changes the track's cursor and
   * intercepts pointer events — opt in per consumer. @default false
   */
  draggable?: boolean;
}
