import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "contents", "figs", "6");
mkdirSync(outputDir, { recursive: true });

const width = 1280;
const height = 820;
const plot = { left: 100, right: 1180, top: 120, bottom: 720 };
const domain = { xMin: 1.05, xMax: 2.10, yMin: -0.9, yMax: 7.0 };

const px = (x) => plot.left
  + ((x - domain.xMin) / (domain.xMax - domain.xMin)) * (plot.right - plot.left);
const py = (y) => plot.bottom
  - ((y - domain.yMin) / (domain.yMax - domain.yMin)) * (plot.bottom - plot.top);
const f = (x) => x ** 3 - 2;
const derivative = (x) => 3 * x ** 2;
const next = (x) => x - f(x) / derivative(x);

const x0 = 2;
const x1 = next(x0);
const x2 = next(x1);
const exactRoot = 2 ** (1 / 3);

const point = (x, y) => `${px(x).toFixed(2)},${py(y).toFixed(2)}`;

const curvePoints = [];
for (let index = 0; index <= 320; index += 1) {
  const x = domain.xMin + (index / 320) * (domain.xMax - domain.xMin);
  curvePoints.push(point(x, f(x)));
}

const tangent0 = (x) => f(x0) + derivative(x0) * (x - x0);
const tangent1 = (x) => f(x1) + derivative(x1) * (x - x1);

function verticalGrid(x, label) {
  return `
    <line x1="${px(x)}" y1="${plot.top}" x2="${px(x)}" y2="${plot.bottom}" class="grid"/>
    <text x="${px(x)}" y="${plot.bottom + 32}" class="tick" text-anchor="middle">${label}</text>`;
}

function horizontalGrid(y, label) {
  return `
    <line x1="${plot.left}" y1="${py(y)}" x2="${plot.right}" y2="${py(y)}" class="grid"/>
    <text x="${plot.left - 16}" y="${py(y) + 6}" class="tick" text-anchor="end">${label}</text>`;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">ニュートン・ラフソン法の図解</title>
  <desc id="desc">関数f(x)=xの3乗マイナス2について，初期値x0から接線とx軸の交点を次の近似値にする反復を示す．</desc>
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
    <style>
      text { font-family: "Hiragino Sans", "Yu Gothic", "Noto Sans CJK JP", sans-serif; fill: #172025; }
      .title { font-size: 30px; font-weight: 700; }
      .subtitle { font-size: 18px; }
      .tick { font-size: 16px; fill: #4b565c; }
      .axis-label { font-size: 21px; font-style: italic; }
      .grid { stroke: #dce2e5; stroke-width: 1; }
      .guide { stroke: #829097; stroke-width: 2; stroke-dasharray: 7 7; }
      .iteration-label { font-size: 18px; font-weight: 700; paint-order: stroke; stroke: white; stroke-width: 6px; stroke-linejoin: round; }
      .point-label { font-size: 17px; paint-order: stroke; stroke: white; stroke-width: 6px; stroke-linejoin: round; }
      .legend { font-size: 17px; }
    </style>
  </defs>

  <rect width="${width}" height="${height}" fill="#ffffff"/>
  <text x="${plot.left}" y="46" class="title">ニュートン・ラフソン法の反復</text>
  <text x="${plot.left}" y="78" class="subtitle">曲線上の点で引いた接線と x 軸の交点を，次の近似値とする</text>
  <text x="${plot.right}" y="48" class="subtitle" text-anchor="end">xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)</text>

  ${[1.2, 1.4, 1.6, 1.8, 2.0].map((x) => verticalGrid(x, x.toFixed(1))).join("")}
  ${[0, 1, 2, 3, 4, 5, 6].map((y) => horizontalGrid(y, String(y))).join("")}

  <line x1="${plot.left}" y1="${py(0)}" x2="${plot.right + 4}" y2="${py(0)}" stroke="#263238" stroke-width="2.2" marker-end="url(#axis-arrow)"/>
  <line x1="${px(domain.xMin)}" y1="${plot.bottom}" x2="${px(domain.xMin)}" y2="${plot.top - 5}" stroke="#263238" stroke-width="2.2" marker-end="url(#axis-arrow)"/>
  <text x="${plot.right + 12}" y="${py(0) - 10}" class="axis-label">x</text>
  <text x="${plot.left + 14}" y="${plot.top - 12}" class="axis-label">y</text>

  <g clip-path="url(#plot-area)">
    <polyline points="${curvePoints.join(" ")}" fill="none" stroke="#1565c0" stroke-width="5" stroke-linejoin="round"/>

    <line x1="${px(1.47)}" y1="${py(tangent0(1.47))}" x2="${px(2.05)}" y2="${py(tangent0(2.05))}" stroke="#d84315" stroke-width="3.5"/>
    <line x1="${px(1.22)}" y1="${py(tangent1(1.22))}" x2="${px(1.74)}" y2="${py(tangent1(1.74))}" stroke="#00897b" stroke-width="3.5"/>

    <line x1="${px(x0)}" y1="${py(0)}" x2="${px(x0)}" y2="${py(f(x0))}" class="guide" marker-end="url(#orange-arrow)"/>
    <line x1="${px(x0)}" y1="${py(f(x0))}" x2="${px(x1)}" y2="${py(0)}" stroke="#d84315" stroke-width="4" marker-end="url(#orange-arrow)"/>

    <line x1="${px(x1)}" y1="${py(0)}" x2="${px(x1)}" y2="${py(f(x1))}" class="guide" marker-end="url(#green-arrow)"/>
    <line x1="${px(x1)}" y1="${py(f(x1))}" x2="${px(x2)}" y2="${py(0)}" stroke="#00897b" stroke-width="4" marker-end="url(#green-arrow)"/>
    <line x1="${px(x2)}" y1="${py(0)}" x2="${px(x2)}" y2="${py(f(x2))}" class="guide" marker-end="url(#green-arrow)"/>
  </g>

  <circle cx="${px(x0)}" cy="${py(f(x0))}" r="7" fill="#d84315" stroke="white" stroke-width="2"/>
  <circle cx="${px(x1)}" cy="${py(f(x1))}" r="7" fill="#00897b" stroke="white" stroke-width="2"/>
  <circle cx="${px(x2)}" cy="${py(f(x2))}" r="7" fill="#00897b" stroke="white" stroke-width="2"/>
  <circle cx="${px(exactRoot)}" cy="${py(0)}" r="7" fill="#6a1b9a" stroke="white" stroke-width="2"/>

  <text x="${px(x0) - 14}" y="${py(f(x0)) - 18}" class="point-label" text-anchor="end">(x₀, f(x₀))</text>
  <text x="${px(x1) + 14}" y="${py(f(x1)) - 17}" class="point-label">(x₁, f(x₁))</text>
  <text x="${px(x2) + 20}" y="${py(f(x2)) - 18}" class="point-label">(x₂, f(x₂))</text>

  <text x="${px(x0)}" y="${py(0) + 31}" class="iteration-label" fill="#d84315" text-anchor="middle">x₀ = 2</text>
  <text x="${px(x1) + 8}" y="${py(0) + 58}" class="iteration-label" fill="#00897b" text-anchor="middle">x₁ = 1.5</text>
  <line x1="${px(x2)}" y1="${py(0) + 4}" x2="${px(x2) - 34}" y2="${py(0) + 67}" stroke="#00897b" stroke-width="1.8"/>
  <text x="${px(x2) - 40}" y="${py(0) + 80}" class="iteration-label" fill="#00897b" text-anchor="end">x₂ ≈ 1.2963</text>
  <line x1="${px(exactRoot)}" y1="${py(0) + 4}" x2="${px(exactRoot) + 12}" y2="${py(0) + 106}" stroke="#6a1b9a" stroke-width="1.8"/>
  <text x="${px(exactRoot) + 18}" y="${py(0) + 120}" class="iteration-label" fill="#6a1b9a">解 ∛2 ≈ 1.2599</text>

  <g transform="translate(725 98)">
    <line x1="0" y1="0" x2="42" y2="0" stroke="#1565c0" stroke-width="5"/>
    <text x="54" y="6" class="legend">関数 f(x) = x³ − 2</text>
    <line x1="260" y1="0" x2="302" y2="0" stroke="#d84315" stroke-width="4"/>
    <text x="314" y="6" class="legend">x₀ での接線</text>
  </g>
  <g transform="translate(985 132)">
    <line x1="0" y1="0" x2="42" y2="0" stroke="#00897b" stroke-width="4"/>
    <text x="54" y="6" class="legend">x₁ での接線</text>
  </g>
</svg>
`;

writeFileSync(join(outputDir, "newton_raphson_diagram.svg"), svg, "utf8");
