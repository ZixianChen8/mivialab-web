import { ImageResponse } from "next/og";

export const alt = "MiviaLab web design and development studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 78% 18%, rgba(212, 242, 190, 0.34), transparent 34%), linear-gradient(135deg, #f2efe7 0%, #dce7d4 52%, #b9ceb1 100%)",
          color: "#182019",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-150px",
            bottom: "-250px",
            display: "flex",
            width: "620px",
            height: "620px",
            border: "2px solid rgba(24, 32, 25, 0.18)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: "-0.02em",
          }}
        >
          <span>MiviaLab</span>
          <span style={{ fontSize: 20 }}>Ottawa · Toronto</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "920px",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.03,
              letterSpacing: "-0.045em",
            }}
          >
            Web design &amp; development for small businesses
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              lineHeight: 1.35,
              color: "rgba(24, 32, 25, 0.74)",
            }}
          >
            Custom websites, cared for end to end.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
