"use client";

import { useState } from "react";
import { ContactTemplate } from "@/components/templates/contact";
import { ContactSuccessModal } from "@/components/contact-success-modal";
import { sendContactEmail } from "@/lib/actions/send-contact-email";

// Adjunta el origen de la visita a la misma FormData que ya se envía —
// nunca un script de analítica de terceros. showSocialProof en false: los
// clientes y la cita de "SocialProof" en el DS son contenido de demo, no
// reales (ver la nota en lib/templates/contact-data.ts).
//
// El modal de feedback (y el scroll instantáneo de vuelta al banner) viven
// acá, no dentro de `ContactForm` — ese es un componente portado del DS
// (ver ARCHITECTURE.md, regla 4: nunca se toca la lógica interna de un
// componente ya portado). `onSubmit` ya es el punto de extensión que expone
// para esto: en vez de esperar a que `ContactForm` cambie su propio estado
// interno a "success" (que sigue pasando, y sigue mostrando su Card inline
// si el visitante vuelve a bajar), este wrapper reacciona al mismo envío
// exitoso "de una" — sube la página al tope sin animación (`window.scrollTo`
// sin `behavior: "smooth"`, el pedido explícito de que no se sienta como un
// scroll gradual) y recién ahí abre el modal.
export function SiteContactForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  async function handleSubmit(data: FormData) {
    if (typeof document !== "undefined") {
      data.set("_referrer", document.referrer);
      data.set("_page", window.location.href);
    }
    await sendContactEmail(data);
    setSubmittedName(String(data.get("name") ?? "").trim());
    window.scrollTo(0, 0);
    setModalOpen(true);
  }

  return (
    <>
      <ContactTemplate onSubmit={handleSubmit} showSocialProof={false} />
      <ContactSuccessModal open={modalOpen} onOpenChange={setModalOpen} name={submittedName} />
    </>
  );
}
