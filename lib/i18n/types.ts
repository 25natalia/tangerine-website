// Los dos idiomas soportados por el toggle ES/EN — español es el idioma por
// defecto del sitio (ver LanguageProvider). Cualquier contenido bilingüe del
// proyecto (diccionarios de UI, content/case-studies, content/portfolio,
// lib/process, lib/templates/contact-data) se tipa contra este único Locale
// en vez de que cada archivo invente el suyo.

export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];

export const DEFAULT_LOCALE: Locale = "es";

/** Helper de tipos para "un valor de T por idioma soportado". */
export type Localized<T> = Record<Locale, T>;
