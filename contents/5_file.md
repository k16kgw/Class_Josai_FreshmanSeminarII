# 第5回　ファイル操作

### 到達目標

- テキストファイルへ文字列を書き込める．
- テキストファイルから内容を読み込める．
- CSVファイルの基本的な構造を説明できる．

## 前回の復習

第4回では，処理を関数へまとめた．

```python
def square(number):
    return number ** 2

print(square(5))
```

## Jupyter Notebookの準備

1. `Documents（書類）/Fresh`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`5_{学籍番号}_{氏名}.ipynb`へ変更する．
3. Notebookと入出力するファイルを同じフォルダへ保存する．

## テキストファイル

`with open(...)`を使うと，処理終了後にファイルが自動的に閉じられる．

### 書き込む

```python
with open("message.txt", "w", encoding="utf-8") as file:
    file.write("Pythonを学習しています．\n")
    file.write("ファイルへ文字列を書き込みました．\n")
```

`"w"`は書き込みモードである．
同名のファイルがある場合は内容が上書きされる．

### 読み込む

```python
with open("message.txt", "r", encoding="utf-8") as file:
    text = file.read()

print(text)
```

`"r"`は読み込みモードである．

## CSVファイル

CSVは，値をカンマで区切って表形式のデータを保存する形式である．

```python
import csv

rows = [
    ["氏名", "点数"],
    ["佐藤", 80],
    ["鈴木", 90],
]

with open("scores.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)
```

作成した`scores.csv`を読み込む．

```python
with open("scores.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

````{note} 演習
次の3行を`study.txt`へ書き込み，再度読み込んで表示する．

- 条件分岐
- 繰り返し
- 関数

作成した`study.txt`がNotebookと同じフォルダにあることも確認する．
````

## エラーが出たとき

- ファイル名と拡張子が正しいか確認する．
- Notebookとファイルの保存場所を確認する．
- 読み込み時にファイルが存在するか確認する．
- 日本語が正しく表示されない場合は`encoding="utf-8"`を確認する．

## まとめ

- `with open`を使ってファイルを開く．
- `"w"`は書き込み，`"r"`は読み込みを表す．
- CSVは表形式のデータ交換に広く使われる．
- 次回は整数を扱うアルゴリズムを作成する．
