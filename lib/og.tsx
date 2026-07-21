// Shell compartido por las OG images (raíz y case studies). ImageResponse
// (Satori) solo soporta un subconjunto de CSS vía flexbox/posición absoluta
// — nada de Tailwind, nada de var(--token) — por eso los valores acá son
// hex literales copiados de tokens/color/primitive.tokens.json, no clases.

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

const NEUTRAL_1000 = "#1E1E1E";
const NEUTRAL_0 = "#FCFBFF";
const TANGERINE_400 = "#ff904f";

/** Grilla de puntos inspirada en el patrón "Semillas" — la forma más simple
 * de los cinco, la única razonable de recrear con flexbox puro en vez de
 * intentar embeber el SVG real (Satori no garantiza soporte de paths
 * complejos anidados). */
function DotGrid({ accent }: { accent: string }) {
  const rows = 4;
  const cols = 6;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: "flex", gap: 22, marginLeft: r % 2 ? 26 : 0 }}>
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              style={{ width: 14, height: 14, borderRadius: 999, background: accent, opacity: 0.35 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function OgCard({
  eyebrow,
  title,
  accent = TANGERINE_400,
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
        flexDirection: "column",
        justifyContent: "space-between",
        background: NEUTRAL_1000,
        padding: 80,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 60, right: 60, display: "flex" }}>
        <DotGrid accent={accent} />
      </div>

      <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: accent, letterSpacing: 2 }}>
        {eyebrow.toUpperCase()}
      </div>

      <div
        style={{
          display: "flex",
          maxWidth: 880,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.15,
          color: NEUTRAL_0,
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: NEUTRAL_0, opacity: 0.7 }}>
        Tangerine Studio
      </div>
    </div>
  );
}
