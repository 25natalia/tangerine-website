import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Flat, stylized application frames — not photorealistic mockups (this
 * project has no image-compositing tool). Each is an honest silhouette of
 * the real object, sized to its real aspect ratio, with a pattern dropped in
 * as its background/texture. Good enough to judge legibility and scale;
 * not a substitute for an actual print proof before production.
 */

function MockupFrame({
  label,
  className,
  children,
  frameClassName,
}: {
  label: string;
  className?: string;
  frameClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("overflow-hidden rounded-(--radius-md) border border-border bg-card shadow-(--shadow-elevation-2)", frameClassName)}>
        {children}
      </div>
      <p className="text-caption text-(--text-tertiary)">{label}</p>
    </div>
  );
}

function WebsiteHeroMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Website / Hero" className="w-full" frameClassName="aspect-[16/7] w-full">
      {children}
    </MockupFrame>
  );
}

function FooterMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Footer" className="w-full" frameClassName="aspect-[16/4] w-full">
      {children}
    </MockupFrame>
  );
}

function BusinessCardMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Tarjeta" frameClassName="aspect-[1.75/1] w-56">
      {children}
    </MockupFrame>
  );
}

function SocialPostMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Post (1:1)" frameClassName="aspect-square w-48">
      {children}
    </MockupFrame>
  );
}

function StoryMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Story (9:16)" frameClassName="aspect-[9/16] w-32">
      {children}
    </MockupFrame>
  );
}

function PresentationMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Presentación (16:9)" frameClassName="aspect-video w-64">
      {children}
    </MockupFrame>
  );
}

function PackagingMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Packaging" frameClassName="aspect-square w-40">
      {children}
    </MockupFrame>
  );
}

function StickerMockup({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="size-28 overflow-hidden rounded-full border border-border shadow-(--shadow-elevation-2)">
        {children}
      </div>
      <p className="text-caption text-(--text-tertiary)">Sticker</p>
    </div>
  );
}

function NotebookMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Cuaderno / Libreta" frameClassName="aspect-[3/4] w-36">
      {children}
    </MockupFrame>
  );
}

function PosterMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Poster (2:3)" frameClassName="aspect-[2/3] w-44">
      {children}
    </MockupFrame>
  );
}

/** A magazine spread — two pages side by side with a visible center gutter. */
function EditorialMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Editorial (spread)" frameClassName="aspect-[16/10] w-72">
      <div className="relative flex size-full">
        <div className="w-1/2">{children}</div>
        <div className="w-1/2 bg-card" />
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
      </div>
    </MockupFrame>
  );
}

/** A page silhouette — a nav bar, a hero band carrying the pattern, then flat content bars. */
function LandingPageMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Landing Page" frameClassName="aspect-[3/4] w-52">
      <div className="flex size-full flex-col">
        <div className="flex h-[8%] shrink-0 items-center gap-1 border-b border-border px-2">
          <span className="size-1.5 rounded-full bg-(--icon-subtle)" />
          <span className="h-1 w-8 rounded-full bg-(--background-strong)" />
        </div>
        <div className="h-[32%] shrink-0">{children}</div>
        <div className="flex-1 space-y-1.5 bg-card p-2">
          <span className="block h-1.5 w-2/3 rounded-full bg-(--background-strong)" />
          <span className="block h-1.5 w-1/2 rounded-full bg-(--background-strong)" />
          <span className="mt-2 block h-1.5 w-full rounded-full bg-(--background-subtle)" />
          <span className="block h-1.5 w-full rounded-full bg-(--background-subtle)" />
        </div>
      </div>
    </MockupFrame>
  );
}

/** A plain full-bleed swatch — no chrome — for judging a pattern purely as a background fill. */
function BackgroundMockup({ children }: { children: ReactNode }) {
  return (
    <MockupFrame label="Fondo" frameClassName="aspect-video w-72">
      {children}
    </MockupFrame>
  );
}

function MerchMockup({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-32">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-(--border-default)" fill="none">
          <path
            d="M30 15 L20 28 L30 38 L35 32 V90 H65 V32 L70 38 L80 28 L70 15 C70 22 61 26 50 26 C39 26 30 22 30 15Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <div className="absolute inset-x-[32%] inset-y-[38%] overflow-hidden rounded-(--radius-xs)">{children}</div>
      </div>
      <p className="text-caption text-(--text-tertiary)">Merchandising (playera / bolsa)</p>
    </div>
  );
}

export {
  MockupFrame,
  WebsiteHeroMockup,
  FooterMockup,
  BusinessCardMockup,
  SocialPostMockup,
  StoryMockup,
  PresentationMockup,
  PackagingMockup,
  StickerMockup,
  NotebookMockup,
  MerchMockup,
  PosterMockup,
  EditorialMockup,
  LandingPageMockup,
  BackgroundMockup,
};
