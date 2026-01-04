# 関数

出席パスワード：734186

到達目標

- 関数の基本的な構造（定義と呼び出し）を理解する．
- `return` による戻り値の仕組みを理解する．
- 引数の使い方を理解し，自分で関数を定義できる．

準備

1. anacondaを使用し，<span style="color:red">jupyter lab</span>を起動する．
2. `Document（書類）/Fresh`フォルダを開き，新しいノートブックを作成する．
3. ファイル名を`5_{学籍番号}_{氏名}.ipynb`に変更する．
   　例：`5_SI25999_香川渓一郎.ipynb`

## 第4回の復習

前回は **繰り返し（for文・while文）**
- 一定回数の繰り返し → `for`
- 条件による繰り返し → `while`
- `break`／`continue`による制御

### 課題1の解答例

```{note}
**課題1**

1から30までの整数について，次の規則に従って出力するプログラムを作れ。  

- 3の倍数のとき `"Fizz"`  
- 5の倍数のとき `"Buzz"`  
- 3と5の両方の倍数のとき `"FizzBuzz"`  
- それ以外は数値そのもの  

出力例：  
```python
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
...
```

解答例1
```python
for i in range(1,31):
    text = ""
    if i%3==0:
        text += "Fizz"
    if i%5==0:
        text += "Buzz"
    if i%3!=0 and i%5!=0:
        text = str(i)
    print(text)
```

解答例2
```python
for n in range(1, 31):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)
```

### 課題2の解答例

```{note}
**課題2**  

1から100までの整数の中で，  
- 偶数かつ3の倍数の個数
- 奇数かつ5の倍数の個数  

をそれぞれ数えて出力せよ．
```

解答例
```python
count_a = 0
count_b = 0
for i in range(1,101):
    if i%2==0 and i%3==0:
        count_a += 1
    if i%2==1 and i%5==0:
        count_b += 1
print(f"偶数かつ3の倍数の個数は {count_a}個，奇数かつ5の倍数の個数は {count_b}個")
```

### 導入

```python
a = 3
b = 5
print(f"{a}と{b}の平均は{(a + b) / 2}")

c = 10
d = 7
print(f"{c}と{d}の平均は{(c + d) / 2}")
```

これでも動くが「平均を出す計算」が何度も登場している．
もし出力の形式を変更したくなった場合，複数箇所を修正する必要があり，それだけバグが入り込む可能性が高くなる．

---

## 関数

**関数**（function）：ある処理をひとまとまりにして名前をつけたもの

- 入力を受け取り，処理をして，結果を返す「小さなプログラム」．

### 数学との関係

数学では

$$
f(x) = x^2 + 1
$$

というように，「入力$x$」に対して「出力$f(x)$」を返す．

Pythonの関数も同じ考え方

| 概念      | 数学               | Python                      |
| :----    | :----------------- | :-------------------------- |
| 関数の定義 | $f(x) = x^2 + 1$   | `def f(x): return x**2 + 1` |
| 呼び出し   | $f(3) = 10$        | `f(3)`                      |

### 関数の種類

- 作成された関数
  - 組み込み関数
  - 標準ライブラリの関数
  - 外部ライブラリの関数
- ユーザが自分で作る関数
  - 独自関数（ユーザ定義関数）

```{warning}
作成された関数を使用する場合には，引数や処理内容を把握して使う必要がある．
```

| 種類             | 使用例                               | import | インストール     | 特徴                |
| :------------- | :-------------------------------- | :----- | :--------- | :---------------- |
| **組み込み関数**     | `print()`, `len()`, `type()`      | 不要     | 不要         | 最初から使える基本関数       |
| **標準ライブラリの関数** | `math.sqrt()`, `random.randint()` | 必要     | 不要         | Python標準で付属する便利機能 |
| **外部ライブラリの関数** | `numpy.mean()`, `plt.plot()`      | 必要     | 必要（pipで導入） | 他者が開発した拡張機能       |

**組み込み関数**：Pythonに最初から含まれており，どのプログラムでも import なしで使用できる．

**標準ライブラリの関数**：Pythonに最初から含まれており，importすることで使えるようになる．

```{tip}
**mathライブラリの使用例**

```python
import math

print(math.sqrt(16))   # √16 = 4.0
print(math.pi)         # 円周率 3.141592...
```

**外部ライブラリの関数**：Pythonには最初からは含まれておらず，pipなどでインストールした上でimportして使えるようになる．

```{tip}
**numpyライブラリの使用例**

ターミナルで`pip install numpy`をした上で次のようにpythonのプログラムで使用する．

```python
import numpy as np

a = np.array([1, 2, 3, 4])
print(np.mean(a))  # 平均値を計算 → 2.5
```

<!-- 関数の使い方の調べ方 -->

### 関数の定義と呼び出し

基本構文
```python
def 関数名(引数1, 引数2, ...):
    処理内容
    return 戻り値
```

- `def`：define（定義する）の略で，これ以降に関数の定義が続く．
- `引数`：関数が受け取るオブジェクト．
- `return`：処理の結果を呼び出して返す．`関数名(引数1,引数2,...)`に値が返ってくる．

```{warning}
引数は関数を定義するときに関数内の処理を記述するために使用するものであるから，関数を使用する場合には同じ名前の変数を引数に入れる必要はない．
```

---

## 具体例

### 2つの数の平均を返す関数

```python
def average(a, b):
    result = (a + b) / 2
    return result
```

呼び出して使う：
```python
x = average(3, 5)
print(x)
```

出力：
```
4.0
```

処理の流れ

1. `average(3, 5)` が呼び出される．
2. `a=3`, `b=5` が代入される．
3. 関数内部で `(a + b) / 2 = 4.0` が計算される．
4. `return` により `average(3, 5)` へ結果が戻る．
5. 呼び出し元の `x` に `4.0` が代入される．

```{tip}
**例**

BMIを計算する関数

```python
def bmi(weight, height):
    """体重(kg)と身長(m)からBMIを計算する関数"""
    return weight / (height ** 2)

w = 60
h = 1.65
print(f"BMI={bmi(w, h)}")
```

- 関数の直後に書かれた文字列 `"""..."""` は **ドキュメンテーション文字列（docstring）** と呼ばれ，関数の説明として使われます．

```{tip}
**例**

偶奇を判定する関数

```python
def is_even(n):
    if n % 2 == 0:
        return True
    else:
        return False

for i in range(1, 11):
    if is_even(i):
        print(f"{i}は偶数")
    else:
        print(f"{i}は奇数")
```

---

## 機能

### returnのない関数

`return` を省略すると，値は返されず，その場で処理を実行するだけの関数になる．

```python
def hello(name):
    print(f"こんにちは，{name}さん！")

hello("カツオ")
```

出力：
```
こんにちは，カツオさん！
```

### 引数の省略と固定

引数に<span style="color:red">初期値（デフォルト値）</span>を設定しておくこともできる．

```python
def greet(name="ゲスト"):
    print(f"こんにちは，{name}さん！")

greet()
greet("ワカメ")
```

出力：
```
こんにちは，ゲストさん！
こんにちは，ワカメさん！
```

### 変数のスコープ（有効範囲）

関数の中で定義した変数はその関数の中でしか使えず，関数内部で使う変数は<span style="color:red">ローカル変数</span>と呼ばれる．

```python
def test():
    x = 10
    print(x)

test()
print(x)   # ← エラーになる
```

出力：
```
10
→ `NameError: name 'x' is not defined`
```

### 関数を使うメリット

| メリット | 説明                |
| :--- | :---------------- |
| 再利用性 | 同じ処理を何度も呼び出せる     |
| 可読性  | 長いプログラムを整理できる     |
| 保守性  | 変更箇所が1か所で済む       |
| 分割統治 | 複雑な問題を小さく分けて考えられる |

## 演習

```{note}
**演習1**

リスト（例：`[70, 85, 90, 100, 60]`）の平均点を返す関数`average_list(scores)`を作成せよ．
```
<!-- 
解答例
```python
def average_list(scores):
    """リストscoresの平均値を返す関数"""
    total = 0
    for s in scores:
        total += s
    avg = total / len(scores)
    return avg


# 動作確認
data = [70, 85, 90, 100, 60]
print(f"平均点は {average_list(data):.1f} 点です。")
```
 -->

```{note}
**演習2**

BMIを計算する関数`bmi(weight, height)`を改良し，  
BMI値に応じて「痩せ」「普通」「肥満」を返すようにせよ．

出力例：「あなたのBMIは 18.1 で 痩せ 型です．」

ただし判定基準は

- 18.5未満 → 痩せ
- 18.5以上25未満 → 普通
- 25以上 → 肥満

とする．
```
<!-- 
解答例
```python
def bmi(weight, height):
    """
    体重(kg)と身長(m)からBMIを計算し、
    値と判定結果を返す関数
    """
    value = weight / (height ** 2)

    # BMIに応じて判定
    if value < 18.5:
        category = "痩せ"
    elif value < 25:
        category = "普通"
    else:
        category = "肥満"

    # 結果をまとめて返す
    return value, category


# 動作確認
w = 50     # kg
h = 1.65   # m
b, c = bmi(w, h)
print(f"あなたのBMIは {b:.1f} で {c} 型です。")
```
 -->

---

## 課題

次の課題に取り組み，ipynbファイルを「第5回課題」から提出すること．

```{note}
**課題1**

次の処理を行う関数`collatz(n)`を定義し，結果をリストで返せ．

- nが偶数なら `n = n // 2`
- nが奇数なら `n = 3n + 1`
- nが1になるまで繰り返す．
- 上の手続きによって得られる数を順に格納したリストを作成する．

```python
print(collatz(6))
# 出力：
# [6, 3, 10, 5, 16, 8, 4, 2, 1]
```
<!-- 
解答例
```python
def collatz(n):
    """
    整数 n から始めて、
    nが1になるまで次の規則で数列を生成し、リストで返す。
      - n が偶数のとき: n = n // 2
      - n が奇数のとき: n = 3 * n + 1
    """
    seq = [n]  # 最初の値をリストに追加

    # n が 1 になるまで繰り返す
    while n != 1:
        if n % 2 == 0:       # 偶数の場合
            n = n // 2
        else:                # 奇数の場合
            n = 3 * n + 1
        seq.append(n)        # 計算結果をリストに追加

    return seq


# 動作確認
print(collatz(6))
``` 
-->

---

## まとめ

- 関数は「入力 → 処理 → 出力」をひとまとめにしたもの．
- `def` で定義し，`return` で結果を返す．
- 同じ処理を何度も書かずに済むため，**変更・再利用が容易になる．**

