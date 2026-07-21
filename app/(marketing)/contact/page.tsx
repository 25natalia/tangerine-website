import type { Metadata } from "next";
import { SiteContactForm } from "@/components/site-contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Antes de proponer una solución, queremos entender tu proyecto.",
};

export default function ContactPage() {
  return <SiteContactForm />;
}
