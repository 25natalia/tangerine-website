import Image from "next/image";
import { cn } from "@/lib/utils";
import { getMascotPaths, MASCOT_WIDTH, MASCOT_HEIGHT, type MascotVariant } from "@/lib/mascot";

export interface MascotProps {
  /** Which of the five official poses. @default "default" */
  variant?: MascotVariant;
  alt?: string;
  className?: string;
}

/**
 * The single entry point for the mascot anywhere in the app — Hero sections,
 * Empty States, Templates, docs, showcases. Never hardcode
 * "/brand/mascot/lightmode/..." directly; use this instead.
 *
 * Theme switching is done with CSS, not a useTheme() hook: both the light
 * and dark file render into the DOM, and Tailwind's `dark:` variant (driven
 * by the class next-themes already sets on <html>, before hydration) shows
 * the right one. That means this stays a plain server component — no
 * "use client", no resolvedTheme-is-undefined-on-first-render flash, no
 * mounted-flag workaround. The same technique NavbarThemeToggle already
 * uses for its Sun/Moon icon swap.
 *
 * The Home hero (components/marketing/mascot-stage.tsx) is the reference
 * example of composing this component: motion (float, parallax, hover) is
 * layered on from outside via wrapping motion.div elements, never by
 * touching what's inside Mascot itself — so the light/dark logic here stays
 * the single source of truth no matter how elaborate the surrounding scene.
 */
export function Mascot({ variant = "default", alt = "Mascota de Tangerine", className }: MascotProps) {
  const { light, dark } = getMascotPaths(variant);
  return (
    <span className={cn("relative inline-block", className)}>
      <Image
        src={light}
        alt={alt}
        width={MASCOT_WIDTH}
        height={MASCOT_HEIGHT}
        className="block h-auto w-full dark:hidden"
      />
      <Image
        src={dark}
        alt={alt}
        width={MASCOT_WIDTH}
        height={MASCOT_HEIGHT}
        className="hidden h-auto w-full dark:block"
      />
    </span>
  );
}
