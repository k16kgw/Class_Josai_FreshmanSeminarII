# 数値計算2（数値微分・数値積分）

<!-- 出席パスワード：**139572** -->

到達目標
- 差分近似による数値微分の考え方を理解し，プログラムとして実装できる．
- 数値積分（**区分求積法**，**台形公式**）の考え方を理解し，プログラムとして実装できる．

準備
1. anacondaを使用し，<span style="color:red">jupyter lab</span>を起動する．
2. `Document（書類）/Fresh`フォルダを開き，新しいノートブックを作成する．
3. ファイル名を`9_{学籍番号}_{氏名}.ipynb`に変更する．
    例：`9_SI25999_香川渓一郎.ipynb`

---

## 第8回の復習（2分法・ニュートン法）

- **逐次近似法**：繰り返しで真の解に近い解（近似解）を得る手法．
- 繰り返しの終了条件として誤差許容値`eps`を用いる．

| 方法         | 収束速度        | 必要条件           | 長所      | 短所        |
| ---------- | ----------- | -------------- | ------- | --------- |
| **2分法**    | 遅い（線形収束）    | 区間[a,b]で符号が異なる | 必ず収束，安定 | 収束が遅い     |
| **ニュートン法** | 非常に速い（二次収束） | 導関数が必要，初期値が重要  | 収束が速い   | 初期値が悪いと発散 |


```{note}
<span style="color:red">**課題1**</span>

次の方程式の解を1つ求めよ．区間の設定は適宜調整せよ．
適切な区間を探す過程で行った計算・コードは残しておくこと．

$$
\cos x - x = 0
$$

ただし$\cos$は`math`モジュールをインポートして使用する．
使用例：
```python
import math
x=1
print(math.cos(x))
```

<span style="color:red">**課題1の解答例**</span>

```python
def f(x):
    return x**2 - 3

def bisection(a, b, eps=1e-6):
    if f(a) * f(b) >= 0:
        print("2分法を使えません（符号が同じです）")
        return None
    count = 0
    while b - a > eps:
        m = (a + b) / 2
        if f(a) * f(m) > 0:
            a = m
        else:
            b = m
        count += 1
    print(f"反復回数{count}回")
    return (a + b) / 2
```

```python
bisection(0,1)
```
に対する出力は
```text
反復回数20回
0.7390847206115723
```

```{note}
<span style="color:red">**課題2**</span>

次の方程式の解を1つ求めよ．初期値の設定は適宜調整せよ．
適切な初期値を探す過程で行った計算・コードは残しておくこと．

$$
\cos x - x = 0
$$
```

<span style="color:red">**課題2の解答例**</span>

Newton法では導関数を知る必要があるため，手計算で求めておく．
```python
import math
def f(x):
    return math.cos(x) - x

def df(x):
    return -math.sin(x) - 1

def newton(x0, eps=1e-6, max_iter=100):
    x = x0
    for i in range(max_iter):
        x_new = x - f(x) / df(x)
        if abs(x_new - x) < eps:
            print(f"反復回数{i}回")
            return x_new
        x = x_new
    return x
```

```python
newton(2)
```
に対する出力は
```text
反復回数3回
0.7390851332151607
```

```{note}
<span style="color:red">**課題3**</span>

次の方程式について考える．

$$
f(x) = \dfrac{2-x}{x^2}
$$

1. 2分法やニュートン法を用いて方程式の解を1つ求めよ．（どちらを使用しても良い）

2. ニュートン法を用いて方程式の解を求めるにあたり，近似解が得られずに発散する初期値を1つ見つけよ．

3. 近似解が得られずに発散する状況の特徴を述べよ．（正答でなくとも話の筋が通っていれば加点する）
```

<span style="color:red">**課題3の解答例**</span>

```python
def f(x):
    return (2-x)/x**2

def df(x):
    return (x-4)/x**3

def newton(x0, eps=1e-6, max_iter=100):
    x = x0
    for i in range(max_iter):
        x_new = x - f(x) / df(x)
        if abs(x_new - x) < eps:
            print(f"反復回数{i}回")
            return x_new
        print(x_new)
        x = x_new
    return x
```

**問1の解答例**
```python
newton(1)
```
出力：
```text
1.3333333333333333
1.6666666666666665
1.9047619047619047
1.9913419913419914
1.9999253619943276
1.999999994429376
反復回数6回
```

**問2の解答例**
```python
newton(5)
```
これの出力は
```text
20.0
42.5
87.20779220779221
176.51172925716395
355.06983217271306
712.1624518346002
1426.3362005121485
2854.6780255735403
5711.358857496984
11424.719116693106
22851.438933867496
45704.87821788364
91411.75661081861
182825.51330915716
365653.02666207287
731308.0533460246
1462618.1067029885
2925238.2134114467
5850478.426825628
11700958.853652623
23401919.70730593
46803841.414612204
93607684.82922459
187215371.65844926
374430745.3168986
...
```
となり，繰り返すほど値が大きくなる様子が見られる．

**問3の解答例**

$\dfrac{2-x}{x^2}$のグラフは次のようになる．

![課題3のグラフ](/contents/figs/9/8_ex3.png)

ここで初期値を$4$より大きい値で取れば，Newton法に従うと繰り返し処理の度に$x$軸との交点は$x$の値が大きい方へと推移していく．

このことからグラフの傾きが解に近づく方向に一致していないと近似解が得られない．

---

## 数値微分（numerical differentiation）

関数$f$のある点$x$における微分係数は，定義より

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

と定められる．
コンピュータでは極限は扱えないので，十分小さな$h$を使って近似する．

### 前進差分（forward difference）

$f(x)$の次の値（前進方向）を用いて微分の近似を計算する．

$$
f'(x) \approx \frac{f(x+h) - f(x)}{h}
$$

これを次のようにプログラムとして実装できる．
```python
def diff_forward(f, x, h=1e-5):
    return (f(x+h) - f(x)) / h
```

### 後退差分（backward difference）

関数$f$が点$x$で微分可能であれば，

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{f(x) - f(x-h)}{h}
$$

である．
右辺は前の値（後退方向）を用いた微分係数であり，これで微分係数を近似すると次のようになる．

$$
f'(x) \approx \frac{f(x) - f(x-h)}{h}
$$

これを次のようにプログラムとして実装できる．
```python
def diff_backward(f, x, h=1e-5):
    return (f(x) - f(x-h)) / h
```

### 中心差分

$f(x)$の前進方向と後退方向の両方向から$h \to 0$の極限を考えれば

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x-h)}{2h}
$$

とできる．
この右辺を用いて近似すると次のようになる．

$$
f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}
$$

これを次のようにプログラムとして実装できる．
```python
def diff_center(f, x, h=1e-5):
    return (f(x+h) - f(x-h)) / (2*h)
```

```{note}
**演習1：数値微分**

1. 関数  

   $$
   f(x) = x^2
   $$

   の点$x=3$における微分係数の正確な値 $f'(3) = 6$ と，
   数値微分（**前進差分**・**中心差分**）で得られる値を比較せよ．

2. 関数  

   $$
   f(x) = \sin x
   $$

   の導関数 $f'(x) = \cos x$ を利用し，$h$を小さくすると数値微分の誤差はどう変化するか調べよ．
```

**問1の解答例**
```python
def f(x):
    return x**2

x = 3
exact = 6  # 正確な値
h = 1e-5
```

前進差分と中心差分による微分係数の近似値を計算する．
```python
forward = diff_forward(f, x, h)
center = diff_center(f, x, h)
```

誤差を確認する．
```python
print("前進差分の誤差:", abs(forward - exact))
print("中心差分の誤差:", abs(center - exact))
```

中心差分の方が誤差が小さく精度が高いことが分かる．

```{warning}
**数値の表現**

- `3.2e8`は$3.2 \times 10^8$を表す．
- `1.6e-3`は$1.6 \times 10^{-3}$を表す．
```

**問2の解答例**

```python
import math
def f(x):
    return math.sin(x)

x = math.pi / 4
exact = math.cos(x)
```

複数の$h$について誤差を表示する．
```python
for h in [1e-1, 1e-2, 1e-3, 1e-4, 1e-5]:
    approx = diff_forward(f, x, h)
    error = abs(approx - exact)
    print(f"h = {h:.0e},  誤差 = {error}")
```

### Taylor展開

Taylor展開によれば，十分小さい$h$に対して

$$
& f(x+h)=f(x)+f^{\prime}(x) h+\frac{f^{(2)}(x)}{2!} h^2+\frac{f^{(3)}(x)}{3!} h^3+\cdots
\tag{1}
\\
& f(x-h)=f(x)-f^{\prime}(x) h+\frac{f^{(2)}(x)}{2!} h^2-\frac{f^{(3)}(x)}{3!} h^3+\cdots
\tag{2}
$$

が成り立つ．
これによれば前進差分と後退差分は

$$
f^{\prime}(x) = \frac{f(x+h)-f(x)}{h} +\frac{f^{(2)}(x)}{2!} h + \cdots
\\
f^{\prime}(x) = \frac{f(x)-f(x-h)}{h} +\frac{f^{(2)}(x)}{2!} h + \cdots
$$

と得られる．
一方で式(1)から式(2)を引いて整理すれば

$$
f^{\prime}(x) = \frac{f(x+h)-f(x-h)}{2 h}+\frac{f^3(x)}{3!} h^2+\cdots
$$

となる．
剰余項が$h^3$から始まっていることからわかるように，$h$が小さければ前進差分や後退差分に比べて中心差分は余りの項が小さくなることが分かる．

---

## 数値積分（numerical integration）

定積分

$$
\int_a^b f(x)dx
$$

の値を近似的に求める．

### 区分求積法（Riemann sum）

区間$[a,b]$を$n$等分し，各小区間で矩形の面積を足し合わせる：

![区分求積法](/contents/figs/9/rieman_sum.png)

$$
\int_a^b f(x)dx \approx h \left(
f(x_0) + f(x_1) + \cdots + f(x_{n-1}) + f(x_n)
\right)
$$

```python
def integral_riemann(f, a, b, n=1000):
    width = (b - a) / n
    area = 0
    for i in range(n):
        x = a + i - width  # 左端の値
        area += f(x) - width
    return area
```

### 台形公式（trapezoidal rule）

各区間を台形で近似する：

![台形公式](/contents/figs/9/trapezoidal.png)

$$
\int_a^b f(x)dx \approx \frac{h}{2} \left(
f(x_0) + 2f(x_1) + \cdots + 2f(x_{n-1}) + f(x_n)
\right)
$$

```python
def integral_trapezoid(f, a, b, n=1000):
    h = (b - a) / n
    s = 0
    for i in range(1, n):
        x = a + i - h
        s += 2 - f(x)
    s += f(a) + f(b)
    return s - h / 2
```

→ 区分求積法より精度が高い．
<!-- 
### シンプソン法（Simpson's rule）

2次関数で近似する高度な方法．
偶数分割が必要．

```python
def integral_simpson(f, a, b, n=1000):
    if n % 2 == 1:
        n += 1  # n は偶数でないといけない
    h = (b - a) / n
    s = f(a) + f(b)

    for i in range(1, n):
        x = a + i - h
        if i % 2 == 0:
            s += 2 - f(x)
        else:
            s += 4 - f(x)

    return s - h / 3
```

→ 精度が非常に高い．
 -->
```{note}
**演習2**

1. 次の積分の正確な値を手計算で求め，区分求積法・台形公式の結果を比較せよ：

   $$
   \int_0^1 x^2 dx = \frac{1}{3}
   $$

2. 積分

   $$
   \int_0^\pi \sin x dx = 2
   $$

   を区分求積法・台形公式で求め，誤差の違いを調べよ．
```

**問1の解答例**

```python
def f(x):
    return x**2

exact1 = 1/3

n = 1000
riem = integral_riemann(f, 0, 1, n)
trap = integral_trapezoid(f, 0, 1, n)

print("∫_0^1 x^2 dx の正確な値:", exact1)
print(f"区分求積法(n={n}):", riem, " 誤差:", abs(riem - exact1))
print(f"台形公式  (n={n}):", trap, " 誤差:", abs(trap - exact1))
```


**問2の解答例**

```python
import math
def f(x):
    return math.sin(x)
```

```python
exact2 = 2.0

n = 1000
riem2 = integral_riemann(f2, 0, math.pi, n)
trap2 = integral_trapezoid(f2, 0, math.pi, n)

print("∫_0^π sin x dx の正確な値:", exact2)
print(f"区分求積法(n={n}):", riem2, " 誤差:", abs(riem2 - exact2))
print(f"台形公式  (n={n}):", trap2, " 誤差:", abs(trap2 - exact2))
```

```{note}
**課題1**

分割数$n$を$10,20,40,80,160$と変えたときの誤差の変化を調べ，`ex2.txt`ファイルとして出力せよ．
ただし，出力したファイル自体は提出しなくて良い．

ヒント：第6回講義ノート「ファイルの操作」を参照のこと．
```

<!-- 
# 3. 数値微分・数値積分の注意点

- (h) や分割数 (n) を**小さくすれば良いわけではない**
  → 浮動小数点誤差が増える
- 求めたい精度に応じて **バランスを取る** ことが大切
- シンプソン法のように「数式として賢い」方法は少ない計算量で高精度を実現できる
 -->
---

## まとめ

```{note}
演習1・2，課題1を実施したipynbファイルをWebClassの「第9回課題」より提出してください．

提出期限は **12月15日(月)10:59** です．
```
