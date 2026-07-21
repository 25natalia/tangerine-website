import type { Metadata } from "next";
import { PortfolioTemplate } from "@/components/templates/portfolio";
import { portfolio } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: portfolio.subtitle,
  path: "/work",
});

export default function WorkPage() {
  return <PortfolioTemplate data={portfolio} />;
}
