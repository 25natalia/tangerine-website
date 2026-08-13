import type { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";
import { HomeWhyExists } from "@/components/home-why-exists";
import { HomeWhatWeCreate } from "@/components/home-what-we-create";
import { HomePhilosophy } from "@/components/home-philosophy";
import { HomeFaq } from "@/components/home-faq";
import { HomeClosing } from "@/components/home-closing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tangerine Studio",
  description:
    "Somos un estudio creativo que transforma ideas en marcas, productos y experiencias que conectan con las personas.",
  path: "/",
  titleAbsolute: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeWhyExists />
      <HomeWhatWeCreate />
      <HomePhilosophy />
      <HomeFaq />
      <HomeClosing />
    </>
  );
}
