import { DIM, IVORY } from "@/lib/theme";

type Props = {
  brand: string;
  src: string;
  caption: string;
  height?: number;
};

/** Real upstream-style product screenshot with Spectrum Demo brand label. */
export function RealShot({ brand, src, caption, height = 240 }: Props) {
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: "relative",
          height,
          overflow: "hidden",
          background: "#0A101C",
          border: "1px solid rgba(238,240,248,0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            height: 34,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 12px",
            background: "linear-gradient(to bottom, rgba(6,12,24,0.92), rgba(6,12,24,0.35))",
            borderBottom: "1px solid rgba(238,240,248,0.08)",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "#FF5F57", opacity: 0.85 }} />
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "#FEBC2E", opacity: 0.85 }} />
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "#28C840", opacity: 0.85 }} />
          <span
            style={{
              marginLeft: 8,
              fontFamily: "'Big Shoulders Display', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.12em",
              color: IVORY,
              textTransform: "uppercase",
            }}
          >
            {brand}
          </span>
        </div>
        <img
          src={src}
          alt={`${brand} — ${caption}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />
      </div>
      {caption ? (
        <figcaption style={{ marginTop: 10, fontSize: 12, letterSpacing: "0.04em", color: DIM, lineHeight: 1.5 }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
