import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — web development for startups and SMBs`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 20% 20%, #2F7BFF 0%, transparent 40%), radial-gradient(circle at 85% 80%, #F5C518 0%, transparent 35%), #07111F",
          color: "#EEF4FF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: -1,
          }}
        >
          {siteConfig.name}
          <span style={{ color: "#F5C518" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Websites that make startups look inevitable.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(238,244,255,0.72)",
            }}
          >
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
