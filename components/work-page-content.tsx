"use client";

import { PortfolioTemplate } from "@/components/templates/portfolio";
import { portfolio } from "@/content/portfolio";
import { useLanguage } from "@/lib/i18n/language-context";

// app/(marketing)/work/page.tsx es un Server Component (dueño de
// `metadata`) y no puede leer el idioma activo del cliente — por eso la
// selección de `portfolio[locale]` vive acá, en un wrapper cliente separado.
export function WorkPageContent() {
  const { locale } = useLanguage();
  return <PortfolioTemplate data={portfolio[locale]} showFeatured={false} showStats={false} showTimeline={false} />;
}
