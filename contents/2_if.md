# 第2回　制御構文1：条件分岐

### 到達目標

- 比較演算子を使って条件式を作成できる．
- `if`・`elif`・`else`を使って処理を分岐できる．
- 複数の条件を`and`・`or`・`not`で組み合わせられる．

## 前回の復習

第1回では，変数へ値を代入し，算術演算子を用いて計算した．

```python
score = 80
score = score + 5
print(score)
```

条件分岐では，変数の値に応じて実行する処理を変える．

## Jupyter Notebookの準備

1. Anaconda NavigatorからJupyter Notebookを起動する．
2. `Documents（書類）/Fresh2`フォルダを開く．
3. Python 3のNotebookを新規作成する．
4. ファイル名を`2_{学籍番号}_{氏名}.ipynb`へ変更する．

## 条件式

比較演算子で二つの値を比較すると，結果は`True`または`False`になる．

| 比較 | 演算子 | 例 |
| --- | --- | --- |
| 等しい | `==` | `score == 80` |
| 等しくない | `!=` | `score != 80` |
| 大小 | `>`・`<` | `score >= 60` |
| 以上・以下 | `>=`・`<=` | `0 <= score` |

```python
score = 80

print(score >= 60)
print(score == 100)
```

## if文

`if`の条件が`True`のとき，インデントされた処理を実行する．

```python
score = 80

if score >= 60:
    print("合格です．")
else:
    print("不合格です．")
```

条件を三つ以上に分ける場合は`elif`を使う．

```python
score = 80

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

print(grade)
```

複数の条件は論理演算子で組み合わせる．

```python
attendance = 12
score = 70

if attendance >= 10 and score >= 60:
    print("条件を満たしています．")
```

| 演算子 | 意味 |
| --- | --- |
| `and` | 両方の条件が`True` |
| `or` | 少なくとも一方が`True` |
| `not` | 真偽を反転する |

````{note} 演習
変数`temperature`へ気温を代入し，次の条件でメッセージを表示するプログラムを作成する．

- 30以上：「暑いです．」
- 20以上30未満：「過ごしやすいです．」
- 20未満：「肌寒いです．」

`if`・`elif`・`else`をすべて使用すること．
````

## エラーが出たとき

- 条件の末尾にコロン`:`があるか確認する．
- `=`ではなく，比較には`==`を使っているか確認する．
- 分岐内のコードが半角4文字分インデントされているか確認する．
- 条件を上から順に判定して問題ない並びになっているか確認する．

## まとめ

- 比較の結果は`True`または`False`になる．
- `if`・`elif`・`else`で条件に応じて処理を分ける．
- 次回は同じ処理を繰り返す方法を扱う．
