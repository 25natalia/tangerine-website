import Image from "next/image";

/**
 * A decorative band between Hero and "Por qué existe" — same mechanism
 * `FooterTicker` already uses (components/ui/footer/footer.tsx): duplicate
 * the content once so `translateX(-50%)` is an invisible loop point, drive
 * it with the `ticker-scroll` keyframe already in globals.css (no new CSS
 * needed), let the global `prefers-reduced-motion` rule collapse it to a
 * static frame automatically. Unlike FooterTicker this wraps a single wide
 * pre-rendered SVG (public/illustrations/deco/ticker.svg) instead of mapped
 * text items, so it's its own small component rather than a reused prop API.
 *
 * Purely decorative — aria-hidden, empty alt — and intentionally full-bleed
 * (no Container) since a marquee reads as a band, not a column of content.
 */
export function HomeTicker() {
  return (
    <div aria-hidden="true" className="relative flex overflow-hidden">
      <div className="flex w-max shrink-0 items-center will-change-transform" style={{ animation: "ticker-scroll 34s linear infinite" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            <Image
              src="/illustrations/deco/ticker.svg"
              alt=""
              width={5388}
              height={240}
              className="h-14 w-auto shrink-0 sm:h-16 lg:h-20"
              priority={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
