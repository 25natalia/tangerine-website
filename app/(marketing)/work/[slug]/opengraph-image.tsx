import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { OgCard, OG_SIZE, ACCENT_HEX } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.es.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Imagen OG generada en el servidor — usa siempre la versión ES (idioma
  // por defecto), igual que el resto de la metadata estática.
  const data = getCaseStudy(slug)?.es;

  return new ImageResponse(<OgCard accent={data ? ACCENT_HEX[data.accent] : undefined} />, { ...size });
}
