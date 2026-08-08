import { useEffect, useState } from "react";
import type { ShowcaseItem } from "@/content/showcases/types";

export const SHOWCASE_AUTO_CYCLE_MS = 7000;

/** Shared Netflix-style billboard cycle for Home + Showcase index. */
export function useShowcaseBillboardCycle(heroList: ShowcaseItem[], intervalMs = SHOWCASE_AUTO_CYCLE_MS) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [preview, setPreview] = useState<ShowcaseItem | null>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  const len = Math.max(heroList.length, 1);
  const featuredHero = heroList[heroIndex % len];
  const billboard = preview ?? featuredHero;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const canAutoCycle = heroList.length > 1 && !preview && !reducedMotion;
  const progressPlaying = canAutoCycle && !hoverPaused;

  useEffect(() => {
    if (!progressPlaying) return;
    const id = window.setTimeout(() => {
      setHeroIndex((i) => (i + 1) % heroList.length);
    }, intervalMs);
    return () => window.clearTimeout(id);
  }, [progressPlaying, heroIndex, heroList.length, cycleKey, intervalMs]);

  const markInteract = () => setCycleKey((k) => k + 1);

  const cycle = (dir: -1 | 1) => {
    markInteract();
    setPreview(null);
    setHeroIndex((i) => (i + dir + heroList.length) % heroList.length);
  };

  const previewItem = (item: ShowcaseItem) => {
    markInteract();
    const idx = heroList.findIndex((s) => s.slug === item.slug);
    if (idx >= 0) {
      setPreview(null);
      setHeroIndex(idx);
    } else {
      setPreview(item);
    }
  };

  return {
    billboard,
    heroIndex,
    preview,
    canAutoCycle,
    progressPlaying,
    cycleKey,
    cycle,
    previewItem,
    onPauseChange: setHoverPaused,
    positionLabel: (lang: "en" | "zh") =>
      preview
        ? lang === "en"
          ? "Preview"
          : "預覽"
        : `${(heroIndex % len) + 1}/${heroList.length || 1}`,
  };
}
