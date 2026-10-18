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

次のコードにある2か所の`_____`を適切な値または関数名へ書き換え，同じ乱数列が2回表示されることを確認せよ．

```python
import random

for _ in range(2):
    random.seed(_____)
    values = []
    for _ in range(5):
        values.append(random._____())
    print(values)
```

**出力例**

```text
[0.5714025946899135, 0.4288890546751146, 0.5780913011344704, 0.20609823213950174, 0.81332125135732]
[0.5714025946899135, 0.4288890546751146, 0.5780913011344704, 0.20609823213950174, 0.81332125135732]
```
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

次のコードにある4か所の`_____`を適切な値，関数名または式へ書き換えよ．

```python
import random

random.seed(10)
trials = _____
counts = [0, 0, 0, 0, 0, 0]

for _ in range(trials):
    value = random._____(1, 6)
    counts[value - 1] = counts[value - 1] + 1

for face in range(1, _____):
    print(f"{face}: {counts[face - 1]}回，相対度数 {counts[face - 1] / _____}")
```

**出力例**

```text
1: 159回，相対度数 0.159
2: 170回，相対度数 0.17
3: 141回，相対度数 0.141
4: 198回，相対度数 0.198
5: 165回，相対度数 0.165
6: 167回，相対度数 0.167
```
````

````{hidden-answer} 解答例
```python
import random

random.seed(10)
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

次のコードにある4か所の`_____`を適切な関数名または式へ書き換えよ．

```python
import math
import random

def approximate_pi(trials):
    inside = 0
    for _ in range(trials):
        x = random._____()
        y = random._____()
        if x ** 2 + y ** 2 <= 1:
            inside = inside + 1
    return _____ * inside / trials

random.seed(10)
for trials in [1000, 10000, 100000]:
    value = approximate_pi(trials)
    print(trials, value, abs(value - math._____))
```

**出力例**

```text
1000 3.104 0.037592653589793024
10000 3.1604 0.018807346410206982
100000 3.1414 0.00019265358979314584
```
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

random.seed(10)
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

次のコードにある2か所の`_____`を適切な式または関数名へ書き換えよ．

```python
def f(x):
    return _____

random.seed(10)
for trials in [1000, 10000, 100000]:
    value = _____(f, 0, 1, trials)
    print(trials, value, abs(value - 1 / 3))
```

**出力例**

```text
1000 0.3337151169125422 0.00038178357920887196
10000 0.3306476291650284 0.0026857041683049365
100000 0.33240785623516284 0.0009254770981704796
```
````

````{hidden-answer} 解答例
```python
import random

def f(x):
    return x ** 2

random.seed(10)
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

1. Markdownセルに`# 課題1`と記入し，シードを2026に固定してサイコロを5000回振れ．
2. 各出目の回数と相対度数，最も多く出た目を表示せよ．
3. 結果をMarkdownセルに2文程度で説明せよ．

次のテンプレートを基に完成させよ．`【　】`は，1行以上の処理を記述する箇所を表す．

```python
import random

random.seed(2026)
trials = 5000
counts = [0, 0, 0, 0, 0, 0]

【サイコロを5000回振り，各出目の回数を数える処理を記入】

【各出目の回数と相対度数を表示する処理を記入】

most_common = counts.index(max(counts)) + 1
print(f"最も多く出た目: {most_common}")
```

**出力例**

```text
1 863 0.1726
2 791 0.1582
3 875 0.175
4 849 0.1698
5 813 0.1626
6 809 0.1618
最も多く出た目: 3
```
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

1. Markdownセルに`# 課題2`と記入し，シードを2026に固定して4種類の試行回数で積分を近似せよ．
2. 試行回数，近似値，誤差を表示し，csvモジュールを使って`monte_carlo.csv`へ保存せよ．
3. 試行回数と誤差の関係をMarkdownセルに3文程度で説明せよ．

次のテンプレートを基に完成させよ．`【　】`は，引数全体または1行以上の処理を記述する箇所を表す．

```python
import csv
import math
import random

def f(【必要な引数をすべて記入】):
    【math.sinを使って関数値を返す処理を記入】

random.seed(2026)
rows = [["trials", "value", "error"]]

【各試行回数の近似値と誤差を求め，表示してrowsへ追加する処理を記入】

【rowsをmonte_carlo.csvへ書き込む処理を記入】
```

**出力例**

```text
1000 2.04419308175357 0.04419308175357006
3000 2.013969214289819 0.01396921428981912
10000 1.9989922132021545 0.0010077867978455224
30000 2.003228663654541 0.0032286636545411085
```
````

````{hidden-answer} 解答例
```python
import csv
import math
import random

def f(x):
    return math.sin(x)

random.seed(2026)
rows = [["trials", "value", "error"]]

for trials in [1000, 3000, 10000, 30000]:
    value = monte_carlo_integral(f, 0, math.pi, trials)
    error = abs(value - 2)
    rows.append([trials, value, error])
    print(trials, value, error)

with open("monte_carlo.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)
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

1. **疑似乱数で不確実な現象を模擬できる**：サイコロなどの反復試行をプログラムで再現できる．
2. **シードは再現性を与える**：同じシードと処理順序を使うと，同じ乱数列を生成できる．
3. **モンテカルロ法は多数の試行から値を推定する**：円周率や定積分を近似できるが，誤差は単調に減るとは限らない．

- 次回はシミュレーション結果をグラフで可視化する．
