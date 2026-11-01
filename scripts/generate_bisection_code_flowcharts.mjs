import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "contents", "figs", "6");
mkdirSync(outputDir, { recursive: true });

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function port(node, side) {
  if (side === "top") return [node.cx, node.y];
  if (side === "bottom") return [node.cx, node.y + node.height];
  if (side === "left") return [node.cx - node.width / 2, node.y + node.height / 2];
  return [node.cx + node.width / 2, node.y + node.height / 2];
}

function renderNode(node) {
  const left = node.cx - node.width / 2;
  const right = node.cx + node.width / 2;
  const bottom = node.y + node.height;
  const shapeClass = node.changed ? "shape changed-shape" : "shape";
  let shape;

  if (node.type === "connector") {
    shape = `<circle class="${shapeClass}" cx="${node.cx}" cy="${node.y + node.height / 2}" r="${node.width / 2}"/>`;
  } else if (node.type === "terminal") {
    shape = `<rect class="${shapeClass}" x="${left}" y="${node.y}" width="${node.width}" height="${node.height}" rx="${node.height / 2}"/>`;
  } else if (node.type === "decision") {
    shape = `<polygon class="${shapeClass}" points="${node.cx},${node.y} ${right},${node.y + node.height / 2} ${node.cx},${bottom} ${left},${node.y + node.height / 2}"/>`;
  } else if (node.type === "output") {
    const offset = 30;
    shape = `<polygon class="${shapeClass}" points="${left + offset},${node.y} ${right},${node.y} ${right - offset},${bottom} ${left},${bottom}"/>`;
  } else if (node.type === "preparation") {
    const offset = 34;
    shape = `<polygon class="${shapeClass}" points="${left + offset},${node.y} ${right - offset},${node.y} ${right},${node.y + node.height / 2} ${right - offset},${bottom} ${left + offset},${bottom} ${left},${node.y + node.height / 2}"/>`;
  } else {
    shape = `<rect class="${shapeClass}" x="${left}" y="${node.y}" width="${node.width}" height="${node.height}"/>`;
  }

  const roleClass = node.changed ? "role changed-role" : "role";
  const codeClass = node.changed ? "code changed-code" : "code";
  const roleHeight = node.role.length * 25;
  const codeHeight = node.code.length * 27;
  const gap = node.role.length > 0 && node.code.length > 0 ? 8 : 0;
  const totalHeight = roleHeight + codeHeight + gap;
  let currentY = node.y + (node.height - totalHeight) / 2 + 20;

  const roleText = node.role.map((line) => {
    const text = `<text class="${roleClass}" x="${node.cx}" y="${currentY}">${escapeXml(line)}</text>`;
    currentY += 25;
    return text;
  }).join("\n");
  currentY += gap;
  const codeText = node.code.map((line) => {
    const sizeClass = line.length > 42 ? " code-small" : "";
    const text = `<text class="${codeClass}${sizeClass}" x="${node.cx}" y="${currentY}">${escapeXml(line)}</text>`;
    currentY += 27;
    return text;
  }).join("\n");

  return `<g id="${node.id}">${shape}${roleText}${codeText}</g>`;
}

function renderEdge(edge, nodeMap) {
  const start = port(nodeMap.get(edge.from), edge.fromSide);
  const end = port(nodeMap.get(edge.to), edge.toSide);
  const points = [start, ...(edge.via ?? []), end];
  const pointText = points.map(([x, y]) => `${x},${y}`).join(" ");
  const label = edge.label
    ? `<text class="branch" x="${edge.labelX}" y="${edge.labelY}">${escapeXml(edge.label)}</text>`
    : "";
  return `<g><polyline class="flow" points="${pointText}"/>${label}</g>`;
}

function renderChart(chart) {
  const nodeMap = new Map(chart.nodes.map((node) => [node.id, node]));
  const changedLegend = chart.showChangedLegend
    ? `<g transform="translate(${chart.legendX ?? chart.width - 520} ${chart.legendY ?? 70})">
        <rect x="0" y="-23" width="42" height="28" class="shape changed-shape"/>
        <text x="58" y="0" class="legend">赤枠・赤字は追加または変更した処理</text>
      </g>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${chart.width}" height="${chart.height}" viewBox="0 0 ${chart.width} ${chart.height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(chart.title)}</title>
  <desc id="desc">${escapeXml(chart.description)}</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#263238"/>
    </marker>
    <style>
      .shape { fill: #fff; stroke: #263238; stroke-width: 3; }
      .changed-shape { fill: #fff4dc; stroke: #c62828; stroke-width: 4; }
      .flow { fill: none; stroke: #263238; stroke-width: 3; stroke-linejoin: miter; marker-end: url(#arrow); }
      .role { fill: #37474f; font-family: sans-serif; font-size: 20px; font-weight: 600; text-anchor: middle; }
      .code { fill: #0b57a4; font-family: Menlo, Monaco, monospace; font-size: 20px; font-weight: 600; text-anchor: middle; }
      .code-small { font-size: 16px; }
      .changed-role { fill: #8e1b16; }
      .changed-code { fill: #c62828; }
      .branch { fill: #111; font-family: sans-serif; font-size: 20px; font-weight: 700; paint-order: stroke; stroke: #fff; stroke-width: 6; stroke-linejoin: round; }
      .legend { fill: #8e1b16; font-family: sans-serif; font-size: 18px; font-weight: 700; }
      .heading { fill: #263238; font-family: sans-serif; font-size: 27px; font-weight: 700; text-anchor: middle; }
      .subheading { fill: #607d8b; font-family: sans-serif; font-size: 17px; text-anchor: middle; }
    </style>
  </defs>
  <rect width="${chart.width}" height="${chart.height}" fill="#fff"/>
  <text class="heading" x="${chart.width / 2}" y="42">${escapeXml(chart.heading)}</text>
  <text class="subheading" x="${chart.width / 2}" y="75">青字は各図記号に対応するPythonコードを表す</text>
  ${changedLegend}
  ${chart.edges.map((edge) => renderEdge(edge, nodeMap)).join("\n  ")}
  ${chart.nodes.map(renderNode).join("\n  ")}
</svg>
`;
}

const basicChart = {
  width: 1500,
  height: 1300,
  title: "最大反復回数を使用しない二分法のコード付きフローチャート",
  heading: "二分法の反復部分：コードと処理の対応",
  description: "区間の幅だけを終了条件とする二分法について，while文，中点の計算，条件分岐，端点の更新，return文を対応する図記号の中に示す．判断のはいは下，いいえは右へ進む．",
  showChangedLegend: false,
  nodes: [
    { id: "start", type: "terminal", cx: 430, y: 100, width: 360, height: 80, role: ["反復処理の開始"], code: [], changed: false },
    { id: "while", type: "decision", cx: 430, y: 240, width: 520, height: 200, role: ["区間の幅は", "許容誤差より大きいか"], code: ["while b - a > tolerance:"], changed: false },
    { id: "midpoint", type: "process", cx: 430, y: 520, width: 570, height: 110, role: ["区間の中点を求める"], code: ["midpoint = (a + b) / 2"], changed: false },
    { id: "sign", type: "decision", cx: 430, y: 700, width: 520, height: 200, role: ["左端と中点の関数値の", "積は0以下か"], code: ["if f(a) * f(midpoint) <= 0:"], changed: false },
    { id: "updateB", type: "process", cx: 430, y: 990, width: 500, height: 110, role: ["右端を中点へ移す"], code: ["b = midpoint"], changed: false },
    { id: "updateA", type: "process", cx: 1080, y: 745, width: 500, height: 110, role: ["左端を中点へ移す"], code: ["a = midpoint"], changed: false },
    { id: "join", type: "connector", cx: 430, y: 1150, width: 34, height: 34, role: [], code: [], changed: false },
    { id: "result", type: "output", cx: 1080, y: 275, width: 520, height: 130, role: ["最後の区間の中点を返す"], code: ["return (a + b) / 2"], changed: false },
    { id: "end", type: "terminal", cx: 1080, y: 465, width: 260, height: 80, role: ["関数の終了"], code: [], changed: false },
  ],
  edges: [
    { from: "start", fromSide: "bottom", to: "while", toSide: "top" },
    { from: "while", fromSide: "bottom", to: "midpoint", toSide: "top", label: "はい", labelX: 452, labelY: 485 },
    { from: "while", fromSide: "right", to: "result", toSide: "left", label: "いいえ", labelX: 715, labelY: 322 },
    { from: "result", fromSide: "bottom", to: "end", toSide: "top" },
    { from: "midpoint", fromSide: "bottom", to: "sign", toSide: "top" },
    { from: "sign", fromSide: "bottom", to: "updateB", toSide: "top", label: "はい", labelX: 452, labelY: 955 },
    { from: "sign", fromSide: "right", to: "updateA", toSide: "left", label: "いいえ", labelX: 715, labelY: 782 },
    { from: "updateB", fromSide: "bottom", to: "join", toSide: "top" },
    { from: "updateA", fromSide: "bottom", to: "join", toSide: "top", via: [[1080, 1125], [430, 1125]] },
    { from: "join", fromSide: "bottom", to: "while", toSide: "left", via: [[430, 1220], [100, 1220], [100, 340]] },
  ],
};

const maxIterationsChart = {
  width: 1600,
  height: 1700,
  title: "最大反復回数を加えた二分法の変更箇所",
  heading: "最大反復回数の追加によるフローチャートの変更",
  description: "区間の幅だけを使う二分法へ，最大反復回数，反復回数の初期化，複合終了条件，反復回数の更新，反復回数を含む戻り値を追加した図．追加または変更箇所を赤枠と赤字で示す．",
  showChangedLegend: true,
  legendX: 1030,
  legendY: 135,
  nodes: [
    { id: "start", type: "terminal", cx: 450, y: 100, width: 800, height: 110, role: ["最大反復回数を引数で受け取る"], code: ["def bisection(f, a, b, tolerance=1e-8, max_iterations=100):"], changed: true },
    { id: "setup", type: "preparation", cx: 450, y: 270, width: 540, height: 120, role: ["反復回数を0とする"], code: ["count = 0"], changed: true },
    { id: "while", type: "decision", cx: 450, y: 470, width: 760, height: 230, role: ["区間幅と反復回数が継続条件を満たすか"], code: ["while b - a > tolerance and count < max_iterations:"], changed: true },
    { id: "midpoint", type: "process", cx: 450, y: 780, width: 600, height: 110, role: ["区間の中点を求める"], code: ["midpoint = (a + b) / 2"], changed: false },
    { id: "sign", type: "decision", cx: 450, y: 960, width: 540, height: 200, role: ["左端と中点の関数値の", "積は0以下か"], code: ["if f(a) * f(midpoint) <= 0:"], changed: false },
    { id: "updateB", type: "process", cx: 450, y: 1250, width: 500, height: 110, role: ["右端を中点へ移す"], code: ["b = midpoint"], changed: false },
    { id: "updateA", type: "process", cx: 1160, y: 1005, width: 500, height: 110, role: ["左端を中点へ移す"], code: ["a = midpoint"], changed: false },
    { id: "increment", type: "process", cx: 450, y: 1430, width: 520, height: 120, role: ["反復回数を1増やす"], code: ["count = count + 1"], changed: true },
    { id: "result", type: "output", cx: 1210, y: 500, width: 600, height: 170, role: ["最後の区間の中点と", "反復回数を返す"], code: ["return (a + b) / 2, count"], changed: true },
    { id: "end", type: "terminal", cx: 1210, y: 730, width: 260, height: 80, role: ["関数の終了"], code: [], changed: false },
  ],
  edges: [
    { from: "start", fromSide: "bottom", to: "setup", toSide: "top" },
    { from: "setup", fromSide: "bottom", to: "while", toSide: "top" },
    { from: "while", fromSide: "bottom", to: "midpoint", toSide: "top", label: "はい", labelX: 472, labelY: 748 },
    { from: "while", fromSide: "right", to: "result", toSide: "left", label: "いいえ", labelX: 850, labelY: 567 },
    { from: "result", fromSide: "bottom", to: "end", toSide: "top" },
    { from: "midpoint", fromSide: "bottom", to: "sign", toSide: "top" },
    { from: "sign", fromSide: "bottom", to: "updateB", toSide: "top", label: "はい", labelX: 472, labelY: 1215 },
    { from: "sign", fromSide: "right", to: "updateA", toSide: "left", label: "いいえ", labelX: 750, labelY: 1042 },
    { from: "updateB", fromSide: "bottom", to: "increment", toSide: "top" },
    { from: "updateA", fromSide: "bottom", to: "increment", toSide: "top", via: [[1160, 1390], [450, 1390]] },
    { from: "increment", fromSide: "bottom", to: "while", toSide: "left", via: [[450, 1630], [100, 1630], [100, 585]] },
  ],
};

writeFileSync(
  join(outputDir, "bisection_basic_code_flowchart.svg"),
  renderChart(basicChart),
  "utf8",
);
writeFileSync(
  join(outputDir, "bisection_max_iterations_flowchart.svg"),
  renderChart(maxIterationsChart),
  "utf8",
);
