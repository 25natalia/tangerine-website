import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/templates/case-study";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { CreativeWorkJsonLd, BreadcrumbListJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.es.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if (!data) return {};
  // La metadata se renderiza en el servidor, antes de que el cliente elija
  // idioma — usa siempre la versión ES (idioma por defecto del sitio, ver
  // LanguageProvider). El toggle ES/EN solo cambia el contenido ya
  // hidratado en el navegador, nunca esta metadata estática.
  return buildMetadata({
    title: `${data.es.title}: ${data.es.client}`,
    description: data.es.summary[0],
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
  const firstYear = data.es.year.match(/\d{4}/)?.[0] ?? data.es.year;

  return (
    <>
      <CreativeWorkJsonLd
        name={data.es.title}
        description={data.es.summary[0]}
        path={`/work/${slug}`}
        client={data.es.client}
        datePublished={firstYear}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: data.es.title, path: `/work/${slug}` },
        ]}
      />
      <CaseStudyTemplate dataByLocale={data} />
    </>
  );
}
