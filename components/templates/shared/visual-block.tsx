import { PatternImage } from "@/components/patterns/pattern-image";
import { getPattern, type PatternId } from "@/lib/patterns";
import { cn } from "@/lib/utils";
import { LazyVideo } from "./lazy-video";

export type TemplateAccent = "purple" | "green" | "tangerine" | "info" | "gold";

export interface VisualBlockVideo {
  src: string;
  /** Shown while the video hasn't loaded yet (it's network-lazy — see `LazyVideo`) and, under `prefers-reduced-motion`, shown permanently instead of the video. */
  poster?: string;
}

const accentBg: Record<TemplateAccent, string> = {
  purple: "bg-(--purple-50) dark:bg-(--purple-950)",
  green: "bg-(--green-50) dark:bg-(--green-950)",
  tangerine: "bg-(--tangerine-50) dark:bg-(--tangerine-950)",
  info: "bg-(--info-50) dark:bg-(--info-950)",
  gold: "bg-(--gold-50) dark:bg-(--gold-950)",
};

type VisualBlockProps =
  | { pattern: PatternId; accent?: TemplateAccent; animate?: boolean; video?: undefined; className?: string }
  | { video: VisualBlockVideo; pattern?: undefined; accent?: undefined; animate?: undefined; className?: string };

/**
 * Shared across every content template (Case Study, Portfolio, ...) as the
 * stand-in for project photography — a template ships no real client
 * photos, and a fabricated stock-photo look would be worse than an honest,
 * deliberate use of the Design System's own pattern library as imagery.
 *
 * `video` is the other mode a real consumer reaches for once it has actual
 * project footage: same container (rounded corners/overflow come from
 * whatever `className` the consumer already passes for the pattern case),
 * `LazyVideo` underneath instead of `PatternImage`. The two modes are a
 * discriminated union, not two independent optional props — a caller can't
 * accidentally pass both `pattern` and `video` and have one silently
 * ignored.
 */
export function VisualBlock(props: VisualBlockProps) {
  if (props.video) {
    return (
      <div className={cn("relative overflow-hidden", props.className)}>
        <LazyVideo src={props.video.src} poster={props.video.poster} />
      </div>
    );
  }

  const { pattern, accent = "purple", animate, className } = props;
  return (
    <div className={cn("relative overflow-hidden", accentBg[accent], className)}>
      <PatternImage pattern={getPattern(pattern)} animate={animate} className="size-full opacity-80" />
    </div>
  );
}
