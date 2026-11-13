import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// 講義用の模式図．実画面のスクリーンショットではない．
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "contents", "figs", "8");
mkdirSync(outputDir, { recursive: true });
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const text = (x, y, value, cls = "") => `<text x="${x}" y="${y}" class="${cls}">${escape(value)}</text>`;
const rect = (x, y, w, h, fill = "#fff", stroke = "#d4dbe5") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}"/>`;
const badge = (x, y, n) => `<circle cx="${x}" cy="${y}" r="17" fill="#b45309"/>${text(x - 6, y + 7, n, "number")}`;
const highlight = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="#b45309" stroke-width="3"/>`;
const note = (y, n, lines) => badge(815, y - 7, n) + lines.map((line, i) => text(845, y + i * 31, line)).join("");
const arrow = (x1, y1, x2, y2) => `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="#b45309" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`;

function save(name, title, desc, body, height = 600) {
  writeFileSync(join(outputDir, name), `<svg xmlns="http://www.w3.org/2000/svg" width="1160" height="${height}" viewBox="0 0 1160 ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escape(title)}</title>
  <desc id="desc">${escape(desc)}</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#b45309"/></marker>
    <style>
      text { font-family: "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif; font-size: 22px; fill: #1e293b; }
      .title { font-size: 30px; font-weight: 700; }
      .small { font-size: 18px; fill: #475569; }
      .code { font-family: Menlo, Consolas, monospace; font-size: 21px; }
      .number { font-size: 21px; font-weight: 700; fill: #fff; }
      .bold { font-weight: 700; }
    </style>
  </defs>
  <rect width="1160" height="${height}" fill="#fff"/>
  ${text(30, 48, title, "title")}
  ${body}
  ${text(30, height - 20, "操作説明用の模式図（実画面の表示・配置は異なる場合がある）", "small")}
</svg>\n`, "utf8");
}

function notebook(name = "第8回_学籍番号_氏名.ipynb") {
  return rect(30, 85, 740, 450, "#f8fafc")
    + text(52, 124, "Colab", "bold") + text(143, 124, name)
    + text(52, 165, "ファイル　編集　表示　挿入　ランタイム", "small")
    + `<line x1="30" y1="185" x2="770" y2="185" stroke="#d4dbe5"/>`
    + text(70, 220, "＋ コード") + text(235, 220, "＋ テキスト")
    + rect(624, 195, 125, 38) + text(643, 221, "接続", "small");
}

save("colab_new_notebook.svg", "① ログインしてノートブックを作る",
  "大学のアカウントを確認し，ノートブックを開く画面のノートブックを新規作成を選ぶ．",
  rect(30, 85, 740, 450, "#f8fafc")
  + text(55, 125, "Google Colab", "bold")
  + `<circle cx="714" cy="116" r="19" fill="#dbeafe"/>` + text(704, 124, "A", "small")
  + highlight(684, 89, 59, 55) + badge(666, 113, 1)
  + rect(80, 175, 640, 310)
  + text(110, 218, "ノートブックを開く", "bold")
  + text(110, 265, "最近使用したノートブック", "small")
  + text(110, 312, "Google ドライブ　 GitHub　 アップロード", "small")
  + rect(380, 405, 310, 50, "#eff6ff", "#93c5fd")
  + text(403, 438, "ノートブックを新規作成")
  + highlight(380, 405, 310, 50) + badge(356, 431, 2)
  + note(125, 1, ["右上のアイコンで", "大学のアカウントを", "確認する"])
  + note(330, 2, ["新規作成を選ぶ", "画面が違う場合は", "「ファイル」から", "新規作成できる"]));

save("colab_rename.svg", "② 第８回用のファイル名に変更する",
  "画面左上のUntitled0.ipynbをクリックし，自分の学籍番号と氏名を含む名前に変更する．",
  notebook("Untitled0.ipynb")
  + highlight(136, 95, 245, 43) + badge(411, 116, 1)
  + arrow(290, 147, 290, 286)
  + rect(70, 305, 660, 125, "#fff7ed", "#b45309")
  + text(93, 344, "変更後の名前", "small")
  + text(93, 389, "第8回_123456_城西太郎.ipynb", "bold")
  + note(125, 1, ["左上の名前を", "クリックして入力", "Enterで確定する"])
  + text(800, 333, "学籍番号と氏名は")
  + text(800, 366, "自分のものに変える")
  + text(800, 445, "拡張子は .ipynb", "bold"));

save("colab_cells.svg", "③ コードを実行し，テキストで説明を書く",
  "コードセルにprint(1+2)を入力し左の実行ボタンで3を表示する．プラステキストから見出しや考察を書くセルを追加できる．",
  notebook()
  + highlight(228, 192, 143, 40) + badge(399, 211, 3)
  + rect(62, 260, 679, 90, "#fff")
  + `<circle cx="96" cy="298" r="19" fill="#334155"/><path d="M 91 287 L 107 298 L 91 309 z" fill="#fff"/>`
  + text(143, 305, "print(1 + 2)", "code") + badge(355, 297, 1)
  + highlight(73, 275, 46, 46) + badge(96, 248, 2)
  + text(143, 388, "3", "code")
  + rect(62, 419, 679, 83, "#fff")
  + text(85, 451, "# 第8回　数値計算3", "code")
  + text(85, 484, "学籍番号：123456　氏名：城西太郎", "small")
  + note(125, 1, ["コードを入力する"])
  + note(240, 2, ["▶ または", "Shift + Enterで実行", "下に 3 が出れば成功"])
  + note(405, 3, ["「＋ テキスト」で", "見出しや考察を書く"]));

save("colab_download_notebook.svg", "④ Notebookをパソコンへダウンロードする",
  "ファイル，ダウンロード，ipynbをダウンロードの順にメニューを選び，提出用のNotebookを保存する．",
  notebook()
  + highlight(43, 143, 90, 35) + badge(46, 124, 1)
  + rect(43, 184, 340, 271)
  + text(64, 223, "ノートブックを新規作成", "small")
  + text(64, 266, "ノートブックを開く", "small")
  + text(64, 309, "保存", "small")
  + rect(50, 340, 325, 48, "#fff7ed", "#b45309")
  + text(65, 372, "ダウンロード　　　　 ▸") + badge(350, 407, 2)
  + rect(385, 340, 370, 110)
  + text(400, 374, ".ipynb をダウンロード")
  + text(400, 421, ".py をダウンロード", "small")
  + highlight(390, 345, 360, 44) + badge(710, 316, 3)
  + note(125, 1, ["「ファイル」を開く"])
  + note(240, 2, ["「ダウンロード」を", "選ぶ"])
  + note(375, 3, [".ipynb を選ぶ", "保存先はパソコンの", "ダウンロードフォルダ", "などを確認する"]));

save("colab_download_csv.svg", "⑤ 計算で作ったCSVもダウンロードする",
  "左のフォルダアイコンからファイル一覧を開き，monte_carlo.csvのメニューでダウンロードを選ぶ．",
  notebook()
  + rect(40, 241, 42, 283, "#eef2f6")
  + `<path d="M 48 284 h 12 l 5 6 h 10 v 20 H 48 z" fill="#64748b"/>`
  + highlight(43, 277, 36, 39) + badge(61, 256, 1)
  + rect(88, 241, 470, 283)
  + text(107, 281, "ファイル", "bold")
  + text(109, 331, "↻　一覧を更新", "small")
  + text(109, 380, "sample_data", "small")
  + text(109, 426, "monte_carlo.csv", "code")
  + text(516, 426, "⋮", "bold")
  + highlight(502, 397, 44, 40) + badge(574, 418, 2)
  + rect(320, 450, 300, 57, "#fff7ed", "#b45309")
  + text(342, 486, "ダウンロード")
  + note(125, 1, ["左のフォルダを開く"])
  + note(240, 2, ["CSVの右の ⋮ から", "ダウンロードを選ぶ"])
  + text(800, 379, "ファイルがなければ")
  + text(800, 412, "課題２の保存セルを")
  + text(800, 445, "実行し，一覧を更新"));

// 円周率推定に使う点は，ビルドのたびに変化しないよう決定的に生成する．
let state = 10;
const random = () => { state = (1664525 * state + 1013904223) >>> 0; return state / 2 ** 32; };
let points = "";
for (let i = 0; i < 160; i += 1) {
  const x = random();
  const y = random();
  points += `<circle cx="${100 + 390 * x}" cy="${495 - 390 * y}" r="4" fill="${x * x + y * y <= 1 ? "#2563a6" : "#c2410c"}"/>`;
}
save("monte_carlo_pi.svg", "点の割合から円周率を推定する",
  "一辺1の正方形にランダムな点を置く．原点からの距離が1以下の点は4分の1円の内部にあり，その割合は円周率を4で割った値に近づく．",
  `<rect x="100" y="105" width="390" height="390" fill="#fff7ed" stroke="#334155" stroke-width="2"/>
  <path d="M 100 495 L 100 105 A 390 390 0 0 1 490 495 Z" fill="#eff6ff"/>
  <path d="M 100 105 A 390 390 0 0 1 490 495" fill="none" stroke="#2563a6" stroke-width="3"/>
  ${points}
  <path d="M 80 495 H 515 M 100 515 V 80" fill="none" stroke="#334155" stroke-width="2"/>
  ${text(75, 525, "0")}${text(484, 525, "1")}${text(70, 112, "1")}${text(518, 505, "x")}${text(91, 75, "y")}
  ${text(560, 155, "正方形の面積：1 × 1 = 1", "bold")}
  ${text(560, 209, "４分の１円の面積：π / 4", "bold")}
  ${text(560, 279, "青：x² + y² ≤ 1（円の内側）")}
  ${text(560, 322, "橙：x² + y² > 1（円の外側）")}
  ${rect(540, 365, 580, 126, "#f0fdf4", "#86b398")}
  ${text(565, 410, "内側の点の数 / 全体の点の数 ≈ π / 4")}
  ${text(565, 459, "π ≈ 4 × inside / trials", "bold")}`);

console.log("Colabの操作図5枚と円周率推定の図を生成しました．");
