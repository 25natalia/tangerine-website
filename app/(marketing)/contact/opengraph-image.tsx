import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Contact" title="Antes de proponer una solución, queremos entender tu proyecto." />,
    { ...size }
  );
}
