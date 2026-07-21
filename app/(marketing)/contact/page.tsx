import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Container size="content" className="py-24">
      <h1 className="font-display text-3xl font-bold">Contact</h1>
      <p className="mt-4 text-(--text-secondary)">Contenido real pendiente — Fase 6 (Contact Template).</p>
    </Container>
  );
}
