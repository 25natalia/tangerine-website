import type { Metadata } from "next";
import { PortfolioTemplate } from "@/components/templates/portfolio";
import { portfolio } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description: portfolio.subtitle,
};

export default function WorkPage() {
  return <PortfolioTemplate data={portfolio} />;
}
