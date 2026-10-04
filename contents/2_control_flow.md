# 第2回　制御構文：条件分岐と繰り返し

### スケジュール変更

1. Pythonの概要，環境整備，変数と計算
2. 制御構文：条件分岐と繰り返し
3. 関数
4. ファイル操作
5. 整数を扱う計算
6. 数値計算1
7. 数値計算2
8. 数値計算3：Google Colabによる計算
9. 可視化
10. <span style="color:red">テスト</span>
11. UNIX系のOS，エディタの使い方
12. 生成AIとPythonでゲームを作ろうI
13. 生成AIとPythonでゲームを作ろうII

### 教科書

大和田勇人，金盛克俊「Pythonで始めるプログラミング入門」コロナ社，2015年．

<img src="./figs/text.png" alt="教科書" width="400">

### 到達目標

- 条件分岐
  - 比較演算子を使って条件式を作成できる．
  - `if`・`elif`・`else`を使って処理を分岐できる．
  - 複数の条件を`and`・`or`・`not`で組み合わせられる．
- 繰り返し
  - `for`文を使って決まった回数の処理を繰り返せる．
  - `while`文を使って条件が成り立つ間，処理を繰り返せる．
  - `break`と`continue`を使って繰り返しを制御できる．

### 前回の復習

- Pythonの書き方を復習した．
- 変数へ値を代入した．
- 算術演算子を用いて計算した．

```python
score = 80
score = score + 5
print(score)
```

- **条件分岐**：変数の値に応じて実行する処理を変える．
- **繰り返し**：同じ処理を，回数や条件に応じて何度も実行する．

### Jupyter Notebookの準備

1. Anaconda NavigatorからJupyter Notebookを起動する．
2. `Documents（書類）/Fresh2`フォルダを開く．
3. Python 3のNotebookを新規作成する．
4. ファイル名を`第2回_<学籍番号>_<氏名>.ipynb`へ変更する．

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

1. Jupyter Notebookのファイル一覧で`Documents（書類）`フォルダをクリックする．
2. `Fresh2`フォルダがある場合は，そのフォルダをクリックして開く．
3. `Fresh2`フォルダがない場合は，画面右上の「New」から「New Folder」を選択する．
4. 作成された`Untitled Folder`を選択し，「Rename」をクリックする．
5. フォルダ名を`Fresh2`へ変更し，そのフォルダを開く．

<img src="./figs/jupyter_documents_folder.png" alt="Documentsフォルダを開く操作" width="600">

<img src="./figs/jupyter_new_folder.png" alt="新しく作成されたフォルダ" width="600">

### Notebookファイルを新規作成する

1. `Fresh2`フォルダを開いた状態で，画面右上の「New」をクリックする．
2. 「Python 3 (ipykernel)」をクリックする．
3. 新しく開いたNotebook上部のファイル名をクリックする．
4. ファイル名を`第2回_<学籍番号>_<氏名>.ipynb`へ変更する．
5. `<学籍番号>`と`<氏名>`を自分の学籍番号と氏名へ置き換える．
6. Codeセルが表示されていることを確認する．

<img src="./figs/jupyter_new_notebook.png" alt="Python 3のNotebookを新規作成する操作" width="600">

<img src="./figs/jupyter_rename_notebook.png" alt="Notebookのファイル名を変更する操作" width="600">

<img src="./figs/jupyter_code_cell.png" alt="Jupyter NotebookのCodeセル" width="600">

**注意：** Jupyter Notebookのバージョンによって，ボタンの名称や配置が画像と異なる場合がある．Notebookを作成したら，コードを入力する前に保存場所とファイル名を確認する．
```

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

## インデントの役割

**インデント**とは，行の先頭を字下げすることである．Pythonでは，インデントを使って複数の文を一つの処理のまとまりにする．このまとまりを**ブロック**という．

次のひな型では，`処理1`と`処理2`が`if`文のブロックに含まれる．`処理3`はインデントされていないため，`if`文の外側にある．これは構成を説明するためのひな型であり，そのままでは実行できない．

```text
if 条件式:
    処理1
    処理2
処理3
```

同じブロックに含める行は，同じ幅でインデントする．本講義では，インデントを半角スペース4文字分に統一する．さらに内側へ処理を入れる場合は，もう一段インデントする．

```{tip} 注意：スペースキーでインデントを手入力しない
スペースキーを何度か押して見た目だけを合わせる方法では，行ごとに字下げの幅がずれやすい．本講義では，Codeセルの行頭で`Tab`キーを押してインデントを入れること．Jupyter Notebookが適切な幅の字下げを挿入する．
```

```{tip} 注意：全角スペースは使用しない
日本語入力中に入力される全角スペースは，Pythonのインデントとして使用できない．全角スペースが混ざると，見た目では分かりにくいエラーの原因になる．また，タブ文字と半角スペースを同じファイル内で混在させないこと．
```

## if文

`if`の条件が`True`のとき，**インデントされた処理を実行**する．

`if`・`elif`・`else`を使うコードの一般的な構成は次のとおりである．上から順に条件式を調べ，最初に`True`となったブロックだけを実行する．どの条件にも当てはまらない場合は，`else`のブロックを実行する．

```text
if 条件式1:
    条件式1がTrueのときの処理
elif 条件式2:
    条件式1がFalseで，条件式2がTrueのときの処理
else:
    どの条件式もFalseのときの処理
```

条件が二つだけの場合は`elif`を省略し，`if`と`else`を使用する．`else`が不要な場合は，`if`のブロックだけでもよい．

```python
score = 80

if score >= 60:
    print("合格です．")
else:
    print("不合格です．")
```

条件を三つ以上に分ける場合は`elif`（else ifの意味）を使う．

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

複数の条件は**論理演算子**で組み合わせる．

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

````{note} 演習1
変数`temperature`へ気温を代入し，次の条件でメッセージを表示するプログラムを作成せよ．

- 30以上：「暑いです．」
- 20以上30未満：「過ごしやすいです．」
- 20未満：「肌寒いです．」

`if`・`elif`・`else`をすべて使用せよ．
````

<!--
````{dropdown} 解答例
```python
temperature = 25

if temperature >= 30:
    print("暑いです．")
elif temperature >= 20:
    print("過ごしやすいです．")
else:
    print("肌寒いです．")
```
````
-->

## for文

- `for`文：値を順番に取り出しながら処理を繰り返す．

`for`文の一般的な構成は次のとおりである．`繰り返す対象`から値を一つずつ取り出して`変数`へ代入し，インデントされた処理を値の個数だけ繰り返す．

```text
for 変数 in 繰り返す対象:
    取り出した値について繰り返す処理
```

連続する整数を使う場合は`range`関数を使用する．`開始値`から`終了値`の一つ手前までの整数が，順番に変数へ代入される．

```text
for 変数 in range(開始値, 終了値):
    各整数について繰り返す処理
```

```python
for number in range(1, 6):
    print(number)
```

`range(1, 6)`では，1から5までの整数が順に作られる．
合計値を求めるときは，計算結果を保存する変数を用意する．

```python
total = 0

for number in range(1, 11):
    total = total + number

print(total)
```

## while文

- `while`文：条件が`True`である間，処理を繰り返す．

`while`文の一般的な構成は次のとおりである．処理を一度実行するたびに条件式をもう一度調べ，条件式が`False`になると繰り返しを終了する．

```text
while 条件式:
    条件式がTrueである間，繰り返す処理
    条件式に使う変数を更新する処理
```

条件式に使う変数を更新しないと，条件式がいつまでも`True`のままとなり，繰り返しが終了しない場合がある．

```{tip} 注意：無限ループ
`while`文の条件式がいつまでも`True`のままだと，処理が終わらない**無限ループ**になる．繰り返しの中で，条件式に使う変数が終了条件へ近づくように更新されているか確認すること．

Jupyter Notebookで無限ループを実行した場合は，ツールバーの停止ボタン（■）を押すか，「Kernel」メニューから「Interrupt」を選択して実行を中断する．中断後は条件式と変数の更新処理を修正してから，セルを再実行する．
```

```python
count = 3

while count > 0:
    print(count)
    count = count - 1

print("開始")
```

条件が常に`True`になると処理が終わらない．
繰り返しの中で条件に使う変数を更新する必要がある．

## breakとcontinue

- `break`：繰り返しを終了する．
- `continue`：残りの処理を飛ばして次の繰り返しへ進む．

`break`と`continue`を含むコードの一般的な構成は次のとおりである．`終了条件`が成り立つと繰り返し全体を終了する．`スキップ条件`が成り立つと，その回の残りの処理だけを飛ばし，次の値の処理へ進む．

```text
for 変数 in 繰り返す対象:
    if 終了条件:
        break
    if スキップ条件:
        continue
    終了もスキップもしないときの処理
```

```python
for number in range(1, 11):
    if number == 6:
        break
    if number % 2 == 0:
        continue
    print(number)
```

````{note} 演習2
1から30までの整数について，次の規則で表示するプログラムを作成せよ．

- 3の倍数：「Fizz」
- 5の倍数：「Buzz」
- 3と5の両方の倍数：「FizzBuzz」
- それ以外：整数をそのまま表示

`for`文と`if`文を組み合わせよ．
````

<!--
````{dropdown} 解答例
```python
for number in range(1, 31):
    if number % 3 == 0 and number % 5 == 0:
        print("FizzBuzz")
    elif number % 3 == 0:
        print("Fizz")
    elif number % 5 == 0:
        print("Buzz")
    else:
        print(number)
```
````
-->

## エラーが出たときにチェックすること

- 条件の末尾にコロン`:`があるか確認する．
- `=`ではなく，比較には`==`を使っているか確認する．
- 分岐内のコードが半角4文字分インデントされているか確認する．
- 条件を上から順に判定して問題ない並びになっているか確認する．
- `range`の終点は含まれないことに注意する．
- `while`文が終了しない場合は，条件に使う変数が更新されているか確認する．

````{warning} 課題
`for`文と条件分岐を使い，0点から100点までの得点と評価を10点刻みで表示するプログラムを作成せよ．

1. 新しいMarkdownセルを追加し，「第2回課題」，学籍番号，氏名を記入せよ．
2. `range(0, 101, 10)`を使い，0から100までの得点を変数`score`へ順番に代入せよ．
3. `if`・`elif`・`else`を使い，得点を次の評価へ分類せよ．

   - 90点以上：S
   - 80点以上90点未満：A
   - 70点以上80点未満：B
   - 60点以上70点未満：C
   - 60点未満：D

4. f-stringを使い，各得点と評価を「0点：D」の形式で1行ずつ表示せよ．
5. 0点から100点までの11個の結果がすべて表示されていることを確認せよ．
6. 新しいMarkdownセルを追加し，条件を得点の高い順に並べる理由を2文以内で説明せよ．

`for`文，`if`文，`elif`，`else`をすべて使用せよ．
````

### 提出方法

- WebClassの「第2回課題」からNotebookファイル（`第2回_<学籍番号>_<氏名>.ipynb`）を提出する．
- 提出前にファイル名・Codeセルの実行結果・Markdownセルの内容を確認する．
- すべてのCodeセルの出力を表示した状態で保存する．

## まとめ

- 比較の結果は`True`または`False`になる．
- `if`・`elif`・`else`で条件に応じて処理を分ける．
- `for`文は回数や要素が決まった繰り返しに適している．
- `while`文は条件に基づく繰り返しに適している．
- 次回は処理をまとめて再利用する関数を扱う．
