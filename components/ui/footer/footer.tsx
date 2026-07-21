import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import type {
  FooterLinkGroupProps,
  FooterLinkProps,
  FooterProps,
  FooterSocialLinkProps,
  FooterTickerProps,
  FooterVariant,
} from "./types";

const paddingByVariant: Record<FooterVariant, string> = {
  creative: "py-20 sm:py-28",
  corporate: "py-16 sm:py-20",
  minimal: "py-8 sm:py-10",
  documentation: "py-8 sm:py-10",
  product: "py-10 sm:py-12",
};

const containerSizeByVariant: Record<FooterVariant, "wide" | "content"> = {
  creative: "wide",
  corporate: "wide",
  minimal: "wide",
  documentation: "content",
  product: "wide",
};

/**
 * `creative`/`corporate` reserve room for the giant background wordmark
 * (Zone 1's second brand asset); `minimal`/`documentation`/`product` don't
 * — a functional footer under docs content or inside a product shell isn't
 * the place for a full-bleed decorative brand moment.
 */
const showsWordmarkByVariant: Record<FooterVariant, boolean> = {
  creative: true,
  corporate: true,
  minimal: false,
  documentation: false,
  product: false,
};

/**
 * The root — a border-top surface whose padding/container width/decorative
 * wordmark flex with `variant`. Which zones actually render (mascot hero,
 * ticker, message, links, social) is left entirely to composition: pass
 * whichever `Footer*` children fit the context, the same way `<Navbar>`
 * leaves Brand/Links/Actions up to the consumer. See the README for the 5
 * full example compositions this maps to.
 */
function Footer({ variant = "creative", className, children }: FooterProps) {
  const showWordmark = showsWordmarkByVariant[variant];

  return (
    <footer
      data-variant={variant}
      className={cn("relative overflow-hidden border-t border-(--border-subtle) bg-(--surface-default)", className)}
    >
      {showWordmark ? (
        <Image
          src="/brand/logo.svg"
          alt=""
          aria-hidden="true"
          width={719}
          height={180}
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full max-w-none translate-y-[28%] opacity-[0.05] select-none dark:opacity-[0.07]"
        />
      ) : null}
      <Container size={containerSizeByVariant[variant]} className={cn("relative", paddingByVariant[variant])}>
        {children}
      </Container>
    </footer>
  );
}

function FooterMessage({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <p className={cn("font-display max-w-lg text-2xl leading-snug font-semibold text-balance sm:text-3xl", className)}>
      {children}
    </p>
  );
}

function FooterLinkGroup({ title, children, className }: FooterLinkGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h3 className="text-caption font-semibold tracking-wide text-(--text-tertiary) uppercase">{title}</h3>
      <nav className="flex flex-col gap-2.5" aria-label={title}>
        {children}
      </nav>
    </div>
  );
}

function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "text-body-sm w-fit text-(--text-secondary) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:text-(--text-primary) focus-visible:rounded-(--radius-sm) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)",
        className
      )}
    >
      {children}
    </a>
  );
}

function FooterSocialLinks({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} role="list" aria-label="Redes sociales">
      {children}
    </div>
  );
}

/**
 * A monogram badge, not a brand-logo SVG — verified lucide-react (already
 * the icon set everywhere else in this system) ships zero social icons
 * (Instagram/LinkedIn/GitHub/Behance/Twitter all absent, checked directly
 * against its exports). Hand-approximating exact trademarked logo paths
 * from memory risks both inaccuracy and reproducing a mark incorrectly;
 * a consistent monogram badge is honest about what it is and trivially
 * extensible — "preparado para futuras redes" is just one more entry, no
 * new icon to source.
 */
function FooterSocialLink({ label, href, monogram, className }: FooterSocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      role="listitem"
      className={cn(
        "text-caption inline-flex size-9 items-center justify-center rounded-(--radius-full) border border-(--border-default) font-semibold text-(--text-secondary) transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:border-(--border-brand) hover:bg-(--background-brand-subtle) hover:text-(--text-brand) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)",
        className
      )}
    >
      {monogram}
    </a>
  );
}

function FooterLegal({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-caption flex flex-col gap-2 border-t border-(--border-subtle) pt-6 text-(--text-tertiary) sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Duplicated once so translateX(-50%) is an invisible loop point — see the ticker-scroll keyframe in globals.css. */
function FooterTicker({ items, duration = 32, className }: FooterTickerProps) {
  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-(--border-subtle) py-4",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="flex w-max shrink-0 items-center gap-8 will-change-transform"
        style={{ animation: `ticker-scroll ${duration}s linear infinite` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8" aria-hidden={copy === 1 || undefined}>
            {items.map((item, i) => (
              <span key={i} className="text-body-sm flex shrink-0 items-center gap-8 font-medium whitespace-nowrap text-(--text-secondary)">
                {item}
                <span className="text-(--icon-brand)" aria-hidden="true">
                  •
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { Footer, FooterMessage, FooterLinkGroup, FooterLink, FooterSocialLinks, FooterSocialLink, FooterLegal, FooterTicker };
