import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Capabilities" };

export default function CapabilitiesPage() {
  return (
    <Container size="content" className="py-24">
      <h1 className="font-display text-3xl font-bold">Capabilities</h1>
      <p className="mt-4 text-(--text-secondary)">Contenido real pendiente — Fase 4.</p>
    </Container>
  );
}
