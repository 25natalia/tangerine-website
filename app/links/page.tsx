import type { Metadata } from "next";
import { LinksPage } from "@/components/links/links-page";
import { getVisibleLinks } from "@/content/links";
import { buildMetadata } from "@/lib/seo";

// Fuera de app/(marketing) a propósito: sin Navbar ni Footer del sitio.

export const metadata: Metadata = buildMetadata({
  title: "Links",
  description: "Natalia & Emy · diseño que se siente humano. Branding, webs y diseño de producto.",
  path: "/links",
});

// Se regenera cada hora para que los enlaces con `expiresAt` desaparezcan
// solos sin volver a desplegar.
export const revalidate = 3600;

export default function Page() {
  return <LinksPage links={getVisibleLinks()} />;
}
