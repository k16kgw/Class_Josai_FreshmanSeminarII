# 第7回　数値計算2

### 到達目標

- 差分を使って導関数を近似できる．
- 台形公式を使って定積分を近似できる．
- 刻み幅や分割数と誤差の関係を調べられる．

### 前回の復習

第6回では，二分法とニュートン法で方程式の近似解を求めた．次のコードは前回の演習で使用した二分法である．

```python
def bisection(f, a, b, tolerance=1e-8):
    if f(a) * f(b) > 0:
        return None

    count = 0
    while b - a > tolerance:
        midpoint = (a + b) / 2
        if f(a) * f(midpoint) <= 0:
            b = midpoint
        else:
            a = midpoint
        count = count + 1

    return (a + b) / 2, count
```

今回は，関数の値を有限個だけ使って微分と積分を近似する．

### 前回の課題の解答例

````{tip} 解説：第6回課題1
```python
import math

def f(x):
    return math.cos(x) - x

print(f(0), f(1))
root, count = bisection(f, 0, 1, 1e-10)
print(root, count, f(root))
```

`f(0)`と`f(1)`の符号が異なるため，区間`[0, 1]`へ二分法を適用できる．近似解は約0.7391となり，`f(root)`は0に非常に近い．区間を半分にし続けるため，安定して近似解を得られる．
````

````{tip} 解説：第6回課題2
```python
def derivative(x):
    return -math.sin(x) - 1

newton_root, newton_count = newton(f, derivative, 1, 1e-10)
print(newton_root, newton_count, f(newton_root))
print(abs(root - newton_root))
```

ニュートン法でも二分法とほぼ同じ近似解が得られる．この例ではニュートン法の反復回数が少ない．一方で，ニュートン法には導関数と適切な初期値が必要である．
````

### Jupyter Notebookの準備

1. `Documents（書類）/Fresh2`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`第7回_<学籍番号>_<氏名>.ipynb`へ変更する．

```{tip} 注意：新しいNotebook
第6回のNotebookへ追記せず，第7回用のNotebookを新規作成する．
```

## 数値微分

**数値微分**：関数の値を使って導関数の値を数値的に近似する方法．コンピュータでは極限を直接計算できないため，十分小さな刻み幅を使う．

### 前進差分と中心差分

**前進差分**：点$x$と$x+h$の関数値を使う方法．

$$
f'(x)\approx\frac{f(x+h)-f(x)}{h}
$$

```python
def forward_difference(f, x, h):
    return (f(x + h) - f(x)) / h
```

**中心差分**：求めたい点の前後にある二つの関数値を使う数値微分の方法である．導関数を次の式で近似する．

$$
f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}
$$

```python
def central_difference(f, x, h):
    return (f(x + h) - f(x - h)) / (2 * h)

def f(x):
    return x ** 2

value = central_difference(f, 3, 0.001)
print(value)
```

**刻み幅**：関数値を計算する点の間隔である．上の式では`h`が刻み幅を表す．`f(x)=x^2`の`x=3`における導関数の値は6である．刻み幅`h`を変えて近似値を比較する．

````{note} 演習1
$f(x)=x^2$の$x=3$における微分係数を近似せよ．

次のコードにある3か所の`_____`を適切な値または関数名へ書き換え，二つの方法の誤差を比較せよ．

```python
def f(x):
    return x ** 2

h = _____
forward = _____(f, 3, h)
center = _____(f, 3, h)
print(forward, abs(forward - 6))
print(center, abs(center - 6))
```

**出力例**

```text
6.000999999999479 0.0009999999994789732
5.999999999999339 6.608047442568932e-13
```
````

````{hidden-answer} 解答例
```python
def f(x):
    return x ** 2

h = 1e-3
forward = forward_difference(f, 3, h)
center = central_difference(f, 3, h)
print(forward, abs(forward - 6))
print(center, abs(center - 6))
```
````

````{note} 演習2
$f(x)=\sin x$の$x=\pi/4$における微分係数を中心差分で近似せよ．

次のコードにある2か所の`_____`を適切な関数名へ書き換え，刻み幅ごとの誤差を比較せよ．

```python
import math

def f(x):
    return math._____(x)

x = math.pi / 4
exact = math.cos(x)
for h in [1e-1, 1e-2, 1e-3, 1e-4]:
    value = _____(f, x, h)
    print(h, value, abs(value - exact))
```

**出力例**

```text
0.1 0.7059288589999413 0.001177922186606284
0.01 0.7070949961324513 1.1785054096269398e-05
0.001 0.707106663335455 1.1785109255146864e-07
0.0001 0.70710678000796 1.1785875608794072e-09
```
````

````{hidden-answer} 解答例
```python
import math

def f(x):
    return math.sin(x)

x = math.pi / 4
exact = math.cos(x)
for h in [1e-1, 1e-2, 1e-3, 1e-4]:
    value = central_difference(f, x, h)
    print(h, value, abs(value - exact))
```
````

```{tip} 注意：刻み幅は小さければよいとは限らない
刻み幅を極端に小さくすると，コンピュータが実数を有限桁で扱うことによる丸め誤差の影響が大きくなる場合がある．
```

## 数値積分

**数値積分**：関数の値を使って定積分の値を数値的に近似する方法である．

### 区分求積法

**区分求積法**：積分区間を小区間に分け，長方形の面積を合計して定積分を近似する方法．

```python
def riemann_sum(f, a, b, n):
    width = (b - a) / n
    area = 0

    for i in range(n):
        x = a + i * width
        area = area + f(x) * width

    return area
```

### 台形公式

**台形公式**：各小区間の面積を台形で近似して合計する方法．

**分割数**：積分区間をいくつの小区間に分けるかを表す数である．この例では`n`が分割数を表す．

```python
def trapezoidal(f, a, b, n):
    h = (b - a) / n
    total = (f(a) + f(b)) / 2

    for i in range(1, n):
        x = a + i * h
        total = total + f(x)

    return h * total

def f(x):
    return x ** 2

value = trapezoidal(f, 0, 1, 100)
print(value)
```

`f(x)=x^2`を0から1まで積分した正確な値は`1 / 3`である．

````{note} 演習3
$f(x)=x^2$を0から1まで積分せよ．

次のコードにある2か所の`_____`を適切な関数名へ書き換え，二つの方法の誤差を比較せよ．

```python
def f(x):
    return x ** 2

exact = 1 / 3
riemann_value = _____(f, 0, 1, 100)
trapezoidal_value = _____(f, 0, 1, 100)
print(riemann_value, abs(riemann_value - exact))
print(trapezoidal_value, abs(trapezoidal_value - exact))
```

**出力例**

```text
0.32835000000000003 0.004983333333333284
0.33335000000000004 1.6666666666720342e-05
```
````

````{hidden-answer} 解答例
```python
def f(x):
    return x ** 2

exact = 1 / 3
riemann_value = riemann_sum(f, 0, 1, 100)
trapezoidal_value = trapezoidal(f, 0, 1, 100)
print(riemann_value, abs(riemann_value - exact))
print(trapezoidal_value, abs(trapezoidal_value - exact))
```
````

````{note} 演習4
分割数と誤差の関係を調べよ．

次のコードにある2か所の`_____`を適切な関数名へ書き換えよ．実行後，分割数を10倍にしたときの誤差の変化をMarkdownセルに2文程度で説明せよ．

```python
for n in [10, 100, 1000, 10000]:
    error_r = abs(_____(f, 0, 1, n) - exact)
    error_t = abs(_____(f, 0, 1, n) - exact)
    print(n, error_r, error_t)
```

**出力例**

```text
10 0.04833333333333323 0.0016666666666667607
100 0.004983333333333284 1.6666666666720342e-05
1000 0.0004998333333333105 1.66666666689963e-07
10000 4.999833333324544e-05 1.6666667490561338e-09
```
````

````{hidden-answer} 解答例
```python
for n in [10, 100, 1000, 10000]:
    error_r = abs(riemann_sum(f, 0, 1, n) - exact)
    error_t = abs(trapezoidal(f, 0, 1, n) - exact)
    print(n, error_r, error_t)
```
````

## 課題

````{warning} 課題1
$f(x)=\sin x$の$x=\pi/3$における微分係数を調べよ．

1. Markdownセルに`# 課題1`と記入し，$f(x)=\sin x$を定義せよ．
2. 5種類の刻み幅について，前進差分と中心差分による近似値の誤差を表示せよ．
3. 二つの方法の精度をMarkdownセルに3文程度で比較せよ．

次のテンプレートを基に完成させよ．`【　】`は，引数全体または1行以上の処理を記述する箇所を表す．

```python
import math

def f(【必要な引数をすべて記入】):
    【math.sinを使って関数値を返す処理を記入】

x = math.pi / 3
exact = math.cos(x)

【各刻み幅で前進差分と中心差分の誤差を求めて表示する処理を記入】
```

**出力例**

```text
0.1 0.04409811458923907 0.0008329167658590597
0.01 0.004338424226313031 8.333291661943854e-06
0.001 0.00043309599923013753 8.333339540644857e-08
0.0001 4.330210417979874e-05 8.338326695778164e-10
1e-05 4.330132974128542e-06 7.826794767851197e-12
```
````

````{hidden-answer} 解答例
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
同じ刻み幅では，中心差分の誤差が前進差分より小さい．刻み幅を小さくすると，どちらも正確な値へ近づく．ただし，極端に小さい刻み幅では丸め誤差に注意する必要がある．
````

````{warning} 課題2
$f(x)=x^3$を0から1まで数値積分せよ．

1. Markdownセルに`# 課題2`と記入し，4種類の分割数について区分求積法と台形公式の誤差を求めよ．
2. 結果を表示し，csvモジュールを使って`numerical_integration.csv`へ保存せよ．
3. 二つの方法をMarkdownセルに3文程度で比較せよ．

次のテンプレートを基に完成させよ．`【　】`は，引数全体または1行以上の処理を記述する箇所を表す．

```python
import csv

def f(【必要な引数をすべて記入】):
    【xの3乗を返す処理を記入】

exact = 1 / 4
rows = [["n", "riemann_error", "trapezoidal_error"]]

【各分割数の誤差を求め，表示してrowsへ追加する処理を記入】

【rowsをnumerical_integration.csvへ書き込む処理を記入】
```

**出力例**

```text
10 0.04749999999999996 0.0025000000000000577
100 0.0049749999999999794 2.4999999999997247e-05
1000 0.0004997499999999933 2.500000000349445e-07
10000 4.9997499999954176e-05 2.500000040317474e-09
```
````

````{hidden-answer} 解答例
```python
import csv

def f(x):
    return x ** 3

exact = 1 / 4
rows = [["n", "riemann_error", "trapezoidal_error"]]

for n in [10, 100, 1000, 10000]:
    error_r = abs(riemann_sum(f, 0, 1, n) - exact)
    error_t = abs(trapezoidal(f, 0, 1, n) - exact)
    rows.append([n, error_r, error_t])
    print(n, error_r, error_t)

with open("numerical_integration.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)
```
分割数を増やすと，どちらの誤差も小さくなる．同じ分割数では台形公式の誤差が小さい．CSVファイルに保存すると，後から表計算や可視化に利用できる．
````

## エラーが出たときにチェックすること

- `h`が0になっていないか確認する．
- 分割数`n`が正の整数か確認する．
- `range(1, n)`の範囲を確認する．
- 刻み幅を極端に小さくしても，丸め誤差により精度が上がらない場合がある．

### 提出方法

- WebClassの「第7回課題」から`第7回_<学籍番号>_<氏名>.ipynb`を提出する．
- 課題1・2の実行結果と考察を表示した状態で保存する．
- `numerical_integration.csv`もあわせて提出する．

### 提出期限

<span style="color: red; ">11月13日(金)23:59まで</span>

質問等がある場合には

- メール kkagawa@josai.ac.jp
- Teamsのチャット
- WebClassのメッセージ

などで連絡してください．

## まとめ

1. **数値微分は近い点の関数値から傾きを求める**：中心差分は前進差分より高い精度を得られることが多い．
2. **数値積分は小区間の面積を合計する**：台形公式は区分求積法より誤差が小さくなることが多い．
3. **刻み幅や分割数が精度を左右する**：細かくすると一般に精度は上がるが，丸め誤差と計算量にも注意する．

- 次回は乱数を用いたシミュレーションを扱う．
