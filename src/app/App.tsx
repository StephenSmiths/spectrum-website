import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

type Lang = "en" | "zh";

const PAPER = "#FFFAF2";
const INK = "#1F2A32";
const SUN = "#F2C40F";
const CORAL = "#E89B2D";
const SKY = "#5BA3C9";
const LEAF = "#6B9B3C";
const FOOTER = "#1E4456";
const CONTACT_EMAIL = "hello@spectrumtotalsolutions.com";

function mailtoFor(type: "demo" | "appointment", showcaseTitle?: string) {
  const subject =
    type === "demo"
      ? showcaseTitle
        ? `Demo request — ${showcaseTitle}`
        : "Demo request — Spectrum Total Solutions"
      : showcaseTitle
        ? `Appointment request — ${showcaseTitle}`
        : "Appointment request — Spectrum Total Solutions";

  const body =
    type === "demo"
      ? [
          "Hello Spectrum team,",
          "",
          `I would like to request a demo${showcaseTitle ? ` related to: ${showcaseTitle}` : ""}.`,
          "",
          "Company:",
          "Name:",
          "Preferred time:",
        ].join("\n")
      : [
          "Hello Spectrum team,",
          "",
          `I would like to book an appointment${showcaseTitle ? ` related to: ${showcaseTitle}` : ""}.`,
          "",
          "Company:",
          "Name:",
          "Preferred date/time:",
          "Meeting preference (Hong Kong / online):",
        ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const display: CSSProperties = {
  fontFamily: "'Big Shoulders Display', system-ui, sans-serif",
};
const serif: CSSProperties = {
  fontFamily: "'Fraunces', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 300,
};
const body: CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
};

const NAV = {
  en: ["Approach", "Solutions", "Showcase", "About", "Contact"],
  zh: ["方法論", "服務", "案例展示", "關於我們", "聯絡我們"],
};

const NAV_IDS = ["approach", "solutions", "showcase", "about", "contact"];

const PILLARS = [
  {
    key: "TOOLSET",
    zh: "工具集",
    desc: {
      en: "The systems, platforms, and processes that automate and scale your operations with precision and speed.",
      zh: "自動化並精確擴展您運營的系統、平台和流程。",
    },
    tags: {
      en: ["Workflow Automation", "Sales Systems", "CX Platforms", "Observation Room"],
      zh: ["工作流程自動化", "銷售系統", "客戶體驗平台", "觀察室系統"],
    },
  },
  {
    key: "SKILLSET",
    zh: "技能集",
    desc: {
      en: "The capabilities your people develop to perform with precision, confidence, and purposeful intent at every level.",
      zh: "您的員工為精確、自信和有目的地執行所培養的能力。",
    },
    tags: {
      en: ["Capability Building", "Emotion Detection", "Behavioural Analysis", "Sales Enablement"],
      zh: ["能力建設", "情緒感知", "行為分析", "銷售賦能"],
    },
  },
  {
    key: "MINDSET",
    zh: "思維集",
    desc: {
      en: "The strategic orientation that aligns your whole organisation toward its boldest and most enduring ambitions.",
      zh: "使您整個組織與其最宏大願景保持一致的策略導向。",
    },
    tags: {
      en: ["Leadership Development", "Culture Change", "Strategic Clarity", "Regional Expansion"],
      zh: ["領導力發展", "文化變革", "策略清晰度", "區域擴張"],
    },
  },
];

const SOLUTIONS = {
  en: [
    "Workflow Automation",
    "Sales-Core Automation",
    "Customer Experience Optimisation",
    "Employee Capability Building",
    "Emotion Detection",
    "Behavioural Analysis",
    "Observation Room System",
  ],
  zh: [
    "工作流程自動化",
    "銷售核心自動化",
    "客戶體驗優化",
    "員工能力建設",
    "情緒感知分析",
    "行為分析系統",
    "觀察室系統",
  ],
};

const SHOWCASES = [
  { id: "01", industry: { en: "Retail Operations", zh: "零售營運" }, title: { en: "Smart Floor Intelligence for Multi-Site Retail", zh: "多店零售智能地面分析系統" }, fit: { en: "Regional retail chains with 10+ locations seeking granular foot-traffic intelligence.", zh: "擁有10個或以上門店、尋求客流量洞察的區域零售連鎖。" }, metric: { en: "23% uplift in conversion rate within 90 days", zh: "90天內轉化率提升23%" } },
  { id: "02", industry: { en: "B2B Sales", zh: "B2B銷售" }, title: { en: "Pipeline Velocity for Complex Enterprise Sales", zh: "複雜企業銷售的管道加速計劃" }, fit: { en: "B2B companies with 6–18 month sales cycles navigating multi-stakeholder decisions.", zh: "銷售週期6至18個月、需多方決策的B2B企業。" }, metric: { en: "40% reduction in sales cycle length", zh: "銷售週期縮短40%" } },
  { id: "03", industry: { en: "Banking & Finance", zh: "銀行及金融" }, title: { en: "CX Transformation for Retail Banking", zh: "零售銀行客戶體驗轉型" }, fit: { en: "Banks experiencing high branch abandonment rates and declining NPS scores.", zh: "面對分行流失率高、NPS持續下降問題的銀行。" }, metric: { en: "18-point NPS improvement in 6 months", zh: "6個月內NPS提升18分" } },
  { id: "04", industry: { en: "Hospitality", zh: "酒店業" }, title: { en: "Service Excellence Capability Programme", zh: "卓越服務能力提升計劃" }, fit: { en: "Luxury hotel groups expanding into new markets or repositioning brand standards.", zh: "進入新市場或重新定位品牌標準的奢華酒店集團。" }, metric: { en: "Guest satisfaction score up 31% post-programme", zh: "計劃後賓客滿意度提升31%" } },
  { id: "05", industry: { en: "Contact Centre", zh: "客服中心" }, title: { en: "Real-Time Emotion Detection for CX Teams", zh: "客服團隊實時情緒感知系統" }, fit: { en: "High-volume contact centres handling 500+ daily calls with chronic escalation pressure.", zh: "日均處理500個以上電話、面臨升級壓力的大型客服中心。" }, metric: { en: "34% drop in escalation rate within 60 days", zh: "60天內升級率下降34%" } },
  { id: "06", industry: { en: "Leadership", zh: "領導力" }, title: { en: "Behavioural Analysis for Senior Leadership Teams", zh: "高管團隊行為分析系統" }, fit: { en: "C-suite teams undergoing strategic restructuring or navigating complex succession.", zh: "正在進行策略重組或接班人規劃的高管團隊。" }, metric: { en: "Decision-making speed improved 2.4× post-assessment", zh: "評估後決策速度提升2.4倍" } },
  { id: "07", industry: { en: "Retail & FMCG", zh: "零售及快速消費品" }, title: { en: "Observation Room for Product Launch Validation", zh: "新品發布觀察室驗證系統" }, fit: { en: "Brand managers launching new SKUs in Asia Pacific who need real consumer insight fast.", zh: "在亞太地區推出新SKU、需要快速獲得真實消費者洞察的品牌經理。" }, metric: { en: "Launch success rate up 45% vs. control launches", zh: "新品成功率比對照組提升45%" } },
  { id: "08", industry: { en: "Insurance", zh: "保險業" }, title: { en: "Claims Processing Acceleration Programme", zh: "理賠處理加速計劃" }, fit: { en: "Insurance firms processing 1,000+ claims per month bottlenecked by manual workflows.", zh: "每月處理1,000個以上理賠、存在人工瓶頸的保險公司。" }, metric: { en: "Claims resolution time reduced by 52%", zh: "理賠解決時間縮短52%" } },
  { id: "09", industry: { en: "Professional Services", zh: "專業服務" }, title: { en: "Academy Build for High-Growth Consulting Firms", zh: "高增長顧問公司學院建設計劃" }, fit: { en: "Consulting firms scaling rapidly from 50 to 500 headcount with unstructured onboarding.", zh: "從50人快速擴展至500人、缺乏結構化入職培訓的顧問公司。" }, metric: { en: "Time-to-productivity for new hires cut by 60%", zh: "新員工達到生產力的時間縮短60%" } },
  { id: "10", industry: { en: "Regional Expansion", zh: "區域擴張" }, title: { en: "Cross-Border Growth Mindset Transformation", zh: "跨境增長思維轉型計劃" }, fit: { en: "HK-headquartered companies entering Southeast Asia or the Greater Bay Area for the first time.", zh: "向東南亞或大灣區首次擴張的香港總部企業。" }, metric: { en: "Market entry timeline accelerated by 35%", zh: "市場進入時間表縮短35%" } },
];

const DIVIDER = (
  <div style={{ height: 1, background: "rgba(31,42,50,0.1)", width: "100%" }} />
);

const DIVIDER_SOFT = (
  <div style={{ height: 1, background: "rgba(31,42,50,0.08)", width: "100%" }} />
);

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sc = SHOWCASES[selected];

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ ...body, background: PAPER, color: INK }}
    >
      {/* ── HEADER ── */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: scrolled ? "rgba(255,250,242,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(31,42,50,0.08)" : "1px solid transparent",
          transition: "background 0.45s ease, border 0.45s ease",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-7 lg:px-12 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-baseline gap-3 select-none">
            <span
              style={{
                ...display,
                fontWeight: 900,
                letterSpacing: "0.1em",
                fontSize: 17,
                color: scrolled ? INK : "#FFFFFF",
                textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.55)",
                transition: "color 0.35s",
              }}
            >
              SPECTRUM
            </span>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                color: scrolled ? "rgba(31,42,50,0.45)" : "rgba(255,255,255,0.75)",
                textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.5)",
                transition: "color 0.35s",
              }}
            >
              天域策略顧問
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {NAV[lang].map((item, i) => (
              <a
                key={i}
                href={`#${NAV_IDS[i]}`}
                style={{
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  color: scrolled ? "rgba(31,42,50,0.65)" : "rgba(255,255,255,0.86)",
                  textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.5)",
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = scrolled ? CORAL : "#7DFFB2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled
                    ? "rgba(31,42,50,0.65)"
                    : "rgba(255,255,255,0.86)";
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: scrolled ? INK : "#FFFFFF",
                textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.5)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.35s",
              }}
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                color: scrolled ? INK : "#FFFFFF",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="md:hidden px-7 pt-4 pb-8 flex flex-col"
            style={{ background: PAPER, borderTop: "1px solid rgba(31,42,50,0.08)" }}
          >
            {NAV[lang].map((item, i) => (
              <a
                key={i}
                href={`#${NAV_IDS[i]}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: 18,
                  color: INK,
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(31,42,50,0.06)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="top"
        className="relative overflow-hidden flex flex-col justify-end"
        style={{
          height: "100svh",
          minHeight: 700,
          background: "#0B1A2E",
        }}
      >
        <img
          src="/hero-aurora.jpg"
          alt="Vivid aurora borealis across a star-filled night sky"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 40%",
            filter: "brightness(1.1) contrast(1.12) saturate(1.25)",
          }}
        />
        {/* Soft readability veil only — no hard text boxes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,12,24,0.28) 0%, transparent 34%, rgba(5,12,24,0.35) 68%, rgba(5,12,24,0.72) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Top labels — light type + shadow for contrast */}
        <div className="absolute top-[72px] left-7 lg:left-12 right-7 lg:right-12 z-10 flex items-start justify-between gap-4">
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#7DFFB2",
                marginBottom: 6,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                textShadow: "0 1px 2px rgba(0,0,0,0.65), 0 0 18px rgba(0,0,0,0.35)",
              }}
            >
              {lang === "en" ? "Brand Manifesto · Hong Kong" : "品牌宣言 · 香港"}
            </p>
            <p
              style={{
                ...serif,
                fontSize: 14,
                letterSpacing: "0.04em",
                color: "#FFFFFF",
                textShadow: "0 1px 3px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.35)",
              }}
            >
              {lang === "en" ? "天域策略顧問有限公司" : "Spectrum Total Solutions Limited"}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1">
            {["22.3193° N", "114.1694° E", "HKG"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 600,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Brand manifesto + SPECTRUM wordmark */}
        <div className="relative z-10 w-full" style={{ paddingTop: 40 }}>
          <div className="max-w-[1440px] mx-auto px-7 lg:px-12 pb-5">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-3xl">
                <div>
                  <p
                    style={{
                      ...display,
                      fontWeight: 900,
                      fontSize: "clamp(28px, 4.2vw, 44px)",
                      letterSpacing: "0.02em",
                      color: "#FFFFFF",
                      lineHeight: 1.05,
                      textShadow: "0 2px 12px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    MASS TO CLASS.
                  </p>
                  <p
                    style={{
                      ...serif,
                      fontSize: "clamp(18px, 2.2vw, 24px)",
                      color: "rgba(255,255,255,0.92)",
                      marginTop: 10,
                      letterSpacing: "0.06em",
                      textShadow: "0 2px 10px rgba(0,0,0,0.55)",
                    }}
                  >
                    博觀而約取
                  </p>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.72)",
                      marginTop: 12,
                      maxWidth: 280,
                      textShadow: "0 1px 4px rgba(0,0,0,0.55)",
                    }}
                  >
                    {lang === "en"
                      ? "From volume to excellence — gather widely, choose precisely."
                      : "從量到質——廣納方法，精準取用。"}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      ...display,
                      fontWeight: 900,
                      fontSize: "clamp(28px, 4.2vw, 44px)",
                      letterSpacing: "0.02em",
                      color: "#FFFFFF",
                      lineHeight: 1.05,
                      textShadow: "0 2px 12px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    LAST TO BLAST.
                  </p>
                  <p
                    style={{
                      ...serif,
                      fontSize: "clamp(18px, 2.2vw, 24px)",
                      color: "rgba(255,255,255,0.92)",
                      marginTop: 10,
                      letterSpacing: "0.06em",
                      textShadow: "0 2px 10px rgba(0,0,0,0.55)",
                    }}
                  >
                    厚積而薄發
                  </p>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.72)",
                      marginTop: 12,
                      maxWidth: 280,
                      textShadow: "0 1px 4px rgba(0,0,0,0.55)",
                    }}
                  >
                    {lang === "en"
                      ? "From patience to breakthrough — build deep, then release with force."
                      : "從厚積到突破——打穩底子，關鍵時刻爆發。"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <HeroBtn
                  label={lang === "en" ? "Book an Appointment" : "預約諮詢"}
                  href={mailtoFor("appointment")}
                  filled
                />
                <HeroBtn
                  label={lang === "en" ? "Explore Showcases" : "探索案例"}
                  href="#showcase"
                />
              </div>
            </div>
          </div>

          <div style={{ lineHeight: 0.82, overflow: "hidden" }}>
            <h1
              style={{
                ...display,
                fontWeight: 900,
                fontSize: "clamp(72px, 26.8vw, 400px)",
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                lineHeight: 0.82,
                margin: 0,
                paddingLeft: "0.04em",
                userSelect: "none",
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.55), 0 12px 40px rgba(0,0,0,0.35), 0 0 48px rgba(80,220,160,0.18)",
              }}
            >
              SPECTRUM
            </h1>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section id="approach" style={{ background: PAPER }} className="px-7 lg:px-12 pt-20 lg:pt-28">
        <div className="max-w-[1440px] mx-auto">
          <SectionLabel
            left={lang === "en" ? "Our Philosophy" : "我們的理念"}
            right={lang === "en" ? "Three Dimensions" : "三個維度"}
          />

          <div className="mt-14">
            {PILLARS.map((p, idx) => (
              <div
                key={p.key}
                style={{ borderTop: `1px solid rgba(14,13,12,0.1)` }}
                className="group py-10 lg:py-14"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_200px] gap-6 lg:gap-0 items-start">
                  {/* Pillar name */}
                  <div>
                    <div
                      style={{
                        ...display,
                        fontWeight: 900,
                        fontSize: "clamp(52px, 7.5vw, 108px)",
                        letterSpacing: "-0.02em",
                        lineHeight: 0.88,
                        color: INK,
                      }}
                    >
                      {p.key}
                    </div>
                    <div
                      style={{
                        ...serif,
                        fontSize: 15,
                        color: "rgba(14,13,12,0.38)",
                        marginTop: 10,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {p.zh}
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        width: 24,
                        height: 2,
                        background:
                          idx === 0 ? SKY : idx === 1 ? SUN : LEAF,
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div className="lg:px-14 lg:pt-1">
                    <p
                      style={{
                        fontSize: "clamp(15px, 1.35vw, 18px)",
                        lineHeight: 1.75,
                        color: "#3D3A36",
                        maxWidth: 540,
                      }}
                    >
                      {p.desc[lang]}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap lg:flex-col gap-2 lg:pt-2">
                    {p.tags[lang].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.09em",
                          color: "rgba(14,13,12,0.38)",
                        }}
                      >
                        — {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {DIVIDER}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section
        id="solutions"
        style={{
          background:
            "linear-gradient(180deg, #EAF5FB 0%, #FFF6C8 48%, #FFFAF2 100%)",
        }}
        className="py-24 lg:py-36 px-7 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto">
          <SectionLabel
            left={lang === "en" ? "What We Do" : "我們的服務"}
            right={lang === "en" ? "Seven Capabilities" : "七大能力"}
          />

          <div className="mt-14">
            {SOLUTIONS[lang].map((sol, i) => (
              <SolutionRow key={sol} sol={sol} idx={i} />
            ))}
            {DIVIDER_SOFT}
          </div>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section id="showcase" style={{ background: PAPER }} className="py-24 lg:py-36 px-7 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Head */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "rgba(14,13,12,0.38)",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {lang === "en" ? "Showcase" : "案例展示"}
              </p>
              <h2
                style={{
                  ...serif,
                  fontSize: "clamp(28px, 4vw, 50px)",
                  color: INK,
                  lineHeight: 1.15,
                }}
              >
                {lang === "en" ? (
                  <>Real transformation.<br />Measurable outcomes.</>
                ) : (
                  <>真實轉型。<br />可量化成果。</>
                )}
              </h2>
            </div>

            {/* Journey steps */}
            <div className="flex items-stretch shrink-0">
              {[
                { n: "01", label: lang === "en" ? "Fit" : "適配" },
                { n: "02", label: lang === "en" ? "Strength" : "實力" },
                { n: "03", label: lang === "en" ? "Demo" : "示範" },
              ].map((step, i) => (
                <div key={step.n} className="flex items-center">
                  <div
                    style={{
                      padding: "10px 18px",
                      background: i === 2 ? SUN : "transparent",
                      border: `1px solid ${i === 2 ? SUN : "rgba(31,42,50,0.14)"}`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        color: i === 2 ? "rgba(255,248,240,0.85)" : "rgba(31,42,50,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      {step.n}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: i === 2 ? PAPER : INK,
                        marginTop: 2,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {step.label}
                    </p>
                  </div>
                  {i < 2 && (
                    <div
                      style={{ width: 16, height: 1, background: "rgba(31,42,50,0.14)", flexShrink: 0 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Selector list */}
            <div
              className="lg:w-[260px] shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
              style={{ borderTop: `1px solid rgba(14,13,12,0.1)` }}
            >
              {SHOWCASES.map((item, i) => (
                <ShowcaseTab
                  key={item.id}
                  id={item.id}
                  label={item.industry[lang]}
                  active={selected === i}
                  onClick={() => setSelected(i)}
                />
              ))}
            </div>

            {/* Detail panel */}
            <div
              className="flex-1 pt-8 lg:pt-10"
              style={{ borderTop: `1px solid rgba(14,13,12,0.1)` }}
            >
              {/* Overline */}
              <div className="flex items-start justify-between mb-5">
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: SUN,
                  }}
                >
                  {sc.industry[lang]}
                </p>
                <span
                  style={{
                    ...display,
                    fontWeight: 900,
                    fontSize: 72,
                    color: "rgba(14,13,12,0.05)",
                    lineHeight: 1,
                    marginLeft: 16,
                    flexShrink: 0,
                  }}
                >
                  {sc.id}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  ...serif,
                  fontSize: "clamp(22px, 2.8vw, 36px)",
                  color: INK,
                  lineHeight: 1.2,
                  maxWidth: 600,
                  marginBottom: 32,
                }}
              >
                {sc.title[lang]}
              </h3>

              {/* Metric pull-quote */}
              <div
                style={{
                  borderLeft: `2px solid ${SUN}`,
                  paddingLeft: 20,
                  marginBottom: 32,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(14,13,12,0.38)",
                    marginBottom: 8,
                  }}
                >
                  {lang === "en" ? "Proven Result" : "已驗證成果"}
                </p>
                <p
                  style={{
                    ...serif,
                    fontSize: "clamp(20px, 2.4vw, 32px)",
                    color: SUN,
                    lineHeight: 1.2,
                  }}
                >
                  {sc.metric[lang]}
                </p>
              </div>

              {/* Ideal for */}
              <div style={{ marginBottom: 40 }}>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(14,13,12,0.38)",
                    marginBottom: 8,
                  }}
                >
                  {lang === "en" ? "Ideal For" : "最適合"}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3D3A36" }}>
                  {sc.fit[lang]}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <ActionBtn
                  label={lang === "en" ? "Request a Demo" : "申請示範"}
                  href={mailtoFor("demo", sc.title[lang])}
                  filled
                  icon={<ArrowRight size={12} />}
                />
                <ActionBtn
                  label={lang === "en" ? "Book Appointment" : "預約諮詢"}
                  href={mailtoFor("appointment", sc.title[lang])}
                  icon={<ArrowRight size={12} />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        style={{
          background: "linear-gradient(135deg, #FFFAF2 0%, #FFF3A8 42%, #EAF5FB 100%)",
        }}
        className="overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ minHeight: 380 }}>
            <img
              src="/hero-aurora.jpg"
              alt="Vivid aurora borealis across a star-filled night sky"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: "center 45%",
                filter: "brightness(1.1) contrast(1.12) saturate(1.25)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(90,40,140,0.22) 0%, transparent 55%)",
              }}
            />
          </div>

          {/* Copy */}
          <div className="py-20 lg:py-28 px-7 lg:px-16">
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(31,42,50,0.4)",
                marginBottom: 28,
              }}
            >
              {lang === "en" ? "About" : "關於我們"}
            </p>
            <h2
              style={{
                ...serif,
                fontSize: "clamp(28px, 4vw, 50px)",
                lineHeight: 1.18,
                marginBottom: 24,
              }}
            >
              <span style={{ color: INK }}>
                {lang === "en" ? (
                  <>
                    Hong Kong registered.<br />
                    <span style={{ color: CORAL }}>Globally minded.</span>
                  </>
                ) : (
                  <>
                    香港註冊。<br />
                    <span style={{ color: CORAL }}>放眼全球。</span>
                  </>
                )}
              </span>
            </h2>
            <p
              style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(31,42,50,0.72)", marginBottom: 16 }}
            >
              {lang === "en"
                ? "Spectrum Total Solutions Limited partners with regional and global organisations to build the Toolset, Skillset, and Mindset required for sustained competitive advantage."
                : "天域策略顧問有限公司與區域及全球企業攜手合作，構建持久競爭優勢所需的工具集、技能集與思維集。"}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(31,42,50,0.55)" }}>
              {lang === "en"
                ? "Our practitioners bring deep experience across financial services, retail, hospitality, and professional services in Hong Kong and across Asia-Pacific."
                : "我們的顧問在金融服務、零售、酒店及專業服務等領域擁有豐富實踐經驗，深耕香港及亞太地區。"}
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: PAPER }} className="py-28 lg:py-44 px-7 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24 items-end">
            <div>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(14,13,12,0.35)",
                  marginBottom: 20,
                }}
              >
                {lang === "en" ? "Get Started" : "開始合作"}
              </p>
              <h2
                style={{
                  ...display,
                  fontWeight: 900,
                  fontSize: "clamp(56px, 11vw, 148px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.88,
                  color: INK,
                }}
              >
                {lang === "en" ? (
                  <>READY<br />TO<br />BEGIN?</>
                ) : (
                  <>準備好<br />開始<br />了嗎？</>
                )}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <p
                style={{
                  ...serif,
                  fontSize: 18,
                  color: "rgba(14,13,12,0.42)",
                  marginBottom: 16,
                  lineHeight: 1.4,
                }}
              >
                {lang === "en" ? "Two paths. One destination." : "兩條路徑，一個目標。"}
              </p>
              <ContactBtn
                label={lang === "en" ? "Request a Demo" : "申請示範"}
                href={mailtoFor("demo")}
                filled
              />
              <ContactBtn
                label={lang === "en" ? "Book an Appointment" : "預約諮詢"}
                href={mailtoFor("appointment")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{ background: FOOTER, borderTop: "1px solid rgba(255,248,240,0.08)" }}
        className="py-7 px-7 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              style={{
                ...display,
                fontWeight: 900,
                letterSpacing: "0.12em",
                fontSize: 15,
                color: PAPER,
              }}
            >
              SPECTRUM
            </span>
            <span style={{ color: "rgba(255,248,240,0.2)", fontSize: 12 }}>|</span>
            <span style={{ fontSize: 11, color: "rgba(255,248,240,0.55)", letterSpacing: "0.08em" }}>
              天域策略顧問有限公司
            </span>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,248,240,0.4)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Spectrum Total Solutions Limited · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function SectionLabel({
  left,
  right,
  light = false,
}: {
  left: string;
  right: string;
  light?: boolean;
}) {
  const c = light ? "rgba(245,243,239,0.28)" : "rgba(14,13,12,0.35)";
  const line = light ? "rgba(245,243,239,0.08)" : "rgba(14,13,12,0.1)";
  return (
    <div className="flex items-center gap-5">
      <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: c, whiteSpace: "nowrap" }}>
        {left}
      </span>
      <div style={{ flex: 1, height: 1, background: line }} />
      <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: c, whiteSpace: "nowrap" }}>
        {right}
      </span>
    </div>
  );
}

function SolutionRow({ sol, idx }: { sol: string; idx: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid rgba(31,42,50,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 0",
        paddingLeft: hovered ? 14 : 0,
        transition: "padding-left 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: CORAL,
            minWidth: 28,
          }}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 3.2vw, 40px)",
            letterSpacing: "0.01em",
            color: hovered ? CORAL : INK,
            transition: "color 0.2s",
            lineHeight: 1.2,
          }}
        >
          {sol}
        </span>
      </div>
      <ArrowRight
        size={15}
        style={{
          color: hovered ? SUN : "rgba(31,42,50,0.25)",
          transition: "color 0.2s",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function ShowcaseTab({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 0",
        paddingLeft: active ? 12 : 0,
        borderBottom: `1px solid rgba(14,13,12,0.07)`,
        borderLeft: active ? `2px solid ${SUN}` : "2px solid transparent",
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
        opacity: active ? 1 : 0.42,
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: SUN,
          minWidth: 22,
        }}
      >
        {id}
      </span>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13,
          color: INK,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </button>
  );
}

function HeroBtn({
  label,
  href,
  filled = false,
}: {
  label: string;
  href: string;
  filled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "12px 26px",
        background: filled
          ? hovered
            ? "#FFE56A"
            : SUN
          : hovered
            ? "rgba(255,255,255,0.16)"
            : "transparent",
        color: filled ? "#0A1628" : "#FFFFFF",
        border: filled ? "none" : "1.5px solid rgba(255,255,255,0.85)",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        boxShadow: filled
          ? "0 6px 22px rgba(242,196,15,0.4)"
          : "0 2px 12px rgba(0,0,0,0.25)",
        textShadow: filled ? "none" : "0 1px 2px rgba(0,0,0,0.45)",
      }}
    >
      {label}
    </a>
  );
}

function ActionBtn({
  label,
  href,
  filled = false,
  icon,
}: {
  label: string;
  href: string;
  filled?: boolean;
  icon?: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "14px 28px",
        background: filled ? (hovered ? CORAL : SUN) : hovered ? INK : "transparent",
        color: filled ? INK : hovered ? PAPER : INK,
        border: filled ? "none" : "1px solid rgba(31,42,50,0.2)",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
      }}
    >
      {label}
      {icon}
    </a>
  );
}

function ContactBtn({
  label,
  href,
  filled = false,
}: {
  label: string;
  href: string;
  filled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "18px 28px",
        background: filled
          ? hovered
            ? CORAL
            : SUN
          : hovered
            ? "rgba(242,196,15,0.14)"
            : "transparent",
        color: INK,
        border: filled ? "none" : "1px solid rgba(31,42,50,0.18)",
        cursor: "pointer",
        transition: "all 0.2s",
        width: "100%",
        textAlign: "left",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textDecoration: "none",
        boxSizing: "border-box",
      }}
    >
      {label}
      <ArrowRight size={14} />
    </a>
  );
}
