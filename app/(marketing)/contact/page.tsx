import type { Metadata } from "next";
import { SiteContactForm } from "@/components/site-contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Antes de proponer una solución, queremos entender tu proyecto.",
  path: "/contact",
});

export default function ContactPage() {
  return <SiteContactForm />;
}
