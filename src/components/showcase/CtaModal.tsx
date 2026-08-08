import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { CAL_URL, CONTACT_EMAIL, mailtoFor } from "@/lib/contact";
import {
  BASE,
  DIM,
  GHOST,
  GOLD,
  GOLD_L,
  IVORY,
  TEAL,
  fontBody,
  fontDisplay,
  fontSerif,
  type Lang,
} from "@/lib/theme";

export type CtaMode = "demo" | "enquiry";

export function CtaModal({
  open,
  mode,
  lang,
  showcaseTitle,
  onClose,
}: {
  open: boolean;
  mode: CtaMode;
  lang: Lang;
  showcaseTitle?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const showCal = mode === "demo" && Boolean(CAL_URL);

  useEffect(() => {
    if (!open) {
      setSent(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const title =
    mode === "demo"
      ? lang === "en"
        ? "Book a Demo"
        : "預約示範"
      : lang === "en"
        ? "Enquiry"
        : "查詢";

  const subtitle = showcaseTitle
    ? lang === "en"
      ? `Regarding: ${showcaseTitle}`
      : `關於：${showcaseTitle}`
    : lang === "en"
      ? "Tell us what you want to explore."
      : "告訴我們你想探索的方向。";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const lines = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      showcaseTitle ? `Showcase: ${showcaseTitle}` : "",
      "",
      message || "(no message)",
    ].filter(Boolean);

    const subject =
      mode === "demo"
        ? showcaseTitle
          ? `Demo request — ${showcaseTitle}`
          : "Demo request — Spectrum Total Solutions"
        : showcaseTitle
          ? `Enquiry — ${showcaseTitle}`
          : "Enquiry — Spectrum Total Solutions";

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(6,12,24,0.72)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...fontBody,
          width: "min(920px, 100%)",
          maxHeight: "90vh",
          overflow: "auto",
          background: "#0B1220",
          border: "1px solid rgba(61,217,197,0.18)",
          color: IVORY,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            padding: "22px 24px",
            borderBottom: "1px solid rgba(238,240,248,0.08)",
          }}
        >
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, marginBottom: 8 }}>
              Spectrum Total Solutions
            </p>
            <h2 style={{ ...fontDisplay, fontWeight: 900, fontSize: 34, letterSpacing: "0.03em", margin: 0 }}>{title}</h2>
            <p style={{ ...fontSerif, marginTop: 8, color: DIM, fontSize: 16 }}>{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: "none", color: DIM, cursor: "pointer", padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>

        <div className={showCal ? "grid grid-cols-1 lg:grid-cols-2" : ""} style={{ padding: 24, gap: 24, display: showCal ? "grid" : "block" }}>
          {showCal && (
            <div style={{ minHeight: 420, border: "1px solid rgba(238,240,248,0.08)" }}>
              <iframe
                title="Book a demo"
                src={CAL_URL + (showcaseTitle ? `?showcase=${encodeURIComponent(showcaseTitle)}` : "")}
                style={{ width: "100%", height: 480, border: "none", background: BASE }}
              />
            </div>
          )}

          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {!showCal && (
              <p style={{ fontSize: 13, color: GHOST, lineHeight: 1.6, marginBottom: 4 }}>
                {lang === "en"
                  ? "Submit opens your email client with a prepared message. Or write us directly."
                  : "提交後會開啟你的電郵程式並帶入內容。亦可直接來信。"}
              </p>
            )}
            <Field label={lang === "en" ? "Name" : "姓名"} value={name} onChange={setName} required />
            <Field label={lang === "en" ? "Company" : "公司"} value={company} onChange={setCompany} required />
            <Field label={lang === "en" ? "Email" : "電郵"} value={email} onChange={setEmail} type="email" required />
            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: GHOST }}>
                {lang === "en" ? "Message" : "訊息"}
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                style={inputStyle}
                placeholder={
                  lang === "en"
                    ? "What would you like to explore?"
                    : "你想探索什麼方向？"
                }
              />
            </label>

            <button
              type="submit"
              style={{
                ...fontBody,
                marginTop: 8,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "16px 20px",
                border: "none",
                cursor: "pointer",
                background: GOLD,
                color: BASE,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_L)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              {sent
                ? lang === "en"
                  ? "Opening email…"
                  : "正在開啟電郵…"
                : lang === "en"
                  ? "Send via email"
                  : "以電郵送出"}
            </button>

            <a href={mailtoFor(mode === "demo" ? "demo" : "enquiry", showcaseTitle)} style={{ fontSize: 12, color: DIM }}>
              {CONTACT_EMAIL}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: GHOST }}>{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </label>
  );
}

const inputStyle = {
  ...fontBody,
  background: "rgba(238,240,248,0.04)",
  border: "1px solid rgba(238,240,248,0.12)",
  color: IVORY,
  padding: "12px 14px",
  fontSize: 14,
  outline: "none",
  width: "100%",
  resize: "vertical" as const,
};
