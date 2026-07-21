"use client";

import { ContactTemplate } from "@/components/templates/contact";
import { sendContactEmail } from "@/lib/actions/send-contact-email";

// Adjunta el origen de la visita a la misma FormData que ya se envía —
// nunca un script de analítica de terceros. showSocialProof en false: los
// clientes y la cita de "SocialProof" en el DS son contenido de demo, no
// reales (ver la nota en lib/templates/contact-data.ts).
export function SiteContactForm() {
  async function handleSubmit(data: FormData) {
    if (typeof document !== "undefined") {
      data.set("_referrer", document.referrer);
      data.set("_page", window.location.href);
    }
    await sendContactEmail(data);
  }

  return <ContactTemplate onSubmit={handleSubmit} showSocialProof={false} />;
}
