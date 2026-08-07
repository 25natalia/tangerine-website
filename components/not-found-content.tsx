"use client";

import { NotFoundTemplate } from "@/components/templates/not-found";
import { useLanguage } from "@/lib/i18n/language-context";

// app/not-found.tsx vive en la raíz y es un Server Component simple (Next.js
// lo usa para cualquier URL no encontrada) — los CTAs reales del sitio
// necesitan `useLanguage()`, así que viven en este wrapper cliente.
export function NotFoundContent() {
  const { t } = useLanguage();
  return (
    <NotFoundTemplate
      ctas={[
        { label: t.notFound.ctas.home, href: "/", icon: "home", variant: "primary" },
        { label: t.notFound.ctas.work, href: "/work", icon: "grid", variant: "outline" },
        { label: t.notFound.ctas.studio, href: "/studio", icon: "compass", variant: "ghost" },
      ]}
    />
  );
}
