# 第9回　数値計算3

### 到達目標

- Pythonで乱数を生成できる．
- シードを固定する意味を説明できる．
- 乱数を用いた簡単なシミュレーションを作成できる．

## 前回の復習

第8回では，区間を細かく分けて微分や積分を近似した．
今回は，多数の試行から結果を推定するモンテカルロ法を扱う．

## Jupyter Notebookの準備

1. `Documents（書類）/Fresh2`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`9_{学籍番号}_{氏名}.ipynb`へ変更する．

## 乱数

標準ライブラリ`random`を使って乱数を生成する．

```python
import random

print(random.random())
print(random.randint(1, 6))
```

`random.random()`は0以上1未満の実数を返す．
`random.randint(1, 6)`は1以上6以下の整数を返す．

シードを固定すると，同じ乱数列を再現できる．

```python
random.seed(10)

for _ in range(5):
    print(random.randint(1, 6))
```

## サイコロのシミュレーション

```python
import random

counts = [0, 0, 0, 0, 0, 0]

for _ in range(6000):
    value = random.randint(1, 6)
    counts[value - 1] = counts[value - 1] + 1

print(counts)
```

試行回数を増やすと，各出目の回数はおおむね同程度になる．

## モンテカルロ法

単位正方形内に点を発生させ，単位円の内側に入った割合から円周率を近似する．

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

````{note} 演習
サイコロを`100`回，`1000`回，`10000`回振るシミュレーションを行う．

1. 各出目の回数を表示する．
2. 各出目の相対度数を計算する．
3. 試行回数を増やしたときの変化を説明する．
````

## エラーが出たとき

- `import random`を実行したか確認する．
- リストの添字は0から始まることを確認する．
- 再現したい場合は，乱数を生成する前にシードを固定する．
- 試行回数が0になっていないか確認する．

## まとめ

- 乱数を使って不確実な現象を模擬できる．
- シードを固定すると結果を再現できる．
- 次回はシミュレーション結果をグラフで可視化する．
