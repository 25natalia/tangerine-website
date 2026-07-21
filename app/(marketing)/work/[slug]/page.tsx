import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/templates/case-study";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { CreativeWorkJsonLd, BreadcrumbListJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if (!data) return {};
  return buildMetadata({
    title: `${data.title} — ${data.client}`,
    description: data.summary[0],
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if (!data) notFound();

  // El año de origen puede venir como rango ("2025–2026") — para
  // datePublished (ISO 8601) solo el primer año es válido como valor de
  // precisión truncada.
  const firstYear = data.year.match(/\d{4}/)?.[0] ?? data.year;

  return (
    <>
      <CreativeWorkJsonLd
        name={data.title}
        description={data.summary[0]}
        path={`/work/${slug}`}
        client={data.client}
        datePublished={firstYear}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: data.title, path: `/work/${slug}` },
        ]}
      />
      <CaseStudyTemplate data={data} />
    </>
  );
}
