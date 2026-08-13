// Shell compartido por las OG images (raíz, Studio/Work/Contact, case
// studies). ImageResponse (Satori) solo soporta un subconjunto de CSS vía
// flexbox/posición absoluta — nada de Tailwind, nada de var(--token) — por
// eso los valores acá son hex literales copiados de tokens/color/primitive
// .tokens.json, no clases. Los `<img src>` necesitan una URL absoluta (no
// una ruta relativa): Satori los resuelve en el servidor, no en el
// navegador, así que se arman con `SITE_URL`.

import { SITE_URL } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

/** Hex reales de tokens/color/primitive.tokens.json — CaseStudyAccent no
 * tiene una versión "para renderizar fuera de Tailwind", así que se repite
 * acá el valor concreto en vez de intentar resolver un var(--token). */
export const ACCENT_HEX: Record<"purple" | "green" | "tangerine" | "info" | "gold", string> = {
  purple: "#5434e2",
  green: "#00a254",
  tangerine: "#ff7401",
  info: "#2f7de1",
  gold: "#ffca00",
};

const NEUTRAL_0 = "#FCFBFF";
const NEUTRAL_1000 = "#1E1E1E";
const TEXT_SECONDARY = "#5C5C68";
const PURPLE_600 = "#5434E2";
const TANGERINE_500 = "#FF7401";

/**
 * Mismo lenguaje visual que el Hero real del sitio (`components/home-hero.tsx`):
 * fondo claro (el mismo `--background-default` real, no un card oscuro),
 * eyebrow chico en violeta, título grande y oscuro, la mascota como
 * protagonista visual con un puñado de geometrías chicas alrededor — nunca
 * un cartel de texto ("letrero"). El wordmark "tangerine" arriba a la
 * izquierda es el único elemento nuevo que el Hero no tiene — estándar de
 * industria para que la marca se reconozca incluso si la imagen se recorta
 * en la vista previa de un link.
 *
 * `accent` (usado hoy solo por los case studies, uno por proyecto) tiñe el
 * pequeño tag redondeado debajo del eyebrow — el único lugar donde ese
 * color entra, para no competir con la paleta fija de las geometrías.
 */
export function OgCard({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: NEUTRAL_0,
        padding: 76,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 620,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: TANGERINE_500, marginBottom: 48 }}>
          tangerine
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1.5,
              color: PURPLE_600,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          {accent ? (
            <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: accent }} />
          ) : null}
        </div>

        <div style={{ display: "flex", fontSize: 54, fontWeight: 800, lineHeight: 1.18, color: NEUTRAL_1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: TEXT_SECONDARY, marginTop: 28 }}>
          tangerine.studio
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
        <img
          src={`${SITE_URL}/illustrations/geometry/flor-lime.svg`}
          width={76}
          height={79}
          style={{ position: "absolute", top: 24, left: 20 }}
        />
        <img
          src={`${SITE_URL}/illustrations/deco/star-violet.svg`}
          width={54}
          height={54}
          style={{ position: "absolute", bottom: 48, left: 0 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/hoja-orange.svg`}
          width={58}
          height={55}
          style={{ position: "absolute", top: 10, right: 40 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/destello-violet.svg`}
          width={64}
          height={64}
          style={{ position: "absolute", bottom: 20, right: 10 }}
        />

        <img
          src={`${SITE_URL}/brand/mascot/lightmode/Tangerine-2.svg`}
          width={380}
          height={400}
          style={{ display: "flex" }}
        />
      </div>
    </div>
  );
}
