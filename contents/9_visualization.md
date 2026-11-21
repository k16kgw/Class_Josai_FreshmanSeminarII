# 第9回　可視化

### 到達目標

- **グラフの選択**：確認したい内容に応じて折れ線グラフ，散布図，棒グラフ，ヒストグラムを選択できる．
- **Matplotlibの基本操作**：データをグラフとして表示し，軸ラベル，タイトル，凡例，グリッドを設定できる．
- **データの比較**：複数のデータを同じ座標上に表示し，対数目盛を使って桁の異なる値を比較できる．
- **グラフの解釈**：グラフから読み取れる傾向を軸が表す量や数値を根拠として説明できる．

### 前回の復習

第8回ではGoogle Colabで乱数とモンテカルロ法を扱った．次のコードはモンテカルロ積分で$\int_0^\pi \sin x\,dx$を近似する．

```python
import math
import random

def monte_carlo_integral(f, a, b, trials):
    total = 0

    for _ in range(trials):
        x = random.uniform(a, b)
        total = total + f(x)

    return (b - a) * total / trials

def f(x):
    return math.sin(x)

random.seed(2026)
value = monte_carlo_integral(f, 0, math.pi, 1000)
error = abs(value - 2)

print(f"{value:.12f}")
print(f"{error:.12f}")
```

````{dropdown} コードの補足
- `monte_carlo_integral`は区間$[a,b]$から`trials`個の点を一様に選び，関数値の標本平均へ区間の幅を掛けて定積分を近似する．
- $\int_0^\pi \sin x\,dx=2$であるため，`abs(value - 2)`は近似値の絶対誤差を表す．
- 同じシードと同じ実行順序を使うと，同じ疑似乱数列から同じ結果を再現できる．
````

````{dropdown} 出力例
```text
2.044193081754
0.044193081754
```
````

数値の一覧だけでも計算結果は確認できる．今回は**数値をグラフへ変換し，変化，関係，分布，項目間の差を読み取る**．

## Jupyter Notebookの準備

### 第8回課題の解説

1. [課題1「12面体サイコロのシミュレーション」](./8_numerical3_colab.md#assignment-8-1)
2. [課題2「モンテカルロ積分とCSVファイルへの保存」](./8_numerical3_colab.md#assignment-8-2)

### Notebookの作成

1. Anaconda NavigatorからJupyter Notebookを起動する．
2. `Documents（書類）/Fresh2`フォルダを開く．
3. Python 3のNotebookを新規作成する．
4. ファイル名を`第9回_<学籍番号>_<氏名>.ipynb`へ変更する．
5. Markdownセルを追加し，`# 第9回　可視化`，学籍番号，氏名を記入する．

### 日本語表示の準備

Matplotlibのグラフへ日本語を表示するため，最初のCodeセルで次を実行する．

```python
%pip install matplotlib-fontja

import matplotlib.pyplot as plt
import matplotlib_fontja
```

````{dropdown} コードの補足
- `%pip install matplotlib-fontja`は現在使用しているJupyter NotebookのPython環境へ日本語表示用のライブラリをインストールする命令である．インストールは初回のみ必要である．
- `matplotlib.pyplot`はグラフを作成する機能をまとめたモジュールである．この講義では`plt`という短い名前で使用する．
- `matplotlib_fontja`を読み込むと，日本語を表示できるフォントがMatplotlibへ設定される．
````

```{tip} 注意：カーネルを再起動した場合
Jupyter Notebookのカーネルを再起動すると，読み込んだモジュール，変数，関数の状態は失われる．再起動後はimportを含むセルから順に実行する．
```

### CSVファイルの配置

第8回にダウンロードした`monte_carlo.csv`は次の手順でNotebookと同じフォルダへ配置する．

1. Finderで`monte_carlo.csv`を保存したフォルダを開く．
2. `monte_carlo.csv`を`Documents（書類）/Fresh2`フォルダへ移動する．
3. Jupyter Notebookのファイル一覧に`monte_carlo.csv`が表示されたことを確認する．

```{tip} 注意：CSVファイルの保存場所
`open("monte_carlo.csv", ...)`はNotebookと同じフォルダにあるCSVファイルを読み込む．NotebookとCSVファイルの保存場所が異なると，ファイルを見つけられない．
```

## 可視化とグラフの選択

**可視化**：データをグラフや図で表し，数値の変化，関係，分布，項目間の差を読み取りやすくすること．

グラフを選ぶときは最初に**何を確認するのか**を決める．次に横軸と縦軸が表す量を決める．

| 確認したい内容 | 適したグラフ | 例 |
| --- | --- | --- |
| 時間や順序に伴う値の変化 | 折れ線グラフ | 試行回数に対する誤差の変化 |
| 二つの数値の関係 | 散布図 | 身長と歩幅の関係 |
| 項目ごとの値の比較 | 棒グラフ | サイコロの各出目の回数 |
| 数値データの分布 | ヒストグラム | テスト得点の分布 |

- **折れ線グラフ**：順序をもつ点を線で結び，値の変化を表すグラフ．
- **散布図**：二つの数値を横軸と縦軸に取り，各データを点で表すグラフ．
- **棒グラフ**：項目ごとの値を棒の長さで表し，項目間の大きさを比較するグラフ．
- **ヒストグラム**：数値データをいくつかの区間に分け，各区間に入るデータの個数を表すグラフ．

```{tip} 注意：棒グラフとヒストグラムの違い
棒グラフの横軸はサイコロの出目や商品名のような**項目**を表す．ヒストグラムの横軸は身長や得点のような**数値の区間**を表す．見た目が似ていても，表す内容は異なる．
```

## Matplotlibの基本

**Matplotlib**：Pythonでグラフを作成するためのライブラリ．
**Matplotlib**：Pythonでグラフを作成するためのライブラリ．

次のコードは$y=x^2$の折れ線グラフを作成する．

```python
x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

fig, ax = plt.subplots()
ax.plot(x, y, marker="o", label="$y=x^2$")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("二乗の値")
ax.legend()
ax.grid()
plt.show()
```

````{dropdown} コードの補足
- `plt.subplots()`は図全体を表す`fig`と，グラフを描く領域を表す`ax`を作成する．
- `ax.plot(x, y)`は`x`と`y`の対応する値を点として置き，順番に線で結ぶ．`marker="o"`は各点を丸印で示す指定である．
- `label`で線の説明を設定し，`ax.legend()`で凡例を表示する．
- `ax.set_xlabel`，`ax.set_ylabel`，`ax.set_title`はそれぞれ横軸ラベル，縦軸ラベル，タイトルを設定する．
- `ax.grid()`は値を読み取りやすくするためのグリッドを表示する．`plt.show()`は完成した図を表示する．
````

![xとxの二乗の関係を表す折れ線グラフ](./figs/9/line_square.png)

````{note} 演習1
$-3\leq x\leq3$における$y=x^3$の折れ線グラフを作成せよ．次の`____`を埋め，軸ラベル，タイトル，グリッドを表示せよ．

```python
x = [-3, -2, -1, 0, 1, 2, 3]
y = []

for value in x:
    y.append(____)

fig, ax = plt.subplots()
ax.plot(____)
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("三乗の値")
ax.grid()
plt.show()
```

**出力例**

![xとxの三乗の関係を表す折れ線グラフ](./figs/9/exercise1_cubic.png)
````

````{hidden-answer} 解答例
```python
x = [-3, -2, -1, 0, 1, 2, 3]
y = []

for value in x:
    y.append(value ** 3)

fig, ax = plt.subplots()
ax.plot(x, y, marker="o")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("三乗の値")
ax.grid()
plt.show()
```

`x`の各値を3乗して`y`へ追加する．`ax.plot(x, y)`では同じ添字の$x$と$y$を一つの点として表示する．
````

## 散布図

二つの数値の関係を確認するには`ax.scatter`で散布図を作成する．次のコードは学習時間と確認テストの得点を点で表す．

```python
import matplotlib.pyplot as plt

hours = [1, 2, 3, 4, 5, 6]
scores = [48, 55, 63, 70, 78, 84]

fig, ax = plt.subplots()
ax.scatter(hours, scores)
ax.set_xlabel("学習時間")
ax.set_ylabel("得点")
ax.set_title("学習時間と得点")
ax.grid()
plt.show()
```

````{dropdown} コードの補足
- `ax.scatter(hours, scores)`は学習時間と得点の組を一つずつ点として表示する．線では結ばない．
- このデータでは学習時間が長い点ほど得点も高い位置にあり，右上がりの傾向が見られる．
- 散布図は二つの数値の関係を確認するために使う．点の並びだけから一方が他方の原因であるとは断定できない．
````

![学習時間と得点の関係を表す散布図](./figs/9/scatter_study_score.png)

```{tip} 注意：相関関係と因果関係
二つの値がともに増減する関係を**相関関係**という．一方の変化が他方の変化を引き起こす関係を**因果関係**という．散布図に相関関係が見えても，それだけで因果関係があるとは判断できない．
```

````{note} 演習2
身長`[150, 155, 160, 165, 170, 175]`と歩幅`[60, 62, 65, 67, 70, 72]`の散布図を作成せよ．次の`【　】`へ，散布図，軸ラベル，タイトル，グリッドを設定する処理をまとめて記入せよ．グラフから読み取れる傾向をMarkdownセルに1文で記述せよ．

```python
import matplotlib.pyplot as plt

heights = [150, 155, 160, 165, 170, 175]
steps = [60, 62, 65, 67, 70, 72]

fig, ax = plt.subplots()

【身長と歩幅の散布図を作成し，表示項目を設定する処理を記入】

plt.show()
```

- `heights`：身長を保存するリスト．
- `steps`：同じ位置の人の歩幅を保存するリスト．

**出力例**

![身長と歩幅の関係を表す散布図](./figs/9/exercise2_height_step.png)
````

````{hidden-answer} 解答例
```python
import matplotlib.pyplot as plt

heights = [150, 155, 160, 165, 170, 175]
steps = [60, 62, 65, 67, 70, 72]


fig, ax = plt.subplots()
ax.scatter(heights, steps)
ax.set_xlabel("身長（cm）")
ax.set_ylabel("歩幅（cm）")
ax.set_title("身長と歩幅")
ax.grid()
plt.show()
```

このデータでは身長が高くなるにつれて歩幅も長くなる傾向が見られる．
````

## 棒グラフ

項目ごとの値を比較するには`ax.bar`で棒グラフを作成する．

```python
subjects = ["国語", "数学", "英語", "理科"]
scores = [72, 88, 76, 84]

fig, ax = plt.subplots()
bars = ax.bar(subjects, scores)
ax.set_xlabel("科目")
ax.set_ylabel("得点")
ax.set_title("科目ごとの得点")
ax.bar_label(bars)
plt.show()
```

````{dropdown} コードの補足
- `ax.bar(subjects, scores)`は科目ごとの得点を棒で表す．横軸の科目は独立した項目であるため，棒を線で結ばない．
- 戻り値を`bars`へ代入し，`ax.bar_label(bars)`へ渡すと，各棒の上へ値を表示できる．
- 棒の高さと数値の両方を示すことで，項目間の差と正確な値を同時に確認できる．
````

![科目ごとの得点を表す棒グラフ](./figs/9/bar_subject_scores.png)

````{note} 演習3
第8回課題1で得た12面体サイコロの出目ごとの回数を棒グラフで表示せよ．次の`【　】`へ，棒グラフ，軸ラベル，タイトル，各棒の値を設定する処理をまとめて記入せよ．

```python
faces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
counts = [415, 448, 410, 381, 443, 432, 420, 429, 430, 383, 400, 409]

faces = [1, 2, 3, 4, 5, 6]
fig, ax = plt.subplots()

【出目ごとの回数を棒グラフで表示する処理を記入】

plt.show()
```

**出力例**

![12面体サイコロの出目ごとの回数を表す棒グラフ](./figs/9/exercise3_dice_bar.png)
````

````{hidden-answer} 解答例
```python
faces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
counts = [415, 448, 410, 381, 443, 432, 420, 429, 430, 383, 400, 409]

fig, ax = plt.subplots()
bars = ax.bar(faces, counts)
ax.set_xlabel("出目")
ax.set_ylabel("回数")
ax.set_title("12面体サイコロを5000回振った結果")
ax.set_xticks(faces)
ax.bar_label(bars)
plt.show()
```

横軸には12個の出目という項目，縦軸には各項目の回数を置く．`ax.set_xticks(faces)`は横軸へ1から12までの目盛を明示する．
````

## ヒストグラム

数値データの分布を確認するには`ax.hist`でヒストグラムを作成する．次のコードでは平均0，標準偏差1の正規分布に従う疑似乱数を1000個生成する．

- **正規分布**：平均の近くに多くの値が集まり，平均から離れるほど値が現れにくくなる，左右対称の連続確率分布．
- **標準偏差**：値が平均からどの程度離れているかを表す指標．標準偏差が大きいほど，値は広い範囲に分布する．

```python
import random
import matplotlib.pyplot as plt

random.seed(2026)
data = []

for _ in range(1000):
    data.append(random.gauss(0, 1))

faces = [1, 2, 3, 4, 5, 6]
fig, ax = plt.subplots()
ax.hist(data, bins=20, edgecolor="white")
ax.set_xlabel("値")
ax.set_ylabel("度数")
ax.set_title("正規乱数の分布")
plt.show()
```

**Markdownの記入例**

```markdown
最も多い1は190回，最も少ない4は156回であり，各出目の回数にはばらつきが見える．1000回で割った相対度数はそれぞれ0.190と0.156で，確率$1/6\approx0.1667$の周りにばらついている．
```

````{dropdown} コードの補足
- `random.gauss(0, 1)`は平均0，標準偏差1の正規分布に従う疑似乱数を一つ生成する．
- `ax.hist(data, bins=20)`はデータの範囲を20個の区間へ分け，各区間に入る値の個数を棒の高さで示す．
- `bins`は区間の個数である．同じデータでも`bins`を変えると分布の細かさと見え方が変化する．
- `edgecolor="white"`は隣り合う棒の境界を白線で見やすくする指定である．
````

![1000個の正規乱数の分布を表すヒストグラム](./figs/9/histogram_normal.png)

````{note} 演習4
上の`data`を使い，`bins=10`と`bins=30`のヒストグラムをそれぞれ表示せよ．次の`____`を埋め，二つのグラフで分布の見え方がどのように変化するかをMarkdownセルに2文で記述せよ．

```python
for bins in [____]:
    fig, ax = plt.subplots()
    ax.hist(____)
    ax.set_xlabel("値")
    ax.set_ylabel("度数")
    ax.set_title(f"正規乱数の分布：区間数{bins}")
    plt.show()
```

**出力例**

![区間数10で表した正規乱数のヒストグラム](./figs/9/exercise4_histogram_bins10.png)

![区間数30で表した正規乱数のヒストグラム](./figs/9/exercise4_histogram_bins30.png)
````

````{hidden-answer} 解答例
```python
for bins in [10, 30]:
    fig, ax = plt.subplots()
    ax.hist(data, bins=bins, edgecolor="white")
    ax.set_xlabel("値")
    ax.set_ylabel("度数")
    ax.set_title(f"正規乱数の分布：区間数{bins}")
    plt.show()
```

区間数10では分布の全体的な形を捉えやすい．区間数30では細かな増減を確認できる一方，各区間の度数のばらつきが目立つ．
````

## 複数のデータと対数目盛

複数のデータを同じ座標上で比較するには`ax.plot`を複数回実行して凡例を付ける．次のコードは第7回で扱った区分求積法と台形公式の絶対誤差を比較する．

```python
n_values = [10, 100, 1000, 10000]
riemann_errors = [0.0483333, 0.00498333, 0.000499833, 0.0000499983]
trapezoidal_errors = [0.00166667, 0.0000166667, 0.000000166667, 0.00000000166667]

fig, ax = plt.subplots()
ax.plot(n_values, riemann_errors, marker="o", label="区分求積法")
ax.plot(n_values, trapezoidal_errors, marker="s", label="台形公式")
ax.set_xlabel("分割数")
ax.set_ylabel("絶対誤差")
ax.set_title("数値積分の絶対誤差")
ax.set_xscale("log")
ax.set_yscale("log")
ax.legend()
ax.grid()
plt.show()
```

````{dropdown} コードの補足
- 2回の`ax.plot`は同じ`ax`へ線を追加する．`label`で各線の説明を設定し，`ax.legend()`で凡例を表示する．
- **対数目盛**は10倍，100倍のように桁が変わる値を比較するための目盛である．`set_xscale("log")`と`set_yscale("log")`で横軸と縦軸を対数目盛にする．
- 分割数は10倍ずつ増え，絶対誤差は複数の桁にわたって小さくなる．両方の軸を対数目盛にすると，二つの方法の誤差の減り方を同じ図で比較しやすい．
````

![区分求積法と台形公式の絶対誤差を比較する両対数グラフ](./figs/9/error_comparison.png)

```{tip} 注意：対数目盛で扱える値
対数目盛では0以下の値を表示できない．誤差を対数目盛で表示するときはデータがすべて正であることを確認する．
```

````{note} 演習5
次の二つの計算時間を同じグラフに表示せよ．横軸と縦軸を対数目盛にし，軸ラベル，タイトル，凡例，グリッドを設定せよ．`【　】`には複数行の処理をまとめて記入する．

```python
sizes = [10, 100, 1000, 10000]
method_a = [0.00001, 0.0001, 0.001, 0.01]
method_b = [0.00002, 0.0004, 0.04, 4.0]

fig, ax = plt.subplots()

【二つの計算時間を両対数グラフで比較する処理を記入】

plt.show()
```

**出力例**

![二つの方法の計算時間を比較する両対数グラフ](./figs/9/exercise5_log_comparison.png)
````

````{hidden-answer} 解答例
```python
sizes = [10, 100, 1000, 10000]
method_a = [0.00001, 0.0001, 0.001, 0.01]
method_b = [0.00002, 0.0004, 0.04, 4.0]

fig, ax = plt.subplots()
ax.plot(sizes, method_a, marker="o", label="方法A")
ax.plot(sizes, method_b, marker="s", label="方法B")
ax.set_xlabel("データ数")
ax.set_ylabel("計算時間（秒）")
ax.set_title("二つの方法の計算時間")
ax.set_xscale("log")
ax.set_yscale("log")
ax.grid()
plt.show()
```

方法Aの計算時間はデータ数が10倍になると約10倍になる．方法Bの計算時間はデータ数が10倍になると約100倍になり，データ数の増加に対して方法Aより急速に増える．
````

## グラフからの読み取り

グラフの説明では見た目の印象だけでなく，軸と数値を根拠にする．次の順序で記述すると，読み取った内容を整理しやすい．

1. **対象**：横軸と縦軸が何を表すかを示す．
2. **傾向**：増減，ばらつき，最大・最小，項目間の差を示す．
3. **根拠**：具体的な値や範囲を示す．
4. **限界**：グラフだけでは判断できないことを区別する．

```{tip} 例：棒グラフの説明
横軸は12面体サイコロの出目，縦軸は5000回中の出現回数を表す．出現回数は381回から448回までの範囲にあり，2の出目が最も多い．各棒の高さには違いがあるが，一回のシミュレーションだけからサイコロに偏りがあるとは断定できない．
```

## エラーが出たときの確認

- **`NameError`**：`plt`，`random`などを読み込むセルや，使用する変数を定義するセルを先に実行したか確認する．
- **`ModuleNotFoundError`**：`%pip install matplotlib-fontja`を実行したか確認する．インストール後にimportを含むセルを実行する．
- **`FileNotFoundError`**：Notebookと`monte_carlo.csv`が同じ`Fresh2`フォルダにあるか，ファイル名の大文字・小文字や拡張子が一致しているか確認する．
- **`ValueError`**：横軸と縦軸へ渡したリストの要素数が同じか確認する．たとえば`x`が5個，`y`が4個では対応する点を作れない．
- **日本語が四角で表示される場合**：`import matplotlib_fontja`を実行した後で，グラフを作成するセルを再実行する．
- **対数目盛で点が表示されない場合**：横軸と縦軸のデータに0以下の値が含まれていないか確認する．

## 課題

````{warning} 課題1
第8回課題1の12面体サイコロを5000回振るシミュレーションを再実行し，出目ごとの回数を棒グラフで可視化せよ．シードは2026とし，軸ラベル，タイトル，各棒の回数を表示すること．棒グラフを選んだ理由と結果の特徴をMarkdownセルに3文程度で記述せよ．

次のテンプレートを基に完成させよ．`【　】`は説明に対応する複数行の処理を記述する箇所を表す．

```python
# 課題1
import random

random.seed(2026)
counts = [0] * 12

【12面体サイコロを5000回振り，各出目の回数を数える処理を記入】

faces = list(range(1, 13))
faces = list(range(1, 13))
fig, ax = plt.subplots()

【棒グラフを作成し，表示項目と各棒の回数を設定する処理を記入】

plt.show()
```

**出力例**

![12面体サイコロを5000回振った結果の棒グラフ](./figs/9/assignment1_dice_bar.png)
````

(assignment-9-1-answer)=
````{hidden-answer} 課題1の解答例
```python
# 課題1
import random

random.seed(2026)
counts = [0] * 12

for _ in range(5000):
    value = random.randint(1, 12)
    counts[value - 1] = counts[value - 1] + 1

faces = list(range(1, 13))
fig, ax = plt.subplots()
bars = ax.bar(faces, counts)
ax.set_xlabel("出目")
ax.set_ylabel("回数")
ax.set_title("12面体サイコロを5000回振った結果")
ax.set_xticks(faces)
ax.bar_label(bars)
plt.show()
```

**考察例**

横軸は12面体サイコロの出目，縦軸は5000回中の出現回数を表す．項目ごとの回数を比較するため，棒グラフを選んだ．出現回数は381回から448回までの範囲にあり，理論上の期待回数$5000/12\approx416.7$の周りにばらついている．
````

````{warning} 課題2
第8回課題2で作成した`monte_carlo.csv`をcsvモジュールで読み込み，試行回数と絶対誤差の関係を折れ線グラフで可視化せよ．横軸と縦軸を対数目盛とし，軸ラベル，タイトル，点，グリッドを表示すること．折れ線グラフと対数目盛を選んだ理由，絶対誤差の変化をMarkdownセルに3文程度で記述せよ．

次のテンプレートを基に完成させよ．`【　】`は説明に対応する複数行の処理を記述する箇所を表す．

```python
# 課題2
import csv

trials_values = []
values = []
errors = []

【monte_carlo.csvから試行回数と絶対誤差を読み込む処理を記入】

fig, ax = plt.subplots()

【試行回数と絶対誤差の関係を両対数グラフで表示する処理を記入】

plt.show()
```

**出力例**

![モンテカルロ積分の試行回数と絶対誤差の関係](./figs/9/assignment2_monte_carlo_error.png)
````

(assignment-9-2-answer)=
````{hidden-answer} 課題2の解答例
```python
# 課題2
import csv

trials_values = []
values = []
errors = []

with open("monte_carlo.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    next(reader)

    for row in reader:
        trials_values.append(int(row[0]))
        values.append(float(row[1]))
        errors.append(float(row[2]))
```

**設問2：近似値と手計算の値の比較**

```python
fig_values, ax_values = plt.subplots()
ax_values.plot(trials_values, values, marker="o", label="Monte Carlo")
ax_values.axhline(2, color="orange", label="Exact value")
ax_values.set_xlabel("Number of trials")
ax_values.set_ylabel("Integral value")
ax_values.set_title("Monte Carlo integral estimates")
ax_values.legend()
ax_values.grid()
```

**設問3：絶対誤差の図と二つの図の保存**

```python
fig_values.savefig("integral_values.png", dpi=150, bbox_inches="tight")

fig_errors, ax_errors = plt.subplots()
ax_errors.plot(trials_values, errors, marker="o")
ax_errors.set_xlabel("Number of trials")
ax_errors.set_ylabel("Absolute error")
ax_errors.set_title("Monte Carlo integration error")
ax_errors.set_xscale("log")
ax_errors.set_yscale("log")
ax_errors.grid()
fig_errors.savefig("integral_errors.png", dpi=150, bbox_inches="tight")
plt.show()
```

**設問4：考察（Markdownの記入例）**

```markdown
### 設問4：考察

試行回数に沿った変化を見るため折れ線グラフを使い，近似値の図では手計算の値2に対する上下のずれを，誤差の図ではその大きさを比較した．誤差は1000回で約0.0442，10000回で約0.00101と桁が異なるため，両対数目盛を使うと比率の変化が読み取りやすい．30000回では誤差が約0.00323に増えており，乱数によるばらつきのため試行回数を増やすたびに誤差が小さくなるわけではない．
```
````

````{note} 発展的課題（追加点対象，必ずしも取り組まなくて良い）
欠席などで得点の不足が心配な場合は取り組むことを薦める．提出内容に応じて追加点の対象とする．

第8回の発展的課題で扱った$\int_0^1 e^{-x^2}\,dx$について，台形公式とモンテカルロ積分をグラフで比較せよ．

1. Markdownセルに`# 発展的課題`と記入する．台形公式の分割数とモンテカルロ積分の試行回数を`100`，`1000`，`10000`とし，モンテカルロ積分ではシード`2026`，`2027`，`2028`の結果をそれぞれ求めよ．第8回発展的課題のコードを利用してよい．
2. 分割数`200000`の台形公式の結果を基準値とし，各近似値と基準値との差の絶対値を求めよ．横軸を分割数・試行回数として両対数目盛の同じ図に4本の線を描き，凡例で方法とシードを区別せよ．
3. 図を`integration_comparison.png`へ保存し，方法による違いと同じ方法でもシードで結果が変わることを図の数値を根拠にMarkdownセルで説明せよ．基準値も近似値であることに触れること．
````

(assignment-9-advanced-answer)=
````{hidden-answer} 発展的課題の解答例
**設問1：計算する関数と近似値**

```markdown
# 発展的課題
```

```python
import math
import random
import matplotlib.pyplot as plt

def trapezoidal(f, a, b, n):
    h = (b - a) / n
    total = (f(a) + f(b)) / 2
    for i in range(1, n):
        total += f(a + i * h)
    return h * total

def monte_carlo_integral(f, a, b, trials):
    total = 0
    for _ in range(trials):
        total += f(random.uniform(a, b))
    return (b - a) * total / trials

def f(x):
    return math.exp(-x ** 2)

sizes = [100, 1000, 10000]
trapezoidal_values = []
for n in sizes:
    trapezoidal_values.append(trapezoidal(f, 0, 1, n))

seeds = [2026, 2027, 2028]
monte_carlo_values = []
for seed in seeds:
    values_for_seed = []
    for trials in sizes:
        random.seed(seed)
        values_for_seed.append(monte_carlo_integral(f, 0, 1, trials))
    monte_carlo_values.append(values_for_seed)
```

**設問2：基準値との差と比較グラフ**

```python
reference = trapezoidal(f, 0, 1, 200000)
trapezoidal_differences = []
for value in trapezoidal_values:
    trapezoidal_differences.append(abs(value - reference))

fig, ax = plt.subplots()
ax.plot(trials_values, errors, marker="o")
ax.set_xlabel("試行回数")
ax.set_ylabel("絶対誤差")
ax.set_title("モンテカルロ積分の絶対誤差")
ax.set_xscale("log")
ax.set_yscale("log")
ax.legend()
ax.grid()
```

**設問3：図の保存と考察**

```python
fig.savefig("integration_comparison.png", dpi=150, bbox_inches="tight")
plt.show()
```

**考察例**

横軸は試行回数，縦軸はモンテカルロ積分の絶対誤差を表す．試行回数という順序をもつ量に対する絶対誤差の変化を確認するため，折れ線グラフを選んだ．試行回数が増えると全体として絶対誤差は小さくなるが，10000回から30000回では増加しており，毎回単調に減少するわけではない．
````

### 提出方法

WebClassの「第9回課題」から次のファイルを提出する．

| 提出ファイル | 内容 |
| --- | --- |
| `第9回_<学籍番号>_<氏名>.ipynb` | 課題1・2のコード，実行結果，グラフ，Markdownセルによる考察 |

- Notebookを上から順に実行し，課題1・2のグラフが表示されていることを確認する．
- 軸ラベルとタイトルが日本語で表示されていることを確認する．
- 課題1・2の後に指定された考察のMarkdownセルがあることを確認する．
- すべてのCodeセルの出力を表示した状態でNotebookを保存する．

### 提出期限

<span style="color: red; ">11月27日(金)23:59まで</span>

質問等がある場合には

- メール kkagawa@josai.ac.jp
- Teamsのチャット
- WebClassのメッセージ

などで連絡してください．

## まとめ

- **確認する内容に応じたグラフの選択**：変化には折れ線グラフ，二つの数値の関係には散布図，項目間の比較には棒グラフ，数値の分布にはヒストグラムを使う．
- **図の情報の明示**：軸ラベルとタイトルを付け，複数のデータを比較するときは凡例を付ける．
- **桁の異なる値の比較**：正の値が複数の桁にわたる場合は対数目盛を使うと変化を比較しやすい．
- **根拠に基づく解釈**：軸が表す量と具体的な値を示し，グラフから読み取れることと断定できないことを区別する．

次回は第1回から第9回までの学習内容を確認するテストを行う．
