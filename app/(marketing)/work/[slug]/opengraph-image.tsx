import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { OgCard, OG_SIZE, ACCENT_HEX } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCaseStudy(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={data?.client ?? "Tangerine Studio"}
        title={data?.title ?? "Work"}
        accent={data ? ACCENT_HEX[data.accent] : undefined}
      />
    ),
    { ...size }
  );
}
