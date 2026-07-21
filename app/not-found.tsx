import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { NotFoundTemplate } from "@/components/templates/not-found";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

// Vive en la raíz (no en (marketing)) porque Next.js maneja cualquier URL
// no encontrada acá, fuera del árbol del grupo de rutas — por eso el chrome
// se compone a mano en vez de heredarlo de (marketing)/layout.tsx.
export default function NotFound() {
  return (
    <>
      <SiteNavbar />
      <main className="flex flex-1 flex-col">
        <NotFoundTemplate
          ctas={[
            { label: "Volver al inicio", href: "/", icon: "home", variant: "primary" },
            { label: "Ver el trabajo", href: "/work", icon: "grid", variant: "outline" },
            { label: "Conocer el estudio", href: "/studio", icon: "compass", variant: "ghost" },
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
