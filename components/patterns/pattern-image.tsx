import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Pattern } from "@/lib/patterns";

/**
 * Displays one of the five authored pattern SVGs at real resolution — no
 * tinting, no scale prop. These are static, pre-colored assets (the "source
 * of truth" the brief hands over), so the only real variables left to the
 * consumer are the crop/aspect of the frame around them and whether the
 * ambient drift loop is on. Unlike the old generated tiles, sizing here is
 * purely a CSS concern (object-cover on a sized box), not a prop that
 * regenerates geometry.
 */
export function PatternImage({
  pattern,
  animate = false,
  className,
  imgClassName,
}: {
  pattern: Pattern;
  animate?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={pattern.file}
        alt={`Patrón ${pattern.name} de Tangerine Studio`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "object-cover",
          animate && "motion-safe:animate-[pattern-drift_var(--pattern-duration-slower)_var(--pattern-ease)_infinite]",
          imgClassName
        )}
      />
    </div>
  );
}
