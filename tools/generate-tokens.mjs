import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const root = process.cwd();
const tokensPath = path.join(root, "design", "design_tokens.yml");
const outPath = path.join(root, "styles", "base", "tokens.css");

function hexToRgbTriplet(hex) {
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

const raw = fs.readFileSync(tokensPath, "utf8");
const tokens = YAML.parse(raw);

const colors = tokens?.colors ?? {};
const typography = tokens?.typography ?? {};
const shadows = tokens?.shadows ?? {};
const radius = tokens?.radius ?? {};
const anim = tokens?.animation ?? {};

const lines = [];
lines.push("/* Generated from design/design_tokens.yml. Do not edit by hand. */");
lines.push(":root {");

for (const [key, value] of Object.entries(colors)) {
  const cssKey = `--color-${key.replace(/_/g, "-")}`;
  const triplet = typeof value === "string" ? hexToRgbTriplet(value) : null;
  if (!triplet) continue;
  lines.push(`  ${cssKey}: ${triplet};`);
}

lines.push(`  --font-sans: ${JSON.stringify(typography.font_sans ?? "Inter")};`);
lines.push(`  --font-display: ${JSON.stringify(typography.font_display ?? "Inter")};`);

lines.push(`  --shadow-soft: ${shadows.soft ?? "0 10px 30px rgba(0,0,0,0.18)"};`);
lines.push(`  --shadow-medium: ${shadows.medium ?? "0 18px 50px rgba(0,0,0,0.24)"};`);
lines.push(`  --shadow-large: ${shadows.large ?? "0 30px 90px rgba(0,0,0,0.32)"};`);
lines.push(`  --shadow-glow: ${shadows.glow ?? "0 0 80px rgba(139,92,246,0.14)"};`);

lines.push(`  --radius-sm: ${radius.sm ?? "0.375rem"};`);
lines.push(`  --radius-md: ${radius.md ?? "0.625rem"};`);
lines.push(`  --radius-lg: ${radius.lg ?? "0.875rem"};`);
lines.push(`  --radius-xl: ${radius.xl ?? "1.25rem"};`);
lines.push(`  --radius-2xl: ${radius["2xl"] ?? "1.75rem"};`);
lines.push(`  --radius-full: ${radius.full ?? "9999px"};`);

lines.push(`  --duration-fast: ${anim.duration_fast ?? "160ms"};`);
lines.push(`  --duration-normal: ${anim.duration_normal ?? "320ms"};`);
lines.push(`  --duration-slow: ${anim.duration_slow ?? "720ms"};`);
lines.push(`  --easing-primary: ${anim.easing_primary ?? "cubic-bezier(0.22, 1, 0.36, 1)"};`);
lines.push(`  --easing-secondary: ${anim.easing_secondary ?? "cubic-bezier(0.16, 1, 0.3, 1)"};`);

lines.push("}");
lines.push("");
lines.push("@media (prefers-reduced-motion: reduce) {");
lines.push("  :root {");
lines.push("    --duration-fast: 1ms;");
lines.push("    --duration-normal: 1ms;");
lines.push("    --duration-slow: 1ms;");
lines.push("  }");
lines.push("}");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"));
console.log(`wrote ${path.relative(root, outPath)}`);
