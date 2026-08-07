"use client";

import * as React from "react";
import { DEFAULT_LOCALE, type Locale } from "./types";
import { es } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/es";

const STORAGE_KEY = "tangerine-lang";

const dictionaries: Record<Locale, Dictionary> = { es, en };

function isLocale(value: string | null): value is Locale {
  return value === "es" || value === "en";
}

// Mismo mecanismo que usePrefersReducedMotion (lib/use-prefers-reduced-motion.ts)
// para el mismo problema: un valor que solo existe en el cliente (acá,
// localStorage) y que puede legítimamente diferir del snapshot que el
// servidor renderizó. `useSyncExternalStore` reconcilia eso sin mismatch de
// hidratación y sin llamar a setState dentro de un efecto.
type Listener = () => void;
const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    // localStorage puede no estar disponible (modo privado, políticas de
    // cookies, etc.) — el idioma por defecto sigue siendo una experiencia
    // completa, así que no hace falta propagar el error.
    return DEFAULT_LOCALE;
  }
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function writeStoredLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ver nota en getSnapshot — persistencia best-effort, no bloqueante.
  }
  emitChange();
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Diccionario ya resuelto para el idioma activo — lo que consume cada componente. */
  t: Dictionary;
}

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = React.useCallback((next: Locale) => {
    writeStoredLocale(next);
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === "es" ? "en" : "es");
  }, [locale, setLocale]);

  const value = React.useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, toggleLocale, t: dictionaries[locale] }),
    [locale, setLocale, toggleLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de <LanguageProvider>.");
  return ctx;
}
