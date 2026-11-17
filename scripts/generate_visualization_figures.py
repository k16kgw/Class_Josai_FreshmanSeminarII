"""Generate lecture 9 figures by executing the examples and answer code."""
from contextlib import redirect_stdout
from io import StringIO
import os
from pathlib import Path
import re
import tempfile

os.environ.setdefault("MPLBACKEND", "Agg")
os.environ.setdefault("MPLCONFIGDIR", "/tmp/class-visualization-matplotlib")

import matplotlib
import matplotlib.pyplot as plt
from cycler import cycler

ROOT = Path(__file__).resolve().parents[1]
SOURCE = (ROOT / "contents/9_visualization.md").read_text()
OUTPUT = ROOT / "contents/figs/9"
OUTPUT.mkdir(parents=True, exist_ok=True)

matplotlib.rcParams.update({
    "figure.figsize": (7.2, 4.6),
    "figure.constrained_layout.use": True,
    "font.size": 12,
    "axes.titlesize": 14,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.prop_cycle": cycler(color=["#2563a6", "#d97706", "#16816a", "#8b5fbf"]),
    "grid.alpha": 0.3,
    "svg.fonttype": "none",
    "svg.hashsalt": "freshman-seminar-ii-lecture-9",
})

namespace = {"__name__": "__main__"}
pending = []
generated = []

def section(start, end):
    return SOURCE.split(start, 1)[1].split(end, 1)[0]


def blocks(text):
    return re.findall(r"^```python\n(.*?)^```$", text, re.M | re.S)


def answer(start, end):
    return blocks(section(start, end).split("````{hidden-answer}", 1)[1])


def save_figures():
    for number in plt.get_fignums():
        if not pending:
            raise RuntimeError("An example produced an unexpected figure")
        name = pending.pop(0)
        fig = plt.figure(number)
        fig.savefig(OUTPUT / f"{name}.svg", metadata={"Date": None})
        preview = Path("/tmp/class-visualization-previews")
        preview.mkdir(exist_ok=True)
        fig.savefig(preview / f"{name}.png", dpi=130)
        generated.append(name)
        plt.close(fig)


def run(code_blocks, names=()):
    pending.extend(names)
    for code in code_blocks:
        with redirect_stdout(StringIO()):
            exec(compile(code, "lecture-9-example", "exec"), namespace)
    if pending:
        raise RuntimeError(f"Figures were not produced: {pending}")


plt.show = save_figures
original_dir = Path.cwd()
try:
    with tempfile.TemporaryDirectory(prefix="class-visualization-data-") as task_dir:
        os.chdir(task_dir)
        run(blocks(section("````{dropdown} CSVが手元にない場合", "## グラフの選択")))
        assert Path("monte_carlo.csv").is_file()
        run(blocks(section("### 図と描画領域を作る", "### グラフの意味を伝える表示")), ["basic_plot"])
        run(answer("````{note} 演習1", "## 散布図"), ["exercise1_cubic"])
        assert namespace["y"] == [-27, -8, -1, 0, 1, 8, 27]
        run(blocks(section("## 散布図", "````{note} 演習2")), ["scatter_plot"])
        run(answer("````{note} 演習2", "## 棒グラフとヒストグラム"), ["exercise2_height_step"])
        run(blocks(section("### 棒グラフ：項目ごとの大きさを比べる", "````{note} 演習3")), ["bar_plot"])
        run(answer("````{note} 演習3", "### ヒストグラム："), ["exercise3_dice"])
        assert len(namespace["counts"]) == 6 and sum(namespace["counts"]) == 1000
        print("Exercise 3 counts:", namespace["counts"])
        run(blocks(section("### ヒストグラム：値の集まり方を調べる", "````{note} 演習4")), ["histogram"])
        run(answer("````{note} 演習4", "## 複数のデータと対数目盛"), ["exercise4_bins10", "exercise4_bins30"])
        assert len(namespace["data"]) == 1000
        run(blocks(section("### 同じ軸に複数の線を描く", "### 桁の異なる値を対数目盛で比べる")), ["multiple_series"])
        run(blocks(section("### 計算結果を数値のリストへ読み込む", "### 通常の目盛と対数目盛を比較する")))
        assert namespace["trials_values"] == [1000, 3000, 10000, 30000]
        run(blocks(section("### 通常の目盛と対数目盛を比較する", "````{note} 演習5")), ["error_linear", "error_log"])
        run(answer("````{note} 演習5", "### グラフを画像ファイルへ保存する"), ["exercise5_error"])
        errors = namespace["errors"]
        assert errors[2] == min(errors) and errors[3] > errors[2] > 0
        run(blocks(section("(assignment-9-1-answer)=", "````{warning} 課題2")), ["assignment1_dice12"])
        assert namespace["counts"] == [415, 448, 410, 381, 443, 432, 420, 429, 430, 383, 400, 409]
        assert Path("dice12_counts.png").is_file()
        run(blocks(section("(assignment-9-2-answer)=", "````{note} 発展的課題")), ["assignment2_values", "assignment2_errors"])
        assert Path("integral_values.png").is_file() and Path("integral_errors.png").is_file()
        run(blocks(section("(assignment-9-advanced-answer)=", "### 提出方法")), ["advanced_comparison"])
        assert len(namespace["monte_carlo_values"]) == 3
        assert len(namespace["ax"].lines) == 4
        assert namespace["ax"].get_xscale() == namespace["ax"].get_yscale() == "log"
        assert Path("integration_comparison.png").is_file()
finally:
    os.chdir(original_dir)

references = set(re.findall(r"\./figs/9/([^\)]+)\.svg", SOURCE))
assert references == set(generated), (references - set(generated), set(generated) - references)
print(f"Generated {len(generated)} figures from executable lecture code.")
print("All exercises and assignments executed; CSV, dice counts, graph data and saved files verified.")
