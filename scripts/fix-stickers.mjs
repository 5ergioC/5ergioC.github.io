/**
 * fix-stickers.mjs
 * Fixes SVG sticker files for StickerPeel component:
 *   - Expands filter region so borders don't get clipped
 *   - Adds Gaussian blur after feMorphology for smooth border edges
 *   - Increases shadow softness
 *
 * Usage:
 *   node scripts/fix-stickers.mjs
 *   node scripts/fix-stickers.mjs public/stickers/my-logo.svg   ← single file
 *
 * Drop any SVG into public/stickers/ then run this script.
 * The SVG must have a transparent background and a viewBox.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, '..');
const dir   = join(root, 'public', 'stickers');

// ── Config ───────────────────────────────────────────────────────────
const DILATE_RADIUS    = 2.8;  // white border thickness (SVG units)
const BORDER_AA_BLUR   = 0.15; // sub-pixel anti-alias on border edges only (not visible as blur)
const SHADOW_BLUR      = 2.5;  // drop shadow softness
const SHADOW_OPACITY   = 0.18; // drop shadow opacity
const SHADOW_DY        = 1.0;  // drop shadow vertical offset
// viewBox padding: must exceed dilate + shadow_spread (≈ blur * 3) + offset + margin
// shadow spreads ~3× stdDeviation → 2.5*3 = 7.5u, + dilate 2.8 + offset 1 + margin 2 = 13.3 → 14
const VIEWBOX_PAD      = 5;   // min padding for border (dilate=2.8 + buffer=2.2)
// ─────────────────────────────────────────────────────────────────────

function buildFilter() {
  return `<filter id="s" x="-50%" y="-50%" width="200%" height="200%">
      <!-- 1. Expand alpha for border -->
      <feMorphology in="SourceAlpha" operator="dilate" radius="${DILATE_RADIUS}" result="d"/>
      <!-- 2. Sub-pixel anti-alias (0.15u ≈ <1px — smooths diagonal edges, not visible as blur) -->
      <feGaussianBlur in="d" stdDeviation="${BORDER_AA_BLUR}" result="d_aa"/>
      <!-- 3. Fill white -->
      <feFlood flood-color="white" result="wf"/>
      <feComposite in="wf" in2="d_aa" operator="in" result="border"/>
      <!-- 4. Drop shadow from dilated shape -->
      <feGaussianBlur in="d" stdDeviation="${SHADOW_BLUR}" result="sb"/>
      <feFlood flood-color="#000" flood-opacity="${SHADOW_OPACITY}" result="sf"/>
      <feComposite in="sf" in2="sb" operator="in" result="shadow"/>
      <feOffset in="shadow" dx="0" dy="${SHADOW_DY}" result="shoff"/>
      <!-- 5. Merge -->
      <feMerge><feMergeNode in="shoff"/><feMergeNode in="border"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;
}

/**
 * Expand the SVG viewBox by VIEWBOX_PAD on all sides so the dilated border
 * and shadow have room to render without being clipped by the SVG viewport.
 */
function padViewBox(svg) {
  return svg.replace(/viewBox="([^"]+)"/, (_, vb) => {
    const [x, y, w, h] = vb.trim().split(/[\s,]+/).map(Number);
    const p = VIEWBOX_PAD;
    return `viewBox="${x - p} ${y - p} ${w + p * 2} ${h + p * 2}"`;
  });
}

function fixSvg(svg) {
  // 1. Expand viewBox so border never clips at the viewport edge
  if (VIEWBOX_PAD > 0) svg = padViewBox(svg);
  // 2. Replace or inject the filter
  const filterRegex = /<filter id="s"[\s\S]*?<\/filter>/;
  if (filterRegex.test(svg)) {
    return svg.replace(filterRegex, buildFilter());
  }
  if (svg.includes('<defs>')) {
    return svg.replace('<defs>', `<defs>\n    ${buildFilter()}`);
  }
  return svg.replace(/(<svg[^>]*>)/, `$1\n  <defs>\n    ${buildFilter()}\n  </defs>`);
}

// ── Main ─────────────────────────────────────────────────────────────
// Always reads from -raw.svg as source → idempotent, safe to re-run.
const rawFiles = readdirSync(dir)
  .filter(f => f.endsWith('-raw.svg'))
  .map(f => join(dir, f));

const customTargets = process.argv.slice(2);

const pairs = customTargets.length
  ? customTargets.map(f => {
      const src = resolve(f);
      const out = src.replace(/-raw\.svg$/, '.svg').replace(/\.svg$/, '.svg');
      return { src, out: src.includes('-raw') ? out : src };
    })
  : rawFiles.map(f => ({ src: f, out: f.replace(/-raw\.svg$/, '.svg') }));

let ok = 0, skip = 0;
for (const { src, out } of pairs) {
  if (!existsSync(src)) { console.warn(`⚠  Not found: ${src}`); skip++; continue; }
  const raw   = readFileSync(src, 'utf8');
  const fixed = fixSvg(raw);
  writeFileSync(out, fixed, 'utf8');
  console.log(`✓  ${src.split(/[\\/]/).pop()} → ${out.split(/[\\/]/).pop()}`);
  ok++;
}
console.log(`\nDone — ${ok} processed, ${skip} skipped.`);
