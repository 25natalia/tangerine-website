import { SITE_NAME, SITE_URL } from "@/lib/seo";

// `</script>` en un valor de string podría cerrar el tag antes de tiempo —
// no es teórico, es la forma estándar de evitar una inyección vía JSON-LD.
function toSafeJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toSafeJson(data) }}
    />
  );
}

// Sitewide — Volumen I confirma los nombres reales (Natalia García, Emy
// Dorado); `sameAs` queda deliberadamente afuera: los social links del
// Footer todavía están en "#", no son URLs reales que se puedan citar acá.
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo.svg`,
        email: "hola@tangerine.studio",
        founder: [
          { "@type": "Person", name: "Natalia García" },
          { "@type": "Person", name: "Emy Dorado" },
        ],
      }}
    />
  );
}

export function CreativeWorkJsonLd({
  name,
  description,
  path,
  client,
  datePublished,
}: {
  name: string;
  description: string;
  path: string;
  client: string;
  datePublished: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        description,
        url: `${SITE_URL}${path}`,
        creator: { "@type": "Organization", name: SITE_NAME },
        about: client,
        datePublished,
      }}
    />
  );
}

export function BreadcrumbListJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      }}
    />
  );
}
