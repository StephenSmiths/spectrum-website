import { useState } from "react";
import { Link } from "react-router-dom";
import type { ShowcaseItem } from "@/content/showcases/types";
import { CATEGORY_LABELS } from "@/content/showcases";
import { DIM, IVORY, TEAL, fontDisplay } from "@/lib/theme";
import type { Lang } from "@/lib/theme";

type Props = {
  item: ShowcaseItem;
  lang: Lang;
  /** Wider poster for featured rails */
  size?: "md" | "lg";
  /** Optional: preview in billboard without navigating */
  onPreview?: (item: ShowcaseItem) => void;
  active?: boolean;
};

export function ShowcaseTile({ item, lang, size = "md", onPreview, active }: Props) {
  const [hover, setHover] = useState(false);
  const img = item.images[0];
  const img2 = item.images[1];
  const width = size === "lg" ? 320 : 260;
  const height = size === "lg" ? 188 : 148;
  const raised = hover || active;
  const peekSecond = Boolean(img2 && raised);

  return (
    <div
      style={{
        width,
        flex: "0 0 auto",
        scrollSnapAlign: "start",
        transform: raised ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: raised ? 2 : 1,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to={`/showcase/${item.slug}`}
        onClick={(e) => {
          if (onPreview && (e.metaKey || e.altKey)) {
            e.preventDefault();
            onPreview(item);
          }
        }}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <div
          style={{
            position: "relative",
            height,
            overflow: "hidden",
            background: "#0A101C",
            border: raised ? `1px solid ${item.accent}66` : "1px solid rgba(238,240,248,0.1)",
            boxShadow: raised ? `0 18px 40px rgba(0,0,0,0.45)` : "none",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {img ? (
            <img
              src={img.src}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
                opacity: peekSecond ? 0 : 1,
                transform: raised ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.5s ease, opacity 0.45s ease",
              }}
            />
          ) : null}
          {img2 ? (
            <img
              src={img2.src}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
                opacity: peekSecond ? 1 : 0,
                transform: peekSecond ? "scale(1.06)" : "scale(1.02)",
                transition: "transform 0.5s ease, opacity 0.45s ease",
              }}
            />
          ) : null}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: raised
                ? `linear-gradient(to top, rgba(6,12,24,0.92) 0%, rgba(6,12,24,0.2) 55%, transparent 100%)`
                : `linear-gradient(to top, rgba(6,12,24,0.75) 0%, transparent 45%)`,
              transition: "background 0.3s ease",
            }}
          />
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 12 }}>
            <p
              style={{
                ...fontDisplay,
                fontWeight: 800,
                fontSize: size === "lg" ? 22 : 18,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: IVORY,
                lineHeight: 1.1,
              }}
            >
              {item.brand}
            </p>
            <div
              style={{
                maxHeight: raised ? 48 : 0,
                opacity: raised ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s ease, opacity 0.3s ease",
              }}
            >
              <p style={{ marginTop: 6, fontSize: 12, lineHeight: 1.45, color: DIM }}>{item.tagline[lang]}</p>
            </div>
          </div>
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: TEAL,
              opacity: raised ? 1 : 0.75,
            }}
          >
            {CATEGORY_LABELS[item.category][lang]}
          </span>
        </div>
      </Link>
      {onPreview ? (
        <button
          type="button"
          onClick={() => onPreview(item)}
          style={{
            marginTop: 8,
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: active ? TEAL : DIM,
          }}
        >
          {lang === "en" ? (active ? "Currently shown" : "Preview") : active ? "展示中" : "預覽"}
        </button>
      ) : null}
    </div>
  );
}
