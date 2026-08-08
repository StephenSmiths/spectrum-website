import type { CSSProperties } from "react";

export const BASE = "#060C18";
export const DARK = "#090F1E";
export const DARKER = "#050A14";
export const TEAL = "#3DD9C5";
export const PURPLE = "#9B8FE4";
export const GOLD = "#C4975A";
export const GOLD_L = "#DEBA7C";
export const IVORY = "#EEF0F8";
export const DIM = "rgba(238,240,248,0.50)";
export const GHOST = "rgba(238,240,248,0.28)";

export const aurora = (cfg: { t?: string; p?: string; opacity?: number }) => {
  const o = cfg.opacity ?? 1;
  const t = cfg.t ?? "18% 40%";
  const p = cfg.p ?? "82% 25%";
  return `
    radial-gradient(ellipse 90% 55% at ${t}, rgba(61,217,197,${0.18 * o}) 0%, transparent 60%),
    radial-gradient(ellipse 70% 65% at ${p}, rgba(155,143,228,${0.14 * o}) 0%, transparent 55%),
    radial-gradient(ellipse 120% 35% at 50% 100%, rgba(126,236,196,${0.07 * o}) 0%, transparent 50%),
    ${DARK}
  `;
};

export const fontDisplay: CSSProperties = {
  fontFamily: "'Big Shoulders Display', system-ui, sans-serif",
};
export const fontSerif: CSSProperties = {
  fontFamily: "'Fraunces', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 300,
};
export const fontBody: CSSProperties = {
  fontFamily: "'Inter', 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif",
};

export type Lang = "en" | "zh";
