"use client";

// Encabezado mínimo de las páginas sin menú (/links, /diagnostico, /rediseno):
// el logo, el cambio de idioma y un enlace discreto a la web principal. Con
// `back`, agrega debajo un "← Volver" en el mismo lugar donde el resto del
// sitio pone sus breadcrumbs.

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";

export interface BackTarget {
  /** A dónde ir si no hay una página anterior de este mismo sitio (ej. entró directo desde Instagram). */
  href: string;
  label: string;
}

/**
 * "Volver": si la persona llegó desde otra página del sitio, regresa con el
 * historial (conserva el scroll y el estado de esa página). Si llegó de fuera,
 * navega a `href`.
 */
export function BackLink({ href, label }: BackTarget) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(event) => {
        let sameSite = false;
        try {
          sameSite = new URL(document.referrer).origin === window.location.origin;
        } catch {
          // Sin referrer (entrada directa): se usa el href.
        }
        if (sameSite && window.history.length > 1) {
          event.preventDefault();
          router.back();
        }
      }}
      className="group/back text-body-sm inline-flex items-center gap-1.5 self-start rounded-(--radius-sm) font-medium text-(--text-secondary) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:text-(--text-brand) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
    >
      <ArrowLeft
        aria-hidden="true"
        className="size-4 transition-transform duration-(--duration-base) ease-(--ease-spring) group-hover/back:-translate-x-1 group-active/back:-translate-x-1.5 motion-reduce:transition-none"
      />
      {label}
    </Link>
  );
}

/**
 * Destino de "volver" según de dónde llegó la persona (?from=links → /links).
 * `viaHistory`: para el BackLink del encabezado, que puede regresar a cualquier
 * página anterior del sitio — ahí el texto es solo "Volver" si no viene de links.
 */
export function getBackTarget(origen: string, locale: "es" | "en", viaHistory = false): BackTarget {
  if (origen === "links") return { href: "/links", label: locale === "es" ? "Volver a los links" : "Back to links" };
  if (viaHistory) return { href: "/", label: locale === "es" ? "Volver" : "Back" };
  return { href: "/", label: locale === "es" ? "Volver al inicio" : "Back to home" };
}

export function MinimalHeader({ backLabel, back }: { backLabel: string; back?: BackTarget }) {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="rounded-(--radius-sm) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
        >
          <Image src="/brand/logo.svg" alt="Tangerine Studio" width={96} height={24} className="h-6 w-auto" priority />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Link
            href="/"
            className="text-body-sm inline-flex items-center gap-0.5 rounded-(--radius-sm) font-medium text-(--text-secondary) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:text-(--text-brand) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
          >
            {backLabel}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </header>
      {back ? <BackLink {...back} /> : null}
    </div>
  );
}
