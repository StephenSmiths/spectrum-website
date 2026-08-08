#!/usr/bin/env node
/**
 * Score showcase images for Billboard / Wave-1 readiness.
 * Usage: node scripts/showcase-image-qa.mjs
 * Exit 1 if any featured hero fails the gate.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const indexTs = fs.readFileSync(path.join(root, "src/content/showcases/index.ts"), "utf8");

function parseBlocks(src) {
  const blocks = [];
  const re = /slug: "([^"]+)"([\s\S]*?)(?=\n  \{\n    slug:|\n\];)/g;
  let m;
  while ((m = re.exec(src))) {
    blocks.push({ slug: m[1], body: m[2] });
  }
  return blocks;
}

function pngSize(buf) {
  if (buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // JPEG SOF
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
  // WebP VP8X / VP8
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    }
    if (chunk === "VP8 ") {
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

function scoreFile(abs) {
  const buf = fs.readFileSync(abs);
  const dim = pngSize(buf);
  if (!dim) return { score: -99, note: "unreadable", kb: buf.length / 1024 };
  const { w, h } = dim;
  const ar = w / Math.max(h, 1);
  const kb = buf.length / 1024;
  let score = 0;
  const notes = [];
  if (ar >= 1.25 && ar <= 2.05) score += 5;
  else if (ar > 2.6) {
    score -= 4;
    notes.push("banner");
  } else if (ar >= 0.85 && ar <= 1.15) {
    score -= 3;
    notes.push("square");
  } else score += 1;
  if (w >= 1200) score += 2;
  else if (w >= 900) score += 1;
  else notes.push("narrow");
  if (h >= 600) score += 2;
  else if (h >= 400) score += 1;
  else notes.push("short");
  if (kb < 25) {
    score -= 3;
    notes.push("tiny");
  }
  return { score, note: notes.join(",") || "ok", kb, w, h, ar: Number(ar.toFixed(2)) };
}

const blocks = parseBlocks(indexTs);
let failed = 0;
console.log("slug\tfeatured\thero\tscore\twxh\tar\tnotes");
for (const { slug, body } of blocks) {
  const featured = /featured:\s*true/.test(body);
  const srcs = [...body.matchAll(/src: "(\/showcase\/[^"]+)"/g)].map((x) => x[1]);
  if (!srcs.length) continue;
  const hero = srcs[0];
  const abs = path.join(publicDir, hero.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    console.log(`${slug}\t${featured}\t${hero}\tMISS`);
    if (featured) failed++;
    continue;
  }
  const s = scoreFile(abs);
  const gate = featured ? s.score >= 6 : true;
  if (featured && !gate) failed++;
  console.log(
    `${slug}\t${featured ? "Y" : "-"}\t${path.basename(hero)}\t${s.score}\t${s.w}x${s.h}\t${s.ar}\t${gate ? s.note : "FAIL " + s.note}`,
  );
}

console.log(failed ? `\n${failed} featured hero(s) failed gate (need score >= 6)` : "\nAll featured heroes pass gate.");
process.exit(failed ? 1 : 0);
