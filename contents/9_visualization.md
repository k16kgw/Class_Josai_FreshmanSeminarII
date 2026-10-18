# 第9回　可視化

### 到達目標

- データに応じてグラフの種類を選べる．
- Matplotlibを使って基本的なグラフを作成できる．
- 軸ラベル，凡例，タイトルを設定できる．

### 前回の復習

第8回では，Google Colabで乱数とモンテカルロ法を扱った．次のコードは前回の演習で使用したモンテカルロ積分である．

```python
def monte_carlo_integral(f, a, b, trials):
    total = 0
    for _ in range(trials):
        x = random.uniform(a, b)
        total = total + f(x)
    return (b - a) * total / trials
```

**可視化**：データをグラフや図で表し，数値だけでは捉えにくい傾向やばらつきを確認しやすくすること．

### 前回の課題の解答例

````{tip} 解説：第8回課題1
```python
import random

random.seed(2026)
trials = 5000
counts = [0, 0, 0, 0, 0, 0]
for _ in range(trials):
    value = random.randint(1, 6)
    counts[value - 1] = counts[value - 1] + 1

for face in range(1, 7):
    print(face, counts[face - 1], counts[face - 1] / trials)

most_common = counts.index(max(counts)) + 1
print(f"最も多く出た目: {most_common}")
```

サイコロの目とリストの添字には1のずれがあるため，`counts[value - 1]`へ記録する．`max(counts)`で最大回数を求め，`index`でその位置を調べる．回数だけでなく相対度数を表示すると，試行回数が異なる実験も比較しやすい．
````

````{tip} 解説：第8回課題2
```python
import math
import random

def f(x):
    return math.sin(x)

random.seed(2026)
with open("monte_carlo.csv", "w", encoding="utf-8") as file:
    file.write("trials,value,error\n")
    for trials in [1000, 3000, 10000, 30000]:
        value = monte_carlo_integral(f, 0, math.pi, trials)
        error = abs(value - 2)
        print(trials, value, error)
        file.write(f"{trials},{value},{error}\n")
```

試行回数ごとに近似値と誤差を計算し，CSVへ保存する．シードを固定したため，同じ結果を再現できる．今回はこのような数値の並びをグラフに変換し，変化を読み取りやすくする．
````

### Jupyter Notebookの準備

1. `Documents（書類）/Fresh2`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`第9回_<学籍番号>_<氏名>.ipynb`へ変更する．

```{tip} 注意：Colabのファイルを使う場合
第8回の`monte_carlo.csv`を使う場合は，JupyterLabのファイル一覧へアップロードする．NotebookとCSVが同じフォルダにあることを確認する．
```

## グラフの選択

| 確認したいこと | グラフ |
| --- | --- |
| 時間や順序による変化 | 折れ線グラフ |
| 二つの数値の関係 | 散布図 |
| 値の分布 | ヒストグラム |
| 項目ごとの比較 | 棒グラフ |

グラフを選ぶ前に，横軸と縦軸が何を表すか，何を読み取りたいかを決める．

- **折れ線グラフ**：点を線で結び，時間や順序に伴う値の変化を表すグラフである．
- **散布図**：二つの数値を横軸と縦軸に取り，点の位置によって両者の関係を表すグラフである．
- **ヒストグラム**：数値をいくつかの区間に分け，各区間に含まれる値の個数を表すグラフである．
- **棒グラフ**：項目ごとの値を棒の長さで表し，大きさを比較するグラフである．

## Matplotlibの基本

**ライブラリ**：よく使う機能を再利用できる形でまとめたプログラムの集まりである．

**Matplotlib**：Pythonでグラフを作成するためのライブラリである．

**モジュール**：関連するPythonのコードを一つのファイルなどへまとめたものである．ここでは，Matplotlibの`pyplot`モジュールを`plt`という別名で読み込む．

**軸ラベル**：横軸または縦軸が表す量を示す文字列である．

**凡例**：グラフの線や点が何を表すかを示す説明である．

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

fig, ax = plt.subplots()
ax.plot(x, y, marker="o", label="y = x^2")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("Square numbers")
ax.legend()
ax.grid()
plt.show()
```

- **`fig`**：図全体を表すオブジェクト．
- **`ax`**：軸，目盛，グラフを描く領域を表すオブジェクト．
- **`label`**：線や点の説明として凡例に表示する文字列．

````{note} 演習1
$y=x^3$の折れ線グラフを作成せよ．

次のコードにある4か所の`_____`を適切な式またはメソッド名へ書き換えよ．

```python
import matplotlib.pyplot as plt

x = [-3, -2, -1, 0, 1, 2, 3]
y = []
for value in x:
    y.append(_____)

fig, ax = plt.subplots()
ax._____(x, y, marker="o")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("y = x^3")
ax._____()
plt._____()
```

**出力例**

```text
点 (-3, -27) から (3, 27) までを結ぶ，y = x^3の折れ線グラフが表示される．
```
````

````{hidden-answer} 解答例
```python
import matplotlib.pyplot as plt

x = [-3, -2, -1, 0, 1, 2, 3]
y = []
for value in x:
    y.append(value ** 3)

fig, ax = plt.subplots()
ax.plot(x, y, marker="o")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("y = x^3")
ax.grid()
plt.show()
```
````

## 散布図

二つの数値の関係を点で確認するには`ax.scatter`を使う．

```python
hours = [1, 2, 3, 4, 5, 6]
scores = [48, 55, 63, 70, 78, 84]

fig, ax = plt.subplots()
ax.scatter(hours, scores)
ax.set_xlabel("Study hours")
ax.set_ylabel("Score")
ax.set_title("Study hours and scores")
plt.show()
```

```{tip} 注意：相関関係と因果関係
散布図で二つの値に関係が見えても，一方が他方の原因であるとは限らない．グラフから読み取れる範囲を超えて断定しない．
```

````{note} 演習2
身長`[150, 155, 160, 165, 170, 175]`と歩幅`[60, 62, 65, 67, 70, 72]`の散布図を作成せよ．軸ラベルとタイトルを付け，読み取れる傾向をMarkdownセルに1文で記述せよ．

次のコードにある4か所の`_____`を適切なメソッド名または文字列へ書き換えよ．

```python
heights = [150, 155, 160, 165, 170, 175]
steps = [60, 62, 65, 67, 70, 72]

fig, ax = plt.subplots()
ax._____(heights, steps)
ax.set_xlabel("_____")
ax.set_ylabel("_____")
ax.set_title("_____")
plt.show()
```

**出力例**

```text
身長を横軸，歩幅を縦軸とし，右上がりに点が並ぶ散布図が表示される．
```
````

````{hidden-answer} 解答例
```python
heights = [150, 155, 160, 165, 170, 175]
steps = [60, 62, 65, 67, 70, 72]
fig, ax = plt.subplots()
ax.scatter(heights, steps)
ax.set_xlabel("Height (cm)")
ax.set_ylabel("Step length (cm)")
ax.set_title("Height and step length")
plt.show()
```
身長が高くなるにつれて，歩幅も長くなる傾向が見られる．
````

## 棒グラフとヒストグラム

項目ごとの値を比べる場合は，棒グラフを使う．

```python
labels = ["A", "B", "C", "D"]
values = [12, 18, 10, 15]

fig, ax = plt.subplots()
ax.bar(labels, values)
ax.set_xlabel("Group")
ax.set_ylabel("Value")
plt.show()
```

連続した値の分布を見る場合は，ヒストグラムを使う．

```python
import random

data = []

for _ in range(1000):
    data.append(random.gauss(0, 1))

fig, ax = plt.subplots()
ax.hist(data, bins=20)
ax.set_xlabel("Value")
ax.set_ylabel("Frequency")
plt.show()
```

**`bins`**：ヒストグラムでデータの範囲を分ける区間の数．区間数によって分布の見え方が変わる．

````{note} 演習3
サイコロを1000回振り，各出目の回数を棒グラフで表示せよ．

次のコードにある4か所の`_____`を適切な関数名，式またはメソッド名へ書き換えよ．グラフから読み取れることをMarkdownセルに2文で記述せよ．

```python
import random

random.seed(9)
counts = [0, 0, 0, 0, 0, 0]
for _ in range(1000):
    value = random._____(1, 6)
    counts[_____] = counts[_____] + 1

fig, ax = plt.subplots()
ax._____([1, 2, 3, 4, 5, 6], counts)
ax.set_xlabel("Face")
ax.set_ylabel("Count")
ax.set_title("Dice simulation")
plt.show()
```

**出力例**

```text
1から6を横軸，各出目の回数を縦軸とする6本の棒グラフが表示される．
```
````

````{hidden-answer} 解答例
```python
import random

random.seed(9)
counts = [0, 0, 0, 0, 0, 0]
for _ in range(1000):
    value = random.randint(1, 6)
    counts[value - 1] = counts[value - 1] + 1

fig, ax = plt.subplots()
ax.bar([1, 2, 3, 4, 5, 6], counts)
ax.set_xlabel("Face")
ax.set_ylabel("Count")
ax.set_title("Dice simulation")
plt.show()
```
````

````{note} 演習4
平均0，標準偏差1の正規乱数を1000個作り，ヒストグラムを作成せよ．`bins=10`と`bins=30`の二つを作り，見え方の違いを確認せよ．

次のコードにある3か所の`_____`を適切な関数名，値またはメソッド名へ書き換えよ．

```python
data = []
for _ in range(1000):
    data.append(random._____(0, 1))

for bins in [_____, _____]:
    fig, ax = plt.subplots()
    ax.hist(data, bins=bins)
    ax.set_xlabel("Value")
    ax.set_ylabel("Frequency")
    ax.set_title(f"Histogram: bins={bins}")
    plt.show()
```

**出力例**

```text
同じ正規乱数について，階級数が10と30の二つのヒストグラムが表示される．
```
````

````{hidden-answer} 解答例
```python
data = []
for _ in range(1000):
    data.append(random.gauss(0, 1))

for bins in [10, 30]:
    fig, ax = plt.subplots()
    ax.hist(data, bins=bins)
    ax.set_xlabel("Value")
    ax.set_ylabel("Frequency")
    ax.set_title(f"Histogram: bins={bins}")
    plt.show()
```
````

## 複数のデータを比較する

複数の系列を同じ軸へ描く場合は，`ax.plot`を複数回呼び出し，凡例を付ける．

```python
n_values = [10, 100, 1000, 10000]
riemann_errors = [0.049, 0.00499, 0.0005, 0.00005]
trapezoidal_errors = [0.00167, 0.0000167, 0.000000167, 0.00000000167]

fig, ax = plt.subplots()
ax.plot(n_values, riemann_errors, marker="o", label="Riemann sum")
ax.plot(n_values, trapezoidal_errors, marker="s", label="Trapezoidal rule")
ax.set_xlabel("Number of divisions")
ax.set_ylabel("Error")
ax.set_xscale("log")
ax.set_yscale("log")
ax.legend()
ax.grid()
plt.show()
```

**対数目盛**：10倍，100倍のように桁が大きく変わる値を，等間隔に近い形で表示する目盛．`set_xscale("log")`と`set_yscale("log")`で設定する．

````{note} 演習5
第7回課題2で求めた区分求積法と台形公式の誤差を，同じグラフへ描け．横軸と縦軸を対数目盛にし，凡例を付けよ．

次のコードにある4か所の`_____`を適切なモジュール名またはメソッド名へ書き換えよ．

```python
import csv

n_values = []
riemann_errors = []
trapezoidal_errors = []

with open("numerical_integration.csv", "r", encoding="utf-8") as file:
    reader = csv._____(file)
    next(reader)
    for row in reader:
        n_values.append(int(row[0]))
        riemann_errors.append(float(row[1]))
        trapezoidal_errors.append(float(row[2]))

fig, ax = plt.subplots()
ax.plot(n_values, riemann_errors, marker="o", label="Riemann sum")
ax.plot(n_values, trapezoidal_errors, marker="s", label="Trapezoidal rule")
ax.set_xlabel("Number of divisions")
ax.set_ylabel("Error")
ax.set_xscale("_____")
ax.set_yscale("_____")
ax._____()
ax.grid()
plt.show()
```

**出力例**

```text
両対数目盛上に，区分求積法と台形公式の誤差を比較する2本の折れ線グラフが表示される．
```
````

````{hidden-answer} 解答例
```python
import csv

n_values = []
riemann_errors = []
trapezoidal_errors = []

with open("numerical_integration.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    next(reader)
    for row in reader:
        n_values.append(int(row[0]))
        riemann_errors.append(float(row[1]))
        trapezoidal_errors.append(float(row[2]))

fig, ax = plt.subplots()
ax.plot(n_values, riemann_errors, marker="o", label="Riemann sum")
ax.plot(n_values, trapezoidal_errors, marker="s", label="Trapezoidal rule")
ax.set_xlabel("Number of divisions")
ax.set_ylabel("Error")
ax.set_xscale("log")
ax.set_yscale("log")
ax.legend()
ax.grid()
plt.show()
```
````

## 課題

````{warning} 課題1
第8回課題1のサイコロ5000回の結果を棒グラフで可視化せよ．

1. Markdownセルに`# 課題1`と記入し，シードを2026に固定してサイコロ5000回の結果を再現せよ．
2. 横軸を出目，縦軸を回数とする棒グラフを作り，各棒の上へ回数を表示せよ．
3. 棒グラフを選んだ理由と結果の特徴をMarkdownセルに3文程度で説明せよ．

次のテンプレートを基に完成させよ．`【　】`は，1行以上の処理を記述する箇所を表す．

```python
import random
import matplotlib.pyplot as plt

random.seed(2026)
counts = [0, 0, 0, 0, 0, 0]

【サイコロを5000回振り，各出目の回数を数える処理を記入】

faces = [1, 2, 3, 4, 5, 6]
fig, ax = plt.subplots()

【棒グラフを描き，軸ラベル，タイトル，各棒の回数を設定する処理を記入】

plt.show()
```

**出力例**

```text
1から6を横軸とする棒グラフが表示され，各棒の上に863，791，875，849，813，809と表示される．
```
````

````{hidden-answer} 解答例
```python
import random
import matplotlib.pyplot as plt

random.seed(2026)
counts = [0, 0, 0, 0, 0, 0]
for _ in range(5000):
    value = random.randint(1, 6)
    counts[value - 1] = counts[value - 1] + 1

faces = [1, 2, 3, 4, 5, 6]
fig, ax = plt.subplots()
ax.bar(faces, counts)
ax.set_xlabel("Face")
ax.set_ylabel("Count")
ax.set_title("Results of 5000 dice rolls")
for face, count in zip(faces, counts):
    ax.text(face, count, str(count), ha="center", va="bottom")
plt.show()
```
出目は順序のある連続量ではなく，項目ごとの回数を比較するため棒グラフを選んだ．各棒はおおむね同じ高さである．ただし乱数を使うため，回数は完全には一致しない．
````

````{warning} 課題2
第8回課題2のモンテカルロ積分の誤差を可視化せよ．

1. Markdownセルに`# 課題2`と記入し，csvモジュールで`monte_carlo.csv`を読み込め．
2. 横軸を試行回数，縦軸を誤差とする折れ線グラフを両対数目盛で作成せよ．
3. 軸ラベル，タイトル，点，グリッドを付け，グラフの選択理由と誤差の変化をMarkdownセルに3文程度で説明せよ．

次のテンプレートを基に完成させよ．`【　】`は，1行以上の処理を記述する箇所を表す．

```python
import csv
import matplotlib.pyplot as plt

trials_values = []
errors = []

【monte_carlo.csvから試行回数と誤差を読み込む処理を記入】

fig, ax = plt.subplots()

【誤差の折れ線グラフを描き，両対数目盛と表示項目を設定する処理を記入】

plt.show()
```

**出力例**

```text
試行回数を横軸，誤差を縦軸とする両対数目盛の折れ線グラフが表示される．
```
````

````{hidden-answer} 解答例
```python
import csv
import matplotlib.pyplot as plt

trials_values = []
errors = []

with open("monte_carlo.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    next(reader)
    for row in reader:
        trials_values.append(int(row[0]))
        errors.append(float(row[2]))

fig, ax = plt.subplots()
ax.plot(trials_values, errors, marker="o")
ax.set_xlabel("Number of trials")
ax.set_ylabel("Error")
ax.set_title("Monte Carlo integration error")
ax.set_xscale("log")
ax.set_yscale("log")
ax.grid()
plt.show()
```
試行回数という順序のある量に対する誤差の変化を見るため，折れ線グラフを選んだ．対数目盛を使うと桁の異なる値を比較しやすい．モンテカルロ法では乱数を使うため，誤差が必ず単調に減るとは限らない．
````

## エラーが出たときにチェックすること

- `import matplotlib.pyplot as plt`を実行したか確認する．
- 横軸と縦軸のデータ数が同じか確認する．
- `plt.show()`を実行したか確認する．
- 日本語が表示されない場合は，まず英数字のラベルで動作を確認する．
- 対数目盛では0以下の値を表示できないことを確認する．

### 提出方法

- WebClassの「第9回課題」から`第9回_<学籍番号>_<氏名>.ipynb`を提出する．
- 課題1・2のグラフと考察を表示した状態で保存する．
- 軸ラベル，タイトル，必要な凡例が付いていることを確認する．

### 提出期限

<span style="color: red; ">11月27日(金)23:59まで</span>

質問等がある場合には

- メール kkagawa@josai.ac.jp
- Teamsのチャット
- WebClassのメッセージ

などで連絡してください．

## まとめ

1. **目的に応じてグラフを選ぶ**：変化には折れ線，関係には散布図，分布にはヒストグラム，項目比較には棒グラフを使う．
2. **軸の意味を明示する**：軸ラベルとタイトルを付け，何を表す図か分かるようにする．
3. **比較しやすい表示を選ぶ**：複数系列には凡例を付け，桁が大きく異なる値には対数目盛を利用する．
4. **グラフを根拠に説明する**：見える傾向と，グラフだけでは断定できないことを区別する．

- 次回は第1回から第9回までの学習内容を確認するテストを行う．
