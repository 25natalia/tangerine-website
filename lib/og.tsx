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

let fontPromise: Promise<ArrayBuffer> | null = null;

/**
 * Plus Jakarta Sans Bold real, traída de Google Fonts en tiempo de
 * request — `next/font/google` (lo que usa `app/layout.tsx`) es una
 * optimización específica de páginas renderizadas normalmente, Satori no
 * tiene acceso a eso y necesita el archivo de fuente posta vía la opción
 * `fonts` de `ImageResponse`. Se pide con un User-Agent viejo a propósito:
 * así Google Fonts devuelve TTF en vez de WOFF2, que Satori no soporta de
 * forma confiable. Cacheada a nivel de módulo — un solo fetch, reusado por
 * las 5 rutas de OG image del sitio dentro de la misma instancia.
 */
async function getPlusJakartaSansBold(): Promise<ArrayBuffer> {
  if (!fontPromise) {
    fontPromise = (async (): Promise<ArrayBuffer> => {
      const cssRes = await fetch(
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
          },
        }
      );
      const css = await cssRes.text();
      const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
      if (!fontUrl) throw new Error("No se pudo resolver la URL de Plus Jakarta Sans desde Google Fonts.");
      const fontRes = await fetch(fontUrl);
      return fontRes.arrayBuffer();
    })();
  }
  return fontPromise;
}

/** Se pasa como `fonts` al segundo argumento de `ImageResponse` en cada ruta. */
export async function getOgFonts() {
  const data = await getPlusJakartaSansBold();
  return [{ name: "Plus Jakarta Sans", data, style: "normal" as const, weight: 700 as const }];
}

/**
 * Mascota grande y centrada — la única protagonista real, no un cartel de
 * texto con una ilustración chica al costado. Cuatro geometrías reales
 * alrededor (mismos assets que ya usa el Hero, ninguno nuevo), cada una con
 * su ancho/alto en la proporción exacta del archivo fuente (ver el
 * `viewBox` de cada SVG) — sin eso, Satori estira el `<img>` al tamaño
 * declarado sin mantener el aspect ratio y la figura sale deformada. La
 * mascota específicamente: `Tangerine-2.svg` tiene `viewBox="0 0 1069
 * 990"` (más ancha que alta, 1069:990), no la proporción más alta-que-ancha
 * de `MASCOT_WIDTH`/`MASCOT_HEIGHT` en `lib/mascot.ts` — esa constante es
 * un tamaño de referencia para el resto del sitio, no el ratio real de este
 * archivo puntual.
 *
 * Un solo texto en toda la imagen — "The Tangerine Studio", Plus Jakarta
 * Sans Bold real (ver `getOgFonts`) — no hay eyebrow ni título por página.
 * `accent` (case studies) tiñe un punto chico junto al texto, el único
 * lugar donde ese color entra.
 */
export function OgCard({ accent }: { accent?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: NEUTRAL_0,
        fontFamily: "Plus Jakarta Sans",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: 720,
          height: 480,
        }}
      >
        <img
          src={`${SITE_URL}/illustrations/geometry/flor-lime.svg`}
          width={100}
          height={105}
          style={{ position: "absolute", top: 30, left: 110 }}
        />
        <img
          src={`${SITE_URL}/illustrations/deco/star-violet.svg`}
          width={76}
          height={76}
          style={{ position: "absolute", bottom: 40, left: 70 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/hoja-orange.svg`}
          width={80}
          height={76}
          style={{ position: "absolute", top: 20, right: 110 }}
        />
        <img
          src={`${SITE_URL}/illustrations/geometry/destello-violet.svg`}
          width={86}
          height={86}
          style={{ position: "absolute", bottom: 10, right: 90 }}
        />

        <img
          src={`${SITE_URL}/brand/mascot/lightmode/Tangerine-2.svg`}
          width={518}
          height={480}
          style={{ display: "flex" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: NEUTRAL_1000 }}>
          The Tangerine Studio
        </div>
        {accent ? (
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: accent }} />
        ) : null}
      </div>
    </div>
  );
}
