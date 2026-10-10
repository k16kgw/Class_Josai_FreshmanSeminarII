# 第3回　関数

### 到達目標

- 関数を定義し，呼び出せる．
- 引数と戻り値の役割を説明できる．
- 条件分岐や繰り返しを関数へまとめられる．
- ガード節を使い，不適切な値を先に処理できる．

### 前回の復習

前回：**条件分岐**と**繰り返し**を使って処理の流れを制御した．

- **条件分岐**：条件に応じて実行する処理を変えること．
- **繰り返し**：同じ処理を，回数や条件に応じて何度も実行すること．
- **ガード節**：特別に扱う条件を先に判定し，その後の処理から外す書き方．

次のコードでは複数の得点を順番に取り出し，条件に応じて結果を表示する．

```python
scores = [55, 72, 91]

for score in scores:
    if score >= 60:
        print(f"{score}点：合格")
    else:
        print(f"{score}点：不合格")
```

今回：一連の処理を**関数**としてまとめ，再利用する方法を学ぶ．

同じ処理を別の場所でも使いたい場合，コードを何度も書くと修正箇所が増える．<br>
→ 何度も実行するコードを関数にまとめることで，同じ手続きを1回書くだけで済ますことができる．

### Jupyter Notebookの準備

1. Anaconda NavigatorからJupyter Notebookを起動する．
2. `Documents（書類）/Fresh2`フォルダを開く．
3. Python 3のNotebookを新規作成する．
4. ファイル名を`第3回_<学籍番号>_<氏名>.ipynb`へ変更する．

```{dropdown} 忘れた人のためのJupyter Notebookの準備手順
### Jupyter Notebookを起動する

1. Spotlight検索（`command`+`Space`）でAnaconda Navigatorを起動する．
2. Anaconda Navigatorが表示されるまで待つ．
3. Jupyter Notebookの「Launch」をクリックする．
4. WebブラウザにJupyter Notebookのファイル一覧が表示されたことを確認する．

<img src="./figs/jupyter_anaconda_navigator.png" alt="Anaconda Navigatorの画面" width="600">

<img src="./figs/jupyter_launch_button.png" alt="Jupyter NotebookのLaunchボタン" width="600">

<img src="./figs/jupyter_file_browser.png" alt="Jupyter Notebookのファイル一覧" width="600">

### Fresh2フォルダを開く

1. Jupyter Notebookのファイル一覧で `Documents` または `書類` フォルダをクリックする．
2. `Fresh2` フォルダをクリックして開く．
3. `Fresh2` フォルダがない場合は，画面右上の「New」から「New Folder」を選択する．
4. 作成された `Untitled Folder` を選択し，「Rename」をクリックする．
5. フォルダ名を `Fresh2` へ変更し，そのフォルダを開く．

<img src="./figs/jupyter_documents_folder.png" alt="Documentsフォルダを開く操作" width="600">

<img src="./figs/jupyter_new_folder.png" alt="新しく作成されたフォルダ" width="600">

### Notebookファイルを新規作成する

1. `Fresh2`フォルダを開いた状態で，画面右上の「New」をクリックする．
2. 「Python 3 (ipykernel)」をクリックする．
3. 新しく開いたNotebook上部のファイル名をクリックする．
4. ファイル名を`第3回_<学籍番号>_<氏名>.ipynb`へ変更する．
5. `<学籍番号>`と`<氏名>`を自分の学籍番号と氏名へ置き換える．
6. Codeセルが表示されていることを確認する．

<img src="./figs/jupyter_new_notebook.png" alt="Python 3のNotebookを新規作成する操作" width="600">

<img src="./figs/jupyter_rename_notebook.png" alt="Notebookのファイル名を変更する操作" width="600">

<img src="./figs/jupyter_code_cell.png" alt="Jupyter NotebookのCodeセル" width="600">

**注意：** Jupyter Notebookのバージョンによって，ボタンの名称や配置が画像と異なる場合がある．Notebookを作成したら，コードを入力する前に保存場所とファイル名を確認する．
```

## 関数の定義と呼び出し

- **関数**：一連の処理をひとまとまりにし，名前を付けたもの．
- **関数の定義**：関数の名前と，関数が行う処理を記述すること．
- **関数の呼び出し**：定義した関数を実行すること．

引数と戻り値を使わない関数の一般的な構成は次のとおりである．

```text
def 関数名():
    関数を呼び出したときに実行する処理

関数名()
```

- 関数を定義する行は`def`から始め，行末にコロン`:`を付ける．
- 関数に含める処理は，次の行からインデントして記述する．
- インデントされた<span style="color:red">ブロックの中が関数の処理する内容となる</span>．
- 定義しただけでは処理は実行されないため，関数名に丸括弧`()`を付けて呼び出す．

```python
def greet():
    print("こんにちは．")

greet()
```

このコードは，次の順序で処理される．

1. `def greet():`で関数`greet`を定義する．
2. インデントされた`print`関数を，`greet`の処理として登録する．
3. `greet()`で関数を呼び出す．
4. `def greet()`のブロックの中に書かれた処理を実行する．

```{tip} 注意：関数名
関数名にはその関数が<span style="color:red">行う処理を表す名前</span>を付ける．
Pythonでは英小文字を基本とし，複数の単語は`calculate_total`のようにアンダースコア`_`で区切る書き方が一般的である．
アンダースコア`_`で区切る命名記法を**HOGEHOGE**と呼ぶ．
```

````{note} 演習1
「関数を呼び出しました。」と表示する関数`show_message()`を作成せよ．

1. `def`を使って関数を定義せよ．
2. 関数の中で`print`関数を実行せよ．
3. `show_message()`を2回呼び出し，メッセージが2回表示されることを確認せよ．
````

<!-- 
````{dropdown} 解答例
```python
def show_message():
    print("関数を呼び出しました．")

show_message()
show_message()
```
````
 -->

## 引数

- **引数**：関数へ渡す値．
- **仮引数**：関数の定義で，渡された値を受け取る変数．
- **実引数**：関数を呼び出すときに渡す具体的な値．

引数を使う関数の一般的な構成は次のとおりである．

```text
def 関数名(仮引数):
    仮引数を使った処理

関数名(実引数)
```

次の例では，`name`が仮引数，`"佐藤"`が実引数である．関数を呼び出すと，実引数`"佐藤"`が仮引数`name`へ代入される．

```python
def greet(name):
    print(f"{name}さん，こんにちは．")

greet("佐藤")
greet("鈴木")
```

複数の引数を使う場合は，仮引数と実引数をそれぞれカンマで区切る．値は書かれた順番に対応する．

```python
def show_total(price, count):
    total = price * count
    print(f"合計は{total}円です．")

show_total(120, 3)
```

````{note} 演習2
整数を一つ受け取り，その整数の2乗を表示する関数`show_square(number)`を作成せよ．

1. `number`を仮引数として受け取れ．
2. `number ** 2`を計算し，結果を表示せよ．
3. 実引数として3と5をそれぞれ渡し，関数を2回呼び出せ．
````

````{dropdown} 解答例
```python
def show_square(number):
    print(number ** 2)

show_square(3)
show_square(5)
```
````

## 戻り値

- **戻り値**：関数が呼び出し元へ返す処理結果．
- **`return`文**：関数の戻り値を指定し，関数の処理を終了する文．

戻り値を返す関数の一般的な構成は次のとおりである．

```text
def 関数名(引数):
    処理
    return 戻り値

変数 = 関数名(実引数)
```

次の関数`average`は，二つの値の平均を戻り値として返す．返された値は変数`value`へ代入される．

```python
def average(a, b):
    result = (a + b) / 2
    return result

value = average(70, 90)
print(value)
```

`print`関数と`return`文の役割は異なる．`print`関数は値を画面へ表示する．`return`文は値を関数の呼び出し元へ返す．戻り値は変数へ代入したり，別の計算に使ったりできる．

```python
def square(number):
    return number ** 2

result = square(5)
print(result + 10)
```

```{tip} 注意：return文の後の処理
`return`文が実行されると，その時点で関数の処理が終了する．同じブロック内で`return`文より後に書かれた処理は実行されない．
```

````{note} 演習3
円の半径を受け取り，面積を返す関数`circle_area(radius)`を作成せよ．円周率は`3.14`とする．

1. `radius`を仮引数として受け取れ．
2. `3.14 * radius ** 2`を計算し，戻り値として返せ．
3. 半径3と半径5の面積をそれぞれ表示せよ．
4. 結果が正しいか手計算でも確認せよ．
````

````{dropdown} 解答例
```python
def circle_area(radius):
    area = 3.14 * radius ** 2
    return area

print(circle_area(3))
print(circle_area(5))
```
````

## 関数で使うガード節

第2回では，`continue`を使ったガード節を扱った．関数では，処理を続けられない条件を先に判定し，`return`文で関数を終了できる．

```text
def 関数名(引数):
    if 処理を続けられない条件:
        return 特別な戻り値

    通常の処理
    return 通常の戻り値
```

次の関数では，0点未満または100点より大きい得点を先に処理する．範囲外の場合は`"範囲外"`を返して関数を終了するため，その後の合否判定は実行されない．

```python
def judge_score(score):
    if not (0 <= score <= 100):
        return "範囲外"

    if score >= 60:
        return "合格"

    return "不合格"

print(judge_score(80))
print(judge_score(40))
print(judge_score(120))
```

````{note} 演習4
整数を一つ受け取り，その絶対値を返す関数`absolute_value(number)`を作成せよ．

1. `number`が0以上なら，`number`をそのまま返せ．
2. `number`が0未満なら，`-number`を返せ．
3. 実引数として5，0，-3を渡し，戻り値を確認せよ．
````

````{dropdown} 解答例
```python
def absolute_value(number):
    if number >= 0:
        return number

    return -number

print(absolute_value(5))
print(absolute_value(0))
print(absolute_value(-3))
```
````

## 関数を使う理由

- 同じ処理を何度も書かずに再利用できる．
- 関数名から処理の目的を読み取りやすくなる．
- 処理を修正する場所を関数の定義へまとめられる．
- 小さな処理単位で実行し，結果を確認できる．

## エラーが出たときにチェックすること

- `def`の行末にコロン`:`があるか確認する．
- 関数本体が半角スペース4文字分インデントされているか確認する．
- 関数を定義したCodeセルを先に実行したか確認する．
- 定義した仮引数の個数と，呼び出すときの実引数の個数が一致しているか確認する．
- 戻り値を使う関数に`return`文があるか確認する．
- `print`関数による表示と，`return`文による戻り値を混同していないか確認する．

## 課題

````{warning} 課題1
得点を受け取り，評価を戻り値として返す関数`classify_score(score)`を作成せよ．

1. 新しいMarkdownセルを追加し，「第3回課題」，学籍番号，氏名を記入せよ．
2. 新しいCodeセルを追加し，仮引数`score`を持つ関数`classify_score(score)`を定義せよ．
3. ガード節を使い，`score`が0未満または100より大きい場合は`"範囲外"`を返せ．
4. 0点以上100点以下の場合は，次の基準で評価を返せ．

   - 90点以上：S
   - 80点以上90点未満：A
   - 70点以上80点未満：B
   - 60点以上70点未満：C
   - 60点未満：D

5. 次のリストと`for`文を使い，すべての得点について関数を呼び出せ．

   ```python
   scores = [-1, 0, 59, 60, 69, 70, 79, 80, 89, 90, 100, 101]
   ```

6. f-stringを使い，「80点：A」の形式で得点と評価を1行ずつ表示せよ．
7. -1点と101点は「範囲外」，0点から100点までは指定された評価になることを確認せよ．

`if`文，`return`文，ガード節，`for`文をすべて使用せよ．
````

<!--
````{dropdown} 解答例
```python
def classify_score(score):
    if not (0 <= score <= 100):
        return "範囲外"

    if score >= 90:
        return "S"
    elif score >= 80:
        return "A"
    elif score >= 70:
        return "B"
    elif score >= 60:
        return "C"

    return "D"

scores = [-1, 0, 59, 60, 69, 70, 79, 80, 89, 90, 100, 101]

for score in scores:
    grade = classify_score(score)
    print(f"{score}点：{grade}")
```
````
-->

### 提出方法

- WebClassの「第3回課題」からNotebookファイル（`第3回_<学籍番号>_<氏名>.ipynb`）を提出する．
- 提出前にファイル名，Markdownセル，関数の定義，関数の呼び出し，Codeセルの実行結果を確認する．
- すべてのCodeセルの出力を表示した状態で保存する．

### 提出期限

WebClassの「第3回課題」に表示された日時までに提出すること．

## まとめ

- 関数は`def`で定義し，関数名に丸括弧`()`を付けて呼び出す．
- 引数を使うと，呼び出すたびに異なる値を関数へ渡せる．
- `return`文を使うと，関数の処理結果を戻り値として返せる．
- 関数のガード節では，不適切な値を先に判定して処理を終了できる．
- 次回はプログラムとファイルの間でデータを入出力する．
