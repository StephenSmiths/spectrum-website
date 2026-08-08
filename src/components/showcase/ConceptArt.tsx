import type { CSSProperties } from "react";
import { BASE, IVORY } from "@/lib/theme";

/** Brand-unique abstract illustration — not product screenshots. */
export function ConceptArt({
  seed,
  accent,
  label,
  variant = 0,
  height = 220,
}: {
  seed: string;
  accent: string;
  label: string;
  variant?: number;
  height?: number;
}) {
  const h = hash(seed + String(variant));
  const a = (h % 40) + 10;
  const b = ((h >> 3) % 40) + 50;
  const c = ((h >> 6) % 30) + 20;
  const rot = (h % 25) - 12;

  const wrap: CSSProperties = {
    position: "relative",
    height,
    overflow: "hidden",
    background: BASE,
    border: "1px solid rgba(238,240,248,0.08)",
  };

  return (
    <div style={wrap} aria-hidden>
      <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`g1-${seed}-${variant}`} cx={`${a}%`} cy={`${c}%`} r="65%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={BASE} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`g2-${seed}-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9B8FE4" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill={BASE} />
        <rect width="800" height="400" fill={`url(#g1-${seed}-${variant})`} />
        <g transform={`translate(400 200) rotate(${rot})`}>
          <ellipse cx={-80 + (h % 40)} cy={-20} rx={180 + (h % 60)} ry={90 + (h % 30)} fill={`url(#g2-${seed}-${variant})`} />
          <rect x={-220} y={40} width={440} height={2} fill={accent} opacity="0.35" />
          <rect x={-180 + (variant * 20)} y={-90} width={12} height={140} fill={accent} opacity="0.55" />
          <circle cx={120 + (h % 30)} cy={-40} r={18 + (variant * 4)} fill={accent} opacity="0.7" />
          <circle cx={-140} cy={70} r={6} fill={IVORY} opacity="0.35" />
          <path
            d={`M ${-200} ${60 + b / 5} Q ${-40} ${-80 + variant * 10} ${160} ${50} T ${260} ${20}`}
            fill="none"
            stroke={IVORY}
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 16,
          bottom: 14,
          fontFamily: "'Big Shoulders Display', system-ui, sans-serif",
          fontWeight: 900,
          fontSize: 18,
          letterSpacing: "0.08em",
          color: IVORY,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
