import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Studio" };

export default function StudioPage() {
  return (
    <Container size="content" className="py-24">
      <h1 className="font-display text-3xl font-bold">Studio</h1>
      <p className="mt-4 text-(--text-secondary)">Contenido real pendiente — Fase 3.</p>
    </Container>
  );
}
