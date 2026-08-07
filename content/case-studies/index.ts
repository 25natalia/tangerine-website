import type { CaseStudyData } from "@/lib/templates/case-study";
import type { Localized } from "@/lib/i18n/types";
import { alegraVeneersCali } from "./alegra-veneers-cali";
import { simer } from "./simer";
import { unaNoche } from "./una-noche";
import { margaritaBurgos } from "./margarita-burgos";
import { quickbite } from "./quickbite";

// Orden = el orden real en que se presenta el portfolio (ver content/portfolio.ts).
// Cada entrada trae ambos idiomas (`{ es, en }`) — el slug es idéntico en
// las dos versiones, así que se puede buscar/generar rutas sin conocer el
// idioma activo.
export const caseStudies: Localized<CaseStudyData>[] = [alegraVeneersCali, simer, unaNoche, margaritaBurgos, quickbite];

export function getCaseStudy(slug: string): Localized<CaseStudyData> | undefined {
  return caseStudies.find((cs) => cs.es.slug === slug);
}

export { alegraVeneersCali, simer, unaNoche, margaritaBurgos, quickbite };
