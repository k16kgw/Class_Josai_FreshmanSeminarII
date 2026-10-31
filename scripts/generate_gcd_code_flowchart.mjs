import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "contents", "figs", "6");
const outputPath = join(outputDir, "gcd_code_flowchart.svg");
mkdirSync(outputDir, { recursive: true });

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1020" viewBox="0 0 1100 1020" role="img" aria-labelledby="title desc">
  <title id="title">ユークリッドの互除法のコードとフローチャートの対応</title>
  <desc id="desc">関数定義，while文，多重代入，return文を対応するフローチャート記号の中に重ねて表示した図．判断記号の「はい」は下，「いいえ」は右へ進む．</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#263238"/>
    </marker>
    <style>
      .shape { fill: #fff; stroke: #263238; stroke-width: 3; }
      .flow { fill: none; stroke: #263238; stroke-width: 3; stroke-linejoin: miter; marker-end: url(#arrow); }
      .role { fill: #37474f; font-family: sans-serif; font-size: 19px; font-weight: 600; text-anchor: middle; }
      .code { fill: #0b57a4; font-family: Menlo, Monaco, monospace; font-size: 23px; font-weight: 600; text-anchor: middle; }
      .branch { fill: #111; font-family: sans-serif; font-size: 20px; font-weight: 700; paint-order: stroke; stroke: #fff; stroke-width: 6; stroke-linejoin: round; }
      .line-number { fill: #fff; font-family: sans-serif; font-size: 15px; font-weight: 700; text-anchor: middle; dominant-baseline: central; }
      .call-label { fill: #455a64; font-family: sans-serif; font-size: 18px; font-weight: 600; }
      .call-code { fill: #0b57a4; font-family: Menlo, Monaco, monospace; font-size: 22px; font-weight: 600; }
    </style>
  </defs>

  <text x="550" y="38" fill="#263238" font-family="sans-serif" font-size="24" font-weight="700" text-anchor="middle">ユークリッドの互除法：コードと処理の対応</text>
  <text x="550" y="70" fill="#607d8b" font-family="sans-serif" font-size="16" text-anchor="middle">青字は，その記号に対応するPythonコードを表す</text>

  <!-- Flow lines -->
  <polyline class="flow" points="360,190 360,280"/>
  <polyline class="flow" points="360,460 360,570"/>
  <polyline class="flow" points="360,690 360,800 90,800 90,370 160,370"/>
  <polyline class="flow" points="560,370 640,370"/>
  <polyline class="flow" points="840,425 840,550"/>

  <text class="branch" x="382" y="535">はい</text>
  <text class="branch" x="574" y="352">いいえ</text>

  <!-- Start / function definition -->
  <rect class="shape" x="130" y="100" width="460" height="90" rx="45"/>
  <circle cx="157" cy="127" r="18" fill="#0b57a4"/>
  <text class="line-number" x="157" y="127">1</text>
  <text class="role" x="360" y="134">関数を定義し，処理を開始する</text>
  <text class="code" x="360" y="166">def gcd(a, b):</text>

  <!-- Decision / while -->
  <polygon class="shape" points="360,280 560,370 360,460 160,370"/>
  <circle cx="228" cy="326" r="18" fill="#0b57a4"/>
  <text class="line-number" x="228" y="326">2</text>
  <text class="role" x="360" y="353">bは0でないか</text>
  <text class="code" x="360" y="392">while b != 0:</text>

  <!-- Process / simultaneous assignment -->
  <rect class="shape" x="135" y="570" width="450" height="120"/>
  <circle cx="162" cy="597" r="18" fill="#0b57a4"/>
  <text class="line-number" x="162" y="597">3</text>
  <text class="role" x="360" y="618">aとbを同時に更新する</text>
  <text class="code" x="360" y="658">a, b = b, a % b</text>

  <!-- Output / return -->
  <polygon class="shape" points="666,315 1040,315 1014,425 640,425"/>
  <circle cx="694" cy="342" r="18" fill="#0b57a4"/>
  <text class="line-number" x="694" y="342">5</text>
  <text class="role" x="840" y="356">最大公約数を呼び出し元へ返す</text>
  <text class="code" x="840" y="396">return a</text>

  <!-- End -->
  <rect class="shape" x="720" y="550" width="240" height="80" rx="40"/>
  <text class="role" x="840" y="598">関数の終了</text>

  <!-- Caller shown outside the function flow -->
  <rect x="170" y="860" width="760" height="115" rx="10" fill="#f4f8fb" stroke="#90a4ae" stroke-width="2" stroke-dasharray="8 7"/>
  <circle cx="205" cy="895" r="18" fill="#0b57a4"/>
  <text class="line-number" x="205" y="895">7</text>
  <text class="call-label" x="240" y="902">関数の外側から呼び出し，戻り値を表示する</text>
  <text class="call-code" x="240" y="946">print(gcd(48, 18))</text>
  <text x="760" y="946" fill="#263238" font-family="sans-serif" font-size="20" font-weight="700">出力：6</text>
</svg>
`;

writeFileSync(outputPath, svg, "utf8");
