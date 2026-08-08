import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ActionBtn, ContactBtn, HeroBtn } from "@/components/ui/Buttons";
import { ShowcaseBillboard } from "@/components/showcase/ShowcaseBillboard";
import { ShowcaseRail } from "@/components/showcase/ShowcaseRail";
import { useCta } from "@/components/showcase/CtaContext";
import { DISCLAIMER } from "@/lib/disclaimer";
import { usePersistentLang } from "@/lib/lang";
import {
  SHOWCASE_AUTO_CYCLE_MS,
  useShowcaseBillboardCycle,
} from "@/hooks/useShowcaseBillboardCycle";
import {
  BASE,
  DIM,
  GHOST,
  GOLD,
  IVORY,
  PURPLE,
  TEAL,
  aurora,
  fontBody,
  fontDisplay,
  fontSerif,
  type Lang,
} from "@/lib/theme";
import { featuredShowcases, publishedShowcases } from "@/content/showcases";
import { CoreAdvantagesSection } from "@/components/sections/CoreAdvantagesSection";
import { DriveModelSection } from "@/components/sections/DriveModelSection";
import { UltimateSuiteSection } from "@/components/sections/UltimateSuiteSection";

const D = fontDisplay;
const S = fontSerif;
const Bd = fontBody;

const SOLUTIONS = {
  en: ["Workflow Automation", "Sales-Core Automation", "Customer Experience Optimisation", "Employee Capability Building", "Emotion Detection", "Behavioural Analysis", "Observation Room System"],
  zh: ["工作流程自動化", "銷售核心自動化", "客戶體驗優化", "員工能力建設", "情緒感知分析", "行為分析系統", "觀察室系統"],
};

const INDUSTRY_CASES = [
  { id: "01", industry: { en: "Retail Operations", zh: "零售營運" }, title: { en: "Smart Floor Intelligence for Multi-Site Retail", zh: "多店零售智能地面分析系統" }, fit: { en: "Regional retail chains with 10+ locations seeking granular foot-traffic intelligence.", zh: "擁有10個或以上門店、尋求客流量洞察的區域零售連鎖。" }, metric: { en: "23% uplift in conversion rate within 90 days", zh: "90天內轉化率提升23%" } },
  { id: "02", industry: { en: "B2B Sales", zh: "B2B銷售" }, title: { en: "Pipeline Velocity for Complex Enterprise Sales", zh: "複雜企業銷售管道加速計劃" }, fit: { en: "B2B companies with 6–18 month sales cycles navigating multi-stakeholder decisions.", zh: "銷售週期6至18個月、需多方決策的B2B企業。" }, metric: { en: "40% reduction in sales cycle length", zh: "銷售週期縮短40%" } },
  { id: "03", industry: { en: "Banking & Finance", zh: "銀行及金融" }, title: { en: "CX Transformation for Retail Banking", zh: "零售銀行客戶體驗轉型" }, fit: { en: "Banks experiencing high branch abandonment rates and declining NPS scores.", zh: "面對分行流失率高、NPS持續下降問題的銀行。" }, metric: { en: "18-point NPS improvement in 6 months", zh: "6個月內NPS提升18分" } },
  { id: "04", industry: { en: "Hospitality", zh: "酒店業" }, title: { en: "Service Excellence Capability Programme", zh: "卓越服務能力提升計劃" }, fit: { en: "Luxury hotel groups expanding into new markets or repositioning brand standards.", zh: "進入新市場或重新定位品牌標準的奢華酒店集團。" }, metric: { en: "Guest satisfaction score up 31% post-programme", zh: "計劃後賓客滿意度提升31%" } },
  { id: "05", industry: { en: "Contact Centre", zh: "客服中心" }, title: { en: "Real-Time Emotion Detection for CX Teams", zh: "客服團隊實時情緒感知系統" }, fit: { en: "High-volume contact centres handling 500+ daily calls with chronic escalation pressure.", zh: "日均處理500個以上電話、面臨升級壓力的大型客服中心。" }, metric: { en: "34% drop in escalation rate within 60 days", zh: "60天內升級率下降34%" } },
];

function HomeInner({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState(0);
  const sc = INDUSTRY_CASES[selected];
  const [browseIdeas] = useState(() => {
    const featured = featuredShowcases();
    return featured.length ? featured : publishedShowcases().slice(0, 8);
  });
  const { openDemo, openEnquiry } = useCta();
  const location = useLocation();

  const {
    billboard,
    canAutoCycle,
    progressPlaying,
    cycleKey,
    heroIndex,
    cycle,
    previewItem,
    onPauseChange,
    positionLabel,
  } = useShowcaseBillboardCycle(browseIdeas);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.hash]);

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", height: "100svh", minHeight: 680, background: BASE, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <img src="/hero-aurora.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.88 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,12,24,0.97) 0%, rgba(6,12,24,0.25) 45%, rgba(6,12,24,0.0) 100%)" }} />
        <div style={{ position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)", width: "65%", height: "35%", background: "radial-gradient(ellipse at 50% 85%, rgba(196,151,90,0.22) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 72, left: 28 }} className="lg:left-12">
          <p style={{ ...S, fontSize: 13, letterSpacing: "0.04em", color: "rgba(238,240,248,0.45)" }}>
            {lang === "en" ? "天域策略顧問有限公司" : "Spectrum Total Solutions Limited"}
          </p>
        </div>
        <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
          <div className="max-w-[1440px] mx-auto px-7 lg:px-12 pb-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <p style={{ ...S, fontSize: "clamp(18px, 2.2vw, 28px)", color: "rgba(238,240,248,0.78)", lineHeight: 1.4, maxWidth: 440 }}>
                {lang === "en" ? "Where strategy meets transformation." : "策略與轉型的交匯點。"}
              </p>
              <div className="flex flex-wrap gap-3" style={{ paddingBottom: 2, flexShrink: 0 }}>
                <HeroBtn label={lang === "en" ? "Book an Appointment" : "預約諮詢"} onClick={() => openDemo()} filled />
                <HeroBtn label={lang === "en" ? "Explore Ideas" : "探索靈感庫"} to="/showcase" />
              </div>
            </div>
          </div>
          <div style={{ lineHeight: 0.82, overflow: "hidden" }}>
            <h1 style={{ ...D, fontWeight: 900, fontSize: "clamp(72px, 26.8vw, 400px)", letterSpacing: "-0.01em", color: IVORY, lineHeight: 0.82, margin: 0, paddingLeft: "0.04em", userSelect: "none" }}>
              SPECTRUM
            </h1>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" style={{ overflow: "hidden" }}>
        <div className="manifesto-diptych">
          <div className="manifesto-panel" style={{ background: aurora({ t: "15% 50%", p: "90% 20%", opacity: 1.1 }), borderRight: "1px solid rgba(61,217,197,0.1)", borderBottom: "1px solid rgba(61,217,197,0.08)" }}>
            <span style={{ ...Bd, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST }}>
              {lang === "en" ? "01 · Brand Manifesto" : "01 · 品牌宣言"}
            </span>
            <div>
              <p className="manifesto-title" style={{ ...D, fontWeight: 900, letterSpacing: "-0.025em", color: IVORY, margin: "0 0 28px", userSelect: "none" }}>MASS<br />TO<br />CLASS.</p>
              <p style={{ ...S, fontSize: "clamp(22px, 3.2vw, 46px)", color: TEAL, lineHeight: 1.05, letterSpacing: "0.05em", marginBottom: 14 }}>博觀而約取</p>
              <p style={{ ...S, fontSize: "clamp(13px, 1.2vw, 16px)", color: DIM, lineHeight: 1.75 }}>From volume to excellence —<br />gather widely, choose precisely.</p>
            </div>
          </div>
          <div className="manifesto-panel" style={{ background: aurora({ t: "10% 20%", p: "80% 55%", opacity: 1.0 }), borderBottom: "1px solid rgba(155,143,228,0.08)" }}>
            <span style={{ ...Bd, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST }}>
              {lang === "en" ? "02 · Brand Manifesto" : "02 · 品牌宣言"}
            </span>
            <div>
              <p className="manifesto-title" style={{ ...D, fontWeight: 900, letterSpacing: "-0.025em", color: IVORY, margin: "0 0 28px", userSelect: "none" }}>LAST<br />TO<br />BLAST.</p>
              <p style={{ ...S, fontSize: "clamp(22px, 3.2vw, 46px)", color: PURPLE, lineHeight: 1.05, letterSpacing: "0.05em", marginBottom: 14 }}>厚積而薄發</p>
              <p style={{ ...S, fontSize: "clamp(13px, 1.2vw, 16px)", color: DIM, lineHeight: 1.75 }}>From patience to breakthrough —<br />build deep, then release with force.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE ADVANTAGES */}
      <CoreAdvantagesSection lang={lang} />

      {/* ULTIMATE SUITE — Toolset × Skillset × Mindset (replaces Approach pillars) */}
      <UltimateSuiteSection lang={lang} />

      {/* D.R.I.V.E. STRATEGIC MODEL */}
      <DriveModelSection lang={lang} />

      {/* SOLUTIONS */}
      <section id="solutions" style={{ background: aurora({ t: "70% 60%", p: "15% 35%", opacity: 0.55 }), paddingTop: "clamp(64px, 8vw, 100px)", paddingBottom: "clamp(64px, 8vw, 100px)", paddingLeft: 28, paddingRight: 28 }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SectionLabel left={lang === "en" ? "What We Do" : "我們的服務"} right={lang === "en" ? "Seven Capabilities" : "七大能力"} />
          <div style={{ marginTop: 48 }}>
            {SOLUTIONS[lang].map((sol, i) => <SolutionRow key={sol} sol={sol} idx={i} />)}
            <div style={{ height: 1, background: "rgba(238,240,248,0.07)" }} />
          </div>
        </div>
      </section>

      {/* IDEA SHOWCASE LIBRARY TEASER — compact billboard + rail */}
      <section id="showcase" style={{ background: "#060C18", paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        {billboard ? (
          <ShowcaseBillboard
            item={billboard}
            lang={lang}
            compact
            onBookDemo={() => openDemo(billboard.brand)}
            onEnquiry={() => openEnquiry(billboard.brand)}
            onPrev={() => cycle(-1)}
            onNext={() => cycle(1)}
            positionLabel={positionLabel(lang)}
            autoCycleMs={canAutoCycle ? SHOWCASE_AUTO_CYCLE_MS : 0}
            progressPlaying={progressPlaying}
            progressKey={`home-${heroIndex}-${cycleKey}`}
            onPauseChange={onPauseChange}
          />
        ) : null}

        <div
          style={{
            background: aurora({ t: "25% 45%", p: "75% 20%", opacity: 0.65 }),
            paddingTop: 28,
            paddingBottom: 8,
            paddingLeft: 28,
            paddingRight: 28,
            marginTop: -36,
            position: "relative",
            zIndex: 2,
          }}
          className="lg:px-12"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6" style={{ marginBottom: 24 }}>
              <div>
                <h2 style={{ ...S, fontSize: "clamp(22px, 3vw, 36px)", color: IVORY, lineHeight: 1.2 }}>
                  {lang === "en" ? (
                    <>
                      Capabilities you can explore.
                      <br />
                      Solutions we tailor.
                    </>
                  ) : (
                    <>
                      可探索的能力示意。
                      <br />
                      為你量身的方案。
                    </>
                  )}
                </h2>
                <p style={{ marginTop: 12, fontSize: 13, color: DIM, maxWidth: 520, lineHeight: 1.7 }}>
                  {DISCLAIMER[lang]}
                </p>
              </div>
              <ActionBtn
                label={lang === "en" ? "View all ideas" : "瀏覽全部靈感"}
                to="/showcase"
                filled
                icon={<ArrowRight size={12} />}
              />
            </div>

            <ShowcaseRail
              title={
                lang === "en"
                  ? `Wave 1 · ${browseIdeas.length} featured ideas`
                  : `第一波 · ${browseIdeas.length} 個精選靈感`
              }
              items={browseIdeas}
              lang={lang}
              size="lg"
              activeSlug={billboard?.slug}
              onPreviewItem={previewItem}
            />
          </div>
        </div>
      </section>

      {/* INDUSTRY OUTCOMES (kept, shortened) */}
      <section style={{ background: aurora({ t: "60% 40%", p: "20% 60%", opacity: 0.5 }), paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(64px, 8vw, 100px)", paddingLeft: 28, paddingRight: 28 }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SectionLabel left={lang === "en" ? "Outcome Stories" : "成果故事"} right={lang === "en" ? "Selected industries" : "精選產業"} />
          <div className="flex flex-col lg:flex-row gap-8" style={{ marginTop: 40 }}>
            <div className="lg:w-[240px] flex-shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ borderTop: "1px solid rgba(238,240,248,0.1)" }}>
              {INDUSTRY_CASES.map((item, i) => (
                <ShowcaseTab key={item.id} id={item.id} label={item.industry[lang]} active={selected === i} onClick={() => setSelected(i)} />
              ))}
            </div>
            <div className="flex-1 lg:pt-8 pt-6" style={{ borderTop: "1px solid rgba(238,240,248,0.1)" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: TEAL, marginBottom: 12 }}>{sc.industry[lang]}</p>
              <h3 style={{ ...S, fontSize: "clamp(22px, 2.8vw, 34px)", color: IVORY, lineHeight: 1.2, maxWidth: 580, marginBottom: 22 }}>{sc.title[lang]}</h3>
              <div style={{ borderLeft: `2px solid ${TEAL}`, paddingLeft: 18, marginBottom: 22 }}>
                <p style={{ ...S, fontSize: "clamp(18px, 2vw, 26px)", color: TEAL, lineHeight: 1.2 }}>{sc.metric[lang]}</p>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.82, color: DIM, marginBottom: 28 }}>{sc.fit[lang]}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <ActionBtn label={lang === "en" ? "Request a Demo" : "申請示範"} onClick={() => openDemo(sc.title[lang])} filled icon={<ArrowRight size={12} />} />
                <ActionBtn label={lang === "en" ? "Book Appointment" : "預約諮詢"} onClick={() => openEnquiry(sc.title[lang])} icon={<ArrowRight size={12} />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ overflow: "hidden" }}>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div style={{ position: "relative", minHeight: 400, overflow: "hidden" }}>
            <img src="/about-harbour.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(61,217,197,0.15) 0%, rgba(155,143,228,0.1) 50%, transparent 70%)" }} />
          </div>
          <div style={{ background: aurora({ t: "80% 30%", p: "20% 70%", opacity: 0.8 }), padding: "clamp(48px, 8vw, 100px) 28px" }} className="lg:px-16">
            <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 24 }}>{lang === "en" ? "About" : "關於我們"}</p>
            <h2 style={{ ...S, fontSize: "clamp(26px, 3.8vw, 48px)", lineHeight: 1.18, marginBottom: 22 }}>
              <span style={{ color: IVORY }}>
                {lang === "en"
                  ? <><span style={{ color: GOLD }}>Mass to Class</span> — from Hong Kong,<br />to the world.</>
                  : <><span style={{ color: GOLD }}>博觀而約取</span> — 立足香港，<br />放眼全球。</>}
              </span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: DIM, marginBottom: 14 }}>
              {lang === "en"
                ? "Spectrum Total Solutions Limited partners with regional and global organisations to build the Toolset, Skillset, and Mindset required for sustained competitive advantage."
                : "天域策略顧問有限公司與區域及全球企業攜手合作，構建持久競爭優勢所需的工具集、技能集與思維集。"}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: aurora({ t: "50% 35%", p: "50% 65%", opacity: 0.9 }), padding: "clamp(80px, 14vw, 160px) 28px" }} className="lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-end">
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 20 }}>{lang === "en" ? "Get Started" : "開始合作"}</p>
              <h2 style={{ ...D, fontWeight: 900, fontSize: "clamp(52px, 11vw, 148px)", letterSpacing: "-0.025em", lineHeight: 0.88, color: IVORY }}>
                {lang === "en" ? <><span style={{ color: GOLD }}>READY</span><br />TO<br />BEGIN?</> : <><span style={{ color: GOLD }}>準備好</span><br />開始<br />了嗎？</>}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ ...S, fontSize: 18, color: DIM, marginBottom: 12, lineHeight: 1.45 }}>
                {lang === "en" ? "Two paths. One destination." : "兩條路徑，一個目標。"}
              </p>
              <ContactBtn label={lang === "en" ? "Request a Demo" : "申請示範"} onClick={() => openDemo()} filled />
              <ContactBtn label={lang === "en" ? "Book an Appointment" : "預約諮詢"} onClick={() => openEnquiry()} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  const [lang, setLang] = usePersistentLang();
  return (
    <SiteChrome lang={lang} setLang={setLang} showDisclaimer>
      <HomeInner lang={lang} />
    </SiteChrome>
  );
}

function SectionLabel({ left, right }: { left: string; right: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ ...Bd, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, whiteSpace: "nowrap" }}>{left}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(238,240,248,0.08)" }} />
      <span style={{ ...Bd, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, whiteSpace: "nowrap" }}>{right}</span>
    </div>
  );
}

function SolutionRow({ sol, idx }: { sol: string; idx: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderTop: "1px solid rgba(238,240,248,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", paddingLeft: hov ? 14 : 0, transition: "padding-left 0.3s ease", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
        <span style={{ ...Bd, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: hov ? TEAL : GOLD, minWidth: 26 }}>{String(idx + 1).padStart(2, "0")}</span>
        <span style={{ ...D, fontWeight: 700, fontSize: "clamp(20px, 3vw, 38px)", letterSpacing: "0.01em", color: hov ? IVORY : "rgba(238,240,248,0.78)", lineHeight: 1.2 }}>{sol}</span>
      </div>
      <ArrowRight size={15} style={{ color: hov ? TEAL : "rgba(238,240,248,0.18)", flexShrink: 0 }} />
    </div>
  );
}

function ShowcaseTab({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", paddingLeft: active ? 12 : 0, borderBottom: "1px solid rgba(238,240,248,0.07)", borderLeft: active ? `2px solid ${TEAL}` : "2px solid transparent", background: "transparent", cursor: "pointer", textAlign: "left", opacity: active ? 1 : 0.38, transition: "all 0.25s ease", whiteSpace: "nowrap", flexShrink: 0 }}>
      <span style={{ ...Bd, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: TEAL, minWidth: 22 }}>{id}</span>
      <span style={{ ...Bd, fontSize: 13, color: IVORY, lineHeight: 1.4 }}>{label}</span>
    </button>
  );
}
