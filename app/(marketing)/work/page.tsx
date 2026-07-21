import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <Container size="content" className="py-24">
      <h1 className="font-display text-3xl font-bold">Work</h1>
      <p className="mt-4 text-(--text-secondary)">Contenido real pendiente — Fase 5 (Case Study + Portfolio Template).</p>
    </Container>
  );
}
