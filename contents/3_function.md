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

第2回の演習2では，for文と条件分岐を使い，0点から100点までの得点と評価を10点刻みで表示した．次のコードは，その演習の解答例である．

```python
for score in range(0, 101, 10):
    if score >= 90:
        grade = "S"
    elif score >= 80:
        grade = "A"
    elif score >= 70:
        grade = "B"
    elif score >= 60:
        grade = "C"
    else:
        grade = "D"

    print(f"{score}点：{grade}")
```

### 前回の課題の解答例

**課題1：うるう年の判定**

西暦を変数`year`へ代入し，その年が「うるう年」か「平年」かを判定した．

```python
year = 2025

if year % 400 == 0:
    result = "うるう年"
elif year % 100 == 0:
    result = "平年"
elif year % 4 == 0:
    result = "うるう年"
else:
    result = "平年"

print(f"{year}年は{result}です．")
```

このコードでは，例外となる条件から順番に判定する．

1. 400で割り切れる年を，うるう年と判定する．
2. 400で割り切れず，100で割り切れる年を，平年と判定する．
3. 400でも100でも割り切れず，4で割り切れる年を，うるう年と判定する．
4. どの条件にも当てはまらない年を，平年と判定する．

`if`・`elif`・`else`では，上から順に条件式を調べ，最初に`True`となったブロックだけを実行する．そのため，400，100，4の順番で割り切れるかを調べる必要がある．例えば1900は4で割り切れるが，100でも割り切れるため平年となる．一方，2000は400で割り切れるため，うるう年となる．

**課題2：文法誤りと条件判定の修正**

**第1段階：インデント不足による文法誤り**

最初に，次のコードを修正せずに実行して`IndentationError`を確認した．

```{code-block} python
:linenos:
:emphasize-lines: 5

ages = [4, 10, 30, 70]

for age in ages:
    if age >= 6:
    category = "一般料金"  # ← 問題箇所：インデントが不足している
    elif age >= 65:
        category = "シニア料金"
    else:
        category = "幼児料金"

    print(f"{age}歳：{category}")
```

5行目のコメントで示した箇所は，`if age >= 6:`のブロックに含まれる処理であるため，さらに一段インデントする必要がある．この行にインデントがないので，Pythonはif文の処理範囲を正しく読み取れず，`IndentationError`を出す．

**第2段階：インデントだけを修正したコード**

`category = "一般料金"`をif文のブロックへ入れると，文法誤りは解消する．

しかし，次の順番では70歳も最初の条件`age >= 6`を満たすため，「一般料金」と判定される．

```{code-block} python
:linenos:
:emphasize-lines: 1

if age >= 6:  # ← 問題箇所：65歳以上もこの条件を満たす
    category = "一般料金"
elif age >= 65:
    category = "シニア料金"
else:
    category = "幼児料金"
```

1行目のコメントで示した条件は6歳以上のすべての年齢で`True`になるため，65歳以上の場合も`elif age >= 65`まで判定が進まない．

**第3段階：条件の順番も修正したコード**

65歳以上を先に判定するように条件の順番を変更すると，意図した料金区分になる．

```python
ages = [4, 10, 30, 70]

for age in ages:
    if age >= 65:
        category = "シニア料金"
    elif age >= 6:
        category = "一般料金"
    else:
        category = "幼児料金"

    print(f"{age}歳：{category}")
```

条件が重なる場合は，より範囲の狭い条件を先に判定する．この例では，「65歳以上」はすべて「6歳以上」にも含まれるため，`age >= 65`を先に書く必要がある．

今回は，一連の処理を**関数**としてまとめ，再利用する方法を学ぶ．同じ処理を別の場所でも使いたい場合，コードを何度も書くと修正箇所が増える．何度も実行するコードを関数にまとめると，同じ手続きを一度定義するだけで繰り返し利用できる．

### Jupyter Notebookの準備

1. Anaconda NavigatorからJupyter Notebookを起動する．
2. `Documents（書類）/Fresh2`フォルダを開く．
3. Python 3のNotebookを新規作成する．
4. ファイル名を`第3回_<学籍番号>_<氏名>.ipynb`へ変更する．

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

1. Jupyter Notebookのファイル一覧で `Documents` または `書類` フォルダをクリックする．
2. `Fresh2` フォルダをクリックして開く．
3. `Fresh2` フォルダがない場合は，画面右上の「New」から「New Folder」を選択する．
4. 作成された `Untitled Folder` を選択し，「Rename」をクリックする．
5. フォルダ名を `Fresh2` へ変更し，そのフォルダを開く．

<img src="./figs/jupyter_documents_folder.png" alt="Documentsフォルダを開く操作" width="600">

<img src="./figs/jupyter_new_folder.png" alt="新しく作成されたフォルダ" width="600">

**Notebookファイルを新規作成する**

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
英小文字の単語をアンダースコア`_`で区切る命名記法を**スネークケース**（snake_case）と呼ぶ．
```

```{tip} 注意：命名記法
**命名記法**とは，複数の単語を組み合わせて変数名や関数名などを付けるときの書き方である．代表的な命名記法には，次のものがある．

- **スネークケース**（snake_case）
    - すべての単語を英小文字で書き，単語の間をアンダースコア`_`で区切る．Pythonでは，変数名や関数名にこの記法を使うことが一般的である．
    - 例：`student_name`，`calculate_total`
- **キャメルケース**（camelCase）
    - 最初の単語を英小文字で始め，二つ目以降の単語の先頭を英大文字にする．JavaScriptなどで，変数名や関数名に使われることがある．
    - 例：`studentName`，`calculateTotal`
- **パスカルケース**（PascalCase）
    - すべての単語の先頭を英大文字にし，単語を続けて書く．Pythonでは，主にクラス名に使われる．
    - 例：`StudentName`，`StudentRecord`
- **アッパースネークケース**（UPPER_SNAKE_CASE）
    - すべての単語を英大文字で書き，単語の間をアンダースコア`_`で区切る．Pythonでは，プログラムの途中で変更しない定数を表す名前に使われる．
    - 例：`TAX_RATE`，`MAX_SCORE`
- **ケバブケース**（kebab-case）
    - すべての単語を英小文字で書き，単語の間をハイフン`-`で区切る．ファイル名やURLなどで使われるが，Pythonでは`-`が引き算の演算子として解釈されるため，変数名や関数名には使用できない．
    - 例：`student-record.html`，`python-basics`

この授業でPythonの変数名や関数名を付けるときは，原則としてスネークケースを使用する．
```

````{note} 演習1
「関数を呼び出しました。」と表示する関数`show_message()`を作成せよ．

1. `def`を使って関数を定義せよ．
2. 関数の中で`print`関数を実行せよ．
3. `show_message()`を2回呼び出し，メッセージが2回表示されることを確認せよ．
````


````{visible-answer} 解答例
```python
def show_message():
    print("関数を呼び出しました．")

show_message()
show_message()
```
````


## ライブラリ（フレッシュマンセミナーI 第12回の復習）

Pythonには，計算やデータ処理などに利用できる機能があらかじめ用意されている．
必要な機能を自分ですべて作るのではなく，既存の機能を利用することで，短く読みやすいプログラムを作成できる．

- **ライブラリ**：特定の目的に利用できるプログラムをまとめたもの．
- **標準ライブラリ**：Pythonとともに提供されるライブラリ．追加のインストールをしなくても利用できる．
- **モジュール**：関数や定数などをまとめたPythonのプログラム．標準ライブラリは多数のモジュールから構成される．
- **import文**：モジュールを現在のプログラムで利用できるように読み込む文．

前節では，関数を一連の処理をまとめたものとして説明した．モジュールは，そのような関数や定数などを目的ごとに整理してまとめる単位である．一方，関数は，呼び出すと特定の処理を実行するものである．したがって，モジュールと関数は同じものではなく，<span style="color:red">モジュールの中に関数が用意されている</span>という関係になる．

`math`は，数学に関する機能をまとめた標準ライブラリのモジュールである．`math`モジュールを利用するには，最初に次のimport文を実行する．

```python
import math
```

`import math`は`math`モジュールを読み込む文であり，モジュール内の個々の関数を呼び出す文ではない．モジュールを読み込んだ後は，`モジュール名.名前`の形で，そのモジュールに含まれる関数や定数を利用する．ピリオド`.`は，指定したモジュールの中にある名前を参照することを表す．

```python
import math

print(math.pi)
print(math.sqrt(16))
```

- **`math`**：数学に関する関数や定数をまとめたモジュール．
- **`math.pi`**：`math`モジュールに用意された円周率を表す定数．
- **`math.sqrt`**：`math`モジュールに用意された平方根を計算する関数．
- **`math.sqrt(16)`**：`sqrt`関数へ`16`を渡して呼び出す式．この場合は`4.0`を返す．

同じNotebook内では，`import math`を一度実行すれば，その後のCodeセルでも`math.pi`や`math.sqrt()`を利用できる．

```{tip} 注意：モジュールの読み込みと関数の呼び出し
`import math`はモジュールを読み込む．`math.sqrt(16)`は，読み込んだモジュールの中にある関数を呼び出す．モジュール名には丸括弧を付けず，関数を呼び出すときに丸括弧を付ける．
```

```{tip} 注意：import文を先に実行する
Jupyter Notebookを終了したりカーネルを再起動したりすると，読み込んだモジュールの情報は失われる．再び計算するときは，`import math`を書いたCodeセルから順番に実行する．`import math`を実行する前に`math.pi`を使うと，`NameError`が発生する．
```

## 引数

- **引数**（ひきすう）：関数へ渡す値．
- **仮引数**（かりひきすう）：関数の定義で，渡された値を受け取る変数．
- **実引数**（じつひきすう）：関数を呼び出すときに渡す具体的な値．

引数を使う関数の一般的な構成は次のとおりである．

```text
def 関数名(仮引数):
    仮引数を使った処理

関数名(実引数)
```

次の例では，`name`が仮引数，`"佐藤"`，`"鈴木"`が実引数である．
関数を呼び出すと，実引数`"佐藤"`が仮引数`name`へ代入されて処理される．

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

1. `number` を仮引数として受け取れ．
2. `number ** 2` を計算し，結果を表示せよ．
3. 実引数として `3` と `5` をそれぞれ渡し，関数を2回呼び出せ．
````

````{visible-answer} 解答例
```python
def show_square(number):
    print(number ** 2)

show_square(3)
show_square(5)
```
````


## 戻り値

- **戻り値**：関数が呼び出し元へ返す処理結果．
- **return文**：関数の戻り値を指定し，関数の処理を終了する文．

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

`print`関数とreturn文の役割は異なる．`print`関数は値を画面へ表示する．return文は値を関数の呼び出し元へ返す．戻り値は変数へ代入したり，別の計算に使ったりできる．

```python
def square(number):
    return number ** 2

result = square(5)
print(result + 10)
```

```{tip} 注意：return文の後の処理
return文が実行されると，その時点で関数の処理が終了する．同じブロック内でreturn文より後に書かれた処理は実行されない．
```

````{note} 演習3
円の半径を受け取り，面積を返す関数`circle_area(radius)`を作成せよ．円周率は`math.pi`で呼び出せる．

1. `import math`を実行し，`math`モジュールを読み込め．
2. `radius`を仮引数として受け取れ．
3. `math.pi * radius ** 2`を計算し，戻り値として返せ．
4. 半径3と半径5の面積をそれぞれ表示せよ．
5. 結果が正しいか手計算でも確認せよ．
````

````{visible-answer} 解答例
```python
import math

def circle_area(radius):
    area = math.pi * radius ** 2
    return area

print(circle_area(3))
print(circle_area(5))
```
````


## 関数で使うガード節

第2回では`continue`を使ったガード節を扱った．
関数では処理を続けられない条件を先に判定し，return文で関数を終了できる．

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
実数のリストを受け取り，各要素の絶対値を並べた新しいリストを返す関数`absolute_values(numbers)`を作成せよ．

1. 仮引数`numbers`を持つ関数`absolute_values(numbers)`を定義せよ．
2. 関数の中で，絶対値を保存する空のリスト`results`を作成せよ．
3. 関数の中でfor文を使い，`numbers`から実数を一つずつ取り出せ．
4. 取り出した実数が0以上なら，その値を`results`へ追加せよ．
5. 取り出した実数が0未満なら，符号を反転した値を`results`へ追加せよ．
6. 繰り返しが終了したら，`results`を戻り値として返せ．
7. 次のリストを実引数として関数を呼び出し，戻り値を表示せよ．

   ```python
   numbers = [-3.5, 2.0, -1.2, 0.0, 4.8]
   ```

8. `[-3.5, 2.0, -1.2, 0.0, 4.8]`を渡すと，`[3.5, 2.0, 1.2, 0.0, 4.8]`が表示されることを確認せよ．
````

````{visible-answer} 解答例
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
````


## 関数を使う理由

- 同じ処理を何度も書かずに再利用できる．
- 関数名から処理の目的を読み取りやすくなる．
- 処理を修正する場所を関数の定義へまとめられる．
- 小さな処理単位で実行し，結果を確認できる．

## エラーが出たときにチェックすること

- `def`の行末にコロン`:`があるか確認する．
- 関数本体がブロックとしてインデントされているか確認する．
- 関数を定義したCodeセルを先に実行してあるかを確認する．
- 定義した仮引数の個数と，呼び出すときの実引数の個数が一致しているか確認する．
- 戻り値を使う関数にreturn文があるか確認する．
- `print`関数による表示と，return文による戻り値を混同していないか確認する．

## 課題

````{warning} 課題1
得点を受け取り，評価を戻り値として返す関数`classify_score(score)`を作成せよ．

1. 新しいMarkdownセルを追加し，`# 課題1` と記入せよ．
2. 新しいCodeセルを追加し，仮引数`score`を持つ関数`classify_score(score)`を定義せよ．
3. ガード節を使い，`score`が0未満または100より大きい場合は`"範囲外"`を返せ．
4. 0点以上100点以下の場合は，次の基準で評価を返せ．

   - 95点以上：S
   - 80点以上95点未満：A
   - 70点以上80点未満：B
   - 60点以上70点未満：C
   - 60点未満：F

5. 次のリストとfor文を使い，すべての得点について関数を呼び出せ．

   ```python
   scores = [-1, 0, 59, 60, 69, 70, 79, 80, 94, 95, 100, 101]
   ```

6. f-stringを使い，「80点：A」の形式で得点と評価を1行ずつ表示せよ．
7. -1点と101点は「範囲外」，0点から100点までは指定された評価になることを確認せよ．

if文，return文，ガード節，for文をすべて使用せよ．
````


````{visible-answer} 解答例
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
````


````{warning} 課題2
得点のリストを受け取り，60点以上の得点の個数を返す関数`count_passes(scores)`を作成せよ．この課題では，<span style="color:red">関数の中でfor文を使用すること</span>．

1. 新しいCodeセルを追加し，仮引数`scores`を持つ関数`count_passes(scores)`を定義せよ．
2. 関数の中で，合格者数を保存する変数`count`へ0を代入せよ．
3. 関数の中でfor文を使い，`scores`から得点を一つずつ取り出せ．
4. 取り出した得点が60点以上なら，`count`へ1を加えよ．
5. 繰り返しが終了したら，`count`を戻り値として返せ．
6. 関数の外で，次のリストを変数`scores`へ代入せよ．

   ```python
   scores = [45, 60, 72, 58, 90, 81]
   ```

7. `count_passes(scores)`を呼び出し，戻り値を変数`passed`へ代入せよ．
8. f-stringを使い，「合格者は4人です．」と表示されることを確認せよ．

関数の定義，仮引数，for文，if文，return文をすべて使用せよ．
````


````{visible-answer} 解答例
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
````


### 提出方法

- WebClassの「第3回課題」からNotebookファイル（`第3回_<学籍番号>_<氏名>.ipynb`）を提出する．
- 提出前にファイル名，Markdownセル，関数の定義，関数の呼び出し，Codeセルの実行結果を確認する．
- すべてのCodeセルの出力を表示した状態で保存する．
- 課題2では，for文が`count_passes`関数のブロック内にあることを確認する．

### 提出期限

<span style="color: red; ">10月16日(金)23:59まで</span>

質問等がある場合には

- メール kkagawa@josai.ac.jp
- Teamsのチャット
- WebClassのメッセージ

などで連絡してください．

## まとめ

- 関数は`def`で定義し，関数名に丸括弧`()`を付けて呼び出す．
- 引数を使うと，呼び出すたびに異なる値を関数へ渡せる．
- return文を使うと，関数の処理結果を戻り値として返せる．
- 関数の中でもfor文やif文を組み合わせて使用できる．
- 関数のガード節では，不適切な値を先に判定して処理を終了できる．
- 次回はプログラムとファイルの間でデータを入出力する．
