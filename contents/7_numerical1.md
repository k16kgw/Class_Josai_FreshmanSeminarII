# 第7回　数値計算1

### 到達目標

- 近似解と誤差の意味を説明できる．
- 2分法で方程式の解を求められる．
- ニュートン法で方程式の解を求められる．

## 前回の復習

第6回では，数学的な手順を条件分岐，繰り返し，関数で表現した．
数値計算でも，終了条件を決めて計算を繰り返す．

## Jupyter Notebookの準備

1. `Documents（書類）/Fresh`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`7_{学籍番号}_{氏名}.ipynb`へ変更する．

## 方程式の近似解

例として，次の方程式を考える．

$$
x^2-2=0
$$

`f(x)=x^2-2`とおく．

```python
def f(x):
    return x ** 2 - 2
```

## 2分法

2分法は，`f(a)`と`f(b)`の符号が異なる区間を半分ずつ狭める方法である．

```python
def bisection(f, a, b, tolerance):
    while b - a > tolerance:
        midpoint = (a + b) / 2

        if f(a) * f(midpoint) <= 0:
            b = midpoint
        else:
            a = midpoint

    return (a + b) / 2

root = bisection(f, 1, 2, 1e-8)
print(root)
```

`1e-8`は$10^{-8}$を表す．
開始時に`f(a)`と`f(b)`の符号が異なることを確認する．

## ニュートン法

ニュートン法では，現在の近似値`x`を次の式で更新する．

$$
x_{new}=x-\frac{f(x)}{f'(x)}
$$

`f(x)=x^2-2`の導関数は`f'(x)=2x`である．

```python
def derivative(x):
    return 2 * x

def newton(f, derivative, x, tolerance):
    while abs(f(x)) > tolerance:
        x = x - f(x) / derivative(x)

    return x

root = newton(f, derivative, 1, 1e-8)
print(root)
```

````{note} 演習
方程式`x ** 3 - 2 = 0`の近似解を求める．

1. 2分法を使う．
2. ニュートン法を使う．
3. 二つの結果と`2 ** (1 / 3)`を比較する．
````

## エラーが出たとき

- 2分法では区間の両端で関数値の符号が異なるか確認する．
- ニュートン法では導関数が0にならないか確認する．
- `while`文に終了条件があるか確認する．
- 結果を関数へ代入し，`f(root)`が0に近いか確認する．

## まとめ

- 数値計算では真の解に近い近似解を求める．
- 2分法は区間を狭め，ニュートン法は接線を利用する．
- 次回は微分と積分を数値的に計算する．
