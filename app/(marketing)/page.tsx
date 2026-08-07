import type { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";
import { HomeTicker } from "@/components/home-ticker";
import { HomeWhyExists } from "@/components/home-why-exists";
import { HomePhilosophy } from "@/components/home-philosophy";
import { HomeProcess } from "@/components/home-process";
import { HomeFaq } from "@/components/home-faq";
import { HomeClosing } from "@/components/home-closing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tangerine Studio",
  description:
    "Construimos marcas que no podrían pertenecerle a nadie más. No vendemos diseño. Construimos identidad.",
  path: "/",
  titleAbsolute: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeTicker />
      <HomeWhyExists />
      <HomePhilosophy />
      <HomeProcess />
      <HomeFaq />
      <HomeClosing />
    </>
  );
}
