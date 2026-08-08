import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ShowcaseItem } from "@/content/showcases/types";
import { CATEGORY_LABELS } from "@/content/showcases";
import { ActionBtn } from "@/components/ui/Buttons";
import { DIM, GHOST, IVORY, TEAL, fontDisplay, fontSerif } from "@/lib/theme";
import type { Lang } from "@/lib/theme";

type Props = {
  item: ShowcaseItem;
  lang: Lang;
  onBookDemo: () => void;
  onEnquiry: () => void;
  compact?: boolean;
  /** Cycle featured set */
  onPrev?: () => void;
  onNext?: () => void;
  positionLabel?: string;
  /** Auto-cycle progress (ms). Omit or 0 to hide the strip. */
  autoCycleMs?: number;
  /** When false, progress animation is frozen / hidden */
  progressPlaying?: boolean;
  /** Remount key so the fill animation restarts in sync with the timer */
  progressKey?: string;
  /** Hover or focus inside the billboard — parent should pause auto-cycle */
  onPauseChange?: (paused: boolean) => void;
};

export function ShowcaseBillboard({
  item,
  lang,
  onBookDemo,
  onEnquiry,
  compact,
  onPrev,
  onNext,
  positionLabel,
  autoCycleMs = 0,
  progressPlaying = false,
  progressKey,
  onPauseChange,
}: Props) {
  const img = item.images[0] ?? item.images[1];
  const minH = compact ? "min(52vh, 420px)" : "min(72vh, 640px)";
  const hoverRef = useRef(false);
  const focusRef = useRef(false);

  const emitPause = () => {
    onPauseChange?.(hoverRef.current || focusRef.current);
  };

  const showProgress = Boolean(autoCycleMs && autoCycleMs > 0);

  return (
    <div
      style={{
        position: "relative",
        minHeight: minH,
        overflow: "hidden",
        background: "#050A14",
      }}
      onMouseEnter={() => {
        hoverRef.current = true;
        emitPause();
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        emitPause();
      }}
      onFocusCapture={() => {
        focusRef.current = true;
        emitPause();
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          focusRef.current = false;
          emitPause();
        }
      }}
    >
      {img ? (
        <img
          key={img.src}
          src={img.src}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: 0.55,
            animation: "showcaseBillboardIn 0.7s ease both",
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(6,12,24,0.96) 0%, rgba(6,12,24,0.78) 42%, rgba(6,12,24,0.25) 72%, rgba(6,12,24,0.55) 100%),
            linear-gradient(to top, rgba(6,12,24,0.95) 0%, rgba(6,12,24,0.2) 45%, transparent 70%)
          `,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1440,
          margin: "0 auto",
          padding: compact ? "100px 28px 48px" : "130px 28px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: minH,
        }}
        className="lg:px-12"
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: GHOST,
            marginBottom: 12,
          }}
        >
          {lang === "en" ? "Showcase · Idea Illustrations" : "靈感庫 · 能力示意"}
          {" · "}
          {CATEGORY_LABELS[item.category][lang]}
          {positionLabel ? ` · ${positionLabel}` : ""}
        </p>

        <p
          key={item.slug + "-brand"}
          style={{
            ...fontDisplay,
            fontWeight: 900,
            fontSize: compact ? "clamp(40px, 8vw, 72px)" : "clamp(48px, 9vw, 96px)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: IVORY,
            lineHeight: 0.92,
            margin: 0,
            animation: "showcaseBillboardIn 0.55s ease both",
          }}
        >
          {item.brand}
        </p>

        <p
          key={item.slug + "-tag"}
          style={{
            ...fontSerif,
            marginTop: 18,
            fontSize: compact ? "clamp(18px, 2.4vw, 26px)" : "clamp(20px, 2.8vw, 32px)",
            color: IVORY,
            maxWidth: 560,
            lineHeight: 1.35,
            animation: "showcaseBillboardIn 0.65s ease 0.05s both",
          }}
        >
          {item.tagline[lang]}
        </p>

        <p style={{ marginTop: 14, fontSize: 14, color: DIM, maxWidth: 520, lineHeight: 1.7 }}>
          {item.demoHook?.[lang] ?? item.summary[lang]}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28, alignItems: "center" }}>
          <ActionBtn
            label={lang === "en" ? "Book a Demo" : "預約示範"}
            onClick={onBookDemo}
            filled
            icon={<ArrowRight size={12} />}
          />
          <ActionBtn
            label={lang === "en" ? "Enquiry" : "查詢"}
            onClick={onEnquiry}
            icon={<ArrowRight size={12} />}
          />
          <Link
            to={`/showcase/${item.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0 4px",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: IVORY,
              textDecoration: "none",
              opacity: 0.75,
            }}
          >
            {lang === "en" ? "View idea" : "查看靈感"}
            <ArrowRight size={12} />
          </Link>

          {(onPrev || onNext) && (
            <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
              <CycleBtn ariaLabel="Previous" onClick={onPrev}>
                <ChevronLeft size={16} />
              </CycleBtn>
              <CycleBtn ariaLabel="Next" onClick={onNext}>
                <ChevronRight size={16} />
              </CycleBtn>
            </div>
          )}
        </div>
      </div>

      {showProgress ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            height: 2,
            background: "rgba(238,240,248,0.08)",
            opacity: progressPlaying || progressKey ? 1 : 0.35,
          }}
        >
          {progressPlaying ? (
            <div
              key={progressKey}
              style={{
                height: "100%",
                width: "100%",
                transformOrigin: "left center",
                background: TEAL,
                opacity: 0.85,
                animation: `showcaseBillboardProgress ${autoCycleMs}ms linear forwards`,
              }}
            />
          ) : (
            <div
              style={{
                height: "100%",
                width: "100%",
                background: "rgba(238,240,248,0.12)",
              }}
            />
          )}
        </div>
      ) : null}

      <style>{`
        @keyframes showcaseBillboardIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes showcaseBillboardProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

function CycleBtn({
  children,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={!onClick}
      style={{
        width: 36,
        height: 36,
        display: "grid",
        placeItems: "center",
        background: "rgba(238,240,248,0.08)",
        border: "1px solid rgba(238,240,248,0.14)",
        color: IVORY,
        cursor: onClick ? "pointer" : "default",
        opacity: onClick ? 1 : 0.35,
      }}
    >
      {children}
    </button>
  );
}
