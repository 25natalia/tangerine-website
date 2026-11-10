// Contenido de /links (la página "link in bio" de Instagram). Única fuente de
// verdad: para agregar, quitar o reordenar un botón se edita SOLO este
// archivo — el diseño (components/links/*) no conoce ningún enlace concreto.
//
// - El orden del arreglo `links` es el orden en pantalla.
// - `active: false` oculta un botón sin borrarlo.
// - `expiresAt` (YYYY-MM-DD, hora de Colombia) lo oculta solo a partir del día
//   siguiente a esa fecha. app/links/page.tsx se regenera cada hora, así que
//   no hace falta volver a desplegar para que desaparezca.

import type { Localized } from "@/lib/i18n/types";

export type LinkIcon = "sparkles" | "whatsapp" | "projects" | "redesign";

export interface LinkItem {
  id: string;
  href: string;
  icon: LinkIcon;
  title: Localized<string>;
  subtitle: Localized<string>;
  /** Etiqueta corta (cupos, fecha límite...). */
  badge?: Localized<string>;
  /**
   * Cupos que quedan este mes. Reemplaza `badge` por "Quedan N cupos" con un
   * punto que late. Debe ser el número REAL — actualizarlo a mano cada vez que
   * se toma un cupo (y volver a 5 al empezar el mes). En 0 muestra "Sin cupos
   * este mes" sin el punto.
   */
  spotsLeft?: number;
  /** Botón principal, destacado visualmente. Usar en uno solo. */
  featured?: boolean;
  /** @default true */
  active?: boolean;
  /** Último día visible, YYYY-MM-DD. */
  expiresAt?: string;
  /** Muestra dentro de la card "Cierra en N días · fecha", calculado desde `expiresAt`. */
  showDeadline?: boolean;
}

const WHATSAPP_NUMBER = "573028649295";

function whatsapp(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const INSTAGRAM_URL = "https://www.instagram.com/the.tangerine.studio/";
export const THREADS_URL = "https://www.threads.com/@the.tangerine.studio";

export const links: LinkItem[] = [
  {
    id: "diagnostico",
    featured: true,
    // TODO: reemplazar por la URL real del formulario de diagnóstico.
    href: "[URL_FORMULARIO_DIAGNOSTICO]",
    icon: "sparkles",
    title: { es: "Te decimos qué mejorar, gratis", en: "We'll tell you what to improve, free" },
    subtitle: {
      es: "3 observaciones sobre tu marca, web o producto en 48 h",
      en: "3 notes on your brand, website or product in 48 h",
    },
    spotsLeft: 3,
  },
  {
    id: "whatsapp",
    href: whatsapp("Hola Tangerine, vengo de Instagram y quiero contarles de mi proyecto"),
    icon: "whatsapp",
    title: { es: "Cuéntanos tu proyecto", en: "Tell us about your project" },
    subtitle: {
      es: "Escríbenos por WhatsApp, respondemos nosotras",
      en: "Message us on WhatsApp, we answer ourselves",
    },
  },
  {
    id: "proyectos",
    href: "/work",
    icon: "projects",
    title: { es: "Mira nuestros proyectos", en: "See our projects" },
    subtitle: {
      es: "Del boceto al resultado, con el porqué de cada decisión",
      en: "From sketch to result, with the why behind every decision",
    },
  },
  {
    id: "rediseno-express",
    // TODO: reemplazar por la URL real del formulario de rediseño.
    href: "[URL_FORMULARIO_REDISENO]",
    icon: "redesign",
    title: { es: "Rediseño express", en: "Express redesign" },
    subtitle: {
      es: "Inscribe tu marca y quizá la rediseñemos en un reel",
      en: "Sign up your brand and we might redesign it in a reel",
    },
    showDeadline: true,
    active: true,
    expiresAt: "2026-11-26",
  },
];

export const linksPageCopy: Localized<{
  name: string;
  taglinePrefix: string;
  /** Palabras que rotan al final de la frase; la primera es la que se ve sin animación. */
  taglineWords: string[];
  services: string[];
  backToSite: string;
  socialLabel: string;
  spots: (left: number) => string;
  deadline: (daysLeft: number, date: string) => string;
  loading: string;
  newTab: string;
}> = {
  es: {
    name: "The Tangerine Studio",
    taglinePrefix: "Natalia & Emy · diseño que se siente",
    taglineWords: ["humano", "tuyo", "cercano", "honesto", "vivo"],
    services: ["Branding", "Webs", "Diseño de producto"],
    backToSite: "Ir a la web",
    socialLabel: "Redes sociales",
    deadline: (days, date) =>
      `${days <= 0 ? "Cierra hoy" : days === 1 ? "Cierra mañana" : `Cierra en ${days} días`} · ${date}`,
    spots: (left) =>
      left <= 0 ? "Sin cupos este mes" : left === 1 ? "Queda 1 cupo este mes" : `Quedan ${left} cupos este mes`,
    loading: "Cargando enlaces",
    newTab: "(se abre en una pestaña nueva)",
  },
  en: {
    name: "The Tangerine Studio",
    taglinePrefix: "Natalia & Emy · design that feels",
    taglineWords: ["human", "yours", "close", "honest", "alive"],
    services: ["Branding", "Websites", "Product design"],
    backToSite: "Go to website",
    socialLabel: "Social media",
    deadline: (days, date) =>
      `${days <= 0 ? "Closes today" : days === 1 ? "Closes tomorrow" : `Closes in ${days} days`} · ${date}`,
    spots: (left) =>
      left <= 0 ? "No spots left this month" : left === 1 ? "Only 1 spot left this month" : `Only ${left} spots left this month`,
    loading: "Loading links",
    newTab: "(opens in a new tab)",
  },
};

/** Fecha de hoy en Colombia (YYYY-MM-DD) — independiente de la zona del servidor. */
function todayInBogota(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(now);
}

/** Días que faltan (en Colombia) hasta `date` (YYYY-MM-DD). 0 = es hoy. */
export function daysUntil(date: string, now = new Date()) {
  const toUtc = (d: string) => {
    const [y, m, day] = d.split("-").map(Number);
    return Date.UTC(y, m - 1, day);
  };
  return Math.round((toUtc(date) - toUtc(todayInBogota(now))) / 86_400_000);
}

/** "26 nov" / "Nov 26". Se fija a mediodía UTC para que ninguna zona horaria cambie el día. */
export function formatShortDate(date: string, locale: "es" | "en") {
  return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date(`${date}T12:00:00Z`))
    .replace(".", "");
}

export function getVisibleLinks(now = new Date()): LinkItem[] {
  const today = todayInBogota(now);
  return links.filter(
    (link) => link.active !== false && (!link.expiresAt || today <= link.expiresAt)
  );
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
