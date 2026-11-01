import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "contents", "figs", "6");
mkdirSync(outputDir, { recursive: true });

const width = 1280;
const height = 820;
const plot = { left: 100, right: 1180, top: 135, bottom: 680 };
const domain = { xMin: -2.2, xMax: 1.6, yMin: -5, yMax: 5 };

const px = (x) => plot.left
  + ((x - domain.xMin) / (domain.xMax - domain.xMin)) * (plot.right - plot.left);
const py = (y) => plot.bottom
  - ((y - domain.yMin) / (domain.yMax - domain.yMin)) * (plot.bottom - plot.top);
const f = (x) => x ** 3 - 2 * x + 2;

const rootValue = -1.7692923542386314;
const point = (x, y) => `${px(x).toFixed(2)},${py(y).toFixed(2)}`;

const curvePoints = [];
for (let index = 0; index <= 380; index += 1) {
  const x = domain.xMin + (index / 380) * (domain.xMax - domain.xMin);
  curvePoints.push(point(x, f(x)));
}

const tangentAtZero = (x) => 2 - 2 * x;
const tangentAtOne = (x) => x;

function verticalGrid(x, label) {
  return `
    <line x1="${px(x)}" y1="${plot.top}" x2="${px(x)}" y2="${plot.bottom}" class="grid"/>
    <text x="${px(x)}" y="${plot.bottom + 30}" class="tick" text-anchor="middle">${label}</text>`;
}

function horizontalGrid(y, label) {
  return `
    <line x1="${plot.left}" y1="${py(y)}" x2="${plot.right}" y2="${py(y)}" class="grid"/>
    <text x="${plot.left - 16}" y="${py(y) + 6}" class="tick" text-anchor="end">${label}</text>`;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">ニュートン法で近似値が0と1を往復する例</title>
  <desc id="desc">関数f(x)=xの3乗マイナス2xプラス2について，x0=0の接線がx1=1を与え，x1=1の接線がx2=0を与えるため，近似値が0と1を往復する様子を示す．</desc>
  <defs>
    <clipPath id="plot-area">
      <rect x="${plot.left}" y="${plot.top}" width="${plot.right - plot.left}" height="${plot.bottom - plot.top}"/>
    </clipPath>
    <marker id="axis-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#263238"/>
    </marker>
    <marker id="orange-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#d84315"/>
    </marker>
    <marker id="green-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00897b"/>
    </marker>
    <marker id="gray-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#607d8b"/>
    </marker>
    <style>
      text { font-family: "Hiragino Sans", "Yu Gothic", "Noto Sans CJK JP", sans-serif; fill: #172025; }
      .title { font-size: 30px; font-weight: 700; }
      .subtitle { font-size: 18px; }
      .tick { font-size: 16px; fill: #4b565c; }
      .axis-label { font-size: 21px; font-style: italic; }
      .grid { stroke: #dce2e5; stroke-width: 1; }
      .guide { stroke: #607d8b; stroke-width: 2.5; stroke-dasharray: 7 7; }
      .point-label { font-size: 17px; font-weight: 600; paint-order: stroke; stroke: #fff; stroke-width: 6px; stroke-linejoin: round; }
      .iteration-label { font-size: 18px; font-weight: 700; paint-order: stroke; stroke: #fff; stroke-width: 6px; stroke-linejoin: round; }
      .legend { font-size: 17px; }
    </style>
  </defs>

  <rect width="${width}" height="${height}" fill="#fff"/>
  <text x="${plot.left}" y="44" class="title">ニュートン法が0と1を往復する例</text>
  <text x="${plot.left}" y="76" class="subtitle">f(x) = x³ − 2x + 2，初期値 x₀ = 0</text>
  <text x="${plot.right}" y="48" class="iteration-label" fill="#6a1b9a" text-anchor="end">0 → 1 → 0 → 1 → …</text>
  <text x="${plot.right}" y="78" class="subtitle" text-anchor="end">近似値は解へ近づかず，同じ2点を繰り返す</text>

  ${[-2, -1, 0, 1].map((x) => verticalGrid(x, String(x))).join("")}
  ${[-4, -2, 0, 2, 4].map((y) => horizontalGrid(y, String(y))).join("")}

  <line x1="${plot.left}" y1="${py(0)}" x2="${plot.right + 4}" y2="${py(0)}" stroke="#263238" stroke-width="2.2" marker-end="url(#axis-arrow)"/>
  <line x1="${px(0)}" y1="${plot.bottom}" x2="${px(0)}" y2="${plot.top - 5}" stroke="#263238" stroke-width="2.2" marker-end="url(#axis-arrow)"/>
  <text x="${plot.right + 12}" y="${py(0) - 10}" class="axis-label">x</text>
  <text x="${px(0) + 14}" y="${plot.top - 12}" class="axis-label">y</text>

  <g clip-path="url(#plot-area)">
    <polyline points="${curvePoints.join(" ")}" fill="none" stroke="#1565c0" stroke-width="5" stroke-linejoin="round"/>
    <line x1="${px(-1.2)}" y1="${py(tangentAtZero(-1.2))}" x2="${px(1.5)}" y2="${py(tangentAtZero(1.5))}" stroke="#d84315" stroke-width="3.5"/>
    <line x1="${px(-2.1)}" y1="${py(tangentAtOne(-2.1))}" x2="${px(1.5)}" y2="${py(tangentAtOne(1.5))}" stroke="#00897b" stroke-width="3.5"/>

    <line x1="${px(0)}" y1="${py(0)}" x2="${px(0)}" y2="${py(2)}" class="guide" marker-end="url(#gray-arrow)"/>
    <line x1="${px(0)}" y1="${py(2)}" x2="${px(1)}" y2="${py(0)}" stroke="#d84315" stroke-width="4.5" marker-end="url(#orange-arrow)"/>
    <line x1="${px(1)}" y1="${py(0)}" x2="${px(1)}" y2="${py(1)}" class="guide" marker-end="url(#gray-arrow)"/>
    <line x1="${px(1)}" y1="${py(1)}" x2="${px(0)}" y2="${py(0)}" stroke="#00897b" stroke-width="4.5" marker-end="url(#green-arrow)"/>
  </g>

  <circle cx="${px(0)}" cy="${py(2)}" r="7" fill="#d84315" stroke="#fff" stroke-width="2"/>
  <circle cx="${px(1)}" cy="${py(1)}" r="7" fill="#00897b" stroke="#fff" stroke-width="2"/>
  <circle cx="${px(rootValue)}" cy="${py(0)}" r="7" fill="#6a1b9a" stroke="#fff" stroke-width="2"/>

  <text x="${px(0) - 18}" y="${py(2) - 18}" class="point-label" text-anchor="end">(0, f(0)) = (0, 2)</text>
  <text x="${px(1) + 16}" y="${py(1) - 17}" class="point-label">(1, f(1)) = (1, 1)</text>
  <text x="${px(0) - 16}" y="${py(0) + 36}" class="iteration-label" fill="#00897b" text-anchor="end">x₀ = x₂ = x₄ = 0</text>
  <text x="${px(1) + 16}" y="${py(0) + 36}" class="iteration-label" fill="#d84315">x₁ = x₃ = x₅ = 1</text>
  <line x1="${px(rootValue)}" y1="${py(0) + 5}" x2="${px(rootValue)}" y2="${py(0) + 54}" stroke="#6a1b9a" stroke-width="2"/>
  <text x="${px(rootValue)}" y="${py(0) + 79}" class="iteration-label" fill="#6a1b9a" text-anchor="middle">実際の解 ≈ −1.7693</text>

  <g transform="translate(100 108)">
    <line x1="0" y1="0" x2="42" y2="0" stroke="#1565c0" stroke-width="5"/>
    <text x="54" y="6" class="legend">関数 f(x)</text>
    <line x1="190" y1="0" x2="232" y2="0" stroke="#d84315" stroke-width="4"/>
    <text x="244" y="6" class="legend">x = 0での接線</text>
    <line x1="440" y1="0" x2="482" y2="0" stroke="#00897b" stroke-width="4"/>
    <text x="494" y="6" class="legend">x = 1での接線</text>
  </g>
</svg>
`;

writeFileSync(join(outputDir, "newton_oscillation_diagram.svg"), svg, "utf8");
