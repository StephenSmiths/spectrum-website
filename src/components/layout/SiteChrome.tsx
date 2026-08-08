import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  BASE,
  DIM,
  GHOST,
  GOLD,
  IVORY,
  TEAL,
  fontBody,
  fontDisplay,
  DARKER,
  type Lang,
} from "@/lib/theme";
import { DISCLAIMER } from "@/lib/disclaimer";
import { scrollToId } from "@/lib/scrollToId";
import { CtaProvider } from "@/components/showcase/CtaContext";

const NAV_HOME = [
  { id: "advantages", en: "Advantages", zh: "核心優勢" },
  { id: "ultimate-suite", en: "Ultimate Suite", zh: "旗艦方案" },
  { id: "drive", en: "D.R.I.V.E.", zh: "D.R.I.V.E." },
  { id: "solutions", en: "Solutions", zh: "服務" },
  { id: "showcase", en: "Showcase", zh: "案例展示", to: "/showcase" },
  { id: "about", en: "About", zh: "關於我們" },
  { id: "contact", en: "Contact", zh: "聯絡我們" },
];

export function SiteChrome({
  lang,
  setLang,
  children,
  showDisclaimer = false,
}: {
  lang: Lang;
  setLang: (l: Lang | ((prev: Lang) => Lang)) => void;
  children: ReactNode;
  showDisclaimer?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ ...fontBody, background: BASE, color: IVORY, overflowX: "hidden", minHeight: "100vh" }}>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: scrolled ? "rgba(6,12,24,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(61,217,197,0.12)" : "none",
          transition: "all 0.45s ease",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-7 lg:px-12 flex items-center justify-between" style={{ height: 60 }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ ...fontDisplay, fontWeight: 900, fontSize: 17, letterSpacing: "0.1em", color: IVORY }}>
              SPECTRUM
            </span>
            <span style={{ fontSize: 10, letterSpacing: "0.09em", color: GHOST }}>天域策略顧問</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_HOME.map((item) => {
              const label = lang === "en" ? item.en : item.zh;
              if (item.to) {
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    style={{ ...fontBody, fontSize: 12, letterSpacing: "0.04em", color: DIM, textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}
                  >
                    {label}
                  </Link>
                );
              }
              const href = onHome ? `#${item.id}` : `/#${item.id}`;
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    if (!onHome) return;
                    e.preventDefault();
                    window.history.pushState(null, "", `#${item.id}`);
                    scrollToId(item.id, { behavior: "smooth" });
                  }}
                  style={{ ...fontBody, fontSize: 12, letterSpacing: "0.04em", color: DIM, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button
              onClick={() => setLang((l: Lang) => (l === "en" ? "zh" : "en"))}
              style={{
                ...fontBody,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: DIM,
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = DIM)}
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              style={{ display: "flex", background: "none", border: "none", cursor: "pointer", color: DIM, padding: 0 }}
              className="md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden"
            style={{
              background: "rgba(6,12,24,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(61,217,197,0.1)",
              padding: "16px 28px 32px",
            }}
          >
            {NAV_HOME.map((item) => {
              const label = lang === "en" ? item.en : item.zh;
              if (item.to) {
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      fontSize: 18,
                      color: IVORY,
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(238,240,248,0.06)",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.id}
                  href={onHome ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (!onHome) return;
                    e.preventDefault();
                    window.history.pushState(null, "", `#${item.id}`);
                    scrollToId(item.id, { behavior: "smooth" });
                  }}
                  style={{
                    display: "block",
                    fontSize: 18,
                    color: IVORY,
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(238,240,248,0.06)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>
        )}
      </header>

      <CtaProvider lang={lang}>{children}</CtaProvider>

      <footer style={{ background: DARKER, borderTop: "1px solid rgba(61,217,197,0.08)", padding: "28px 28px" }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-4">
          {showDisclaimer && (
            <p style={{ fontSize: 11, lineHeight: 1.7, color: GHOST, maxWidth: 920 }}>{DISCLAIMER[lang]}</p>
          )}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ ...fontDisplay, fontWeight: 900, letterSpacing: "0.12em", fontSize: 15, color: IVORY }}>
                SPECTRUM
              </span>
              <span style={{ color: "rgba(238,240,248,0.12)" }}>|</span>
              <span style={{ fontSize: 11, color: GHOST, letterSpacing: "0.07em" }}>天域策略顧問有限公司</span>
            </div>
            <p style={{ fontSize: 11, color: "rgba(238,240,248,0.2)", letterSpacing: "0.04em" }}>
              © {new Date().getFullYear()} Spectrum Total Solutions Limited · All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
