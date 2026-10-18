# 第8回　数値計算3：Google Colabによる計算

### 到達目標

- Pythonで乱数を生成できる．
- シードを固定する意味を説明できる．
- 乱数を用いた簡単なシミュレーションを作成できる．

### 前回の復習

第7回では，差分による数値微分と，区分求積法・台形公式による数値積分を扱った．次のコードは前回の演習で使用した台形公式である．

```python
def trapezoidal(f, a, b, n):
    h = (b - a) / n
    total = (f(a) + f(b)) / 2
    for i in range(1, n):
        total = total + f(a + i * h)
    return h * total
```

今回は，規則的に区間を分割する代わりに，乱数を使った多数の試行から値を推定する．

### 前回の課題の解答例

````{tip} 解説：第7回課題1
```python
import math

def f(x):
    return math.sin(x)

x = math.pi / 3
exact = math.cos(x)
for h in [1e-1, 1e-2, 1e-3, 1e-4, 1e-5]:
    forward = forward_difference(f, x, h)
    center = central_difference(f, x, h)
    print(h, abs(forward - exact), abs(center - exact))
```

各刻み幅で正確な値との差を求めることで，二つの差分法を同じ基準で比較できる．同じ刻み幅では，中心差分の誤差が小さくなる．刻み幅を小さくすると誤差は減るが，極端に小さい場合は丸め誤差の影響を受ける．
````

````{tip} 解説：第7回課題2
```python
def f(x):
    return x ** 3

exact = 1 / 4
with open("numerical_integration.csv", "w", encoding="utf-8") as file:
    file.write("n,riemann_error,trapezoidal_error\n")
    for n in [10, 100, 1000, 10000]:
        error_r = abs(riemann_sum(f, 0, 1, n) - exact)
        error_t = abs(trapezoidal(f, 0, 1, n) - exact)
        file.write(f"{n},{error_r},{error_t}\n")
        print(n, error_r, error_t)
```

分割数を増やすと，両方の誤差が小さくなる．同じ分割数では台形公式の誤差が小さい．結果をCSVへ保存しておくと，後の可視化に再利用できる．
````

### Google Colabの準備

1. Webブラウザで[Google Colab](https://colab.research.google.com/)を開く．
2. 大学のGoogleアカウントでログインする．
3. 「ノートブックを新規作成」を選択する．
4. ファイル名を`第8回_<学籍番号>_<氏名>.ipynb`へ変更する．
5. Codeセルへコードを入力し，実行ボタンまたは`Shift`+`Enter`で実行する．

```{tip} 注意：大学のGoogleアカウント
個人用アカウントではなく，大学から指定されたGoogleアカウントでログインする．共有端末ではログインしたままにしない．
```

```{tip} 注意：Google Colabへの保存
Google Colabで作成したNotebookはGoogle Driveへ保存される．講義終了前にファイル名と保存状態を確認する．
```

#### Notebookのダウンロード

WebClassへ提出するには，Colabのメニューから「ファイル」→「ダウンロード」→「.ipynbをダウンロード」を選ぶ．ダウンロードしたファイル名を確認してから提出する．

## 乱数

**乱数**：結果を事前に一つに決められないように生成される数である．Pythonでは，標準ライブラリの`random`モジュールを使って疑似乱数を生成できる．

**疑似乱数**：一定の計算手順によって，乱数のように見える数列を生成したものである．

```python
import random

print(random.random())
print(random.randint(1, 6))
print(random.uniform(-1, 1))
```

**`random.random()`**：0以上1未満の実数を返す関数である．

**`random.randint(a, b)`**：`a`以上`b`以下の整数を返す関数である．

**`random.uniform(a, b)`**：`a`以上`b`以下の範囲から実数を返す関数である．

**シード**：疑似乱数の生成を開始するために与える初期値である．シードを固定すると，同じ乱数列を再現できる．

```python
random.seed(10)

for _ in range(5):
    print(random.randint(1, 6))
```

````{note} 演習1
シードによる再現性を確認せよ．

1. シードを指定せず，`random.random()`を5回実行するコードを2回実行せよ．
2. 各回の結果が異なることを確認せよ．
3. 実行前に`random.seed(10)`を指定し，同じ操作を2回行え．
4. シードを同じにすると結果が一致することを確認せよ．
````

````{hidden-answer} 解答例
```python
import random

for _ in range(2):
    random.seed(10)
    values = []
    for _ in range(5):
        values.append(random.random())
    print(values)
```
````

## サイコロのシミュレーション

**シミュレーション**：現実の現象や試行を，規則に基づく計算によって模擬することである．ここでは，整数の乱数を使ってサイコロを繰り返し振る試行を模擬する．

```python
import random

counts = [0, 0, 0, 0, 0, 0]

for _ in range(6000):
    value = random.randint(1, 6)
    counts[value - 1] = counts[value - 1] + 1

print(counts)
```

試行回数を増やすと，各出目の回数はおおむね同程度になる．

**相対度数**：ある結果が現れた回数を，試行回数全体で割った値である．

````{note} 演習2
サイコロを1000回振るシミュレーションを実行せよ．

1. 1から6の出現回数をリスト`counts`へ記録せよ．
2. 各出目について「`1: 〇回，相対度数 〇`」の形式で表示せよ．
3. 相対度数の合計が1に近いことを確認せよ．
````

````{hidden-answer} 解答例
```python
import random

trials = 1000
counts = [0, 0, 0, 0, 0, 0]
for _ in range(trials):
    value = random.randint(1, 6)
    counts[value - 1] = counts[value - 1] + 1

for face in range(1, 7):
    print(f"{face}: {counts[face - 1]}回，相対度数 {counts[face - 1] / trials}")
```
````

## モンテカルロ法

**モンテカルロ法**：乱数を使った多数の試行から，求めたい量を数値的に推定する方法である．ここでは，単位正方形内に点を発生させ，単位円の内側に入った割合から円周率を近似する．

```python
import random

trials = 10000
inside = 0

for _ in range(trials):
    x = random.random()
    y = random.random()

    if x ** 2 + y ** 2 <= 1:
        inside = inside + 1

pi = 4 * inside / trials
print(pi)
```

````{note} 演習3
試行回数`1000`，`10000`，`100000`について円周率を近似せよ．

1. 円周率を近似する処理を関数`approximate_pi(trials)`にまとめよ．
2. 各試行回数で近似値を表示せよ．
3. `math.pi`との誤差を表示せよ．
````

````{hidden-answer} 解答例
```python
import math
import random

def approximate_pi(trials):
    inside = 0
    for _ in range(trials):
        x = random.random()
        y = random.random()
        if x ** 2 + y ** 2 <= 1:
            inside = inside + 1
    return 4 * inside / trials

for trials in [1000, 10000, 100000]:
    value = approximate_pi(trials)
    print(trials, value, abs(value - math.pi))
```
````

## モンテカルロ積分

区間$[a,b]$から一様に選んだ点$x_i$を使うと，定積分を次のように近似できる．

$$
\int_a^b f(x)\,dx\approx(b-a)\frac{1}{N}\sum_{i=1}^{N}f(x_i)
$$

```python
def monte_carlo_integral(f, a, b, trials):
    total = 0
    for _ in range(trials):
        x = random.uniform(a, b)
        total = total + f(x)
    return (b - a) * total / trials
```

````{note} 演習4
$\int_0^1x^2\,dx=1/3$をモンテカルロ法で近似せよ．

1. 試行回数を`1000`，`10000`，`100000`とせよ．
2. 各近似値と正確な値との誤差を表示せよ．
3. 同じ試行回数でも実行ごとに結果が変わることを確認せよ．
````

````{hidden-answer} 解答例
```python
def f(x):
    return x ** 2

for trials in [1000, 10000, 100000]:
    value = monte_carlo_integral(f, 0, 1, trials)
    print(trials, value, abs(value - 1 / 3))
```
````

```{tip} 注意：モンテカルロ法の誤差
乱数を使うため，試行回数を増やしても誤差が毎回単調に小さくなるとは限らない．複数回実行した結果や全体の傾向を見て判断する．
```

## 課題

````{warning} 課題1
サイコロを5000回振り，各出目の回数と相対度数を求めよ．

1. Markdownセルに`# 課題1`と記入せよ．
2. `random.seed(2026)`を指定せよ．
3. 1から6の出現回数をリストへ記録せよ．
4. 各出目，回数，相対度数を表示せよ．
5. 最も多く出た目を表示せよ．
6. 結果をMarkdownセルに2文程度で説明せよ．
````

````{hidden-answer} 解答例
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
各出目の相対度数はおおむね`1 / 6`に近い．シードを固定しているため，同じコードを再実行すると同じ結果を再現できる．
````

````{warning} 課題2
$\int_0^\pi\sin x\,dx=2$をモンテカルロ法で近似せよ．

1. Markdownセルに`# 課題2`と記入せよ．
2. `random.seed(2026)`を指定せよ．
3. 試行回数`[1000, 3000, 10000, 30000]`で近似値と誤差を求めよ．
4. 各試行回数，近似値，誤差を表示せよ．
5. 結果を`monte_carlo.csv`へ`trials,value,error`の形式で保存せよ．
6. 試行回数と誤差の関係をMarkdownセルに3文程度で説明せよ．
````

````{hidden-answer} 解答例
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
試行回数を増やすと，近似値は全体として正確な値へ近づく．ただし乱数を使うため，誤差は単調には減らないことがある．CSVへ保存した結果は，次回の可視化で利用できる．
````

## エラーが出たときにチェックすること

- `import random`を実行したか確認する．
- リストの添字は0から始まることを確認する．
- 再現したい場合は，乱数を生成する前にシードを固定する．
- 試行回数が0になっていないか確認する．

### 提出方法

- Colabの「ファイル」からNotebookを`.ipynb`形式でダウンロードする．
- WebClassの「第8回課題」から`第8回_<学籍番号>_<氏名>.ipynb`を提出する．
- `monte_carlo.csv`もあわせて提出する．
- 課題1・2の実行結果と考察が表示されていることを確認する．

### 提出期限

<span style="color: red; ">11月20日(金)23:59まで</span>

質問等がある場合には

- メール kkagawa@josai.ac.jp
- Teamsのチャット
- WebClassのメッセージ

などで連絡してください．

## まとめ

- 乱数を使って不確実な現象を模擬できる．
- シードを固定すると結果を再現できる．
- モンテカルロ法は乱数を使って円周率や定積分を近似できる．
- 次回はシミュレーション結果をグラフで可視化する．
