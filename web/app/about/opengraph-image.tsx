import { ImageResponse } from "next/og";

export const alt = "The story behind MiviaLab";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function AboutOpenGraphImage() {
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
            "radial-gradient(circle at 18% 22%, rgba(167, 198, 255, 0.2), transparent 34%), linear-gradient(145deg, #111714 0%, #1d2821 58%, #304335 100%)",
          color: "#f2efe7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-260px",
            right: "-160px",
            display: "flex",
            width: "680px",
            height: "680px",
            border: "2px solid rgba(242, 239, 231, 0.16)",
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
          <span style={{ fontSize: 20 }}>Our story</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "940px",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            Thoughtful technology. Human creative judgment.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              lineHeight: 1.35,
              color: "rgba(242, 239, 231, 0.72)",
            }}
          >
            Meet the people and the idea behind MiviaLab.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
