# 第6回　数値計算1

### 到達目標

- 近似解，許容誤差，収束の意味を説明できる．
- 二分法とニュートン法をPythonで実装できる．
- 二つの方法の長所と注意点を比較できる．

### 前回の復習

第5回では，数学的な手順を関数として実装した．次のコードは前回の演習で作成したユークリッドの互除法である．

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

print(gcd(48, 18))
```

この関数は，余りが0になるまで値を更新する．今回も近似値を更新し，終了条件を満たすまで計算を繰り返す．

### 前回の課題の解答例

````{tip} 解説：第5回課題1
```python
def show_factorization(number):
    factors = prime_factorize(number)
    parts = []
    processed = []

    for factor in factors:
        if factor not in processed:
            count = factors.count(factor)
            if count == 1:
                parts.append(str(factor))
            else:
                parts.append(f"{factor}^{count}")
            processed.append(factor)

    print(f"{number} = {' × '.join(parts)}")

show_factorization(360)
```

`processed`に表示済みの素因数を記録し，同じ素因数の重複処理を防ぐ．`count`で指数を求め，`join`で各項を結ぶと，`360 = 2^3 × 3^2 × 5`の形にできる．このコードを実行する前に，前回作成した`prime_factorize`を定義しておく必要がある．
````

````{tip} 解説：第5回課題2
```python
def gcd_list(numbers):
    result = numbers[0]
    for number in numbers[1:]:
        result = gcd(result, number)
    return result

print(gcd_list([15, 10, 5]))
print(gcd_list([210, 147, 90, 63]))
```

先頭要素を初期値とし，残りの要素との最大公約数を順番に計算する．`result`には，処理済みのすべての要素に共通する最大公約数が保存される．関数の中から`gcd`を呼び出すことで処理を簡潔にしている．
````

### Jupyter Notebookの準備

1. JupyterLabを起動する．
2. `Documents（書類）/Fresh2`フォルダを開く．
3. Python 3のNotebookを新規作成する．
4. ファイル名を`第6回_<学籍番号>_<氏名>.ipynb`へ変更する．

```{tip} 注意：新しいNotebook
第5回のNotebookへ追記せず，第6回用のNotebookを新規作成する．保存先とファイル名を確認してから入力する．
```

## 方程式の解と近似

方程式$f(x)=0$を満たす$x$を，方程式の**解**または関数$f$の**根**という．

- **厳密解**：$\sqrt{2}$のように誤差なく表した解．
- **近似解**：`1.41421356`のように厳密解に近い数値で表した解．
- **反復法**：同じ形式の計算を繰り返して近似値を更新する方法．
- **許容誤差**：十分に正確であると判断して計算を終了するための基準．
- **収束**：反復するにつれて近似値が一定の値へ近づくこと．

```python
def f(x):
    return x ** 2 - 2

print(f(1))
print(f(2))
```

$f(1)<0$，$f(2)>0$である．連続関数の値の符号が変わる区間には，少なくとも一つの解が存在する．

````{note} 演習1
$f(x)=x^3-2$について解を含む区間を確認せよ．

次のコードにある1か所の`_____`を適切な式へ書き換え，関数値の符号が異なることを確認せよ．

```python
def f(x):
    return _____

print(f(1))
print(f(2))
```

**出力例**

```text
-1
6
```
````

````{hidden-answer} 解答例
```python
def f(x):
    return x ** 3 - 2

print(f(1))
print(f(2))
```
`f(1)=-1`，`f(2)=6`なので，解は1と2の間にある．
````

## 二分法

**二分法**：両端の関数値の符号が異なる区間を半分ずつ狭め，近似解を求める方法．

```text
while 区間の幅が許容誤差より大きい:
    中点を求める
    if 左端と中点で関数値の符号が異なる:
        右端を中点へ移す
    else:
        左端を中点へ移す
```

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

def f(x):
    return x ** 2 - 2

root, count = bisection(f, 1, 2)
print(root, count, f(root))
```

`1e-8`は$10^{-8}$を表す．近似解を元の関数へ代入した値が0に近いことも確認する．

```{tip} 注意：二分法の区間
開始時に$f(a)$と$f(b)$の符号が異なる必要がある．符号が同じ区間を指定した場合，この関数は`None`を返す．
```

````{note} 演習2
二分法で$x^3-2=0$の近似解を求めよ．

次のコードにある1か所の`_____`を適切な関数名へ書き換え，近似解を厳密解の数値と比較せよ．

```python
root, count = _____(f, 1, 2)
print(root, count, f(root))
print(2 ** (1 / 3))
```

**出力例**

```text
1.2599210478365421 27 -9.802190614749406e-09
1.2599210498948732
```
````

````{hidden-answer} 解答例
```python
def f(x):
    return x ** 3 - 2

root, count = bisection(f, 1, 2)
print(root, count, f(root))
print(2 ** (1 / 3))
```
````

````{note} 演習3
許容誤差と反復回数の関係を調べよ．

次のコードにある1か所の`_____`を適切な関数名へ書き換えよ．実行後，許容誤差と反復回数の関係をMarkdownセルに2文程度で説明せよ．

```python
for tolerance in [1e-2, 1e-4, 1e-6, 1e-8]:
    root, count = _____(f, 1, 2, tolerance)
    print(tolerance, root, count)
```

**出力例**

```text
0.01 1.26171875 7
0.0001 1.259918212890625 14
1e-06 1.259920597076416 20
1e-08 1.2599210478365421 27
```
````

````{hidden-answer} 解答例
```python
for tolerance in [1e-2, 1e-4, 1e-6, 1e-8]:
    root, count = bisection(f, 1, 2, tolerance)
    print(tolerance, root, count)
```
許容誤差を小さくすると精度は上がるが，反復回数も増える．
````

## ニュートン法

**ニュートン法**：現在の近似値における接線と$x$軸の交点を，次の近似値として使う反復法．

$$
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
$$

```text
xを初期値とする
最大反復回数まで繰り返す:
    導関数が0なら計算を終了する
    接線を使って新しい近似値を求める
    if 近似値の変化が許容誤差より小さい:
        近似解と反復回数を返す
    xを更新する
```

```python
def newton(f, derivative, initial_value, tolerance=1e-8, max_iterations=100):
    x = initial_value

    for count in range(max_iterations):
        if derivative(x) == 0:
            return None

        new_x = x - f(x) / derivative(x)
        if abs(new_x - x) < tolerance:
            return new_x, count + 1
        x = new_x

    return None

def f(x):
    return x ** 2 - 2

def derivative(x):
    return 2 * x

root, count = newton(f, derivative, 1)
print(root, count, f(root))
```

- **初期値**：反復計算を始める近似値．
- **最大反復回数**：収束しない計算を無限に続けないための上限．
- **発散**：近似値が解へ近づかないこと．

```{tip} 注意：ニュートン法の失敗
導関数が0の点では更新式を計算できない．また，初期値によっては発散する場合があるため，最大反復回数を設ける．
```

````{note} 演習4
ニュートン法で$x^3-2=0$の近似解を求めよ．

次のコードにある3か所の`_____`を適切な式または関数名へ書き換え，演習2の二分法と反復回数を比較せよ．

```python
def f(x):
    return _____

def derivative(x):
    return _____

root, count = _____(f, derivative, 1)
print(root, count, f(root))
```

**出力例**

```text
1.2599210498948732 5 0.0
```
````

````{hidden-answer} 解答例
```python
def f(x):
    return x ** 3 - 2

def derivative(x):
    return 3 * x ** 2

root, count = newton(f, derivative, 1)
print(root, count, f(root))
```
````

## 二つの方法の比較

| 方法 | 必要な情報 | 長所 | 注意点 |
| --- | --- | --- | --- |
| 二分法 | 符号が異なる区間 | 条件を満たせば安定して収束する | 収束が比較的遅い |
| ニュートン法 | 導関数と初期値 | 解の近くでは速く収束する | 初期値によって発散する場合がある |

````{note} 演習5
$x^2-3=0$を両方の方法で解き，近似解，反復回数，`abs(f(root))`を比較せよ．二分法は区間`[1, 2]`，ニュートン法は初期値2を使え．

次のコードにある4か所の`_____`を適切な式または関数名へ書き換えよ．

```python
def f(x):
    return _____

def derivative(x):
    return _____

b_root, b_count = _____(f, 1, 2)
n_root, n_count = _____(f, derivative, 2)
print(b_root, b_count, abs(f(b_root)))
print(n_root, n_count, abs(f(n_root)))
```

**出力例**

```text
1.732050810009241 27 8.453668431940287e-09
1.7320508075688772 4 4.440892098500626e-16
```
````

````{hidden-answer} 解答例
```python
def f(x):
    return x ** 2 - 3

def derivative(x):
    return 2 * x

b_root, b_count = bisection(f, 1, 2)
n_root, n_count = newton(f, derivative, 2)
print(b_root, b_count, abs(f(b_root)))
print(n_root, n_count, abs(f(n_root)))
```
````

## エラーが出たときにチェックすること

- 関数を引数として渡すとき，`f()`ではなく`f`と書いているか確認する．
- 二分法の区間の両端で関数値の符号が異なるか確認する．
- while文の中で端点を更新しているか確認する．
- 導関数の式が正しいか，値が0でないか確認する．
- 許容誤差が正の値か，最大反復回数を設定したか確認する．
- 近似解を元の関数へ代入し，関数値が0に近いか確認する．

## 課題

````{warning} 課題1
二分法で$\cos x-x=0$の近似解を求めよ．

1. Markdownセルに`# 課題1`と記入し，$f(x)=\cos x-x$を定義せよ．
2. 区間の両端で関数値の符号を確認し，区間`[0, 1]`，許容誤差`1e-10`で二分法を実行せよ．
3. 近似解，反復回数，関数値を表示し，結果をMarkdownセルに2文程度で説明せよ．

次のテンプレートを基に完成させよ．`【　】`は，引数全体または1行以上の処理を記述する箇所を表す．

```python
import math

def f(【必要な引数をすべて記入】):
    【math.cosを使って関数値を返す処理を記入】

print(f(0), f(1))
root, count = bisection(f, 0, 1, 1e-10)
print(root, count, f(root))
```

**出力例**

```text
1.0 -0.45969769413186023
0.7390851332165767 34 -2.369882068364859e-12
```
````

````{hidden-answer} 解答例
```python
import math

def f(x):
    return math.cos(x) - x

print(f(0), f(1))
root, count = bisection(f, 0, 1, 1e-10)
print(root, count, f(root))
```
区間の両端で符号が異なるため二分法を適用できる．近似解は約0.7391であり，その点の関数値は0に非常に近い．
````

````{warning} 課題2
ニュートン法で$\cos x-x=0$の近似解を求め，課題1と比較せよ．

1. Markdownセルに`# 課題2`と記入し，$f'(x)=-\sin x-1$を表す導関数を定義せよ．
2. 初期値1，許容誤差`1e-10`でニュートン法を実行し，近似解，反復回数，関数値を表示せよ．
3. 二分法の近似解との差を表示し，二つの方法をMarkdownセルに3文程度で比較せよ．

次のテンプレートを基に完成させよ．`【　】`は，引数全体または1行以上の処理を記述する箇所を表す．

```python
def derivative(【必要な引数をすべて記入】):
    【導関数の値を返す処理を記入】

newton_root, newton_count = newton(f, derivative, 1, 1e-10)
print(newton_root, newton_count, f(newton_root))
print(abs(root - newton_root))
```

**出力例**

```text
0.7390851332151607 5 0.0
1.4159784456069247e-12
```
````

````{hidden-answer} 解答例
```python
def derivative(x):
    return -math.sin(x) - 1

newton_root, newton_count = newton(f, derivative, 1, 1e-10)
print(newton_root, newton_count, f(newton_root))
print(abs(root - newton_root))
```
二つの方法からほぼ同じ近似解が得られる．この例ではニュートン法の反復回数が少ない．ただし，ニュートン法には導関数と適切な初期値が必要である．
````

### 提出方法

- WebClassの「第6回課題」から`第6回_<学籍番号>_<氏名>.ipynb`を提出する．
- 課題1・2の近似解，反復回数，関数値を表示した状態で保存する．
- 指定したMarkdownセルと考察があることを確認する．

### 提出期限

<span style="color: red; ">11月6日(金)23:59まで</span>

質問等がある場合には

- メール kkagawa@josai.ac.jp
- Teamsのチャット
- WebClassのメッセージ

などで連絡してください．

## まとめ

1. **二分法は符号の変化を利用する**：両端の関数値の符号が異なる区間を半分ずつ狭める．
2. **ニュートン法は接線を利用する**：解の近くでは速いが，導関数と適切な初期値が必要である．
3. **終了条件を必ず設ける**：許容誤差と最大反復回数によって反復を制御する．
4. **近似解は検算する**：求めた値を元の関数へ代入し，関数値が0に近いことを確認する．

- 次回は微分と積分を数値的に近似する．
