# 第5回　整数を扱う計算

### 到達目標

- 剰余を使って約数や素数を調べられる．
- 手順を関数として実装できる．
- ユークリッドの互除法で最大公約数を求められる．

## 前回の復習

第4回では，プログラムとファイルの間でデータを入出力した．
今回は，条件分岐，繰り返し，関数を組み合わせて整数の問題を解く．

## Jupyter Notebookの準備

1. `Documents（書類）/Fresh2`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`第5回_<学籍番号>_<氏名>.ipynb`へ変更する．

## 約数

**アルゴリズム**：問題を解くための処理手順である．Pythonでは，条件分岐や繰り返しなどを組み合わせてアルゴリズムをプログラムとして表す．

**約数**：ある整数を余りなく割り切る整数である．整数`number`を整数`divisor`で割った余りが0なら，`divisor`は`number`の約数である．

```python
number = 12

for divisor in range(1, number + 1):
    if number % divisor == 0:
        print(divisor)
```

約数をリストとして返す関数にまとめる．

```python
def divisors(number):
    result = []

    for divisor in range(1, number + 1):
        if number % divisor == 0:
            result.append(divisor)

    return result

print(divisors(12))
```

## 素数

**素数**：2以上の整数のうち，正の約数が1とその数自身だけである数である．

```python
def is_prime(number):
    if number < 2:
        return False

    for divisor in range(2, number):
        if number % divisor == 0:
            return False

    return True

print(is_prime(17))
print(is_prime(18))
```

## 最大公約数

**最大公約数**：二つ以上の整数に共通する正の約数のうち，最も大きい数である．

**ユークリッドの互除法**：二つの整数について割り算の余りを繰り返し計算し，最大公約数を求める方法である．`a`を`b`で割った余りを使って計算を繰り返す．

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b

    return a

print(gcd(48, 18))
```

**多重代入**：一つの代入文で複数の変数へ値を代入する書き方である．`a, b = b, a % b`では，右辺を先に評価してから二つの変数へ代入する．

````{note} 演習1
次の処理を行う関数`prime_factorize(number)`を作成せよ．

1. 2から順に割り切れるか調べよ．
2. 割り切れる間は同じ数で割り，その数をリストへ追加せよ．
3. 素因数のリストを返せ．
4. `prime_factorize(360)`を実行して結果を確認せよ．
````

## エラーが出たときにチェックすること

- `range`の始点と終点を確認する．
- 0で割っていないか確認する．
- `while`文の中で値が更新されているか確認する．
- 2未満の整数など，通常とは異なる入力を試す．

## まとめ

- 剰余`%`を使うと割り切れるか判定できる．
- 条件分岐と繰り返しを組み合わせて整数のアルゴリズムを実装できる．
- 次回は方程式の近似解を数値的に求める．
