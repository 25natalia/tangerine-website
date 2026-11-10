import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buildMetadata } from "@/lib/seo";

// Política de Tratamiento de Datos Personales — Ley 1581 de 2012 y Decreto
// 1377 de 2013 (compilado en el Decreto 1074 de 2015), Colombia.
//
// BORRADOR redactado por el equipo web: revisar con asesoría legal antes de
// publicar. Los datos entre [corchetes] los tiene que completar el estudio —
// no se inventan acá. Solo en español: es el idioma legal del documento.

export const metadata: Metadata = buildMetadata({
  title: "Política de tratamiento de datos",
  description: "Cómo The Tangerine Studio recolecta, usa y protege tus datos personales.",
  path: "/privacidad",
});

const LAST_UPDATE = "10 de noviembre de 2026";
const EMAIL = "tangerinestudio.col@gmail.com";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h4 font-display font-bold text-(--text-primary)">{title}</h2>
      <div className="text-body font-reading flex flex-col gap-3 text-(--text-secondary) [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-(--text-primary)">
        {children}
      </div>
    </section>
  );
}

export default function PrivacidadPage() {
  return (
    <Container size="reading" className="flex flex-col gap-10 pt-6 pb-16 sm:pt-8 sm:pb-24">
      {/* Mismo patrón de "volver" que los casos de estudio. */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Política de datos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="-mt-2 flex flex-col gap-3 sm:mt-2">
        <p className="text-overline text-(--text-brand) uppercase">Legal</p>
        <h1 className="text-h1 font-display font-bold text-balance text-(--text-primary)">
          Política de tratamiento de datos personales
        </h1>
        <p className="text-body-sm text-(--text-tertiary)">Última actualización: {LAST_UPDATE}</p>
      </header>

      <Section title="1. Quién es responsable de tus datos">
        <p>
          <strong>The Tangerine Studio</strong>, estudio de diseño de Natalia García y Emy Dorado, identificado con{" "}
          <strong>[NIT o cédula]</strong>, con domicilio en <strong>[Ciudad], Colombia</strong>, es el responsable del
          tratamiento de los datos personales que recolecta a través de este sitio web, sus formularios y sus canales
          de contacto.
        </p>
        <ul>
          <li>
            Correo: <a className="text-(--text-link) underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>WhatsApp: +57 302 864 9295</li>
        </ul>
      </Section>

      <Section title="2. Qué datos recolectamos">
        <p>Solo los que tú nos das voluntariamente o los necesarios para que el sitio funcione:</p>
        <ul>
          <li>
            <strong>Datos de contacto:</strong> nombre, correo electrónico y número de WhatsApp o teléfono.
          </li>
          <li>
            <strong>Datos de tu proyecto:</strong> nombre de tu marca o empresa, links que compartas (Instagram, sitio
            web, etc.), lo que nos cuentes en los formularios y cómo nos conociste.
          </li>
          <li>
            <strong>Datos de navegación:</strong> página de origen y parámetros de campaña (utm), y, solo si los
            aceptas, cookies de analítica. Ver la sección 7.
          </li>
        </ul>
        <p>No recolectamos datos sensibles ni datos de niños, niñas o adolescentes.</p>
      </Section>

      <Section title="3. Para qué los usamos">
        <ul>
          <li>Responder tus mensajes y solicitudes, incluido el diagnóstico gratis.</li>
          <li>Preparar y enviarte propuestas, cotizaciones o el diagnóstico que pediste.</li>
          <li>Escribirte por correo o WhatsApp sobre tu solicitud.</li>
          <li>Avisarte cuando se abran cupos, si te inscribiste en la lista de espera.</li>
          <li>Entender cómo se usa el sitio para mejorarlo (solo con tu autorización de cookies).</li>
        </ul>
        <p>No vendemos, alquilamos ni compartimos tus datos con terceros para fines comerciales.</p>
      </Section>

      <Section title="4. Con quién los compartimos">
        <p>
          Usamos proveedores tecnológicos que tratan los datos por cuenta nuestra (encargados) y solo para las
          finalidades de esta política:
        </p>
        <ul>
          <li>
            <strong>Resend</strong>: envío de los correos de los formularios.
          </li>
          <li>
            <strong>Google</strong> (Google Workspace / Sheets y Google Tag Manager): registro de solicitudes y, con tu
            autorización, analítica del sitio.
          </li>
          <li>
            <strong>El proveedor de hosting</strong> del sitio web.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores almacenan información fuera de Colombia, por ejemplo en Estados Unidos. Al
          aceptar esta política autorizas esa transferencia, que se hace con proveedores que ofrecen niveles adecuados
          de protección de datos.
        </p>
      </Section>

      <Section title="5. Tus derechos">
        <p>Como titular de tus datos puedes, en cualquier momento:</p>
        <ul>
          <li>Conocer, actualizar y rectificar tus datos.</li>
          <li>Pedir prueba de la autorización que nos diste.</li>
          <li>Saber cómo hemos usado tus datos.</li>
          <li>Revocar la autorización o pedir que eliminemos tus datos, cuando no exista un deber legal de conservarlos.</li>
          <li>Acceder gratis a tus datos.</li>
          <li>
            Presentar quejas ante la Superintendencia de Industria y Comercio (SIC), después de haber hecho tu consulta
            o reclamo ante nosotras.
          </li>
        </ul>
      </Section>

      <Section title="6. Cómo ejercerlos">
        <p>
          Escríbenos a <a className="text-(--text-link) underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> con tu nombre,
          el dato o la solicitud que quieres hacer y un medio para responderte.
        </p>
        <ul>
          <li>
            <strong>Consultas</strong> (qué datos tenemos y cómo los usamos): respondemos en máximo 10 días hábiles.
            Si necesitamos más tiempo te avisamos, y en ningún caso pasaremos de 5 días hábiles adicionales.
          </li>
          <li>
            <strong>Reclamos</strong> (corregir, actualizar, eliminar o revocar): respondemos en máximo 15 días
            hábiles, prorrogables hasta 8 días hábiles más, avisándote el motivo.
          </li>
        </ul>
      </Section>

      <Section title="7. Cookies">
        <p>
          Las cookies (y el almacenamiento local del navegador) son pequeños archivos que el navegador guarda para
          recordar información. En este sitio hay dos tipos:
        </p>
        <ul>
          <li>
            <strong>Necesarias:</strong> recuerdan tu idioma y tu elección sobre cookies. No se pueden desactivar
            porque sin ellas el sitio no funciona como esperas.
          </li>
          <li>
            <strong>Analítica:</strong> nos ayudan a saber qué páginas se visitan y de dónde llegan las personas, a
            través de Google Tag Manager. Solo se activan si las aceptas.
          </li>
        </ul>
        <p>
          Puedes cambiar tu elección borrando las cookies y los datos del sitio en tu navegador. La próxima vez que
          entres te volveremos a preguntar.
        </p>
      </Section>

      <Section title="8. Seguridad y conservación">
        <p>
          Protegemos tus datos con medidas técnicas y administrativas razonables, y solo acceden a ellos las personas
          del estudio que los necesitan para atender tu solicitud. Los conservamos mientras exista la relación contigo
          o mientras sean necesarios para las finalidades de esta política y para cumplir deberes legales.
        </p>
      </Section>

      <Section title="9. Vigencia y cambios">
        <p>
          Esta política rige desde el {LAST_UPDATE}. Si la cambiamos de forma importante, lo publicaremos en esta
          página antes de aplicarlo.
        </p>
      </Section>
    </Container>
  );
}
