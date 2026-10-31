import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "contents", "figs", "6");
mkdirSync(outputDir, { recursive: true });

const charts = [
  {
    file: "flow_bisection.svg",
    title: "二分法の手続き",
    width: 1300,
    height: 1300,
    nodes: [
      ["start", "terminal", 360, 20, 180, 52, ["開始"]],
      ["input", "data", 360, 100, 380, 72, ["関数，区間，許容誤差を受け取る"]],
      ["sign", "decision", 360, 210, 340, 120, ["関数値の符号が異なるか，", "いずれかが0か"]],
      ["invalid", "data", 780, 238, 330, 64, ["二分法を適用できない", "という結果を出す"]],
      ["invalidEnd", "terminal", 780, 334, 180, 52, ["終了"]],
      ["prepare", "preparation", 360, 370, 320, 72, ["反復回数を0とする"]],
      ["width", "decision", 360, 480, 320, 112, ["区間の幅は", "許容誤差以下か"]],
      ["result", "data", 360, 650, 340, 72, ["区間の中点と", "反復回数を結果として出す"]],
      ["end", "terminal", 360, 760, 180, 52, ["終了"]],
      ["midpoint", "process", 780, 500, 340, 72, ["区間の中点を求める"]],
      ["midSign", "decision", 780, 620, 320, 112, ["左端と中点で", "関数値の符号が異なるか"]],
      ["updateB", "process", 780, 780, 300, 64, ["右端を中点へ移す"]],
      ["updateA", "process", 1160, 644, 240, 64, ["左端を中点へ移す"]],
      ["increment", "process", 780, 890, 300, 64, ["反復回数を1増やす"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "sign", "top"],
      ["sign", "bottom", "prepare", "top", [], "はい", 376, 350],
      ["sign", "right", "invalid", "left", [], "いいえ", 550, 258],
      ["invalid", "bottom", "invalidEnd", "top"],
      ["prepare", "bottom", "width", "top"],
      ["width", "bottom", "result", "top", [], "はい", 376, 632],
      ["width", "right", "midpoint", "left", [], "いいえ", 540, 524],
      ["result", "bottom", "end", "top"],
      ["midpoint", "bottom", "midSign", "top"],
      ["midSign", "bottom", "updateB", "top", [], "はい", 796, 762],
      ["midSign", "right", "updateA", "left", [], "いいえ", 955, 674],
      ["updateB", "bottom", "increment", "top"],
      ["updateA", "bottom", "increment", "top", [[1160, 860], [780, 860]]],
      ["increment", "bottom", "width", "left", [[780, 1010], [150, 1010], [150, 536]]],
    ],
  },
  {
    file: "flow_newton.svg",
    title: "ニュートン法の手続き",
    width: 1280,
    height: 1280,
    nodes: [
      ["start", "terminal", 360, 20, 180, 52, ["開始"]],
      ["input", "data", 360, 100, 420, 72, ["関数，導関数，初期値，", "許容誤差，最大反復回数を受け取る"]],
      ["prepare", "preparation", 360, 210, 340, 72, ["初期値を現在の近似値とする"]],
      ["select", "process", 360, 320, 340, 72, ["次の反復へ進む"]],
      ["within", "decision", 360, 430, 300, 104, ["最大反復回数を", "超えていないか"]],
      ["maxFail", "data", 800, 450, 340, 64, ["収束しなかった", "という結果を出す"]],
      ["maxEnd", "terminal", 800, 550, 180, 52, ["終了"]],
      ["slope", "decision", 360, 590, 300, 104, ["導関数の値は", "0でないか"]],
      ["zeroFail", "data", 800, 610, 340, 64, ["更新できない", "という結果を出す"]],
      ["zeroEnd", "terminal", 800, 710, 180, 52, ["終了"]],
      ["calculate", "process", 360, 750, 360, 72, ["接線を使って", "新しい近似値を求める"]],
      ["converged", "decision", 360, 860, 320, 112, ["近似値の変化は", "許容誤差未満か"]],
      ["result", "data", 360, 1030, 340, 72, ["新しい近似値と", "反復回数を結果として出す"]],
      ["end", "terminal", 360, 1140, 180, 52, ["終了"]],
      ["update", "process", 800, 884, 300, 64, ["現在の近似値を更新する"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "prepare", "top"],
      ["prepare", "bottom", "select", "top"],
      ["select", "bottom", "within", "top"],
      ["within", "bottom", "slope", "top", [], "はい", 376, 572],
      ["within", "right", "maxFail", "left", [], "いいえ", 530, 470],
      ["maxFail", "bottom", "maxEnd", "top"],
      ["slope", "bottom", "calculate", "top", [], "はい", 376, 732],
      ["slope", "right", "zeroFail", "left", [], "いいえ", 530, 630],
      ["zeroFail", "bottom", "zeroEnd", "top"],
      ["calculate", "bottom", "converged", "top"],
      ["converged", "bottom", "result", "top", [], "はい", 376, 1012],
      ["converged", "right", "update", "left", [], "いいえ", 540, 904],
      ["result", "bottom", "end", "top"],
      ["update", "bottom", "select", "left", [[800, 1240], [130, 1240], [130, 356]]],
    ],
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function nodeMap(nodes) {
  return new Map(nodes.map(([id, type, cx, y, width, height, lines]) => [
    id,
    { id, type, cx, y, width, height, lines },
  ]));
}

function port(node, side) {
  const left = node.cx - node.width / 2;
  const right = node.cx + node.width / 2;
  const middleY = node.y + node.height / 2;
  if (side === "top") return [node.cx, node.y];
  if (side === "bottom") return [node.cx, node.y + node.height];
  if (side === "left") return [left, middleY];
  return [right, middleY];
}

function renderNode(node) {
  const { type, cx, y, width, height, lines } = node;
  const left = cx - width / 2;
  const right = cx + width / 2;
  const bottom = y + height;
  const attrs = 'style="fill:#fff;stroke:#263238;stroke-width:2px"';
  let shape;

  if (type === "terminal") {
    shape = `<rect x="${left}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" ${attrs}/>`;
  } else if (type === "decision") {
    shape = `<polygon points="${cx},${y} ${right},${y + height / 2} ${cx},${bottom} ${left},${y + height / 2}" ${attrs}/>`;
  } else if (type === "data") {
    const offset = 22;
    shape = `<polygon points="${left + offset},${y} ${right},${y} ${right - offset},${bottom} ${left},${bottom}" ${attrs}/>`;
  } else if (type === "preparation") {
    const offset = 28;
    shape = `<polygon points="${left + offset},${y} ${right - offset},${y} ${right},${y + height / 2} ${right - offset},${bottom} ${left + offset},${bottom} ${left},${y + height / 2}" ${attrs}/>`;
  } else {
    shape = `<rect x="${left}" y="${y}" width="${width}" height="${height}" ${attrs}/>`;
  }

  const lineHeight = 23;
  const firstY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2 + 6;
  const text = lines.map((line, index) => (
    `<tspan x="${cx}" y="${firstY + index * lineHeight}">${escapeXml(line)}</tspan>`
  )).join("");

  return `<g class="node">${shape}<text text-anchor="middle" fill="#111" font-family="sans-serif" font-size="17">${text}</text></g>`;
}

function renderEdge(edge, nodes) {
  const [fromId, fromSide, toId, toSide, via = [], label, labelX, labelY] = edge;
  const points = [port(nodes.get(fromId), fromSide), ...via, port(nodes.get(toId), toSide)];
  for (let index = 1; index < points.length; index += 1) {
    const [previousX, previousY] = points[index - 1];
    const [currentX, currentY] = points[index];
    if (previousX !== currentX && previousY !== currentY) {
      throw new Error(`${fromId}から${toId}への線が斜めになっています．`);
    }
  }
  const pointText = points.map(([x, y]) => `${x},${y}`).join(" ");
  const line = `<polyline points="${pointText}" style="fill:none;stroke:#263238;stroke-width:2px;stroke-linejoin:miter" marker-end="url(#arrow)"/>`;
  const labelText = label
    ? `<text x="${labelX}" y="${labelY}" fill="#111" font-family="sans-serif" font-size="17" font-weight="600" paint-order="stroke" stroke="#fff" stroke-width="5" stroke-linejoin="round">${escapeXml(label)}</text>`
    : "";
  return `<g class="edge">${line}${labelText}</g>`;
}

function renderChart(chart) {
  const nodes = nodeMap(chart.nodes);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${chart.width}" height="${chart.height}" viewBox="0 0 ${chart.width} ${chart.height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(chart.title)}</title>
  <desc id="desc">JIS X 0121に準拠したフローチャート．判断記号の「はい」は下，「いいえ」は右へ進む．</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#263238"/>
    </marker>
  </defs>
  ${chart.edges.map((edge) => renderEdge(edge, nodes)).join("\n  ")}
  ${[...nodes.values()].map(renderNode).join("\n  ")}
</svg>
`;
}

for (const chart of charts) {
  writeFileSync(join(outputDir, chart.file), renderChart(chart), "utf8");
}
