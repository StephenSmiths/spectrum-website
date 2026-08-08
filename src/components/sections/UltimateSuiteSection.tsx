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

type SuiteCard = {
  id: string;
  accent: string;
  accentSoft: string;
  keyLabel: string;
  zhLabel: string;
  icon: ReactNode;
  title: { en: string; zh: string };
  subtitle: { en: string; zh: string };
  body: { en: string; zh: string };
};

const COPY = {
  labelLeft: { en: "Ultimate Suite", zh: "三合一旗艦大禮包" },
  labelRight: { en: "Toolset · Skillset · Mindset", zh: "Toolset · Skillset · Mindset" },
  title: {
    en: "【Flagship】Enterprise AI Digital Leap Suite",
    zh: "【旗艦專案】企業 AI 數位躍遷全效方案",
  },
  subtitle: {
    en: "True digital transformation cannot be bought piece by piece. We integrate systems, teams, and strategy into one force — unlocking disruptive commercial growth.",
    zh: "真正的數位轉型無法零買。我們將系統、團隊與戰略完美整合，為您帶來顛覆性的商業成長。",
  },
};

const CARDS: SuiteCard[] = [
  {
    id: "toolset",
    accent: TEAL,
    accentSoft: "rgba(61,217,197,0.22)",
    keyLabel: "TOOLSET",
    zhLabel: "工具集",
    icon: <ChipGearIcon />,
    title: {
      en: "AI Enterprise Operating System",
      zh: "AI 企業作業系統",
    },
    subtitle: { en: "Hardcore Infrastructure", zh: "硬核基建" },
    body: {
      en: "Powered by frontier LangChain and CrewAI architectures, we craft a proprietary AI brain and multi-agent automation workflows — eliminating information silos completely.",
      zh: "運用 LangChain 與 CrewAI 前沿技術，為您量身打造專屬 AI 大腦與多智能體自動化工作流，徹底消滅資訊孤島。",
    },
  },
  {
    id: "skillset",
    accent: GOLD,
    accentSoft: "rgba(196,151,90,0.22)",
    keyLabel: "SKILLSET",
    zhLabel: "技能集",
    icon: <HumanTechIcon />,
    title: {
      en: "Human–AI Collaboration Training",
      zh: "人機協同實戰培訓",
    },
    subtitle: { en: "Team Empowerment", zh: "團隊賦能" },
    body: {
      en: "We never leave behind a system your people cannot use. Through deep hands-on coaching, your team transforms without friction — every member becoming a high-leverage AI commander.",
      zh: "我們不留下一套員工不會用的系統。透過深度實戰指導，讓您的團隊無痛轉型，全員晉升為高槓桿的「AI 指揮官」。",
    },
  },
  {
    id: "mindset",
    accent: PURPLE,
    accentSoft: "rgba(155,143,228,0.22)",
    keyLabel: "MINDSET",
    zhLabel: "思維集",
    icon: <StrategyBrainIcon />,
    title: {
      en: "Executive Strategy Coaching",
      zh: "高階戰略顧問教練",
    },
    subtitle: { en: "Decision Navigation", zh: "決策導航" },
    body: {
      en: "Strategic guidance built for decision-makers. We implant an AI-first modern business mindset so technology investment aligns perfectly with commercial return.",
      zh: "專為企業決策層打造的戰略指導。植入「AI 優先」的現代化商業思維，確保技術投資與商業獲利完美對齊。",
    },
  },
];

export function UltimateSuiteSection({ lang }: { lang: Lang }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="ultimate-suite"
      className="ultimate-suite lg:px-12"
      style={{
        position: "relative",
        overflow: "hidden",
        background: aurora({ t: "50% 20%", p: "50% 85%", opacity: 0.9 }),
        paddingTop: "clamp(72px, 10vw, 120px)",
        paddingBottom: "clamp(72px, 10vw, 120px)",
        paddingLeft: 28,
        paddingRight: 28,
      }}
    >
      <div
        aria-hidden
        className="ultimate-suite__aura"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 55% 42% at 50% 0%, rgba(61,217,197,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 15% 70%, rgba(155,143,228,0.10) 0%, transparent 50%),
            radial-gradient(ellipse 40% 35% at 85% 65%, rgba(196,151,90,0.10) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
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
              fontSize: "clamp(26px, 3.8vw, 46px)",
              color: IVORY,
              lineHeight: 1.22,
              marginTop: 36,
              maxWidth: 860,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {COPY.title[lang]}
          </h2>

          <p
            style={{
              marginTop: 18,
              fontSize: "clamp(14px, 1.35vw, 18px)",
              lineHeight: 1.82,
              color: DIM,
              maxWidth: 680,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {COPY.subtitle[lang]}
          </p>

          {/* Keyword hook strip — keep the three SET names memorable */}
          <div
            className="ultimate-suite__hook"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "center",
              gap: "clamp(10px, 2vw, 22px)",
              marginTop: 36,
            }}
          >
            {CARDS.map((card, i) => (
              <span key={card.id} style={{ display: "flex", alignItems: "baseline", gap: "clamp(10px, 2vw, 22px)" }}>
                <span
                  style={{
                    ...D,
                    fontWeight: 900,
                    fontSize: "clamp(28px, 4.5vw, 52px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.95,
                    color: card.accent,
                    textShadow: `0 0 28px ${card.accentSoft}`,
                  }}
                >
                  {card.keyLabel}
                </span>
                {i < CARDS.length - 1 ? (
                  <span
                    aria-hidden
                    style={{
                      ...D,
                      fontWeight: 300,
                      fontSize: "clamp(18px, 2.5vw, 28px)",
                      color: "rgba(238,240,248,0.22)",
                    }}
                  >
                    ×
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </motion.div>

        <div
          className="ultimate-suite__grid grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mt-12 lg:mt-16"
          onMouseLeave={() => setHovered(null)}
        >
          {CARDS.map((card, index) => (
            <SuiteCardItem
              key={card.id}
              card={card}
              index={index}
              lang={lang}
              hovered={hovered}
              onHover={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SuiteCardItem({
  card,
  index,
  lang,
  hovered,
  onHover,
}: {
  card: SuiteCard;
  index: number;
  lang: Lang;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hovered === card.id;
  const isDimmed = hovered !== null && hovered !== card.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(card.id)}
      className={`ultimate-suite__card ${isActive ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""}`}
      style={
        {
          "--card-accent": card.accent,
          "--card-accent-soft": card.accentSoft,
          position: "relative",
          isolation: "isolate",
          borderRadius: 2,
          padding: "clamp(26px, 3vw, 36px)",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          background: isActive
            ? "linear-gradient(155deg, rgba(14,22,40,0.95) 0%, rgba(8,14,28,0.9) 100%)"
            : "linear-gradient(155deg, rgba(12,18,34,0.72) 0%, rgba(8,13,26,0.55) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: `1px solid ${isActive ? `${card.accent}70` : "rgba(238,240,248,0.10)"}`,
          boxShadow: isActive
            ? `0 28px 56px rgba(0,0,0,0.5), 0 0 48px ${card.accentSoft}, inset 0 1px 0 rgba(238,240,248,0.1)`
            : "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(238,240,248,0.04)",
          transform: isActive
            ? "translateY(-10px) scale(1.02)"
            : isDimmed
              ? "translateY(4px) scale(0.985)"
              : "translateY(0) scale(1)",
          opacity: isDimmed ? 0.38 : 1,
          filter: isDimmed ? "saturate(0.7)" : "none",
          transition:
            "transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, border-color 0.4s ease, background 0.4s ease, opacity 0.4s ease, filter 0.4s ease",
          zIndex: isActive ? 2 : 1,
        } as CSSProperties
      }
    >
      <span aria-hidden className="ultimate-suite__sheen" />
      <span aria-hidden className="ultimate-suite__glow-ring" />

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div
          className="ultimate-suite__icon"
          style={{
            width: 48,
            height: 48,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            background: isActive ? card.accentSoft : "rgba(238,240,248,0.04)",
            border: `1px solid ${isActive ? `${card.accent}55` : "rgba(238,240,248,0.08)"}`,
            color: card.accent,
            boxShadow: isActive ? `0 0 28px ${card.accentSoft}` : "none",
            transition: "all 0.35s ease",
            flexShrink: 0,
          }}
        >
          {card.icon}
        </div>
        <span
          style={{
            ...Bd,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: isActive ? card.accent : GOLD,
            transition: "color 0.3s ease",
            paddingTop: 4,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Hero keyword — the brand hook */}
      <div style={{ marginBottom: 10 }}>
        <h3
          style={{
            ...D,
            fontWeight: 900,
            fontSize: "clamp(36px, 4.2vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 0.9,
            color: isActive ? card.accent : IVORY,
            margin: 0,
            textShadow: isActive ? `0 0 32px ${card.accentSoft}` : "none",
            transition: "color 0.35s ease, text-shadow 0.35s ease",
          }}
        >
          {card.keyLabel}
        </h3>
        <p
          style={{
            ...S,
            fontSize: 14,
            color: DIM,
            letterSpacing: "0.04em",
            marginTop: 8,
          }}
        >
          {card.zhLabel}
        </p>
      </div>

      <p
        style={{
          ...Bd,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isActive ? card.accent : GHOST,
          marginBottom: 12,
          transition: "color 0.3s ease",
        }}
      >
        {card.subtitle[lang]}
      </p>

      <p
        style={{
          ...Bd,
          fontSize: "clamp(15px, 1.4vw, 18px)",
          fontWeight: 600,
          letterSpacing: "0.01em",
          color: IVORY,
          lineHeight: 1.4,
          marginBottom: 14,
        }}
      >
        {card.title[lang]}
      </p>

      <p
        style={{
          fontSize: "clamp(14px, 1.15vw, 15.5px)",
          lineHeight: 1.85,
          color: DIM,
          flex: 1,
        }}
      >
        {card.body[lang]}
      </p>

      <div
        aria-hidden
        style={{
          marginTop: 28,
          height: 2,
          width: isActive ? "100%" : "32%",
          background: `linear-gradient(90deg, ${card.accent}, ${card.accent}66, transparent)`,
          boxShadow: isActive ? `0 0 14px ${card.accentSoft}` : "none",
          transition: "width 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
        }}
      />
    </motion.article>
  );
}

function ChipGearIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="9" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.25" opacity="0.85" />
      <circle cx="14" cy="14" r="2.2" fill="currentColor" />
      <path
        d="M14 4.5V7.2M14 20.8V23.5M4.5 14H7.2M20.8 14H23.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M7.2 7.2L9 9M18.8 9L20.8 7.2M9 19L7.2 20.8M20.8 20.8L18.8 19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function HumanTechIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="10.5" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M4.8 20.5C5.2 16.8 7.4 14.8 10.5 14.8C13.6 14.8 15.8 16.8 16.2 20.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="19.5" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.25" opacity="0.9" />
      <path
        d="M19.5 14.4V17.2M17.8 15.8H21.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M16.5 10.2C17.1 8.4 18.6 7.2 20.6 7C22.8 6.8 24.6 8.3 25 10.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M15.2 21.8H24.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function StrategyBrainIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M10.2 7.2C8.2 7.6 6.8 9.4 6.8 11.4C6.8 12.2 7 12.9 7.4 13.5C6.4 14.2 5.8 15.4 5.8 16.8C5.8 19.1 7.5 21 9.8 21.3V22.6C9.8 23.4 10.4 24 11.2 24H12.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8 7.2C19.8 7.6 21.2 9.4 21.2 11.4C21.2 12.2 21 12.9 20.6 13.5C21.6 14.2 22.2 15.4 22.2 16.8C22.2 19.1 20.5 21 18.2 21.3V22.6C18.2 23.4 17.6 24 16.8 24H15.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5.2C12.2 5.2 10.8 6.5 10.5 8.2C11.5 8.8 12.6 9.2 14 9.2C15.4 9.2 16.5 8.8 17.5 8.2C17.2 6.5 15.8 5.2 14 5.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M14 9.2V16.5M11.5 12.2H16.5M11.8 15.2H16.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="14" cy="18.8" r="1.3" fill="currentColor" opacity="0.9" />
      <path
        d="M10 4.2L11 5.4M18 4.2L17 5.4M14 3.2V4.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
