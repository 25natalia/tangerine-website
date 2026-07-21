import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Tangerine Studio" title="No vendemos diseño. Construimos identidad." />,
    { ...size }
  );
}
