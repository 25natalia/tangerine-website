import type { Metadata } from "next";
import { RedisenoPage } from "@/components/rediseno/rediseno-page";
import { REDISENO_CIERRE } from "@/content/rediseno";
import { daysUntil } from "@/content/links";
import { isRedisenoOpen } from "@/lib/rediseno/validation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Rediseño express",
  description: "Inscribe tu marca y quizá la rediseñemos en un reel: el antes, el después y el porqué de cada decisión.",
  path: "/rediseno",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

  return (
    <RedisenoPage
      open={isRedisenoOpen()}
      daysLeft={daysUntil(REDISENO_CIERRE)}
      origen={first(params.from) === "links" ? "links" : "directo"}
      utmSource={first(params.utm_source).slice(0, 60)}
    />
  );
}
