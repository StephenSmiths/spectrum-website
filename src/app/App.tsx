import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

type Lang = "en" | "zh";

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

// ── Palette ──────────────────────────────────────────────
const PAPER = "#F8F5EE";       // warm ivory
const PAPER_DEEP = "#F0EDE4";  // slightly deeper cream for alternating
const INK = "#100F0C";         // warm near-black (not cold blue-black)
const BRONZE = "#A8844E";      // refined bronze
const BRONZE_LIGHT = "#C4A86C"; // lighter bronze for hover
const MID = "#6B6355";         // warm mid-tone for muted text

// ── Font stacks ──────────────────────────────────────────
const D: CSSProperties = { fontFamily: "'Big Shoulders Display', system-ui, sans-serif" };
const S: CSSProperties = { fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontWeight: 300 };
const B: CSSProperties = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };

// ── Data ─────────────────────────────────────────────────
const NAV_IDS = ["manifesto", "approach", "solutions", "showcase", "about", "contact"];

const NAV = {
  en: ["Manifesto", "Approach", "Solutions", "Showcase", "About", "Contact"],
  zh: ["品牌宣言", "方法論", "服務", "案例展示", "關於我們", "聯絡我們"],
};

const PILLARS = [
  {
    key: "TOOLSET",
    zh: "工具集",
    desc: {
      en: "The systems, platforms, and automation that eliminate friction and multiply your operational capacity.",
      zh: "消除摩擦、倍增運營能力的系統、平台與自動化工具。",
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
      en: "The human capabilities — precision, confidence, and judgment — your people build to perform at their best.",
      zh: "您的員工建立精確、自信與判斷力，以最佳狀態執行工作的人才能力。",
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
      en: "The strategic orientation that aligns your entire organisation toward its most enduring ambitions.",
      zh: "使整個組織與最長遠願景保持一致的策略思維方向。",
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
  { id: "02", industry: { en: "B2B Sales", zh: "B2B銷售" }, title: { en: "Pipeline Velocity for Complex Enterprise Sales", zh: "複雜企業銷售管道加速計劃" }, fit: { en: "B2B companies with 6–18 month sales cycles navigating multi-stakeholder decisions.", zh: "銷售週期6至18個月、需多方決策的B2B企業。" }, metric: { en: "40% reduction in sales cycle length", zh: "銷售週期縮短40%" } },
  { id: "03", industry: { en: "Banking & Finance", zh: "銀行及金融" }, title: { en: "CX Transformation for Retail Banking", zh: "零售銀行客戶體驗轉型" }, fit: { en: "Banks experiencing high branch abandonment rates and declining NPS scores.", zh: "面對分行流失率高、NPS持續下降問題的銀行。" }, metric: { en: "18-point NPS improvement in 6 months", zh: "6個月內NPS提升18分" } },
  { id: "04", industry: { en: "Hospitality", zh: "酒店業" }, title: { en: "Service Excellence Capability Programme", zh: "卓越服務能力提升計劃" }, fit: { en: "Luxury hotel groups expanding into new markets or repositioning brand standards.", zh: "進入新市場或重新定位品牌標準的奢華酒店集團。" }, metric: { en: "Guest satisfaction score up 31% post-programme", zh: "計劃後賓客滿意度提升31%" } },
  { id: "05", industry: { en: "Contact Centre", zh: "客服中心" }, title: { en: "Real-Time Emotion Detection for CX Teams", zh: "客服團隊實時情緒感知系統" }, fit: { en: "High-volume contact centres handling 500+ daily calls with chronic escalation pressure.", zh: "日均處理500個以上電話、面臨升級壓力的大型客服中心。" }, metric: { en: "34% drop in escalation rate within 60 days", zh: "60天內升級率下降34%" } },
  { id: "06", industry: { en: "Leadership", zh: "領導力" }, title: { en: "Behavioural Analysis for Senior Leadership Teams", zh: "高管團隊行為分析系統" }, fit: { en: "C-suite teams undergoing strategic restructuring or navigating complex succession.", zh: "正在進行策略重組或接班人規劃的高管團隊。" }, metric: { en: "Decision-making speed improved 2.4× post-assessment", zh: "評估後決策速度提升2.4倍" } },
  { id: "07", industry: { en: "Retail & FMCG", zh: "零售及快消品" }, title: { en: "Observation Room for Product Launch Validation", zh: "新品發布觀察室驗證系統" }, fit: { en: "Brand managers launching new SKUs in Asia Pacific who need real consumer insight fast.", zh: "在亞太地區推出新SKU、需要快速獲得真實消費者洞察的品牌經理。" }, metric: { en: "Launch success rate up 45% vs. control launches", zh: "新品成功率比對照組提升45%" } },
  { id: "08", industry: { en: "Insurance", zh: "保險業" }, title: { en: "Claims Processing Acceleration Programme", zh: "理賠處理加速計劃" }, fit: { en: "Insurance firms processing 1,000+ claims per month bottlenecked by manual workflows.", zh: "每月處理1,000個以上理賠、存在人工瓶頸的保險公司。" }, metric: { en: "Claims resolution time reduced by 52%", zh: "理賠解決時間縮短52%" } },
  { id: "09", industry: { en: "Professional Services", zh: "專業服務" }, title: { en: "Academy Build for High-Growth Consulting Firms", zh: "高增長顧問公司學院建設計劃" }, fit: { en: "Consulting firms scaling rapidly from 50 to 500 headcount with unstructured onboarding.", zh: "從50人快速擴展至500人、缺乏結構化入職培訓的顧問公司。" }, metric: { en: "Time-to-productivity for new hires cut by 60%", zh: "新員工達到生產力的時間縮短60%" } },
  { id: "10", industry: { en: "Regional Expansion", zh: "區域擴張" }, title: { en: "Cross-Border Growth Mindset Transformation", zh: "跨境增長思維轉型計劃" }, fit: { en: "HK-headquartered companies entering Southeast Asia or the Greater Bay Area for the first time.", zh: "向東南亞或大灣區首次擴張的香港總部企業。" }, metric: { en: "Market entry timeline accelerated by 35%", zh: "市場進入時間表縮短35%" } },
];

// ── App ───────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const sc = SHOWCASES[selected];

  return (
    <div style={{ ...B, background: PAPER, color: INK, overflowX: "hidden", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: scrolled ? "rgba(248,245,238,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(16,15,12,0.08)` : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-7 lg:px-12 flex items-center justify-between" style={{ height: 60 }}>
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ ...D, fontWeight: 900, fontSize: 17, letterSpacing: "0.1em", color: scrolled ? INK : "#F8F5EE", transition: "color 0.4s" }}>
              SPECTRUM
            </span>
            <span style={{ fontSize: 10, letterSpacing: "0.09em", color: scrolled ? `rgba(16,15,12,0.35)` : "rgba(248,245,238,0.45)", transition: "color 0.4s" }}>
              天域策略顧問
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV[lang].map((item, i) => (
              <a key={i} href={`#${NAV_IDS[i]}`}
                style={{ ...B, fontSize: 12, letterSpacing: "0.04em", color: scrolled ? `rgba(16,15,12,0.6)` : "rgba(248,245,238,0.75)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = scrolled ? INK : "#F8F5EE"}
                onMouseLeave={e => e.currentTarget.style.color = scrolled ? `rgba(16,15,12,0.6)` : "rgba(248,245,238,0.75)"}
              >{item}</a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button onClick={() => setLang(l => l === "en" ? "zh" : "en")}
              style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer", color: scrolled ? INK : "#F8F5EE", transition: "color 0.4s", padding: 0 }}>
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button onClick={() => setMobileOpen(v => !v)}
              style={{ display: "flex", background: "none", border: "none", cursor: "pointer", color: scrolled ? INK : "#F8F5EE", transition: "color 0.4s", padding: 0 }}
              className="md:hidden">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden" style={{ background: PAPER, borderTop: `1px solid rgba(16,15,12,0.07)`, padding: "16px 28px 32px" }}>
            {NAV[lang].map((item, i) => (
              <a key={i} href={`#${NAV_IDS[i]}`} onClick={() => setMobileOpen(false)}
                style={{ display: "block", fontSize: 18, color: INK, padding: "14px 0", borderBottom: `1px solid rgba(16,15,12,0.06)`, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        style={{ position: "relative", height: "100svh", minHeight: 680, background: "#130E08", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        <img
          src="/hero-sunrise.jpg"
          alt="Warm golden sunrise over ocean at dawn"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
        />
        {/* Warm gradient — heavier at bottom for text legibility */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(19,14,8,0.96) 0%, rgba(19,14,8,0.4) 50%, rgba(19,14,8,0.05) 100%)" }} />
        {/* Warm sunrise glow */}
        <div style={{ position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "45%", background: "radial-gradient(ellipse at 50% 75%, rgba(168,132,78,0.3) 0%, transparent 65%)", pointerEvents: "none" }} />

        {/* Top-left identifier */}
        <div style={{ position: "absolute", top: 72, left: 28 }} className="lg:left-12">
          <p style={{ ...S, fontSize: 13, letterSpacing: "0.04em", color: "rgba(248,245,238,0.48)" }}>
            {lang === "en" ? "天域策略顧問有限公司" : "Spectrum Total Solutions Limited"}
          </p>
        </div>

        {/* Hero body — anchored to bottom */}
        <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
          <div className="max-w-[1440px] mx-auto px-7 lg:px-12 pb-4" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <p style={{ ...S, fontSize: "clamp(18px, 2.2vw, 28px)", color: "rgba(248,245,238,0.82)", lineHeight: 1.4, maxWidth: 440 }}>
                {lang === "en" ? "Where strategy meets transformation." : "策略與轉型的交匯點。"}
              </p>
              <div className="flex flex-wrap gap-3" style={{ paddingBottom: 2, flexShrink: 0 }}>
                <Btn label={lang === "en" ? "Book an Appointment" : "預約諮詢"} href={mailtoFor("appointment")} filled />
                <Btn label={lang === "en" ? "Explore Showcases" : "探索案例"} href="#showcase" />
              </div>
            </div>
          </div>

          {/* SPECTRUM — full-width wordmark at base */}
          <div style={{ lineHeight: 0.82, overflow: "hidden" }}>
            <h1 style={{ ...D, fontWeight: 900, fontSize: "clamp(72px, 26.8vw, 400px)", letterSpacing: "-0.01em", color: PAPER, lineHeight: 0.82, margin: 0, paddingLeft: "0.04em", userSelect: "none" }}>
              SPECTRUM
            </h1>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section id="manifesto" style={{ overflow: "hidden" }}>
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Panel 1 — MASS TO CLASS (warm paper) */}
          <div
            style={{
              background: PAPER,
              padding: "clamp(56px, 9vw, 112px) clamp(28px, 6vw, 84px)",
              borderRight: `1px solid rgba(16,15,12,0.09)`,
              borderBottom: `1px solid rgba(16,15,12,0.09)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <span style={{ ...B, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(16,15,12,0.28)" }}>
              {lang === "en" ? "01 · Brand Manifesto" : "01 · 品牌宣言"}
            </span>

            <div>
              <div style={{ overflow: "hidden", lineHeight: 0.82, marginBottom: 28 }}>
                <p style={{ ...D, fontWeight: 900, fontSize: "clamp(52px, 8.8vw, 128px)", letterSpacing: "-0.025em", lineHeight: 0.82, color: INK, margin: 0, userSelect: "none" }}>
                  MASS<br />TO<br />CLASS.
                </p>
              </div>
              <p style={{ ...S, fontSize: "clamp(22px, 3.2vw, 46px)", color: BRONZE, lineHeight: 1.05, letterSpacing: "0.05em", marginBottom: 14 }}>
                博觀而約取
              </p>
              <p style={{ ...S, fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(16,15,12,0.46)", lineHeight: 1.75 }}>
                From volume to excellence —<br />gather widely, choose precisely.
              </p>
            </div>
          </div>

          {/* Panel 2 — LAST TO BLAST (warm dark) */}
          <div
            style={{
              background: "#1A1410",
              padding: "clamp(56px, 9vw, 112px) clamp(28px, 6vw, 84px)",
              borderBottom: `1px solid rgba(248,245,238,0.06)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <span style={{ ...B, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,245,238,0.22)" }}>
              {lang === "en" ? "02 · Brand Manifesto" : "02 · 品牌宣言"}
            </span>

            <div>
              <div style={{ overflow: "hidden", lineHeight: 0.82, marginBottom: 28 }}>
                <p style={{ ...D, fontWeight: 900, fontSize: "clamp(52px, 8.8vw, 128px)", letterSpacing: "-0.025em", lineHeight: 0.82, color: PAPER, margin: 0, userSelect: "none" }}>
                  LAST<br />TO<br />BLAST.
                </p>
              </div>
              <p style={{ ...S, fontSize: "clamp(22px, 3.2vw, 46px)", color: BRONZE_LIGHT, lineHeight: 1.05, letterSpacing: "0.05em", marginBottom: 14 }}>
                厚積而薄發
              </p>
              <p style={{ ...S, fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(248,245,238,0.36)", lineHeight: 1.75 }}>
                From patience to breakthrough —<br />build deep, then release with force.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── APPROACH ── */}
      <section id="approach" style={{ background: PAPER_DEEP, paddingTop: "clamp(64px, 8vw, 100px)", paddingBottom: 0, paddingLeft: 28, paddingRight: 28 }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SectionLabel
            left={lang === "en" ? "Our Philosophy" : "我們的理念"}
            right={lang === "en" ? "Three Dimensions" : "三個維度"}
          />

          <div style={{ marginTop: 48 }}>
            {PILLARS.map((p, idx) => (
              <PillarRow key={p.key} pillar={p} lang={lang} accent={idx === 0 ? "#5E9EC7" : idx === 1 ? BRONZE : "#C07848"} />
            ))}
            <div style={{ height: 1, background: `rgba(16,15,12,0.1)` }} />
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section id="solutions" style={{ background: "#1A1410", paddingTop: "clamp(64px, 8vw, 100px)", paddingBottom: "clamp(64px, 8vw, 100px)", paddingLeft: 28, paddingRight: 28 }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SectionLabel
            left={lang === "en" ? "What We Do" : "我們的服務"}
            right={lang === "en" ? "Seven Capabilities" : "七大能力"}
            light
          />
          <div style={{ marginTop: 48 }}>
            {SOLUTIONS[lang].map((sol, i) => (
              <SolutionRow key={sol} sol={sol} idx={i} />
            ))}
            <div style={{ height: 1, background: "rgba(248,245,238,0.07)" }} />
          </div>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section id="showcase" style={{ background: PAPER, paddingTop: "clamp(64px, 8vw, 100px)", paddingBottom: "clamp(64px, 8vw, 100px)", paddingLeft: 28, paddingRight: 28 }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto">

          {/* Head */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8" style={{ marginBottom: 48 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(16,15,12,0.35)`, marginBottom: 12 }}>
                {lang === "en" ? "Showcase" : "案例展示"}
              </p>
              <h2 style={{ ...S, fontSize: "clamp(26px, 3.8vw, 48px)", color: INK, lineHeight: 1.15 }}>
                {lang === "en" ? <>Real transformation.<br />Measurable outcomes.</> : <>真實轉型。<br />可量化成果。</>}
              </h2>
            </div>

            {/* Journey steps */}
            <div style={{ display: "flex", alignItems: "stretch", flexShrink: 0 }}>
              {[
                { n: "01", label: lang === "en" ? "Fit" : "適配" },
                { n: "02", label: lang === "en" ? "Strength" : "實力" },
                { n: "03", label: lang === "en" ? "Demo" : "示範" },
              ].map((step, i) => (
                <div key={step.n} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ padding: "10px 18px", background: i === 2 ? BRONZE : "transparent", border: `1px solid ${i === 2 ? BRONZE : "rgba(16,15,12,0.14)"}` }}>
                    <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: i === 2 ? "rgba(248,245,238,0.7)" : `rgba(16,15,12,0.35)` }}>{step.n}</p>
                    <p style={{ fontSize: 13, fontWeight: 500, color: i === 2 ? PAPER : INK, marginTop: 2, letterSpacing: "0.02em" }}>{step.label}</p>
                  </div>
                  {i < 2 && <div style={{ width: 14, height: 1, background: `rgba(16,15,12,0.14)`, flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Selector */}
            <div className="lg:w-[260px] flex-shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ borderTop: `1px solid rgba(16,15,12,0.1)` }}>
              {SHOWCASES.map((item, i) => (
                <ShowcaseTab key={item.id} id={item.id} label={item.industry[lang]} active={selected === i} onClick={() => setSelected(i)} />
              ))}
            </div>

            {/* Detail */}
            <div className="flex-1 lg:pt-10 pt-6" style={{ borderTop: `1px solid rgba(16,15,12,0.1)` }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: BRONZE }}>
                  {sc.industry[lang]}
                </p>
                <span style={{ ...D, fontWeight: 900, fontSize: 72, color: `rgba(16,15,12,0.05)`, lineHeight: 1, marginLeft: 12, flexShrink: 0 }}>
                  {sc.id}
                </span>
              </div>

              <h3 style={{ ...S, fontSize: "clamp(22px, 2.8vw, 36px)", color: INK, lineHeight: 1.2, maxWidth: 580, marginBottom: 28 }}>
                {sc.title[lang]}
              </h3>

              {/* Metric pull-quote */}
              <div style={{ borderLeft: `2px solid ${BRONZE}`, paddingLeft: 18, marginBottom: 28 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(16,15,12,0.35)`, marginBottom: 7 }}>
                  {lang === "en" ? "Proven Result" : "已驗證成果"}
                </p>
                <p style={{ ...S, fontSize: "clamp(19px, 2.2vw, 30px)", color: BRONZE, lineHeight: 1.2 }}>
                  {sc.metric[lang]}
                </p>
              </div>

              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(16,15,12,0.35)`, marginBottom: 7 }}>
                  {lang === "en" ? "Ideal For" : "最適合"}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "#3D3A34" }}>
                  {sc.fit[lang]}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <ActionBtn label={lang === "en" ? "Request a Demo" : "申請示範"} href={mailtoFor("demo", sc.title[lang])} filled icon={<ArrowRight size={12} />} />
                <ActionBtn label={lang === "en" ? "Book Appointment" : "預約諮詢"} href={mailtoFor("appointment", sc.title[lang])} icon={<ArrowRight size={12} />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: "#1A1410", overflow: "hidden" }}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div style={{ position: "relative", minHeight: 380, overflow: "hidden" }}>
            <img
              src="/about-harbour.jpg"
              alt="Hong Kong harbour skyline at golden hour"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, filter: "saturate(0.75)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(168,132,78,0.18) 0%, transparent 55%)" }} />
          </div>

          <div style={{ padding: "clamp(48px, 8vw, 100px) 28px" }} className="lg:px-16">
            <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,245,238,0.28)", marginBottom: 24 }}>
              {lang === "en" ? "About" : "關於我們"}
            </p>
            <h2 style={{ ...S, fontSize: "clamp(26px, 3.8vw, 48px)", lineHeight: 1.18, marginBottom: 22 }}>
              <span style={{ color: PAPER }}>
                {lang === "en"
                  ? <><span style={{ color: BRONZE_LIGHT }}>Mass to Class</span> — from Hong Kong,<br />to the world.</>
                  : <><span style={{ color: BRONZE_LIGHT }}>博觀而約取</span> — 立足香港，<br />放眼全球。</>}
              </span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(248,245,238,0.55)", marginBottom: 14 }}>
              {lang === "en"
                ? "Spectrum Total Solutions Limited partners with regional and global organisations to build the Toolset, Skillset, and Mindset required for sustained competitive advantage."
                : "天域策略顧問有限公司與區域及全球企業攜手合作，構建持久競爭優勢所需的工具集、技能集與思維集。"}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(248,245,238,0.32)" }}>
              {lang === "en"
                ? "Our practitioners bring deep experience across financial services, retail, hospitality, and professional services in Hong Kong and across Asia-Pacific."
                : "我們的顧問在金融服務、零售、酒店及專業服務等領域擁有豐富實踐經驗，深耕香港及亞太地區。"}
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: PAPER, padding: "clamp(80px, 14vw, 160px) 28px" }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-end">
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(16,15,12,0.32)`, marginBottom: 20 }}>
                {lang === "en" ? "Get Started" : "開始合作"}
              </p>
              <h2 style={{ ...D, fontWeight: 900, fontSize: "clamp(52px, 11vw, 148px)", letterSpacing: "-0.025em", lineHeight: 0.88, color: INK }}>
                {lang === "en" ? <><span style={{ color: BRONZE }}>READY</span><br />TO<br />BEGIN?</> : <><span style={{ color: BRONZE }}>準備好</span><br />開始<br />了嗎？</>}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ ...S, fontSize: 18, color: `rgba(16,15,12,0.42)`, marginBottom: 12, lineHeight: 1.45 }}>
                {lang === "en" ? "Two paths. One destination." : "兩條路徑，一個目標。"}
              </p>
              <ContactBtn label={lang === "en" ? "Request a Demo" : "申請示範"} href={mailtoFor("demo")} filled />
              <ContactBtn label={lang === "en" ? "Book an Appointment" : "預約諮詢"} href={mailtoFor("appointment")} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#100D09", borderTop: `1px solid rgba(248,245,238,0.06)`, padding: "28px 28px" }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ ...D, fontWeight: 900, letterSpacing: "0.12em", fontSize: 15, color: "#F8F5EE" }}>SPECTRUM</span>
            <span style={{ color: "rgba(248,245,238,0.12)" }}>|</span>
            <span style={{ fontSize: 11, color: "rgba(248,245,238,0.28)", letterSpacing: "0.07em" }}>天域策略顧問有限公司</span>
          </div>
          <p style={{ fontSize: 11, color: "rgba(248,245,238,0.2)", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Spectrum Total Solutions Limited · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ── Shared sub-components ────────────────────────────────

function SectionLabel({ left, right, light = false }: { left: string; right: string; light?: boolean }) {
  const c = light ? "rgba(248,245,238,0.28)" : "rgba(16,15,12,0.32)";
  const line = light ? "rgba(248,245,238,0.08)" : "rgba(16,15,12,0.1)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ ...B, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c, whiteSpace: "nowrap" }}>{left}</span>
      <div style={{ flex: 1, height: 1, background: line }} />
      <span style={{ ...B, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c, whiteSpace: "nowrap" }}>{right}</span>
    </div>
  );
}

function PillarRow({ pillar, lang, accent }: { pillar: typeof PILLARS[0]; lang: Lang; accent: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ borderTop: `1px solid rgba(16,15,12,0.1)`, padding: "40px 0 44px", background: hov ? "rgba(16,15,12,0.02)" : "transparent", transition: "background 0.3s", cursor: "default" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_200px] gap-6 lg:gap-0 items-start">
        <div>
          <div style={{ ...D, fontWeight: 900, fontSize: "clamp(48px, 7vw, 104px)", letterSpacing: "-0.02em", lineHeight: 0.88, color: INK }}>
            {pillar.key}
          </div>
          <div style={{ ...S, fontSize: 15, color: MID, marginTop: 10, letterSpacing: "0.03em" }}>{pillar.zh}</div>
          <div style={{ marginTop: 12, width: 22, height: 2, background: accent }} />
        </div>
        <div className="lg:px-14" style={{ paddingTop: 2 }}>
          <p style={{ fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: 1.8, color: "#3E3B35", maxWidth: 520 }}>{pillar.desc[lang]}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 4 }} className="lg:flex-col">
          {pillar.tags[lang].map(tag => (
            <span key={tag} style={{ ...B, fontSize: 11, letterSpacing: "0.07em", color: MID }}>— {tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolutionRow({ sol, idx }: { sol: string; idx: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ borderTop: "1px solid rgba(248,245,238,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", paddingLeft: hov ? 14 : 0, transition: "padding-left 0.3s ease", cursor: "pointer" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
        <span style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: BRONZE, minWidth: 26 }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
        <span style={{ ...D, fontWeight: 700, fontSize: "clamp(20px, 3vw, 38px)", letterSpacing: "0.01em", color: hov ? "#F8F5EE" : "rgba(248,245,238,0.82)", transition: "color 0.2s", lineHeight: 1.2 }}>
          {sol}
        </span>
      </div>
      <ArrowRight size={15} style={{ color: hov ? BRONZE : "rgba(248,245,238,0.18)", transition: "color 0.2s", flexShrink: 0 }} />
    </div>
  );
}

function ShowcaseTab({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", paddingLeft: active ? 12 : 0, borderBottom: `1px solid rgba(16,15,12,0.07)`, borderLeft: active ? `2px solid ${BRONZE}` : "2px solid transparent", background: "transparent", cursor: "pointer", textAlign: "left", opacity: active ? 1 : 0.38, transition: "all 0.25s ease", whiteSpace: "nowrap", flexShrink: 0 }}>
      <span style={{ ...B, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: BRONZE, minWidth: 22 }}>{id}</span>
      <span style={{ ...B, fontSize: 13, color: INK, lineHeight: 1.4 }}>{label}</span>
    </button>
  );
}

function Btn({ label, filled = false, href }: { label: string; filled?: boolean; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "12px 24px", cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "inline-block", background: filled ? (hov ? BRONZE_LIGHT : BRONZE) : hov ? "rgba(248,245,238,0.12)" : "transparent", color: PAPER, border: filled ? "none" : "1px solid rgba(248,245,238,0.36)" }}>
      {label}
    </a>
  );
}

function ActionBtn({ label, filled = false, icon, href }: { label: string; filled?: boolean; icon?: ReactNode; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", padding: "13px 26px", cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, background: filled ? (hov ? "#1A1410" : INK) : hov ? INK : "transparent", color: filled ? PAPER : hov ? PAPER : INK, border: filled ? "none" : `1px solid rgba(16,15,12,0.2)` }}>
      {label}{icon}
    </a>
  );
}

function ContactBtn({ label, filled = false, href }: { label: string; filled?: boolean; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...B, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "18px 26px", cursor: "pointer", transition: "all 0.2s", textDecoration: "none", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: filled ? (hov ? BRONZE : INK) : "transparent", color: filled ? PAPER : INK, border: filled ? "none" : `1px solid rgba(16,15,12,0.18)` }}>
      {label} <ArrowRight size={14} />
    </a>
  );
}
