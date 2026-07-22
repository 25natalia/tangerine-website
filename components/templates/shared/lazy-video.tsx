"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Background video for `VisualBlock`'s `video` mode. Network-lazy and
 * playback-lazy, deliberately two separate gates:
 *
 * - `src` stays unset until the element first enters the viewport (via
 *   IntersectionObserver, `rootMargin` pre-loads it slightly ahead of
 *   scroll instead of at the exact edge) — nothing downloads for a video
 *   the visitor never scrolls to.
 * - Once loaded, `src` is never cleared again — only `play()`/`pause()`
 *   toggle after that, driven by the same observer. Clearing `src` on every
 *   exit would force a full re-fetch on every re-entry instead of resuming
 *   an already-buffered video, trading a little idle memory for avoiding
 *   that network thrash.
 *
 * Same reduced-motion contract as the rest of this DS (Carousel,
 * ScrollCarousel, FloatingElement): under `prefers-reduced-motion`, the
 * video never loads at all and `poster` stands in permanently — off, not
 * just calmer.
 */
export function LazyVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const reduceMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasLoaded(true);
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !hasLoaded) return;
    if (visible) el.play().catch(() => {});
    else el.pause();
  }, [visible, hasLoaded]);

  return (
    <video
      ref={ref}
      src={!reduceMotion && hasLoaded ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={cn("size-full object-cover", className)}
    />
  );
}
