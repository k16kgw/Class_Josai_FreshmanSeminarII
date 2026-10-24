import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "contents", "figs", "5");
mkdirSync(outputDir, { recursive: true });

const charts = [
  {
    file: "flow_if_example.svg",
    title: "if文に対応するフローチャート",
    width: 780,
    height: 560,
    nodes: [
      ["start", "terminal", 300, 20, 180, 52, ["開始"]],
      ["input", "data", 300, 100, 300, 64, ["整数を受け取る"]],
      ["even", "decision", 300, 210, 260, 104, ["整数は偶数か"]],
      ["yesOutput", "data", 300, 370, 280, 64, ["「偶数」と出力する"]],
      ["yesEnd", "terminal", 300, 470, 180, 52, ["終了"]],
      ["noOutput", "data", 630, 230, 260, 64, ["「奇数」と出力する"]],
      ["noEnd", "terminal", 630, 340, 180, 52, ["終了"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "even", "top"],
      ["even", "bottom", "yesOutput", "top", [], "はい", 316, 350],
      ["even", "right", "noOutput", "left", [], "いいえ", 447, 250],
      ["yesOutput", "bottom", "yesEnd", "top"],
      ["noOutput", "bottom", "noEnd", "top"],
    ],
  },
  {
    file: "flow_for_example.svg",
    title: "for文に対応するフローチャート",
    width: 820,
    height: 660,
    nodes: [
      ["start", "terminal", 300, 20, 180, 52, ["開始"]],
      ["select", "process", 300, 110, 400, 72, ["1以上，4未満の整数から", "次の整数を取り出す"]],
      ["available", "decision", 300, 220, 260, 104, ["次の整数を", "取り出せたか"]],
      ["end", "terminal", 650, 246, 180, 52, ["終了"]],
      ["output", "data", 300, 380, 280, 64, ["その整数を出力する"]],
      ["next", "process", 300, 480, 260, 64, ["次の整数へ進む"]],
    ],
    edges: [
      ["start", "bottom", "select", "top"],
      ["select", "bottom", "available", "top"],
      ["available", "bottom", "output", "top", [], "はい", 316, 360],
      ["available", "right", "end", "left", [], "いいえ", 447, 260],
      ["output", "bottom", "next", "top"],
      ["next", "bottom", "select", "left", [[300, 620], [80, 620], [80, 146]]],
    ],
  },
  {
    file: "flow_divisor_output.svg",
    title: "約数を順番に出力する手続き",
    width: 980,
    height: 830,
    nodes: [
      ["start", "terminal", 380, 20, 180, 52, ["開始"]],
      ["input", "data", 380, 100, 320, 64, ["対象の整数を受け取る"]],
      ["init", "process", 380, 194, 300, 64, ["1を最初の割る数とする"]],
      ["select", "process", 380, 288, 300, 64, ["現在の割る数を調べる"]],
      ["range", "decision", 380, 390, 280, 104, ["割る数は", "対象の整数以下か"]],
      ["end", "terminal", 760, 416, 180, 52, ["終了"]],
      ["divide", "decision", 380, 550, 280, 104, ["対象の整数を", "余りなく割り切れるか"]],
      ["output", "data", 380, 700, 320, 64, ["その数を約数として出力する"]],
      ["next", "process", 740, 700, 260, 64, ["割る数を1増やす"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "init", "top"],
      ["init", "bottom", "select", "top"],
      ["select", "bottom", "range", "top"],
      ["range", "bottom", "divide", "top", [], "はい", 396, 528],
      ["range", "right", "end", "left", [], "いいえ", 548, 430],
      ["divide", "bottom", "output", "top", [], "はい", 396, 682],
      ["divide", "right", "next", "top", [[740, 602]], "いいえ", 548, 590],
      ["output", "right", "next", "left"],
      ["next", "bottom", "select", "left", [[740, 800], [140, 800], [140, 320]]],
    ],
  },
  {
    file: "flow_divisor_list.svg",
    title: "約数をリストに記録する手続き",
    width: 1020,
    height: 900,
    nodes: [
      ["start", "terminal", 380, 20, 180, 52, ["開始"]],
      ["input", "data", 380, 100, 320, 64, ["対象の整数を受け取る"]],
      ["prepare", "preparation", 380, 194, 340, 72, ["約数を記録する", "空の入れ物を用意する"]],
      ["select", "process", 380, 300, 300, 64, ["1から順番に割る数を選ぶ"]],
      ["range", "decision", 380, 402, 280, 104, ["割る数を", "選べたか"]],
      ["result", "data", 760, 422, 340, 64, ["記録した約数を", "結果として出す"]],
      ["end", "terminal", 760, 522, 180, 52, ["終了"]],
      ["divide", "decision", 380, 566, 280, 104, ["対象の整数を", "余りなく割り切れるか"]],
      ["record", "process", 380, 720, 320, 64, ["その数を約数として記録する"]],
      ["next", "process", 740, 720, 260, 64, ["次の割る数へ進む"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "prepare", "top"],
      ["prepare", "bottom", "select", "top"],
      ["select", "bottom", "range", "top"],
      ["range", "bottom", "divide", "top", [], "はい", 396, 546],
      ["range", "right", "result", "left", [], "いいえ", 548, 442],
      ["result", "bottom", "end", "top"],
      ["divide", "bottom", "record", "top", [], "はい", 396, 704],
      ["divide", "right", "next", "top", [[740, 618]], "いいえ", 548, 606],
      ["record", "right", "next", "left"],
      ["next", "bottom", "select", "left", [[740, 860], [120, 860], [120, 332]]],
    ],
  },
  {
    file: "flow_prime.svg",
    title: "素数を判定する手続き",
    width: 1060,
    height: 1080,
    nodes: [
      ["start", "terminal", 380, 20, 180, 52, ["開始"]],
      ["input", "data", 380, 100, 320, 64, ["対象の整数を受け取る"]],
      ["atleast", "decision", 380, 200, 280, 104, ["対象の整数は", "2以上か"]],
      ["notprime1", "data", 800, 220, 320, 64, ["素数ではないという", "結果を出す"]],
      ["end1", "terminal", 800, 318, 180, 52, ["終了"]],
      ["select", "process", 380, 356, 440, 72, ["2以上，対象の整数未満の整数から", "次の数を割る数として取り出す"]],
      ["available", "decision", 380, 460, 300, 110, ["次の割る数を", "取り出せたか"]],
      ["prime", "data", 800, 483, 320, 64, ["素数であるという", "結果を出す"]],
      ["end2", "terminal", 800, 581, 180, 52, ["終了"]],
      ["divide", "decision", 380, 630, 280, 104, ["対象の整数を", "余りなく割り切れるか"]],
      ["notprime2", "data", 380, 790, 320, 64, ["素数ではないという", "結果を出す"]],
      ["end3", "terminal", 380, 892, 180, 52, ["終了"]],
      ["next", "process", 760, 650, 260, 64, ["次の割る数へ進む"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "atleast", "top"],
      ["atleast", "bottom", "select", "top", [], "はい", 396, 342],
      ["atleast", "right", "notprime1", "left", [], "いいえ", 548, 242],
      ["notprime1", "bottom", "end1", "top"],
      ["select", "bottom", "available", "top"],
      ["available", "bottom", "divide", "top", [], "はい", 396, 612],
      ["available", "right", "prime", "left", [], "いいえ", 558, 502],
      ["prime", "bottom", "end2", "top"],
      ["divide", "bottom", "notprime2", "top", [], "はい", 396, 772],
      ["divide", "right", "next", "left", [], "いいえ", 548, 672],
      ["notprime2", "bottom", "end3", "top"],
      ["next", "bottom", "select", "left", [[760, 1010], [120, 1010], [120, 392]]],
    ],
  },
  {
    file: "flow_prime_sqrt.svg",
    title: "平方根まで調べる素数判定の手続き",
    width: 1080,
    height: 1160,
    nodes: [
      ["start", "terminal", 380, 20, 180, 52, ["開始"]],
      ["input", "data", 380, 100, 320, 64, ["対象の整数を受け取る"]],
      ["atleast", "decision", 380, 200, 280, 104, ["対象の整数は", "2以上か"]],
      ["notprime1", "data", 820, 220, 320, 64, ["素数ではないという", "結果を出す"]],
      ["end1", "terminal", 820, 318, 180, 52, ["終了"]],
      ["limit", "process", 380, 356, 340, 72, ["調べる範囲を", "平方根までとする"]],
      ["select", "process", 380, 458, 460, 72, ["2以上，対象の整数の平方根以下の整数から", "次の数を割る数として取り出す"]],
      ["available", "decision", 380, 562, 300, 110, ["次の割る数を", "取り出せたか"]],
      ["prime", "data", 820, 585, 320, 64, ["素数であるという", "結果を出す"]],
      ["end2", "terminal", 820, 683, 180, 52, ["終了"]],
      ["divide", "decision", 380, 732, 280, 104, ["対象の整数を", "余りなく割り切れるか"]],
      ["notprime2", "data", 380, 892, 320, 64, ["素数ではないという", "結果を出す"]],
      ["end3", "terminal", 380, 994, 180, 52, ["終了"]],
      ["next", "process", 780, 752, 260, 64, ["次の割る数へ進む"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "atleast", "top"],
      ["atleast", "bottom", "limit", "top", [], "はい", 396, 338],
      ["atleast", "right", "notprime1", "left", [], "いいえ", 548, 242],
      ["notprime1", "bottom", "end1", "top"],
      ["limit", "bottom", "select", "top"],
      ["select", "bottom", "available", "top"],
      ["available", "bottom", "divide", "top", [], "はい", 396, 714],
      ["available", "right", "prime", "left", [], "いいえ", 558, 604],
      ["prime", "bottom", "end2", "top"],
      ["divide", "bottom", "notprime2", "top", [], "はい", 396, 874],
      ["divide", "right", "next", "left", [], "いいえ", 548, 774],
      ["notprime2", "bottom", "end3", "top"],
      ["next", "bottom", "select", "left", [[780, 1090], [100, 1090], [100, 494]]],
    ],
  },
  {
    file: "flow_sieve.svg",
    title: "エラトステネスの篩の手続き",
    width: 1040,
    height: 850,
    nodes: [
      ["start", "terminal", 380, 20, 180, 52, ["開始"]],
      ["input", "data", 380, 100, 340, 64, ["求める範囲の上限を受け取る"]],
      ["candidates", "process", 380, 196, 360, 72, ["上限までの整数を", "素数の候補として並べる"]],
      ["remove01", "process", 380, 300, 300, 64, ["0と1を候補から外す"]],
      ["select", "process", 380, 396, 360, 72, ["候補に残る数から", "小さい順に次の数を選ぶ"]],
      ["square", "decision", 380, 512, 280, 104, ["選んだ数の2乗は", "上限以下か"]],
      ["result", "data", 800, 532, 340, 64, ["候補に残った数を", "結果として出す"]],
      ["end", "terminal", 800, 632, 180, 52, ["終了"]],
      ["remove", "process", 380, 672, 360, 72, ["選んだ数を残し", "その倍数を候補から外す"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "candidates", "top"],
      ["candidates", "bottom", "remove01", "top"],
      ["remove01", "bottom", "select", "top"],
      ["select", "bottom", "square", "top"],
      ["square", "bottom", "remove", "top", [], "はい", 396, 654],
      ["square", "right", "result", "left", [], "いいえ", 548, 554],
      ["result", "bottom", "end", "top"],
      ["remove", "bottom", "select", "left", [[380, 808], [100, 808], [100, 432]]],
    ],
  },
  {
    file: "flow_factorization.svg",
    title: "素因数分解の手続き",
    width: 1240,
    height: 1120,
    nodes: [
      ["start", "terminal", 380, 20, 180, 52, ["開始"]],
      ["input", "data", 380, 100, 350, 64, ["素因数分解する整数を受け取る"]],
      ["select", "process", 380, 196, 320, 64, ["2から順番に割る数を選ぶ"]],
      ["square", "decision", 380, 300, 300, 110, ["割る数の2乗は", "残りの整数以下か"]],
      ["remaining", "decision", 810, 303, 280, 104, ["1より大きい整数が", "残っているか"]],
      ["last", "process", 810, 460, 340, 72, ["残った整数を", "最後の素因数として記録する"]],
      ["result", "data", 1060, 590, 300, 72, ["記録した素因数を", "結果として出す"]],
      ["end", "terminal", 1060, 702, 180, 52, ["終了"]],
      ["try", "process", 380, 474, 320, 64, ["現在の割る数で割り算を試す"]],
      ["remainder", "decision", 380, 578, 280, 104, ["余りは0か"]],
      ["record", "process", 380, 742, 360, 76, ["割った数を素因数として記録し", "商を新しい残りの整数とする"]],
      ["next", "process", 760, 598, 280, 64, ["次の割る数へ進む"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "select", "top"],
      ["select", "bottom", "square", "top"],
      ["square", "bottom", "try", "top", [], "はい", 396, 456],
      ["square", "right", "remaining", "left", [], "いいえ", 558, 352],
      ["remaining", "bottom", "last", "top", [], "はい", 826, 442],
      ["remaining", "right", "result", "top", [[1060, 355]], "いいえ", 970, 342],
      ["last", "bottom", "result", "left", [[810, 626]], null],
      ["result", "bottom", "end", "top"],
      ["try", "bottom", "remainder", "top"],
      ["remainder", "bottom", "record", "top", [], "はい", 396, 724],
      ["remainder", "right", "next", "left", [], "いいえ", 548, 620],
      ["record", "bottom", "try", "left", [[380, 940], [110, 940], [110, 506]]],
      ["next", "bottom", "select", "left", [[760, 1020], [80, 1020], [80, 228]]],
    ],
  },
  {
    file: "flow_gcd.svg",
    title: "ユークリッドの互除法の手続き",
    width: 760,
    height: 780,
    nodes: [
      ["start", "terminal", 300, 20, 180, 52, ["開始"]],
      ["input", "data", 300, 100, 320, 64, ["二つの正の整数を受け取る"]],
      ["divide", "process", 300, 204, 340, 72, ["一方の整数を", "もう一方の整数で割る"]],
      ["zero", "decision", 300, 320, 260, 104, ["余りは0か"]],
      ["gcd", "process", 300, 480, 300, 64, ["割る数を最大公約数とする"]],
      ["result", "data", 300, 580, 320, 64, ["最大公約数を結果として出す"]],
      ["end", "terminal", 300, 680, 180, 52, ["終了"]],
      ["update", "process", 620, 324, 260, 96, ["直前の割る数を", "割られる数にし", "余りを新しい割る数にする"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "divide", "top"],
      ["divide", "bottom", "zero", "top"],
      ["zero", "bottom", "gcd", "top", [], "はい", 316, 462],
      ["zero", "right", "update", "left", [], "いいえ", 437, 362],
      ["gcd", "bottom", "result", "top"],
      ["result", "bottom", "end", "top"],
      ["update", "bottom", "divide", "left", [[620, 750], [50, 750], [50, 240]]],
    ],
  },
  {
    file: "flow_lcm.svg",
    title: "最小公倍数を求める手続き",
    width: 760,
    height: 690,
    nodes: [
      ["start", "terminal", 380, 20, 180, 52, ["開始"]],
      ["input", "data", 380, 100, 320, 64, ["二つの正の整数を受け取る"]],
      ["product", "process", 380, 200, 300, 64, ["二つの整数の積を求める"]],
      ["gcd", "process", 380, 300, 340, 72, ["二つの整数の", "最大公約数を求める"]],
      ["divide", "process", 380, 410, 360, 72, ["積を最大公約数で割り", "最小公倍数を求める"]],
      ["result", "data", 380, 520, 340, 64, ["最小公倍数を結果として出す"]],
      ["end", "terminal", 380, 610, 180, 52, ["終了"]],
    ],
    edges: [
      ["start", "bottom", "input", "top"],
      ["input", "bottom", "product", "top"],
      ["product", "bottom", "gcd", "top"],
      ["gcd", "bottom", "divide", "top"],
      ["divide", "bottom", "result", "top"],
      ["result", "bottom", "end", "top"],
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
  const shapeAttributes = 'style="fill:#fff;stroke:#263238;stroke-width:2px"';
  let shape;

  if (type === "terminal") {
    shape = `<rect x="${left}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" ${shapeAttributes}/>`;
  } else if (type === "decision") {
    shape = `<polygon points="${cx},${y} ${right},${y + height / 2} ${cx},${bottom} ${left},${y + height / 2}" ${shapeAttributes}/>`;
  } else if (type === "data") {
    const offset = 22;
    shape = `<polygon points="${left + offset},${y} ${right},${y} ${right - offset},${bottom} ${left},${bottom}" ${shapeAttributes}/>`;
  } else if (type === "preparation") {
    const offset = 28;
    shape = `<polygon points="${left + offset},${y} ${right - offset},${y} ${right},${y + height / 2} ${right - offset},${bottom} ${left + offset},${bottom} ${left},${y + height / 2}" ${shapeAttributes}/>`;
  } else {
    shape = `<rect x="${left}" y="${y}" width="${width}" height="${height}" ${shapeAttributes}/>`;
    if (type === "predefined") {
      shape += `<line x1="${left + 18}" y1="${y}" x2="${left + 18}" y2="${bottom}" style="stroke:#263238;stroke-width:2px"/><line x1="${right - 18}" y1="${y}" x2="${right - 18}" y2="${bottom}" style="stroke:#263238;stroke-width:2px"/>`;
    }
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
  const edgeLine = `<polyline points="${pointText}" style="fill:none;stroke:#263238;stroke-width:2px;stroke-linejoin:miter" marker-end="url(#arrow)"/>`;
  const edgeLabel = label
    ? `<text class="edge-label" x="${labelX}" y="${labelY}" fill="#111" font-family="sans-serif" font-size="17" font-weight="600" paint-order="stroke" stroke="#fff" stroke-width="5" stroke-linejoin="round">${escapeXml(label)}</text>`
    : "";
  return `<g class="edge">${edgeLine}${edgeLabel}</g>`;
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
