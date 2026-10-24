import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Valmont Academy — Filosofía, conocimiento y autodominio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpenGraphImage() {
  const logo = await readFile(
    path.join(process.cwd(), "assets/ValmontAcademyLogoNoBG.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          padding: "64px",
          gap: "56px",
          background: "#fafafa",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <img
          alt="Valmont Academy"
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={320}
          height={320}
          style={{ flexShrink: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 696,
            flexShrink: 0,
            borderLeft: "1px solid #d4d4d4",
            paddingLeft: "48px",
          }}
        >
          <div style={{ fontSize: 24, color: "#525252" }}>Valmont Academy</div>
          <div
            style={{
              marginTop: 28,
              fontSize: 56,
              lineHeight: 1.08,
              letterSpacing: "-2px",
            }}
          >
            La construcción del ideal humano
          </div>
          <div style={{ marginTop: 30, fontSize: 23, color: "#525252" }}>
            Filosofía, conocimiento y autodominio
          </div>
          <div style={{ marginTop: 34, fontSize: 18, color: "#686868" }}>
            Institución en construcción · valmontacademy.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
