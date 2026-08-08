import { useMemo, useState } from "react";
import { SiteChrome } from "@/components/layout/SiteChrome";
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
  CATEGORY_LABELS,
  featuredShowcases,
  publishedShowcases,
  type ShowcaseCategory,
} from "@/content/showcases";
import type { ShowcaseItem } from "@/content/showcases/types";
import { DIM, aurora } from "@/lib/theme";

const CATEGORY_ORDER: ShowcaseCategory[] = [
  "automation",
  "crm",
  "support",
  "scheduling",
  "ai",
  "knowledge",
  "finance",
  "ops",
];

/** Wave 2 additions — shown in a dedicated rail before categories */
const WAVE2_SLUGS = new Set([
  "zonedesk",
  "gearitsm",
  "askcommunity",
  "freedesk",
  "roundvote",
  "stocktrack",
  "clearstatus",
]);

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ShowcaseIndexInner({ lang }: { lang: "en" | "zh" }) {
  const { openDemo, openEnquiry } = useCta();
  const all = publishedShowcases();
  const featuredBase = featuredShowcases();

  // Session-stable shuffle so each visit feels curated, not frozen
  const [featured] = useState(() =>
    featuredBase.length ? shuffleInPlace([...featuredBase]) : featuredBase,
  );
  const heroList = featured.length ? featured : all;

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
  } = useShowcaseBillboardCycle(heroList);

  const rows = useMemo(() => {
    const result: { key: string; title: string; items: ShowcaseItem[]; size?: "md" | "lg" }[] = [];

    if (featured.length) {
      result.push({
        key: "featured",
        title: lang === "en" ? "Wave 1 · Featured ideas" : "第一波 · 精選靈感",
        items: featured,
        size: "lg",
      });
    }

    const wave2 = all.filter((s) => WAVE2_SLUGS.has(s.slug));
    if (wave2.length) {
      result.push({
        key: "wave2",
        title: lang === "en" ? "Wave 2 · Newly illustrated" : "第二波 · 新上架示意",
        items: wave2,
        size: "lg",
      });
    }

    for (const cat of CATEGORY_ORDER) {
      const items = all.filter((s) => s.category === cat);
      if (!items.length) continue;
      result.push({
        key: cat,
        title: CATEGORY_LABELS[cat][lang],
        items,
      });
    }

    return result;
  }, [all, featured, lang]);

  if (!billboard) return null;

  return (
    <div style={{ background: "#060C18" }}>
      <ShowcaseBillboard
        item={billboard}
        lang={lang}
        onBookDemo={() => openDemo(billboard.brand)}
        onEnquiry={() => openEnquiry(billboard.brand)}
        onPrev={() => cycle(-1)}
        onNext={() => cycle(1)}
        positionLabel={positionLabel(lang)}
        autoCycleMs={canAutoCycle ? SHOWCASE_AUTO_CYCLE_MS : 0}
        progressPlaying={progressPlaying}
        progressKey={`${heroIndex}-${cycleKey}`}
        onPauseChange={onPauseChange}
      />

      <section
        style={{
          background: aurora({ t: "15% 20%", p: "85% 70%", opacity: 0.7 }),
          paddingTop: 28,
          paddingBottom: 80,
          paddingLeft: 28,
          paddingRight: 28,
          marginTop: -48,
          position: "relative",
          zIndex: 2,
        }}
        className="lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto">
          <p style={{ fontSize: 13, color: DIM, maxWidth: 640, lineHeight: 1.7, marginBottom: 36 }}>
            {DISCLAIMER[lang]}
          </p>

          {rows.map((row) => (
            <ShowcaseRail
              key={row.key}
              title={row.title}
              items={row.items}
              lang={lang}
              size={row.size}
              activeSlug={billboard.slug}
              onPreviewItem={previewItem}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ShowcaseIndexPage() {
  const [lang, setLang] = usePersistentLang();
  return (
    <SiteChrome lang={lang} setLang={setLang} showDisclaimer>
      <ShowcaseIndexInner lang={lang} />
    </SiteChrome>
  );
}
