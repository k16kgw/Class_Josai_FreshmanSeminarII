# 数値計算3（乱数とシミュレーション）

出席パスワード：**947885**

到達目標
- **乱数とは何か**を理解する
- Python の `random` モジュールを使って乱数を生成できる
- 一様乱数・整数乱数・正規乱数を扱える
- 乱数を使った簡単なシミュレーション（モンテカルロ法）が実装できる

準備
1. anacondaを使用し，<span style="color:red">jupyter lab</span>を起動する．
2. `Document（書類）/Fresh`フォルダを開き，新しいノートブックを作成する．
3. ファイル名を`10_{学籍番号}_{氏名}.ipynb`に変更する．
    例：`10_SI25999_香川渓一郎.ipynb`

## 第9回の復習

- **数値微分**（前進差分・中心差分）
- **数値積分**（区分求積法・台形公式）
- 分割数・差分幅による誤差の変化

これらはすべて「計算を細かく分割して近似する」という数値計算の基本的考え方であった．

```{note}
<span style="color:red">**第9回課題1**</span>

分割数$n$を$10,20,40,80,160$と変えたときの誤差の変化を調べ，`ex2.txt`ファイルとして出力せよ．
ただし，出力したファイル自体は提出しなくて良い．

ヒント：第6回講義ノート「ファイルの操作」を参照のこと．
```

<!-- 
```python
import math

# 積分したい関数 f(x) = sin(x)
def f(x):
    return math.sin(x)
# 正確な値 ∫_0^π sin x dx = 2
exact = 2.0

# 区分求積法
def integral_riemann(f, a, b, n=1000):
    width = (b - a) / n
    area = 0
    for i in range(n):
        x = a + i * width  # 左端の値
        area += f(x) * width
    return area

# 台形公式
def integral_trapezoid(f, a, b, n=1000):
    h = (b - a) / n
    s = 0
    for i in range(1, n):
        x = a + i * h
        s += 2 * f(x)
    s += f(a) + f(b)
    return s * h / 2

# 分割数の候補
ns = [10, 20, 40, 80, 160]

# ex2.txt に書き出す
with open("ex2.txt", "w") as file:
    # タイトル行
    file.write("n, riemann_error, trapezoid_error\n")
    # nsのリストの要素全てについて数値積分を計算
    for n in ns:
        riem = integral_riemann(f, 0, math.pi, n)
        trap = integral_trapezoid(f, 0, math.pi, n)
        # 厳密な積分値と区分求積法に基づく数値積分の値の差を比較
        err_r = abs(riem - exact)
        # 厳密な積分値と台形公式に基づく数値積分の値の差を比較
        err_t = abs(trap - exact)

        # ファイルに書き込み（カンマ区切り）
        file.write(f"{n}, {err_r}, {err_t}\n")

        # 画面にも確認用に表示（任意）
        print(f"n = {n}, 区分求積法の誤差 = {err_r}, 台形公式の誤差 = {err_t}")
```
 -->

```python
# 積分したい関数 f(x) = x^2
def f(x):
    return x**2
# 正確な値 ∫_0^1 x^2 dx = 1/3
exact = 1/3

# 区分求積法
def integral_riemann(f, a, b, n=1000):
    width = (b - a) / n
    area = 0
    for i in range(n):
        x = a + i * width  # 左端の値
        area += f(x) * width
    return area

# 台形公式
def integral_trapezoid(f, a, b, n=1000):
    width = (b-a)/n
    sum_f = 0
    for i in range(n):
        x = a + i*width
        x_next = x + width
        sum_f += f(x) + f(x_next)
    return sum_f * width / 2

# 分割数の候補
ns = [10, 20, 40, 80, 160]

# ex2.txt に書き出す
with open("ex2.txt", "w") as file:
    # タイトル行
    file.write("n, riemann_error, trapezoid_error\n")
    # nsのリストの要素全てについて数値積分を計算
    for n in ns:
        riem = integral_riemann(f, 0, 1, n)
        trap = integral_trapezoid(f, 0, 1, n)
        # 厳密な積分値と区分求積法に基づく数値積分の値の差を比較
        err_r = abs(riem - exact)
        # 厳密な積分値と台形公式に基づく数値積分の値の差を比較
        err_t = abs(trap - exact)

        # ファイルに書き込み（カンマ区切り）
        file.write(f"{n}, {err_r}, {err_t}\n")

        # 画面にも確認用に表示（任意）
        print(f"n = {n}, 区分求積法の誤差 = {err_r}, 台形公式の誤差 = {err_t}")
```

---

## 乱数

コンピュータで使う“乱数”は正確には **疑似乱数**（pseudo random numbers）と呼ばれる．

- 完全なランダムではない．
- ある規則に従って計算される（アルゴリズムで生成される）．
- 十分ランダムに見えるため，統計・物理・機械学習などで広く使用される．

Python では `random` モジュールを使用する：

```python
import random
```

---

### 様々な乱数

どのような確率に基づいて乱数を発生するか，どの範囲で乱数を発生させるかによって分類．

| 分類 | メソッド | 使用例 |
| :--- | :---    | :---  |
| デフォルトの設定（0以上1未満の一様乱数） | `random.random()` | 5回繰り返しランダムに数が生成する．<pre><code class="language-python">for i in range(5):<br>    print(random.random())</code></pre> |
| 一様乱数（任意の区間$[a,b]$）        | `random.uniform(a, b)` | 区間$[-1,1]$での実数を等確率で出力する．<br>`random.uniform(-1, 1)` |
| 整数の乱数（両端は含む） | `random.randint(a, b)` | `random.randint(1, 6)` |
| リストからランダムに選ぶ | `random.choice(mylist)` | <pre><code class="language-python">cards = ["A", "J", "Q", "K"]<br>random.choice(cards)</code></pre> |
| 正規分布（平均`mu`，分散`sigma`）に従う乱数 | `random.gauss(mu, sigma)` | `random.gauss(0, 1)` |

---

### シード（seed）

```python
for i in range(5):
    print(random.random())
```

- 上を実行すれば分かるように，同じプログラムを実行しても乱数は毎回異なる値が出力される．
- しかし，乱数を使用する前に`random.seed(0)`のようにシードを固定すると，**常に同じ乱数列が得られる**．
- ここにseedメソッドの引数（ここでは`0`とした）を**シード値**と呼び，この値ごとに異なる乱数が出力される．

```python
random.seed(0)
for i in range(5):
    print(random.random())
```

用途：
- デバッグ
- 再現性が必要な研究

```{note}
**演習1**

以下を2回ずつ実行し，
- シードを指定しないと結果が変わること
- シードを固定すると結果が変わらないこと

を確認せよ．

```python
for i in range(5):
    print(random.random())
```

**シードを指定しない場合**
```python
for i in range(5):
    print(random.random())
```

```python
for i in range(5):
    print(random.random())
```

**シードを指定する場合**
```python
random.seed(0)
for i in range(5):
    print(random.random())
```

```python
random.seed(0)
for i in range(5):
    print(random.random())
```

---

### シミュレーション  

サイコロを 1000 回振ったときの平均値

```python
total = 0
for i in range(1000):
    total += random.randint(1, 6)

print("平均値 =", total / 1000)
````

サイコロを振ったときに出る目の期待値$3.5$に近い値が得られる．

```{note}
<span style="color:red">**課題1**</span>

サイコロを 5000 回振ったときの **1〜6 が出る回数** を数え，  
次の形式で表示せよ：

```text
1: xxx回
2: xxx回
3: xxx回
4: xxx回
5: xxx回
6: xxx回
```

---

## モンテカルロ法（Monte Carlo Method）

- 乱数を用いて数値的に値を近似する強力な方法．
- 例：
  - **円周率 π の近似**
  - **定積分を近似する方法**


### 円周率 π の近似値を求める

考え方：

- 半径 1 の 1/4 円を考える
- 正方形（面積 1）にランダムに点を打つ
- 円の中に入った確率が π/4 に近づく

**円の中の判定**
```python
if x*x + y*y <= 1:
    count += 1
```

**実装例**
```python
import random

def approximate_pi(N):
    count = 0
    for _ in range(N):
        x = random.random()
        y = random.random()
        if x*x + y*y <= 1:
            count += 1
    return 4 * count / N

print(approximate_pi(10000))
```

```{note}
**演習2**

`approximate_pi(N)` を使って，

- N = 1,000  
- N = 100,000  
- N = 10,000,000  

で π の近似値がどれだけ変化するか調べよ．
```

### 積分

積分

$$
I = \int_a^b f(x) dx
$$

を求めたいとき，区間 $[a,b]$ にランダムな一様乱数 $x_i$ を生成し，

$$
I \sim (b-a)\cdot \dfrac{1}{N} \sum_{i=1}^N f(x_i)
$$

と近似する．

つまり，

1. 区間$[a,b]$の中でランダムに点を選ぶ．
2. その点での関数値の平均を取る．
3. その平均に区間の長さをかける．

特徴
- 高次元でも適用できる（多重積分に強い）．
- 区分求積法・台形公式より収束が遅い．（$N$の増加に対して真の値に近づく速さが遅い）
<!-- - 区分求積法・台形公式より遅い収束（**誤差は $\frac{1}{\sqrt{N}}$**） -->

関数
```python
import random

def mc_integral(f, a, b, N=10000):
    total = 0
    for _ in range(N):
        x = random.uniform(a, b)   # 区間[a,b] の乱数
        total += f(x)
    return (b - a) * total / N
```

```{tip}
例：$\int_0^1 x^2 dx = \frac{1}{3}$の計算

解は 1/3 ≈ **0.333333…**

実行例：

```python
def f(x):
    return x**2

approx = mc_integral(f, 0, 1, N=10000)
print(approx)
```

```{note}
**演習3**

次の積分をモンテカルロ法で近似する．

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

1. $N = 1000, 3000, 10000$ で近似値を求め，正確な値 $1/3$ と比較せよ．  
2. 誤差の減り方が **区分求積法・台形公式** とどう違うか考察せよ．（前回第9回のコードを流用）
```

```{tip}
例：$\int_0^\pi \sin x dx = 2$の計算

解は2．

実行例
```python
import math

def f(x):
    return math.sin(x)

approx = mc_integral(f, 0, math.pi, N=20000)
print(approx)
```

```{note}
<span style="color:red">**課題2**</span>

$$
\int_0^\pi \sin x dx = 2
$$

について，  
- $N = 1000, 3000, 10000, 30000$ でモンテカルロ法による近似値を計算し，**区分求積法と台形公式**に比べて真の値に近づく速さがどのように異なるかを比較せよ．
- つまり，$N=1000$から3・10・30倍になったときに誤差は何倍になるかを**モンテカルロ法**・**区分求積法**・**台形公式**について数値計算して求め，それぞれ比較せよ．

<!-- （ヒント：モンテカルロ法の誤差はおおむね $1/\sqrt{N}$ に比例する） -->
```

---

## 確率的シミュレーション

モンテカルロ法は，次のような問題にも利用される：

- 統計的推定
- 物理シミュレーション（統計力学，分子運動）
- 金融工学
- 機械学習
<!-- - 金融工学（オプション価格の計算） -->

---

## まとめ

- 乱数を使用するには，Pythonの `random` モジュールを使用する．
- 乱数には一様乱数・整数乱数・正規乱数などの種類がある．
- <span style="color:red">シード</span>（seed）を固定することにより乱数の再現性を確保できる．
- <span style="color:red">モンテカルロ法</span>：乱数を用いた数値的な手法．
- 乱数は統計・機械学習・物理シミュレーションなどで活用される．
