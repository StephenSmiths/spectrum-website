import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ShowcaseItem } from "@/content/showcases/types";
import { ShowcaseTile } from "@/components/showcase/ShowcaseTile";
import { GHOST, IVORY, fontSerif } from "@/lib/theme";
import type { Lang } from "@/lib/theme";

type Props = {
  title: string;
  items: ShowcaseItem[];
  lang: Lang;
  size?: "md" | "lg";
  /** Preview into billboard (explicit, not hover) */
  onPreviewItem?: (item: ShowcaseItem) => void;
  activeSlug?: string;
};

export function ShowcaseRail({ title, items, lang, size = "md", onPreviewItem, activeSlug }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  if (!items.length) return null;

  const scrollBy = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.75, 720);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div style={{ marginBottom: 36 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 14,
          paddingLeft: 2,
        }}
      >
        <h2
          style={{
            ...fontSerif,
            fontSize: "clamp(20px, 2.4vw, 28px)",
            color: IVORY,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div style={{ display: "flex", gap: 6 }}>
          <RailBtn ariaLabel="Scroll left" onClick={() => scrollBy(-1)}>
            <ChevronLeft size={16} />
          </RailBtn>
          <RailBtn ariaLabel="Scroll right" onClick={() => scrollBy(1)}>
            <ChevronRight size={16} />
          </RailBtn>
        </div>
      </div>

      <div
        ref={scroller}
        className="showcase-rail-scroll"
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 12,
          paddingTop: 8,
          marginTop: -8,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item) => (
          <ShowcaseTile
            key={item.slug}
            item={item}
            lang={lang}
            size={size}
            onPreview={onPreviewItem}
            active={activeSlug === item.slug}
          />
        ))}
      </div>

      <style>{`
        .showcase-rail-scroll {
          scrollbar-width: none;
        }
        .showcase-rail-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function RailBtn({
  children,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        width: 34,
        height: 34,
        display: "grid",
        placeItems: "center",
        background: "rgba(238,240,248,0.06)",
        border: "1px solid rgba(238,240,248,0.12)",
        color: GHOST,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
