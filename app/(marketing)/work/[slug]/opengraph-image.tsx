import { ImageResponse } from "next/og";
import { caseStudies } from "@/content/case-studies";
import { OgCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.es.slug }));
}

export default function Image() {
  return new ImageResponse(<OgCard />, { ...size });
}
