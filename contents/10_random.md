# 第10回　数値計算3（乱数とシミュレーション）

<!-- 出席パスワード：**947885** -->

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

```python
import math

# 積分したい関数 f(x) = sin(x)
def f(x):
    return math.sin(x)

# 区分求積法（左端）
def integral_riemann(f, a, b, n=1000):
    width = (b - a) / n
    s = 0
    for i in range(n):
        x = a + i * width  # 左端
        s += f(x) * width
    return s

# 台形公式
def integral_trapezoid(f, a, b, n=1000):
    h = (b - a) / n
    s = 0
    # 内側の点
    for i in range(1, n):
        x = a + i * h
        s += 2 * f(x)
    # 両端
    s += f(a) + f(b)
    return s * h / 2


# 正確な値 ∫_0^π sin x dx = 2
exact = 2.0

# 分割数の候補
ns = [10, 20, 40, 80, 160]

# ex2.txt に書き出す
with open("ex2.txt", "w", encoding="utf-8") as f_out:
    # ヘッダ行
    f_out.write("n, riemann_error, trapezoid_error\n")

    for n in ns:
        riem = integral_riemann(f, 0, math.pi, n)
        trap = integral_trapezoid(f, 0, math.pi, n)
        err_r = abs(riem - exact)
        err_t = abs(trap - exact)

        # 画面にも確認用に表示（任意）
        print(f"n = {n}, 区分求積法 誤差 = {err_r}, 台形公式 誤差 = {err_t}")

        # ファイルに書き込み（カンマ区切り）
        f_out.write(f"{n}, {err_r}, {err_t}\n")
```

---

## 乱数とは何か

コンピュータで使う“乱数”は正確には **疑似乱数（pseudo random numbers）** と呼ばれる．

- 完全なランダムではない
- ある規則に従って計算される（=アルゴリズムで生成される）
- 十分ランダムに見えるため，統計・物理・機械学習などで広く使用される

Python では `random` モジュールを使用する：

```python
import random
```

---

## 乱数の基本的な使い方

### 0以上1未満の一様乱数

```python
random.random()
```

例：

```python
for i in range(5):
    print(random.random())
```

### 任意区間の実数乱数

```python
random.uniform(a, b)
```

例：

```python
random.uniform(-1, 1)
```

### 整数乱数

```python
random.randint(a, b)   # a〜bの整数（両端を含む）
```

例：

```python
random.randint(1, 6)   # サイコロ
```

### リストからランダムに選ぶ

```python
random.choice(mylist)
```

例：

```python
cards = ["A", "J", "Q", "K"]
random.choice(cards)
```

### 正規分布に従う乱数

```python
random.gauss(mu, sigma)
```

例：

```python
random.gauss(0, 1)   # 平均0・標準偏差1の正規乱数
```

---

## シード値（seed）とは

乱数は同じプログラムを実行しても毎回異なる値が出る．

しかし次のようにシードを固定すると，**常に同じ乱数列が得られる**．

```python
random.seed(0)
```

用途：

- デバッグ
- 再現性が必要な研究

---

```{note}
**演習1**

以下を実行し，「シードを固定すると結果が変わらない」ことを確認せよ．

```python
random.seed(0)
for i in range(5):
    print(random.random())
```

次に `random.seed()` を外して実行し，結果が変わることを確認せよ．

---

## 乱数を使ったシミュレーション  

### 例：サイコロを 1000 回振ったときの平均値

```python
total = 0
for i in range(1000):
    total += random.randint(1, 6)

print("平均値 =", total / 1000)
````

```{note}
**演習2**

サイコロを 5000 回振ったときの **1〜6 が出る回数** を数え，  
次の形式で表示せよ：

```text
1: xxx回
2: xxx回
…
6: xxx回
```

---

## モンテカルロ法（Monte Carlo Method）

乱数を用いて数値的に値を近似する強力な方法．
最も有名な例として **円周率 π の近似** がある．

### モンテカルロ法で π を求める

考え方：

- 半径 1 の 1/4 円を考える
- 正方形（面積 1）にランダムに点を打つ
- 円の中に入った確率が π/4 に近づく

円の中判定：

```python
if x*x + y*y <= 1:
    count += 1
```

### 実装例（簡単）

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

---

```{note}
**演習3**

`approximate_pi(N)` を使って，

- N = 1,000  
- N = 10,000  
- N = 100,000  

で π の近似値がどれだけ変化するか調べよ．
```

---

## さらに進んだ例：ランダムウォーク

1次元ランダムウォーク：

- 右へ +1
- 左へ -1
- 繰り返すと「予測不能な動き」をするが，統計的には特徴がある

```python
import random

position = 0
for i in range(100):
    step = random.choice([-1, 1])
    position += step
print(position)
```

```{note}
**演習4（やや発展）**

1次元ランダムウォークを1000ステップ行い，  
最終位置を求めよ．  

さらに，100回試行して「最終位置の平均値」を求めよ．
```

---

```{note}
<span style="color:red">**課題1**</span>

次の方法で π を推定する関数 `estimate_pi(n)` を作成せよ．

1. ランダムに点 (x, y) を n 回生成する（0〜1の一様乱数）
2. 点が四分円内に入った回数を数える
3. 比率を 4 倍して π を近似する
4. n = 1000, 5000, 10000 で近似値を表示せよ
```

出力例：
<!-- 
```
n = 1000   π ≈ 3.128
n = 5000   π ≈ 3.152
n = 10000  π ≈ 3.140
```
 -->

---

## モンテカルロ法を用いた「積分」の計算

モンテカルロ法は π の近似だけでなく，
**定積分を近似する方法**としても広く使われます．

### 基本アイデア

積分

$$
I = \int_a^b f(x), dx
$$

を求めたいとき，区間 $[a,b]$ にランダムな一様乱数 $x_i$ を生成し，

$$
I \approx (b-a) \cdot \frac{1}{N} \sum_{i=1}^N f(x_i)
$$

と近似する．

つまり，

- 区間$[a,b]$の中でランダムに点を選び
- その点での関数値の平均を取る
- その平均に区間の長さをかける

という手続き．

シンプルだが，次の特徴がある：

- 高次元でも適用できる（多重積分に強い）
- 区分求積法・台形公式より遅い収束（**誤差は (1/\sqrt{N})**）
- シミュレーションと相性がよい

---

## 例：$\displaystyle \int_0^1 x^2 dx = \frac{1}{3}$

解析解は 1/3 ≈ **0.333333…**

### モンテカルロ法で計算する

```python
import random

def mc_integral(f, a, b, N=10000):
    total = 0
    for _ in range(N):
        x = random.uniform(a, b)   # 区間[a,b] の乱数
        total += f(x)
    return (b - a) * total / N
```

実行例：

```python
def f(x):
    return x**2

approx = mc_integral(f, 0, 1, N=10000)
print(approx)
```

---

```{note}
**演習（追加）**

次の積分をモンテカルロ法で近似せよ．

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

1. $N = 1000, 5000, 10000$ で近似値を求め，正確な値 $1/3$ と比較せよ．  
2. 誤差の減り方が **区分求積法・台形公式** とどう違うか考察せよ．
```

---

## 例：$\displaystyle \int_0^\pi \sin x dx = 2$

解析解：2

実装例：

```python
import math

def f(x):
    return math.sin(x)

approx = mc_integral(f, 0, math.pi, N=20000)
print(approx)
```

```{note}
**演習（追加2）**

$$
\int_0^\pi \sin x dx = 2
$$

について，  
$N = 2000, 5000, 20000$ でモンテカルロ法による近似値を計算し，  
**区分求積法や台形公式との収束速度の違い**を比較せよ．

（ヒント：モンテカルロ法の誤差はおおむね $1/\sqrt{N}$ に比例する）
```

---

## 応用：確率的シミュレーションとのつながり

モンテカルロ法は，次のような問題にも利用される：

- 確率分布の期待値計算
- 統計的推定
- 物理シミュレーション（統計力学，分子運動）
- 金融工学（オプション価格の計算）
- 機械学習（MCMC など）

π の近似や積分の計算はその第一歩である．

## まとめ

- Pythonの `random` モジュールを使って乱数を生成できる
- 一様乱数・整数乱数・正規乱数が扱える
- 乱数シードにより再現性を確保できる
- モンテカルロ法という強力な数値的手法を体験した
- 乱数は統計・機械学習・物理シミュレーションで欠かせない

