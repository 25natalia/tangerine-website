import type { Metadata } from "next";
import { CapabilitiesHero } from "@/components/capabilities-hero";
import { CapabilitiesCarousel } from "@/components/capabilities-carousel";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Capabilities",
  description:
    "No ofrecemos una lista de servicios sueltos. Ofrecemos capacidades: formas distintas de aplicar la misma manera de pensar a un problema distinto.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <CapabilitiesHero />
      <CapabilitiesCarousel />
    </>
  );
}
