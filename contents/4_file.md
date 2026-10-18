# 第4回　ファイル操作

### 到達目標

- **変数**に保存したデータと**ファイル**に保存したデータの違いを説明できる．
- リスト・辞書・文字列の代表的なメソッドを使用できる．
- クラス，インスタンス，メソッドの関係を説明できる．
- `with open(...)`を使い，テキストファイルを安全に開ける．
- テキストファイルへ文字列を書き込み，保存した内容を読み込める．
- CSVファイルの構造を理解し，`csv`モジュールを使って読み書きできる．
- pandasを使ってCSVファイルを読み込み，条件に合う行を抽出できる．
- ファイル操作を関数にまとめられる．

### 前回の復習

前回：処理を**関数**としてまとめ，引数と戻り値を使って再利用した．

- **関数**：一連の処理をひとまとまりにし，名前を付けたもの．
- **引数**：関数へ渡す値．
- **戻り値**：関数が呼び出し元へ返す処理結果．

第3回の演習4では，実数のリストを受け取り，各要素の絶対値を並べた新しいリストを返す関数を作成した．

```python
def absolute_values(numbers):
    results = []
    for number in numbers:
        if number >= 0:
            results.append(number)
        else:
            results.append(-number)
    return results

numbers = [-3.5, 2.0, -1.2, 0.0, 4.8]
values = absolute_values(numbers)
print(values)
```

この関数では，仮引数`numbers`でリストを受け取り，for文で要素を一つずつ処理する．処理結果は新しいリスト`results`へ追加し，繰り返しが終了してからreturn文で返す．

### 前回の課題の解答例

**課題1：得点を評価へ分類する関数**

得点を受け取り，指定された基準に対応する評価を返す関数を作成した．

```python
def classify_score(score):
    if not (0 <= score <= 100):
        return "範囲外"

    if score >= 95:
        return "S"
    elif score >= 80:
        return "A"
    elif score >= 70:
        return "B"
    elif score >= 60:
        return "C"

    return "F"

scores = [-1, 0, 59, 60, 69, 70, 79, 80, 94, 95, 100, 101]

for score in scores:
    grade = classify_score(score)
    print(f"{score}点：{grade}")
```

最初のif文は，0点未満または100点より大きい値を先に処理するガード節である．得点が範囲内の場合は，高い評価の条件から順番に判定する．関数の外側では，for文を使ってリスト内のすべての得点を関数へ渡している．

**課題2：合格者数を数える関数**

得点のリストを受け取り，60点以上の得点の個数を返す関数を作成した．

```python
def count_passes(scores):
    count = 0

    for score in scores:
        if score >= 60:
            count = count + 1

    return count

scores = [45, 60, 72, 58, 90, 81]
passed = count_passes(scores)
print(f"合格者は{passed}人です．")
```

変数`count`は，60点以上の得点が見つかるたびに1ずつ増える．`return count`はfor文の外側にあるため，すべての得点を調べた後で個数を返す．このように，関数の中でも条件分岐と繰り返しを組み合わせられる．

今回は，プログラムの実行が終了した後にもデータを残すため，データを**ファイル**へ保存する方法を学ぶ．

### Jupyter Notebookの準備

1. Anaconda NavigatorからJupyter Notebookを起動する．
2. `Documents（書類）/Fresh2`フォルダを開く．
3. Python 3のNotebookを新規作成する．
4. ファイル名を`第4回_<学籍番号>_<氏名>.ipynb`へ変更する．
5. Notebookと，これから作成するテキストファイルやCSVファイルを同じ`Fresh2`フォルダへ保存する．

```{dropdown} 忘れた人のためのJupyter Notebookの準備手順
**Jupyter Notebookを起動する**

1. Spotlight検索（`command`+`Space`）でAnaconda Navigatorを起動する．
2. Anaconda Navigatorが表示されるまで待つ．
3. Jupyter Notebookの「Launch」をクリックする．
4. WebブラウザにJupyter Notebookのファイル一覧が表示されたことを確認する．

<img src="./figs/jupyter_anaconda_navigator.png" alt="Anaconda Navigatorの画面" width="600">

<img src="./figs/jupyter_launch_button.png" alt="Jupyter NotebookのLaunchボタン" width="600">

<img src="./figs/jupyter_file_browser.png" alt="Jupyter Notebookのファイル一覧" width="600">

**Fresh2フォルダを開く**

1. Jupyter Notebookのファイル一覧で`Documents`または`書類`フォルダをクリックする．
2. `Fresh2`フォルダをクリックして開く．
3. `Fresh2`フォルダがない場合は，画面右上の「New」から「New Folder」を選択する．
4. 作成された`Untitled Folder`を選択し，「Rename」をクリックする．
5. フォルダ名を`Fresh2`へ変更し，そのフォルダを開く．

<img src="./figs/jupyter_documents_folder.png" alt="Documentsフォルダを開く操作" width="600">

<img src="./figs/jupyter_new_folder.png" alt="新しく作成されたフォルダ" width="600">

**Notebookファイルを新規作成する**

1. `Fresh2`フォルダを開いた状態で，画面右上の「New」をクリックする．
2. 「Python 3 (ipykernel)」をクリックする．
3. 新しく開いたNotebook上部のファイル名をクリックする．
4. ファイル名を`第4回_<学籍番号>_<氏名>.ipynb`へ変更する．
5. `<学籍番号>`と`<氏名>`を自分の学籍番号と氏名へ置き換える．
6. Codeセルが表示されていることを確認する．

<img src="./figs/jupyter_new_notebook.png" alt="Python 3のNotebookを新規作成する操作" width="600">

<img src="./figs/jupyter_rename_notebook.png" alt="Notebookファイルの名前を変更する操作" width="600">

<img src="./figs/jupyter_code_cell.png" alt="Jupyter NotebookのCodeセル" width="600">

**注意：** Jupyter Notebookのバージョンによって，ボタンの名称や配置が画像と異なる場合がある．Notebookを作成したら，コードを入力する前に保存場所とファイル名を確認する．
```

## メソッド

- **オブジェクト**：Pythonで扱うデータを表す値．数値，文字列，リストなどもオブジェクトである．
- **メソッド**：特定の種類のオブジェクトに結び付いた関数．

メソッドは，`オブジェクト.メソッド名()`の形で呼び出す．ピリオド`.`の左側に操作するオブジェクト，右側に実行するメソッドを書く．

```text
オブジェクト.メソッド名(引数)
```

次の例では，文字列`text`に結び付いた`upper`メソッドを呼び出している．

```python
text = "hello"
upper_text = text.upper()
print(upper_text)
```

`upper`メソッドは，英小文字を英大文字へ変換した新しい文字列を返す．出力は`HELLO`となる．

```{tip} 注意：関数とメソッドの呼び出し方
一般の関数は`print(value)`のように関数名へ丸括弧を付けて呼び出す．メソッドは`text.upper()`のように，操作するオブジェクト，ピリオド`.`，メソッド名の順に書いて呼び出す．
```

### リストのメソッド

リストには，要素の追加，削除，並べ替えなどを行うメソッドが用意されている．

| メソッド | 説明 | 例 |
| --- | --- | --- |
| `.append(value)` | 末尾へ要素を追加する | `numbers.append(10)` |
| `.insert(index, value)` | 指定した位置へ要素を追加する | `numbers.insert(1, 5)` |
| `.remove(value)` | 指定した値と等しい最初の要素を削除する | `numbers.remove(3)` |
| `.pop(index)` | 指定した位置の要素を取り出して削除する | `numbers.pop(0)` |
| `.sort()` | リスト自体を昇順に並べ替える | `numbers.sort()` |
| `.reverse()` | リスト自体の順番を逆にする | `numbers.reverse()` |

```python
numbers = [3, 1, 4]
numbers.append(2)
numbers.sort()
print(numbers)
```

`append`メソッドを実行すると`numbers`は`[3, 1, 4, 2]`となる．続いて`sort`メソッドを実行すると，リスト自体が`[1, 2, 3, 4]`へ変更される．

````{note} 演習1
リスト`scores = [70, 85, 90, 100, 60]`を大きい順に並べ替えよ．

1. `scores`へ指定されたリストを代入せよ．
2. `sort`メソッドの引数に`reverse=True`を指定せよ．
3. 並べ替えたリストを表示せよ．
4. `[100, 90, 85, 70, 60]`と表示されることを確認せよ．
````

````{hidden-answer} 解答例
```python
scores = [70, 85, 90, 100, 60]
scores.sort(reverse=True)
print(scores)
```
````

### 辞書と辞書のメソッド

- **辞書**：キーと値の組をまとめて管理するデータ型．
- **キー**：辞書内の値を特定するための名前．
- **値**：キーに対応して保存されるデータ．

辞書は波括弧`{}`を使い，`キー: 値`の形で作る．複数の組はカンマ`,`で区切る．

```python
scores = {"国語": 70, "数学": 85, "英語": 90}

print(scores["数学"])

scores["数学"] = 95
scores["理科"] = 88
print(scores)
```

辞書は，教科名と点数，商品名と価格，学生番号と氏名のように，名前と値を対応させる場合に適している．

| メソッド | 説明 |
| --- | --- |
| `.keys()` | すべてのキーを取り出す |
| `.values()` | すべての値を取り出す |
| `.items()` | キーと値の組を取り出す |
| `.get(key, default)` | キーに対応する値を取り出す．キーがなければ既定値を返す |

```python
scores = {"国語": 80, "数学": 90}

print(scores.keys())
print(scores.values())
print(scores.items())
print(scores.get("英語", "データなし"))
```

````{note} 演習2
教科名と点数を保存した辞書から，教科名と点数を1行ずつ表示せよ．

1. 次の辞書を変数`scores`へ代入せよ．

   ```python
   scores = {"国語": 78, "数学": 92, "英語": 84}
   ```

2. `items`メソッドとfor文を使用せよ．
3. f-stringを使い，「国語：78点」の形式で表示せよ．
````

````{hidden-answer} 解答例
```python
scores = {"国語": 78, "数学": 92, "英語": 84}

for subject, score in scores.items():
    print(f"{subject}：{score}点")
```
````

### 文字列のメソッド

文字列には，大文字・小文字の変換，置換，分割などを行うメソッドが用意されている．

| メソッド | 説明 | 例 |
| --- | --- | --- |
| `.upper()` | 英小文字を英大文字へ変換する | `text.upper()` |
| `.lower()` | 英大文字を英小文字へ変換する | `text.lower()` |
| `.replace(old, new)` | 指定した文字列を置き換える | `text.replace("A", "B")` |
| `.split(separator)` | 区切り文字で分割し，リストを返す | `text.split(",")` |
| `.strip()` | 文字列の先頭と末尾にある空白や改行を取り除く | `text.strip()` |

```python
text = "Python,Math,Data"
words = text.split(",")
print(words)
```

`split(",")`は，文字列をカンマで分割し，`["Python", "Math", "Data"]`というリストを返す．CSVファイルを扱うときにも文字列の分割という考え方が関係するが，CSVでは値にカンマが含まれる場合があるため，後で学ぶ`csv`モジュールを使用する．

````{note} 演習3
文字列`"apple,banana,orange"`をカンマで分割し，各単語を1行ずつ表示せよ．

1. 指定された文字列を変数`text`へ代入せよ．
2. `split`メソッドを使い，結果を変数`fruits`へ代入せよ．
3. for文を使って各要素を表示せよ．
````

````{hidden-answer} 解答例
```python
text = "apple,banana,orange"
fruits = text.split(",")

for fruit in fruits:
    print(fruit)
```
````

## クラスとインスタンス

- **クラス**：データの種類と，そのデータに対して行える処理を定めた設計図．
- **インスタンス**：クラスに基づいて作られた個々のオブジェクト．
- **メソッド**：クラスで定められ，インスタンスに結び付いた関数．

Pythonの`str`，`list`，`dict`などはクラスである．`"hello"`は`str`クラスのインスタンス，`[1, 2, 3]`は`list`クラスのインスタンスである．

```python
text = "hello"
numbers = [1, 2, 3]

print(type(text))
print(type(numbers))
```

クラスによって利用できるメソッドが異なる．例えば，文字列には`upper`メソッドがあり，リストには`append`メソッドがある．`text.append(10)`のように，文字列にリスト用のメソッドを使うことはできない．

````{tip} 発展：簡単なクラスを定義する
class文を使うと，新しいクラスを自分で定義できる．次の`Student`クラスは，氏名と点数を保持し，点数を表示する`show_score`メソッドを持つ．このコードの詳細は今後の授業で扱うため，ここではクラスからインスタンスを作り，メソッドを呼び出す流れを確認する．

```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def show_score(self):
        print(f"{self.name}：{self.score}点")

student = Student("佐藤", 85)
student.show_score()
```
````

## 変数とファイル

- **変数**：プログラムの実行中に値を保持するため，値へ名前を付けたもの．
- **ファイル**：文字や数値などのデータをストレージへ記録したもの．
- **ファイル操作**：プログラムからファイルへデータを書き込んだり，ファイルからデータを読み込んだりすること．

変数に代入した値は，Notebookのカーネルを終了すると失われる．一方，ファイルへ書き込んだデータは，ファイルを削除または上書きするまで残る．保存したファイルは，後から別のプログラムで読み込むこともできる．

| 保存先 | データが残る期間 | 例 |
| --- | --- | --- |
| 変数 | プログラムやカーネルの実行中 | `message = "こんにちは"` |
| ファイル | ファイルを削除または上書きするまで | `message.txt` |

```{tip} 注意：ファイルはNotebookと同じフォルダへ保存する
この回では，Notebookと作成するファイルをすべて`Documents（書類）/Fresh2`フォルダへ保存する．保存場所が異なると，正しいファイル名を書いてもPythonがファイルを見つけられない場合がある．
```

## テキストファイル

- **テキストファイル**：文字として読めるデータを保存するファイル．一般に`.txt`などの拡張子を使う．
- **文字コード**：コンピュータで文字と数値を対応付ける規則．この講義では`UTF-8`を使用する．
- **エンコーディング**：文字とバイト列を相互に変換する方法．`encoding="utf-8"`で使用する文字コードを指定する．

Pythonでファイルを操作するときは，`open`関数でファイルを開く．この講義では，ファイルを確実に閉じるためにwith文と組み合わせる．

```text
with open(ファイル名, モード, encoding="utf-8") as ファイルを表す変数:
    ファイルを使う処理
```

- **ファイル名**：開くファイルの名前を文字列で指定する．
- **モード**：読み込みや書き込みなど，ファイルを開く目的を指定する．
- **ファイルオブジェクト**：開いたファイルをプログラムから操作するための値．`as`の後ろの変数で受け取る．
- **with文**：ブロック内の処理が終わったときに，開いたファイルを自動的に閉じる構文．

| モード | 目的 | ファイルがない場合 | ファイルがある場合 |
| --- | --- | --- | --- |
| `"r"` | 読み込む | エラーになる | 内容を読み込む |
| `"w"` | 書き込む | 新しく作成する | 元の内容を消して上書きする |
| `"a"` | 末尾へ追記する | 新しく作成する | 元の内容を残して追加する |

## テキストファイルへの書き込み

書き込みモード`"w"`でファイルを開き，`write`メソッドで文字列を書き込む．

```python
with open("message.txt", "w", encoding="utf-8") as file:
    file.write("Pythonを学習しています．\n")
    file.write("ファイルへ文字列を書き込みました．\n")
```

このコードは，次の順序で処理される．

1. `message.txt`を書き込みモードで開く．
2. 開いたファイルを変数`file`で操作できるようにする．
3. `file.write(...)`で文字列を書き込む．
4. with文のブロックが終了したときにファイルを閉じる．

**`write`メソッド**：指定した文字列をファイルへ書き込む．自動では改行しない．

**改行文字`\n`**：文字列内で行の終わりを表す特殊な文字．コードではバックスラッシュと英小文字の`n`を続けて書く．

```{tip} 注意：書き込みモードは元の内容を消す
書き込みモード`"w"`で既存のファイルを開くと，元の内容は消去される．残しておきたいファイルを誤って`"w"`で開かないように，ファイル名とモードを実行前に確認する．
```

```{tip} 注意：writeメソッドには文字列を渡す
`write`メソッドには文字列を渡す．数値を書き込む場合は，`str(80)`やf-stringを使って文字列へ変換する．例えば`file.write(f"{score}\n")`のように書く．
```

````{note} 演習4
`subjects.txt`へ次の3行を書き込め．

```text
条件分岐
繰り返し
関数
```

1. 新しいCodeセルを追加せよ．
2. `subjects.txt`を書き込みモード`"w"`で開け．
3. `encoding="utf-8"`を指定せよ．
4. `write`メソッドを3回使い，1項目につき1行で書き込め．
5. Jupyter Notebookのファイル一覧で`subjects.txt`が作成されたことを確認せよ．
````

````{hidden-answer} 解答例
```python
with open("subjects.txt", "w", encoding="utf-8") as file:
    file.write("条件分岐\n")
    file.write("繰り返し\n")
    file.write("関数\n")
```
````

## テキストファイルからの読み込み

読み込みモード`"r"`でファイルを開き，`read`メソッドで内容全体を読み込む．

```python
with open("message.txt", "r", encoding="utf-8") as file:
    text = file.read()

print(text)
```

**`read`メソッド**：現在位置からファイルの末尾までを一つの文字列として読み込む．

上のコードでは，読み込んだ文字列を変数`text`へ代入している．変数`text`はwith文の外でも利用できるため，ファイルを閉じた後に`print(text)`で内容を表示できる．

```{tip} 注意：存在しないファイルは読み込めない
読み込みモード`"r"`で指定したファイルが存在しない場合は，`FileNotFoundError`が発生する．ファイル名，拡張子，大文字と小文字，保存場所を確認する．
```

````{note} 演習5
演習4で作成した`subjects.txt`を読み込み，内容を表示せよ．

1. `subjects.txt`を読み込みモード`"r"`で開け．
2. `encoding="utf-8"`を指定せよ．
3. `read`メソッドで内容全体を読み込み，変数`text`へ代入せよ．
4. with文の外で`text`を表示せよ．
5. 「条件分岐」「繰り返し」「関数」が1行ずつ表示されることを確認せよ．
````

````{hidden-answer} 解答例
```python
with open("subjects.txt", "r", encoding="utf-8") as file:
    text = file.read()

print(text)
```
````

## テキストファイルへの追記

既存の内容を残したまま末尾へ文字列を追加する場合は，追記モード`"a"`を使う．

```python
with open("message.txt", "a", encoding="utf-8") as file:
    file.write("この行を後から追加しました．\n")
```

同じコードを複数回実行すると，実行した回数だけ同じ行が追加される．最初から作り直すときは`"w"`，既存の内容へ追加するときは`"a"`を使用する．

````{note} 演習6
`subjects.txt`の末尾へ「ファイル操作」を追記し，4行になったことを確認せよ．

1. `subjects.txt`を追記モード`"a"`で開け．
2. `file.write("ファイル操作\n")`を実行せよ．
3. `subjects.txt`を読み込みモードで開き直せ．
4. ファイルの内容を表示し，「ファイル操作」が末尾に一度だけ追加されたことを確認せよ．
````

````{hidden-answer} 解答例
```python
with open("subjects.txt", "a", encoding="utf-8") as file:
    file.write("ファイル操作\n")

with open("subjects.txt", "r", encoding="utf-8") as file:
    text = file.read()

print(text)
```
````

## ファイル操作を関数にまとめる

ファイル名や書き込む内容を引数として受け取ると，同じファイル操作を異なるデータに再利用できる．

```python
def write_lines(filename, lines):
    with open(filename, "w", encoding="utf-8") as file:
        for line in lines:
            file.write(f"{line}\n")

topics = ["条件分岐", "繰り返し", "関数", "ファイル操作"]
write_lines("topics.txt", topics)
```

この関数では，`filename`が保存先のファイル名，`lines`が書き込む文字列のリストである．for文で要素を一つずつ取り出し，改行文字を付けてファイルへ書き込む．関数を呼び出すと，戻り値ではなくファイルとして結果が残る．

## CSVファイル

- **CSV（Comma-Separated Values）**：一つの行に複数の値をカンマで区切って記録するファイル形式．
- **行**：横方向に並ぶ一組のデータ．
- **列**：同じ種類の値が縦方向に並ぶまとまり．
- **ヘッダー**：各列の意味を示す先頭行．

例えば，次のCSVファイルには，氏名と二つの科目の点数が保存されている．

```text
氏名,国語,数学
佐藤,80,90
鈴木,75,85
高橋,90,70
```

CSVはテキストファイルの一種であるが，値にカンマや改行が含まれる場合も正しく扱うため，手作業で文字列を組み立てずに標準ライブラリの`csv`モジュールを使う．

### CSVファイルへの書き込み

```python
import csv

rows = [
    ["氏名", "国語", "数学"],
    ["佐藤", 80, 90],
    ["鈴木", 75, 85],
    ["高橋", 90, 70],
]

with open("scores.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)
```

- **`csv.writer(file)`**：CSVファイルへ行を書き込むためのwriterオブジェクトを作る．
- **`writer.writerow(row)`**：一つのリストをCSVの1行として書き込む．
- **`writer.writerows(rows)`**：複数のリストを複数行としてまとめて書き込む．
- **`newline=""`**：CSVファイルを余分な空行なしで正しく書き込むための指定．

```{tip} 注意：CSVを書き込むときはnewlineを指定する
`csv`モジュールでCSVファイルを書き込むときは，`open`関数に`newline=""`を指定する．OSによる改行方法の違いを`csv`モジュールに任せ，余分な空行が入ることを防ぐためである．
```

### CSVファイルからの読み込み

```python
import csv

with open("scores.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
```

**`csv.reader(file)`**：CSVファイルを1行ずつ読み込むためのreaderオブジェクトを作る．

readerオブジェクトをfor文で繰り返すと，各行がリストとして変数`row`へ代入される．CSVから読み込んだ値は，数字のように見えても文字列である．計算に使う場合は`int`関数や`float`関数で数値へ変換する．

```python
with open("scores.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    next(reader)

    for row in reader:
        name = row[0]
        japanese = int(row[1])
        mathematics = int(row[2])
        print(f"{name}：国語{japanese}点，数学{mathematics}点")
```

**`next(reader)`**：readerオブジェクトから次の1行を取り出す．この例では，計算に使わないヘッダーを先に取り出して読み飛ばす．

````{note} 演習7
次の内容を`temperatures.csv`へ書き込み，再度読み込んで表示せよ．

| 曜日 | 最高気温 |
| --- | ---: |
| 月 | 21.5 |
| 火 | 23.0 |
| 水 | 19.8 |

1. `csv`モジュールを読み込め．
2. ヘッダーを含む二次元のリスト`rows`を作成せよ．
3. `csv.writer`と`writerows`を使って`temperatures.csv`へ書き込め．
4. `csv.reader`で`temperatures.csv`を読み込め．
5. for文を使ってすべての行を表示せよ．
````

````{hidden-answer} 解答例
```python
import csv

rows = [
    ["曜日", "最高気温"],
    ["月", 21.5],
    ["火", 23.0],
    ["水", 19.8],
]

with open("temperatures.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)

with open("temperatures.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
```
````

## pandasを使ったCSVファイルの操作

- **pandas**：表形式のデータを読み込み，整理，集計，保存するための外部ライブラリ．
- **DataFrame**：pandasで行と列からなる表形式のデータを扱うためのデータ型．
- **Series**：DataFrameの一つの列など，一次元のデータを扱うためのデータ型．

Anacondaには通常pandasが含まれている．最初に`pandas`を`pd`という短い別名で読み込む．

```python
import pandas as pd
```

`as pd`は，プログラム内で`pandas`を`pd`という名前で参照するための指定である．pandasでは`pd.read_csv(...)`のように`pd`を付けて関数を呼び出す書き方が一般的である．

```{tip} 注意：pandasを読み込めない場合
`import pandas as pd`で`ModuleNotFoundError`が発生した場合は，自己判断で別の環境へインストールせず，使用中のNotebookがAnacondaのPython環境で動いているか教員へ確認する．
```

### CSVファイルの読み込み

`read_csv`関数を使うと，CSVファイルをDataFrameとして読み込める．

```python
import pandas as pd

data_frame = pd.read_csv("scores.csv")
data_frame
```

Jupyter Notebookでは，Codeセルの最後に変数`data_frame`を書くと，DataFrameが表として表示される．`print(data_frame)`でも内容を確認できるが，Notebook上では最後の式として表示する方が表を読みやすい．

### 列の選択と統計量

DataFrameから列を選ぶときは，`data_frame["列名"]`と書く．選択した列はSeriesとなる．

```python
mathematics = data_frame["数学"]

print(mathematics.mean())
print(mathematics.max())
print(mathematics.min())
```

| メソッド | 説明 |
| --- | --- |
| `.mean()` | 平均を求める |
| `.max()` | 最大値を求める |
| `.min()` | 最小値を求める |
| `.sum()` | 合計を求める |

### 条件に合う行の抽出

列と数値を比較すると，各行が条件を満たすかを表す`True`または`False`のSeriesが得られる．

```python
condition = data_frame["数学"] >= 80
print(condition)
```

そのSeriesをDataFrameの角括弧へ指定すると，条件が`True`となる行だけを抽出できる．

```python
selected = data_frame[data_frame["数学"] >= 80]
selected
```

### CSVファイルへの保存

DataFrameの`to_csv`メソッドを使うと，表をCSVファイルへ保存できる．

```python
selected.to_csv("selected_scores.csv", index=False, encoding="utf-8")
```

`index=False`は，DataFrameの左端に表示される行番号をCSVファイルへ書き込まないための指定である．

````{note} 演習8
`scores.csv`をpandasで読み込み，数学が80点以上の行だけを抽出して保存せよ．

1. `pandas`を`pd`という別名で読み込め．
2. `pd.read_csv("scores.csv")`を実行し，DataFrameを変数`data_frame`へ代入せよ．
3. 数学の平均点を`mean`メソッドで求めて表示せよ．
4. 数学が80点以上の行を抽出し，変数`selected`へ代入せよ．
5. `selected`をNotebook上で表示せよ．
6. 抽出結果を`selected_scores.csv`へ保存せよ．
7. `index=False`を指定せよ．
````

````{hidden-answer} 解答例
```python
import pandas as pd

data_frame = pd.read_csv("scores.csv")

average = data_frame["数学"].mean()
print(f"数学の平均点は{average}点です．")

selected = data_frame[data_frame["数学"] >= 80]
selected

selected.to_csv("selected_scores.csv", index=False, encoding="utf-8")
```
````

## エラーが出たときにチェックすること

- ファイル名と拡張子が正しいか確認する．
- Notebookとファイルが同じ`Fresh2`フォルダにあるか確認する．
- 読み込みには`"r"`，上書きには`"w"`，追記には`"a"`を指定したか確認する．
- `with open(...) as file:`の行末にコロン`:`があるか確認する．
- with文の中の処理がインデントされているか確認する．
- 日本語を扱うときに`encoding="utf-8"`を指定したか確認する．
- CSVを書き込むときに`newline=""`を指定したか確認する．
- CSVから読み込んだ文字列を，計算前に`int`または`float`で数値へ変換したか確認する．
- pandasで指定した列名がCSVファイルのヘッダーと一致しているか確認する．
- `to_csv`で行番号を書き込まない場合は`index=False`を指定したか確認する．
- 同じ追記用セルを複数回実行し，同じ内容を重複して追加していないか確認する．

## 課題

````{warning} 課題1
文字列のリストをテキストファイルへ保存する関数`save_plan(filename, plans)`を作成せよ．

1. 新しいMarkdownセルを追加し，`# 課題1`と記入せよ．
2. 新しいCodeセルを追加し，仮引数`filename`と`plans`を持つ関数`save_plan(filename, plans)`を定義せよ．
3. 関数の中で，`filename`が表すファイルを書き込みモード`"w"`で開け．
4. `encoding="utf-8"`を指定せよ．
5. 関数の中でfor文を使い，`plans`から文字列を一つずつ取り出せ．
6. 各文字列の末尾に改行文字を付け，1項目につき1行で書き込め．
7. 関数の外で次のリストを変数`plans`へ代入せよ．

   ```python
   plans = ["授業の復習をする", "課題を期限までに提出する", "毎週本を読む"]
   ```

8. `save_plan("plan.txt", plans)`を呼び出せ．
9. `plan.txt`を読み込みモードで開き，保存した3行を表示せよ．

関数，仮引数，for文，with文，`write`メソッド，`read`メソッドを使用せよ．
````

````{hidden-answer} 解答例
```python
def save_plan(filename, plans):
    with open(filename, "w", encoding="utf-8") as file:
        for plan in plans:
            file.write(f"{plan}\n")

plans = ["授業の復習をする", "課題を期限までに提出する", "毎週本を読む"]
save_plan("plan.txt", plans)

with open("plan.txt", "r", encoding="utf-8") as file:
    text = file.read()

print(text)
```
````

````{warning} 課題2
CSVファイルに保存された最高気温の平均を返す関数`average_temperature(filename)`を作成せよ．

1. 新しいMarkdownセルを追加し，`# 課題2`と記入せよ．
2. 次のデータを`week_temperature.csv`へ書き込め．

   ```python
   rows = [
       ["曜日", "最高気温"],
       ["月", 18.5],
       ["火", 20.0],
       ["水", 21.5],
       ["木", 19.0],
       ["金", 23.5],
   ]
   ```

3. 仮引数`filename`を持つ関数`average_temperature(filename)`を定義せよ．
4. 関数の中で，`filename`が表すCSVファイルを読み込みモードで開け．
5. `csv.reader`を使ってCSVファイルを読み込め．
6. `next(reader)`を使ってヘッダーを読み飛ばせ．
7. for文で各行を取り出し，最高気温を`float`関数で実数へ変換せよ．
8. 最高気温の合計とデータ数を求め，平均を戻り値として返せ．
9. `average_temperature("week_temperature.csv")`を呼び出し，「平均最高気温は20.5度です．」と表示せよ．

`csv`モジュール，関数，for文，`float`関数，return文を使用せよ．
````

````{hidden-answer} 解答例
```python
import csv

rows = [
    ["曜日", "最高気温"],
    ["月", 18.5],
    ["火", 20.0],
    ["水", 21.5],
    ["木", 19.0],
    ["金", 23.5],
]

with open("week_temperature.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)

def average_temperature(filename):
    total = 0.0
    count = 0

    with open(filename, "r", encoding="utf-8") as file:
        reader = csv.reader(file)
        next(reader)

        for row in reader:
            temperature = float(row[1])
            total = total + temperature
            count = count + 1

    return total / count

average = average_temperature("week_temperature.csv")
print(f"平均最高気温は{average}度です．")
```
````

### 提出方法

- WebClassの「第4回課題」からNotebookファイル（`第4回_<学籍番号>_<氏名>.ipynb`）を提出する．
- 提出前にファイル名，Markdownセル，関数の定義，ファイルを作成するCodeセル，読み込んだ結果を確認するCodeセルを確認する．
- すべてのCodeセルの出力を表示した状態で保存する．
- Notebookを上から順番に再実行し，`plan.txt`と`week_temperature.csv`を作成できることを確認する．

### 提出期限

<span style="color: red; ">10月23日(金)23:59まで</span>

質問等がある場合には

- メール kkagawa@josai.ac.jp
- Teamsのチャット
- WebClassのメッセージ

などで連絡してください．

## まとめ

- メソッドは，特定の種類のオブジェクトに結び付いた関数である．
- リスト，辞書，文字列には，それぞれのデータ型に応じたメソッドが用意されている．
- クラスはデータの種類と処理を定めた設計図であり，インスタンスはクラスに基づく個々のオブジェクトである．
- 変数の値は実行中に保持され，ファイルへ書き込んだデータは実行後にも残る．
- `with open(...)`を使うと，処理後にファイルが自動的に閉じられる．
- `"r"`は読み込み，`"w"`は上書き，`"a"`は追記を表す．
- `encoding="utf-8"`を指定すると，日本語をUTF-8で読み書きできる．
- `csv.writer`と`csv.reader`を使うと，CSVファイルを安全に読み書きできる．
- pandasを使うと，CSVファイルをDataFrameとして読み込み，集計や条件抽出ができる．
- ファイル操作を関数にまとめると，保存先やデータを変えて再利用できる．
- 次回は条件分岐，繰り返し，関数を組み合わせて整数の問題を解く．
