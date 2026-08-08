import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
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

const Bd = fontBody;
const D = fontDisplay;
const S = fontSerif;

type Advantage = {
  id: string;
  accent: string;
  accentSoft: string;
  icon: ReactNode;
  title: { en: string; zh: string };
  body: { en: string; zh: string };
};

const COPY = {
  labelLeft: { en: "Core Advantages", zh: "品牌核心優勢" },
  labelRight: { en: "Brand Soul", zh: "品牌靈魂" },
  titleLead: { en: "Our Core Advantages:", zh: "我們的核心優勢：" },
  titleSlogan: "Mass to Class, Last to Blast.",
  subtitle: {
    en: "In an era where AI rewrites the rules of business, we help enterprises achieve the most decisive digital leap.",
    zh: "在 AI 重新定義商業規則的時代，我們幫助企業實現最極致的數位躍遷。",
  },
};

const ADVANTAGES: Advantage[] = [
  {
    id: "mass-to-class",
    accent: TEAL,
    accentSoft: "rgba(61,217,197,0.22)",
    icon: <DiamondBrainIcon />,
    title: {
      en: "Mass to Class｜From Mass Disorder to Elite Intelligence",
      zh: "Mass to Class｜從海量無序，到頂級智慧",
    },
    body: {
      en: "Leave behind mediocre packaged software and scattered information silos. Through a frontier data-integration architecture, we refine your enterprise's vast internal data into a proprietary AI brain with deep insight. We do not deliver another tool — we deliver a top-tier digital decision centre built exclusively for you.",
      zh: "告別平庸的套裝軟體與散落的資訊孤島。我們透過前沿的數據整合架構，將您企業內部海量的數據，淬鍊為具備深度洞察的專屬 AI 大腦。我們交付的不是一般工具，而是專屬於您的頂級數位決策中心。",
    },
  },
  {
    id: "last-to-blast",
    accent: GOLD,
    accentSoft: "rgba(196,151,90,0.22)",
    icon: <RocketBurstIcon />,
    title: {
      en: "Last to Blast｜From Traditional Lag to Capacity Blast",
      zh: "Last to Blast｜從傳統落後，到產能爆發",
    },
    body: {
      en: "Digital transformation cannot afford to move too slowly. Even if your digital maturity is behind today, we can build a \"virtual AI team\" through a multi-agent collaboration architecture — turning tedious manual processes into fully automated workflows, giving your enterprise rocket-like propulsion and explosive growth in capacity and profit.",
      zh: "數位轉型最怕緩不濟急。即使您現在的數位化程度落後，我們也能透過多智能體協同架構為您打造「虛擬 AI 團隊」。將繁瑣的人工流程轉化為全自動工作流，賦予企業火箭般的推進力，實現產能與利潤的爆發式成長。",
    },
  },
];

export function CoreAdvantagesSection({ lang }: { lang: Lang }) {
  return (
    <section
      id="advantages"
      className="core-advantages lg:px-12"
      style={{
        position: "relative",
        overflow: "hidden",
        background: aurora({ t: "15% 25%", p: "90% 65%", opacity: 0.85 }),
        paddingTop: "clamp(72px, 10vw, 120px)",
        paddingBottom: "clamp(72px, 10vw, 120px)",
        paddingLeft: 28,
        paddingRight: 28,
      }}
    >
      {/* Atmospheric depth layers */}
      <div
        aria-hidden
        className="core-advantages__aura"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 50% 40% at 20% 10%, rgba(61,217,197,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 45% 35% at 85% 80%, rgba(196,151,90,0.10) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
            className="core-advantages__hero-title"
            style={{
              ...D,
              fontWeight: 900,
              fontSize: "clamp(28px, 5.2vw, 64px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              marginTop: 40,
              maxWidth: 1100,
            }}
          >
            <span style={{ color: IVORY, display: "block", marginBottom: 8 }}>
              {COPY.titleLead[lang]}
            </span>
            <span className="core-advantages__gradient-text">{COPY.titleSlogan}</span>
          </h2>

          <p
            style={{
              ...S,
              marginTop: 22,
              fontSize: "clamp(16px, 1.8vw, 22px)",
              lineHeight: 1.55,
              color: DIM,
              maxWidth: 640,
            }}
          >
            {COPY.subtitle[lang]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7 mt-12 lg:mt-16">
          {ADVANTAGES.map((item, index) => (
            <AdvantageCard key={item.id} item={item} index={index} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantageCard({
  item,
  index,
  lang,
}: {
  item: Advantage;
  index: number;
  lang: Lang;
}) {
  const [hov, setHov] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.12 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`core-advantages__card ${hov ? "is-hovered" : ""}`}
      style={
        {
          "--card-accent": item.accent,
          "--card-accent-soft": item.accentSoft,
          position: "relative",
          isolation: "isolate",
          borderRadius: 2,
          padding: "clamp(28px, 3.5vw, 40px)",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          background: hov
            ? "linear-gradient(155deg, rgba(14,22,40,0.92) 0%, rgba(8,14,28,0.88) 100%)"
            : "linear-gradient(155deg, rgba(12,18,34,0.72) 0%, rgba(8,13,26,0.55) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: `1px solid ${hov ? `${item.accent}66` : "rgba(238,240,248,0.10)"}`,
          boxShadow: hov
            ? `0 28px 56px rgba(0,0,0,0.45), 0 0 40px ${item.accentSoft}, inset 0 1px 0 rgba(238,240,248,0.08)`
            : "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(238,240,248,0.04)",
          transform: hov ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
          transition:
            "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease",
        } as CSSProperties
      }
    >
      {/* Flowing border sheen */}
      <span aria-hidden className="core-advantages__sheen" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div
          className="core-advantages__icon"
          style={{
            width: 56,
            height: 56,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            background: hov ? item.accentSoft : "rgba(238,240,248,0.04)",
            border: `1px solid ${hov ? `${item.accent}55` : "rgba(238,240,248,0.08)"}`,
            color: item.accent,
            boxShadow: hov ? `0 0 24px ${item.accentSoft}` : "none",
            transition: "all 0.35s ease",
          }}
        >
          {item.icon}
        </div>
        <span
          style={{
            ...Bd,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: hov ? item.accent : GOLD,
            transition: "color 0.3s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        style={{
          ...Bd,
          fontSize: "clamp(17px, 1.7vw, 21px)",
          fontWeight: 600,
          letterSpacing: "0.01em",
          color: IVORY,
          lineHeight: 1.4,
          marginBottom: 18,
        }}
      >
        {item.title[lang]}
      </h3>

      <p
        style={{
          fontSize: "clamp(14px, 1.2vw, 16px)",
          lineHeight: 1.85,
          color: DIM,
          flex: 1,
        }}
      >
        {item.body[lang]}
      </p>

      <div
        aria-hidden
        style={{
          marginTop: 28,
          height: 2,
          width: hov ? "100%" : "28%",
          background: `linear-gradient(90deg, ${item.accent}, ${index === 0 ? PURPLE : GOLD}88, transparent)`,
          boxShadow: hov ? `0 0 14px ${item.accentSoft}` : "none",
          transition: "width 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
        }}
      />
    </motion.article>
  );
}

function DiamondBrainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 3.5L23.5 11.2L14 24.5L4.5 11.2L14 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 11.2H23.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M9.2 11.2L14 3.5L18.8 11.2L14 24.5L9.2 11.2Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="14" cy="13.2" r="2.2" fill="currentColor" opacity="0.85" />
      <path
        d="M14 15.4V19.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function RocketBurstIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M12.2 16.8C10.4 15.9 8.8 14.4 7.8 12.5L10.6 11.2L12.2 16.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 15.8C12.1 17.6 13.6 19.2 15.5 20.2L16.8 17.4L11.2 15.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M10.8 11.4C13.8 6.2 19.2 3.8 23.8 4.2C24.2 8.8 21.8 14.2 16.6 17.2L10.8 11.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="18.6" cy="9.4" r="1.5" fill="currentColor" />
      <path
        d="M7.2 20.8L5.4 24.2L8.8 22.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.8 17.2L4.2 18.4M8.2 21.6L7 23.2M4.8 21.2L3.5 22.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
