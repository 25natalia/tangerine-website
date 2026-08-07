import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { NotFoundContent } from "@/components/not-found-content";

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
        <NotFoundContent />
      </main>
      <SiteFooter />
    </>
  );
}
