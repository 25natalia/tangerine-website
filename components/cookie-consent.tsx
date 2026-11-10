"use client";

// Aviso de cookies. Aparece en la primera visita (en cualquier página) y no
// bloquea el contenido. Se integra con Google Consent Mode v2: el layout raíz
// arranca con analytics_storage = "denied" antes de cargar GTM, y este aviso lo
// actualiza a "granted" solo si la persona acepta. La publicidad (ad_*) queda
// siempre en "denied" — el sitio no hace remarketing.
//
// La elección se guarda en localStorage (clave CONSENT_KEY) — es el único dato
// que este aviso guarda, y es necesario para no volver a preguntar. Clave en lib/consent.ts.

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { CONSENT_KEY } from "@/lib/consent";

type Consent = "granted" | "denied";

const copy = {
  es: {
    label: "Aviso de cookies",
    title: "¿Te parece si usamos cookies? 🍊",
    body: "Las usamos solo para entender cómo se usa la web y mejorarla. Nada de publicidad. Tú decides.",
    more: "Política de datos",
    accept: "Aceptar",
    reject: "Solo las necesarias",
  },
  en: {
    label: "Cookie notice",
    title: "Mind if we use cookies? 🍊",
    body: "We only use them to understand how the site is used and improve it. No ads. Your call.",
    more: "Data policy",
    accept: "Accept",
    reject: "Only necessary",
  },
};

// Mismo patrón que LanguageProvider: un valor que solo existe en el cliente,
// leído con useSyncExternalStore para no romper la hidratación.
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function getSnapshot(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}
/** En el servidor no sabemos — se asume "ya decidió" para no pintar el aviso en el HTML. */
function getServerSnapshot(): Consent | null {
  return "denied";
}

function saveConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Sin almacenamiento disponible: se aplica igual para esta visita.
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: value });
  for (const listener of listeners) listener();
}

export function CookieConsent() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const consent = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {consent === null ? (
        <motion.div
          role="region"
          aria-label={t.label}
          className="fixed inset-x-0 bottom-0 z-(--z-toast) flex justify-center p-3 sm:p-4"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex w-full max-w-md flex-col gap-3 rounded-(--radius-overlay) border border-(--border-default) bg-(--surface-default) p-4 text-(--text-primary) shadow-(--shadow-elevation-4) sm:p-5">
            <div className="flex flex-col gap-1">
              <p className="text-subtitle font-display font-semibold">{t.title}</p>
              <p className="text-body-sm text-(--text-secondary)">
                {t.body}{" "}
                <Link href="/privacidad" className="font-medium text-(--text-link) underline underline-offset-2">
                  {t.more}
                </Link>
              </p>
            </div>
            <div className="flex flex-col-reverse gap-2 sm:grid sm:grid-cols-2">
              <Button variant="outline" size="lg" onClick={() => saveConsent("denied")}>
                {t.reject}
              </Button>
              <Button size="lg" onClick={() => saveConsent("granted")}>
                {t.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
