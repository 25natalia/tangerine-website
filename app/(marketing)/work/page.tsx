import type { Metadata } from "next";
import { WorkPageContent } from "@/components/work-page-content";
import { portfolio } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: portfolio.es.subtitle,
  path: "/work",
});

export default function WorkPage() {
  return <WorkPageContent />;
}
