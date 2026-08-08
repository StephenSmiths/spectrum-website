import { useState } from "react";
import { motion } from "framer-motion";
import {
  DIM,
  GHOST,
  GOLD,
  IVORY,
  TEAL,
  aurora,
  fontBody,
  fontDisplay,
  fontSerif,
  type Lang,
} from "@/lib/theme";

const Bd = fontBody;
const D = fontDisplay;
const S = fontSerif;

type Step = {
  letter: string;
  title: { en: string; zh: string };
  body: { en: string; zh: string };
  deliverable: { en: string; zh: string };
};

const STEPS: Step[] = [
  {
    letter: "D",
    title: {
      en: "D - Diagnose (Deep Diagnosis)",
      zh: "D - Diagnose (深度診斷)",
    },
    body: {
      en: "Start with business interviews. Dissect cross-department collaboration and data workflows to pinpoint hidden efficiency bottlenecks and invisible costs.",
      zh: "從業務訪談開始，解剖跨部門協作與資料處理流程，精準揪出隱藏的效率瓶頸與「隱形成本」。",
    },
    deliverable: {
      en: "Enterprise digital health check & pain-point analysis report",
      zh: "企業數位體檢與痛點分析報告",
    },
  },
  {
    letter: "R",
    title: {
      en: "R - Roadmap (Architecture Blueprint)",
      zh: "R - Roadmap (架構藍圖)",
    },
    body: {
      en: "Apply leading LangChain and CrewAI architecture thinking to draw your dedicated AI automation workflow blueprint — with a clear ROI forecast.",
      zh: "導入最前沿的 LangChain 與 CrewAI 架構思維，為您繪製專屬的 AI 自動化工作流藍圖，並提供清晰的 ROI 投資報酬預測。",
    },
    deliverable: {
      en: "AI transformation solution blueprint & ROI forecast",
      zh: "AI 轉型解決方案藍圖與 ROI 預測書",
    },
  },
  {
    letter: "I",
    title: {
      en: "I - Incubate (Prototype Incubation)",
      zh: "I - Incubate (原型孵化)",
    },
    body: {
      en: "Before full build, pick the highest-value node in the blueprint and ship a lightweight interactive prototype. Seeing is believing — adoption risk drops to zero.",
      zh: "全面開發前，挑選藍圖中最具商業價值的小節點打造輕量級可互動原型。眼見為憑，讓導入風險徹底歸零。",
    },
    deliverable: {
      en: "PoC proof-of-concept system (interactive prototype)",
      zh: "PoC 概念驗證系統 (可互動原型)",
    },
  },
  {
    letter: "V",
    title: {
      en: "V - Velocity (Agile Deployment)",
      zh: "V - Velocity (敏捷佈署)",
    },
    body: {
      en: "Once partnership is confirmed, run at full agile velocity. Deliver in phases, integrate seamlessly with existing systems, and keep daily operations uninterrupted.",
      zh: "雙方確立合作後，以敏捷開發模式全速運轉。分階段交付功能，無縫整合現有系統，確保日常營運零中斷。",
    },
    deliverable: {
      en: "Enterprise application system & complete training handbook",
      zh: "企業級應用系統與完整教育訓練手冊",
    },
  },
  {
    letter: "E",
    title: {
      en: "E - Evolution (Continuous Evolution)",
      zh: "E - Evolution (持續進化)",
    },
    body: {
      en: "Go-live is the starting line for AI learning. Continuously monitor real data feedback, refine models, and expand capabilities — your moat against competitors.",
      zh: "系統上線是 AI 學習的起點。持續監控真實數據反饋，微調模型並擴展功能，成為您甩開競爭對手的核心護城河。",
    },
    deliverable: {
      en: "Monthly system performance & business insight report",
      zh: "月度系統效能與業務洞察報告",
    },
  },
];

const COPY = {
  labelLeft: { en: "Delivery Model", zh: "交付模型" },
  labelRight: { en: "Five-Step Equation", zh: "五步方程式" },
  title: {
    en: "Enterprise Digital Drive Engine: The D.R.I.V.E. Strategic Model",
    zh: "企業數位驅動引擎：D.R.I.V.E. 戰略模型",
  },
  subtitle: {
    en: "We deliver more than code — a digital upgrade journey that keeps risk controlled and value maximised. Through our exclusive five-step equation, we guide your enterprise through a frictionless transformation.",
    zh: "我們交付的不只是程式碼，而是一套確保風險可控、效益最大化的數位升級旅程。透過獨家五步方程式，帶領您的企業無痛轉型。",
  },
  deliverableLabel: { en: "Deliverable", zh: "實體交付" },
};

export function DriveModelSection({ lang }: { lang: Lang }) {
  return (
    <section
      id="drive"
      style={{
        background: aurora({ t: "20% 35%", p: "85% 70%", opacity: 0.7 }),
        paddingTop: "clamp(64px, 8vw, 100px)",
        paddingBottom: "clamp(64px, 8vw, 110px)",
        paddingLeft: 28,
        paddingRight: 28,
      }}
      className="lg:px-12"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                ...Bd,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: GHOST,
                whiteSpace: "nowrap",
              }}
            >
              {COPY.labelLeft[lang]}
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(238,240,248,0.08)" }} />
            <span
              style={{
                ...Bd,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: GHOST,
                whiteSpace: "nowrap",
              }}
            >
              {COPY.labelRight[lang]}
            </span>
          </div>

          <h2
            style={{
              ...S,
              fontSize: "clamp(26px, 3.6vw, 44px)",
              color: IVORY,
              lineHeight: 1.2,
              marginTop: 36,
              maxWidth: 820,
            }}
          >
            {COPY.title[lang]}
          </h2>
          <p
            style={{
              marginTop: 18,
              fontSize: "clamp(14px, 1.25vw, 17px)",
              lineHeight: 1.82,
              color: DIM,
              maxWidth: 720,
            }}
          >
            {COPY.subtitle[lang]}
          </p>

          {/* Acronym strip */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 28,
              alignItems: "center",
            }}
          >
            {STEPS.map((step, i) => (
              <span key={step.letter} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    ...D,
                    fontWeight: 800,
                    fontSize: 22,
                    letterSpacing: "0.08em",
                    color: TEAL,
                    textShadow: `0 0 18px rgba(61,217,197,0.35)`,
                  }}
                >
                  {step.letter}
                </span>
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    style={{
                      width: 18,
                      height: 1,
                      background: "rgba(61,217,197,0.35)",
                      display: "inline-block",
                    }}
                  />
                ) : null}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Desktop: horizontal cards · Mobile: vertical timeline */}
        <div className="mt-12 lg:mt-14 relative">
          {/* Desktop journey rail */}
          <div
            aria-hidden
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: 0,
              left: "2%",
              right: "2%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(61,217,197,0.4) 10%, rgba(196,151,90,0.4) 50%, rgba(61,217,197,0.4) 90%, transparent)",
              zIndex: 0,
            }}
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-3 relative z-[1] list-none m-0 p-0 lg:pt-7">
            {STEPS.map((step, index) => (
              <DriveStepCard key={step.letter} step={step} index={index} lang={lang} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function DriveStepCard({
  step,
  index,
  lang,
}: {
  step: Step;
  index: number;
  lang: Lang;
}) {
  const [hov, setHov] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: 0.08 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex lg:block"
      style={{ listStyle: "none" }}
    >
      {/* Mobile timeline rail */}
      <div
        aria-hidden
        className="lg:hidden flex flex-col items-center mr-4 flex-shrink-0"
        style={{ width: 28 }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 99,
            background: hov ? TEAL : "rgba(61,217,197,0.55)",
            boxShadow: hov ? `0 0 16px rgba(61,217,197,0.55)` : "none",
            marginTop: 22,
            transition: "all 0.3s ease",
          }}
        />
        {index < STEPS.length - 1 ? (
          <span
            style={{
              flex: 1,
              width: 1,
              minHeight: 24,
              background: "rgba(61,217,197,0.22)",
              marginTop: 8,
            }}
          />
        ) : null}
      </div>

      <article
        style={{
          flex: 1,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          background: hov ? "rgba(12, 20, 36, 0.92)" : "rgba(9, 15, 30, 0.72)",
          border: `1px solid ${hov ? "rgba(61,217,197,0.38)" : "rgba(238,240,248,0.08)"}`,
          padding: "22px 18px 20px",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hov
            ? "0 18px 40px rgba(0,0,0,0.35), 0 0 28px rgba(61,217,197,0.12)"
            : "0 0 0 transparent",
          transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
        }}
      >
        {/* Desktop node on journey rail */}
        <div
          aria-hidden
          className="hidden lg:block"
          style={{
            position: "absolute",
            top: -28,
            left: "50%",
            transform: "translateX(-50%)",
            width: 11,
            height: 11,
            borderRadius: 99,
            background: hov ? TEAL : "rgba(61,217,197,0.55)",
            boxShadow: hov
              ? "0 0 14px rgba(61,217,197,0.6)"
              : "0 0 0 4px rgba(6,12,24,0.95)",
            border: "1px solid rgba(61,217,197,0.55)",
            zIndex: 2,
            transition: "all 0.3s ease",
          }}
        />

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 14 }}>
          <span
            style={{
              ...D,
              fontWeight: 900,
              fontSize: "clamp(40px, 4vw, 52px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              color: hov ? TEAL : IVORY,
              transition: "color 0.3s ease",
            }}
          >
            {step.letter}
          </span>
          <span
            style={{
              ...Bd,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: GOLD,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          style={{
            ...Bd,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: IVORY,
            lineHeight: 1.35,
            marginBottom: 12,
          }}
        >
          {step.title[lang]}
        </h3>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.75,
            color: DIM,
            flex: 1,
            marginBottom: 18,
          }}
        >
          {step.body[lang]}
        </p>

        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid rgba(238,240,248,0.08)",
            paddingTop: 14,
          }}
        >
          <p
            style={{
              ...Bd,
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: GHOST,
              marginBottom: 6,
            }}
          >
            {COPY.deliverableLabel[lang]}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.55,
              color: hov ? TEAL : "rgba(238,240,248,0.72)",
              transition: "color 0.3s ease",
            }}
          >
            {step.deliverable[lang]}
          </p>
        </div>
      </article>
    </motion.li>
  );
}
