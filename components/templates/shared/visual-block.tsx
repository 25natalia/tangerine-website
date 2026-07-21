import { PatternImage } from "@/components/patterns/pattern-image";
import { getPattern, type PatternId } from "@/lib/patterns";
import { cn } from "@/lib/utils";

export type TemplateAccent = "purple" | "green" | "tangerine" | "info" | "gold";

const accentBg: Record<TemplateAccent, string> = {
  purple: "bg-(--purple-50) dark:bg-(--purple-950)",
  green: "bg-(--green-50) dark:bg-(--green-950)",
  tangerine: "bg-(--tangerine-50) dark:bg-(--tangerine-950)",
  info: "bg-(--info-50) dark:bg-(--info-950)",
  gold: "bg-(--gold-50) dark:bg-(--gold-950)",
};

/**
 * Shared across every content template (Case Study, Portfolio, ...) as the
 * stand-in for project photography — a template ships no real client
 * photos, and a fabricated stock-photo look would be worse than an honest,
 * deliberate use of the Design System's own pattern library as imagery. A
 * real project page built from any of these templates replaces every
 * `VisualBlock` with an actual `<Image>` of the real work; nothing else
 * about the section components needs to change to support that (they only
 * care that they receive a `ReactNode`, not this specific component).
 */
export function VisualBlock({
  pattern,
  accent = "purple",
  animate = false,
  className,
}: {
  pattern: PatternId;
  accent?: TemplateAccent;
  animate?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", accentBg[accent], className)}>
      <PatternImage pattern={getPattern(pattern)} animate={animate} className="size-full opacity-80" />
    </div>
  );
}
