import type { CaseStudyData } from "@/lib/templates/case-study";
import { alegraVeneersCali } from "./alegra-veneers-cali";
import { simer } from "./simer";
import { unaNoche } from "./una-noche";
import { margaritaBurgos } from "./margarita-burgos";
import { quickbite } from "./quickbite";

// Orden = el orden real en que se presenta el portfolio (ver content/portfolio.ts).
export const caseStudies: CaseStudyData[] = [alegraVeneersCali, simer, unaNoche, margaritaBurgos, quickbite];

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export { alegraVeneersCali, simer, unaNoche, margaritaBurgos, quickbite };
