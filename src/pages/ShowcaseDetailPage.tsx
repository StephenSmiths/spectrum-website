import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { RealShot } from "@/components/showcase/RealShot";
import { useCta } from "@/components/showcase/CtaContext";
import { ActionBtn } from "@/components/ui/Buttons";
import { DISCLAIMER } from "@/lib/disclaimer";
import { usePersistentLang } from "@/lib/lang";
import {
  CATEGORY_LABELS,
  featuredShowcases,
  getShowcase,
  publishedShowcases,
} from "@/content/showcases";
import type { Localized, ShowcaseItem } from "@/content/showcases/types";
import {
  DIM,
  GHOST,
  IVORY,
  TEAL,
  aurora,
  fontDisplay,
  fontSerif,
} from "@/lib/theme";

function BulletBlock({
  title,
  items,
  lang,
}: {
  title: string;
  items: Localized[];
  lang: "en" | "zh";
}) {
  return (
    <div>
      <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 14 }}>
        {title}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((entry) => (
          <li
            key={entry.en}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              borderTop: "1px solid rgba(238,240,248,0.08)",
              paddingTop: 10,
              fontSize: 14,
              color: IVORY,
              lineHeight: 1.55,
            }}
          >
            <Check size={15} style={{ color: TEAL, flexShrink: 0, marginTop: 3 }} />
            <span>{entry[lang]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function relatedIdeas(item: ShowcaseItem): ShowcaseItem[] {
  const same = publishedShowcases().filter((s) => s.slug !== item.slug && s.category === item.category);
  const featured = featuredShowcases().filter((s) => s.slug !== item.slug && !same.some((x) => x.slug === s.slug));
  return [...same, ...featured].slice(0, 4);
}

function DetailInner({ lang, slug }: { lang: "en" | "zh"; slug: string }) {
  const { openDemo, openEnquiry } = useCta();
  const item = getShowcase(slug);
  if (!item) return <Navigate to="/showcase" replace />;

  const hero = item.images[0];
  const rest = item.images.slice(1);
  const related = relatedIdeas(item);

  return (
    <div style={{ background: "#060C18" }}>
      {/* Atmosphere hero */}
      <section style={{ position: "relative", minHeight: "min(58vh, 560px)", overflow: "hidden" }}>
        {hero ? (
          <img
            src={hero.src}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              opacity: 0.42,
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(100deg, rgba(6,12,24,0.96) 0%, rgba(6,12,24,0.82) 46%, rgba(6,12,24,0.35) 100%),
              linear-gradient(to top, rgba(6,12,24,1) 0%, rgba(6,12,24,0.2) 55%, transparent 80%)
            `,
          }}
        />

        <div
          className="lg:px-12"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1440,
            margin: "0 auto",
            padding: "110px 28px 48px",
            minHeight: "min(58vh, 560px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to="/showcase"
            style={{ fontSize: 12, color: DIM, textDecoration: "none", letterSpacing: "0.08em", marginBottom: 22, width: "fit-content" }}
          >
            ← {lang === "en" ? "All ideas" : "全部靈感"}
          </Link>

          <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: TEAL, marginBottom: 12 }}>
            {CATEGORY_LABELS[item.category][lang]} · Idea Illustration
          </p>
          <h1
            style={{
              ...fontDisplay,
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 92px)",
              letterSpacing: "0.02em",
              color: IVORY,
              lineHeight: 0.92,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {item.brand}
          </h1>
          <p
            style={{
              ...fontSerif,
              marginTop: 18,
              fontSize: "clamp(20px, 2.6vw, 30px)",
              color: IVORY,
              lineHeight: 1.35,
              maxWidth: 620,
            }}
          >
            {item.tagline[lang]}
          </p>
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.75, color: DIM, maxWidth: 560 }}>{item.summary[lang]}</p>

          {item.demoHook ? (
            <p
              style={{
                marginTop: 22,
                maxWidth: 560,
                fontSize: 15,
                lineHeight: 1.7,
                color: IVORY,
                borderLeft: `2px solid ${item.accent}`,
                paddingLeft: 14,
              }}
            >
              <span style={{ color: TEAL, marginRight: 8 }}>{lang === "en" ? "Why book a demo" : "為何預約示範"}</span>
              {item.demoHook[lang]}
            </p>
          ) : null}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
            <ActionBtn
              label={lang === "en" ? "Book a Demo" : "預約示範"}
              onClick={() => openDemo(item.brand)}
              filled
              icon={<ArrowRight size={12} />}
            />
            <ActionBtn
              label={lang === "en" ? "Enquiry" : "查詢"}
              onClick={() => openEnquiry(item.brand)}
              icon={<ArrowRight size={12} />}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          background: aurora({ t: "28% 35%", p: "72% 55%", opacity: 0.75 }),
          padding: "56px 28px 90px",
        }}
        className="lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Business value first — consultant narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12" style={{ marginBottom: 56 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 14 }}>
                {lang === "en" ? "Business value" : "商業價值"}
              </p>
              <p style={{ ...fontSerif, fontSize: "clamp(22px, 2.4vw, 30px)", color: IVORY, lineHeight: 1.35, marginBottom: 18 }}>
                {lang === "en"
                  ? "What this illustration is meant to unlock."
                  : "這份示意，是為了解鎖什麼。"}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: DIM }}>{item.body[lang]}</p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
              {item.businessValue.map((v, i) => (
                <li
                  key={v.en}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: 16,
                    alignItems: "start",
                    borderTop: "1px solid rgba(238,240,248,0.1)",
                    padding: "16px 0",
                  }}
                >
                  <span style={{ ...fontDisplay, fontWeight: 800, fontSize: 22, color: item.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: 16, color: IVORY, lineHeight: 1.55 }}>{v[lang]}</span>
                </li>
              ))}
            </ul>
          </div>

          {hero && (
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 16 }}>
                {lang === "en" ? "Primary view" : "主視圖"}
              </p>
              <RealShot brand={item.brand} src={hero.src} caption={hero.caption[lang]} height={420} />
            </div>
          )}

          {rest.length > 0 && (
            <div style={{ marginBottom: 64 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 16 }}>
                {lang === "en" ? "More product views" : "更多產品視圖"}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  overflowX: "auto",
                  paddingBottom: 8,
                  scrollSnapType: "x mandatory",
                }}
              >
                {rest.map((img) => (
                  <div key={img.id} style={{ flex: "0 0 min(420px, 80vw)", scrollSnapAlign: "start" }}>
                    <RealShot brand={item.brand} src={img.src} caption={img.caption[lang]} height={240} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10" style={{ marginBottom: 56 }}>
            <BulletBlock title={lang === "en" ? "Use cases" : "應用例子"} items={item.useCases} lang={lang} />
            <BulletBlock title={lang === "en" ? "Pain points" : "針對痛點"} items={item.painPoints} lang={lang} />
            <BulletBlock title={lang === "en" ? "Benefits" : "好處特點"} items={item.benefits} lang={lang} />
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 14 }}>
                {lang === "en" ? "Capabilities shown" : "示意能力"}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {item.features.map((f) => (
                  <li
                    key={f.en}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      borderTop: "1px solid rgba(238,240,248,0.08)",
                      paddingTop: 10,
                      fontSize: 14,
                      color: IVORY,
                      lineHeight: 1.55,
                    }}
                  >
                    <Check size={15} style={{ color: TEAL, flexShrink: 0, marginTop: 3 }} />
                    <span>{f[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 14 }}>
              {lang === "en" ? "Scenes we often explore" : "常見探討場景"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {item.scenes.map((scene) => (
                <div
                  key={scene.en}
                  style={{
                    borderTop: `2px solid ${item.accent}`,
                    paddingTop: 14,
                    fontSize: 15,
                    color: IVORY,
                    lineHeight: 1.55,
                  }}
                >
                  {scene[lang]}
                </div>
              ))}
            </div>
          </div>

          {/* Closing CTA */}
          <div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
            style={{
              border: "1px solid rgba(238,240,248,0.12)",
              padding: "28px 24px",
              background: "rgba(6,12,24,0.45)",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <p style={{ ...fontDisplay, fontWeight: 800, fontSize: 28, letterSpacing: "0.04em", color: IVORY, textTransform: "uppercase" }}>
                {lang === "en" ? "Ready to tailor this?" : "要把這套做成你們的？"}
              </p>
              <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.7, color: DIM }}>
                {lang === "en"
                  ? "This page is an idea illustration — not a boxed product. Book a demo and we’ll map it to your process."
                  : "此頁是靈感示意，不是現成套裝。預約示範後，我們會對齊你們的流程再落地。"}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <ActionBtn
                label={lang === "en" ? "Book a Demo" : "預約示範"}
                onClick={() => openDemo(item.brand)}
                filled
                icon={<ArrowRight size={12} />}
              />
              <ActionBtn
                label={lang === "en" ? "Enquiry" : "查詢"}
                onClick={() => openEnquiry(item.brand)}
                icon={<ArrowRight size={12} />}
              />
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: GHOST, marginBottom: 16 }}>
                {lang === "en" ? "Continue exploring" : "繼續探索"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/showcase/${rel.slug}`}
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    {rel.images[0] ? (
                      <RealShot brand={rel.brand} src={rel.images[0].src} caption="" height={140} />
                    ) : null}
                    <p
                      style={{
                        ...fontDisplay,
                        fontWeight: 800,
                        fontSize: 18,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: IVORY,
                        marginTop: 10,
                      }}
                    >
                      {rel.brand}
                    </p>
                    <p style={{ marginTop: 6, fontSize: 12, color: DIM, lineHeight: 1.5 }}>{rel.tagline[lang]}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p style={{ marginTop: 48, fontSize: 12, lineHeight: 1.7, color: GHOST, maxWidth: 800 }}>{DISCLAIMER[lang]}</p>
        </div>
      </section>
    </div>
  );
}

export default function ShowcaseDetailPage() {
  const { slug = "" } = useParams();
  const [lang, setLang] = usePersistentLang();
  return (
    <SiteChrome lang={lang} setLang={setLang} showDisclaimer>
      <DetailInner lang={lang} slug={slug} />
    </SiteChrome>
  );
}
