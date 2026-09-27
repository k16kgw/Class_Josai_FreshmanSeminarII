# 第10回　可視化

### 到達目標

- データに応じてグラフの種類を選べる．
- Matplotlibを使って基本的なグラフを作成できる．
- 軸ラベル，凡例，タイトルを設定できる．

## 前回の復習

第9回では，乱数を使ってサイコロや円周率をシミュレーションした．
可視化すると，数値の傾向やばらつきを確認しやすくなる．

## Jupyter Notebookの準備

1. `Documents（書類）/Fresh2`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`10_{学籍番号}_{氏名}.ipynb`へ変更する．

## グラフの選択

| 確認したいこと | グラフ |
| --- | --- |
| 時間や順序による変化 | 折れ線グラフ |
| 二つの数値の関係 | 散布図 |
| 値の分布 | ヒストグラム |
| 項目ごとの比較 | 棒グラフ |

## Matplotlibの基本

Matplotlibの`pyplot`を`plt`という名前で読み込む．

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

plt.plot(x, y, marker="o", label="y = x^2")
plt.xlabel("x")
plt.ylabel("y")
plt.title("Square numbers")
plt.legend()
plt.grid()
plt.show()
```

## 棒グラフとヒストグラム

項目ごとの値を比べる場合は棒グラフを使う．

```python
labels = ["A", "B", "C", "D"]
values = [12, 18, 10, 15]

plt.bar(labels, values)
plt.xlabel("Group")
plt.ylabel("Value")
plt.show()
```

連続した値の分布を見る場合はヒストグラムを使う．

```python
import random

data = []

for _ in range(1000):
    data.append(random.gauss(0, 1))

plt.hist(data, bins=20)
plt.xlabel("Value")
plt.ylabel("Frequency")
plt.show()
```

````{note} 演習
サイコロを1000回振り，各出目の回数を棒グラフで表示する．

1. 横軸を1から6の出目とする．
2. 縦軸を出た回数とする．
3. 軸ラベルとタイトルを付ける．
4. グラフから読み取れることをMarkdownセルに2文で書く．
````

## エラーが出たとき

- `import matplotlib.pyplot as plt`を実行したか確認する．
- 横軸と縦軸のデータ数が同じか確認する．
- `plt.show()`を実行したか確認する．
- 日本語が表示されない場合は，まず英数字のラベルで動作を確認する．

## まとめ

- 目的に応じてグラフを選ぶ．
- 軸ラベルとタイトルを付け，何を表す図か明確にする．
- 次回はグラフを保存し，UNIX系OS上でPythonファイルを実行する．
