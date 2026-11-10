"use client";

// Página "link in bio" (/links). Sin Navbar/Footer del sitio a propósito —
// vive fuera de app/(marketing) — pero con los mismos tokens, componentes y
// tipografía. Todo el contenido sale de content/links.ts.

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { LanguageToggle } from "@/components/language-toggle";
import { LinkButton } from "@/components/links/link-button";
import { LinksMascot } from "@/components/links/links-mascot";
import { GlobeIcon, InstagramIcon, ThreadsIcon } from "@/components/links/social-icons";
import { useLanguage } from "@/lib/i18n/language-context";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import {
  INSTAGRAM_URL,
  THREADS_URL,
  daysUntil,
  formatShortDate,
  linksPageCopy,
  type LinkItem,
} from "@/content/links";

const SKELETON_MS = 450;
const WORD_INTERVAL_MS = 2200;

const socials = [
  { label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
  { label: "Threads", href: THREADS_URL, Icon: ThreadsIcon },
  { label: "Web", href: "/", Icon: GlobeIcon },
];

/** Última palabra de la frase, rotando. Sin ancho reservado a propósito: la
 *  línea se recentra con cada palabra (el cambio ocurre mientras está invisible),
 *  así la frase siempre queda centrada visualmente. */
function RotatingWord({ words, reduceMotion }: { words: string[]; reduceMotion: boolean }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), WORD_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length]);

  const current = words[index % words.length];

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          aria-hidden="true"
          className="inline-block font-semibold text-(--text-brand)"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </>
  );
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export function LinksPage({ links }: { links: LinkItem[] }) {
  const { locale } = useLanguage();
  const copy = linksPageCopy[locale];
  const reduceMotion = usePrefersReducedMotion();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), reduceMotion ? 0 : SKELETON_MS);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-4 pt-5 pb-8 lg:max-w-5xl lg:px-8 lg:py-8">
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
              {copy.backToSite}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </header>

        {/* Mobile: una columna (perfil, enlaces, redes). Escritorio: perfil + redes a la
            izquierda, enlaces a la derecha, todo dentro del alto de la pantalla. */}
        <div className="flex flex-1 flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_1fr] lg:items-center lg:gap-x-16">
          <section className="mt-8 flex flex-col items-center text-center lg:col-start-1 lg:row-start-2 lg:mt-0">
            <LinksMascot />
            <h1 className="text-h3 mt-4 font-display font-bold text-(--text-primary)">{copy.name}</h1>
            <p className="text-body mt-1 text-(--text-secondary)">
              {copy.taglinePrefix}{" "}
              <RotatingWord words={copy.taglineWords} reduceMotion={reduceMotion} />
            </p>
            <p className="text-body-sm mt-3 flex flex-wrap items-center justify-center gap-x-2 font-medium text-(--text-tertiary)">
              {copy.services.map((service, i) => (
                <React.Fragment key={service}>
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-(--brand-tangerine)">
                      ·
                    </span>
                  ) : null}
                  <span>{service}</span>
                </React.Fragment>
              ))}
            </p>
          </section>

          <div className="mt-8 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0">
            {ready ? (
              <motion.ul
                className="grid auto-rows-fr gap-4"
                variants={list}
                initial={reduceMotion ? false : "hidden"}
                animate="show"
              >
                {links.map((link) => (
                  <motion.li key={link.id} variants={item} className="h-full">
                    <LinkButton
                      href={link.href}
                      icon={link.icon}
                      featured={link.featured}
                      title={link.title[locale]}
                      subtitle={link.subtitle[locale]}
                      badge={link.spotsLeft !== undefined ? copy.spots(link.spotsLeft) : link.badge?.[locale]}
                      urgent={link.spotsLeft !== undefined && link.spotsLeft > 0}
                      deadline={
                        link.showDeadline && link.expiresAt
                          ? copy.deadline(daysUntil(link.expiresAt), formatShortDate(link.expiresAt, locale))
                          : undefined
                      }
                    />
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <div role="status" aria-label={copy.loading} className="grid auto-rows-fr gap-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex min-h-26 items-center gap-3 rounded-(--radius-container) border border-(--border-subtle) p-4"
                  >
                    <Skeleton className="size-11 shrink-0 rounded-(--radius-full)" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <ul
            aria-label={copy.socialLabel}
            className="mt-8 flex items-center justify-center gap-3 lg:col-start-1 lg:row-start-3 lg:mt-6 lg:self-start"
          >
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-(--radius-full) border border-(--border-default) text-(--text-secondary) transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:border-(--border-brand) hover:bg-(--background-brand-subtle) hover:text-(--text-brand) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
