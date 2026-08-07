import type { Metadata } from "next";
import { StudioIntro } from "@/components/studio-intro";
import { StudioOrigin } from "@/components/studio-origin";
import { StudioManifesto } from "@/components/studio-manifesto";
import { StudioValues } from "@/components/studio-values";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Studio",
  description:
    "Natalia García y Emy Dorado notaron esto: que el mundo se había llenado de cosas bien hechas y vacías.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <>
      <StudioIntro />
      <StudioOrigin />
      <StudioManifesto />
      <StudioValues />
    </>
  );
}
