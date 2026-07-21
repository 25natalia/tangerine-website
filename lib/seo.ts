import type { Metadata } from "next";

// Única fuente de verdad para todo lo que la metadata necesita repetir en
// cada página — Next.js reemplaza (no combina) `openGraph`/`twitter` por
// completo cuando una página define los suyos, así que un helper compartido
// es lo que evita que una página termine con un og:title correcto pero un
// og:site_name faltante, o algo por el estilo.

export const SITE_NAME = "Tangerine Studio";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Ruta relativa (ej. "/work/simer") — se resuelve contra metadataBase. */
  path: string;
  /**
   * Evita que el `title.template` del layout raíz ("%s · Tangerine Studio")
   * se aplique — solo hace falta en Home, donde el título ya ES "Tangerine
   * Studio" y aplicar el template duplicaría el nombre.
   */
  titleAbsolute?: boolean;
}

export function buildMetadata({ title, description, path, titleAbsolute = false }: BuildMetadataInput): Metadata {
  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "es",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
