import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Studio" title="Natalia García y Emy Dorado notaron esto: que el mundo se había llenado de cosas bien hechas y vacías." />,
    { ...size }
  );
}
