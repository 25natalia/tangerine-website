import type { Metadata } from "next";
import { DiagnosticoPage } from "@/components/diagnostico/diagnostico-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Diagnóstico gratis",
  description:
    "Cuéntanos de tu proyecto y en 48 horas te enviamos por WhatsApp un video corto con 3 observaciones y una recomendación.",
  path: "/diagnostico",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

  return (
    <DiagnosticoPage
      origen={first(params.from) === "links" ? "links" : "directo"}
      utmSource={first(params.utm_source).slice(0, 60)}
    />
  );
}
