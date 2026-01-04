# ファイル操作

出席パスワード：**691247**

到達目標
- list・dict・str の代表的な**メソッド**を使えるようになる．
- **クラスとインスタンス**の基本概念を理解する．
- **テキストファイル／CSVファイルの読み書き**ができる．

準備
1. anacondaを使用し，<span style="color:red">jupyter lab</span>を起動する．
2. `Document（書類）/Fresh`フォルダを開き，新しいノートブックを作成する．
3. ファイル名を`6_{学籍番号}_{氏名}.ipynb`に変更する．
   　例：`6_SI25999_香川渓一郎.ipynb`

---

## (授業中間アンケート) 00002284

- この授業科目に関するアンケートをWebClassにおいて実施します。
- このアンケートは受講生の皆さんがより授業を受けやすくするために、皆さ
んの意見を伺うものです。
- アンケートは全7問（選択と自由記述）、回答時間は約10分です。
- 特に自由記述については、より授業改善につながる貴重な回答になります。
- 回答内容によって不利益を被ることはありません。

![授業中間アンケート](/contents/figs/6/enq.png)

## 第5回の復習

- 関数は「入力 → 処理 → 出力」をひとまとめにしたもの．
- `def` で定義し，`return` で結果を返す．（`return`はなくても良い）
- 同じ処理を何度も書かずに済むため，**変更・再利用が容易になる．**

```python
def average(a, b):
    result = (a + b) / 2
    return result
x = average(3, 5)
print(x)
```

```python
def hello(name):
    print(f"こんにちは，{name}さん！")

hello("カツオ")
```

```{note}
**第5回の課題1**

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

解答例
```python
def collatz(n):
    """
    整数 n から始め，nが1になるまで次の規則で数列を生成し，リストで返す．
      - n が偶数のとき: n = n // 2
      - n が奇数のとき: n = 3 * n + 1
    """
    seq = [n]  # 最初の値をリストに追加
    # n が 1 にならない間は繰り返す
    while n != 1:
        if n % 2 == 0:
            n = n // 2
        else:
            n = 3 * n + 1
        seq.append(n)        # 計算結果をリストに追加
    return seq

print(collatz(6))
``` 

```{tip}
**コラッツ予想**

任意の（全ての）整数 n に対して次の規則を繰り返して整数を得たとき，必ず有限回の繰り返しで1になる．
- n が偶数のとき:`n = n // 2`
- n が奇数のとき:`n = 3 * n + 1`

数学の未解決問題の一つ．これを解決には日本のベンチャー企業（株式会社音圧爆上げくん）によって1億2000万円の懸賞金が掛けられている．
（参考：https://mathprize.net/ja/posts/collatz-conjecture/）

コンピュータによる計算では$2.95 \times 10^{20}=2\text{垓}9500\text{京}$程度までは正しいことが確認されている．
```

## メソッド（method）

- **オブジェクトに結びついた関数**
- `{オブジェクト}.{メソッド名}()` の形で呼び出す．
- Pythonではすべてがオブジェクトのため，データ型ごとに専用のメソッドが存在する．

例：
```python
s = "hello"
print(s.upper())   # HELLO（大文字にする）
```

### リスト（list）のメソッド

よく使うメソッド一覧：

| メソッド            | 説明       | 例                |
| :-------------- | :------- | :--------------- |
| `.append(x)`    | xを末尾に追加 | `a.append(10)`   |
| `.insert(i, x)` | xをi番目に追加   | `a.insert(1, 5)` |
| `.remove(x)`    | xを削除     | `a.remove(3)`    |
| `.pop(i)`       | i番目を取り出す | `a.pop(0)`       |
| `.sort()`       | 昇順に並び替える | `a.sort()`       |
| `.reverse()`    | 逆順に並び替える | `a.reverse()`    |

例
```python
a = [3, 1, 4]
a.append(2) # 後ろに2を追加
a.sort() # 昇順に並び替える
print(a)
```

```{note}
**演習1**

リスト `b = [70, 85, 90, 100, 60]` を降順（大きい順）に並べ替えよ．
```

```python
b = [70, 85, 90, 100, 60]
b.sort()
b.reverse()
print(b)
```

別解（メソッドのoptionを使用する）
```python
b = [70, 85, 90, 100, 60]
b.sort(reverse=True)
print(b)
```


### 辞書（dict）のメソッド

辞書型（dictionary，dict）は
- **“キー（key）” と “値（value）” の組をセットで管理するデータ型** である．
- 順番ではなく「**名前（キー）**」でデータにアクセスする．
- リストのように番号（0, 1, 2 …）では取り出さない．

作り方
- `{}`（波括弧）で作る
- `"キー": 値` の形で書く
- 各ペアはカンマ `,` で区切る

例
```python
scores = {"国語": 70, "数学": 85, "英語": 90}
# 値の取り出し
print(scores["数学"])   # 85

# 値の変更
scores["数学"] = 95
print(scores)  
# {'国語': 70, '数学': 95, '英語': 90}

# 新しい項目を追加
scores["理科"] = 88
print(scores)
# {'国語': 70, '数学': 95, '英語': 90, '理科': 88}
```

辞書型は **「名前（キー）に対応する値」を扱う場面** に向いている．
- 教科名と点数
- 都道府県と人口
- 商品名と価格
- 生徒番号と氏名

| メソッド                 | 説明                      |
| :------------------- | :---------------------- |
| `.keys()`            | すべてのキーを取得               |
| `.values()`          | すべての値を取得                |
| `.items()`           | (キー, 値) の組を取得           |
| `.get(key, default)` | 値を取り出す（存在しない場合はdefault） |

例
```python
scores = {"国語": 80, "数学": 90}
print(scores.keys())
print(scores.values())
print(scores.items())
print(scores.get("英語", "なし"))
```

### 文字列（str）のメソッド

| メソッド             | 説明             |
| :--------------- | :------------- |
| `.upper()`       | 大文字に変換         |
| `.lower()`       | 小文字に変換         |
| `.replace(a, b)` | a を b に置き換え    |
| `.split(sep)`    | 分割してリストにする     |
| `.join(list)`    | リストを結合して文字列にする |

例
```python
text = "Hello Python"
print(text.replace("Python", "World"))
print(text.split())
```

## クラスとインスタンス

クラス
- データと処理をまとめた設計図
- Pythonの「型（type）」の正体
- 例：`int`, `str`, `list`

インスタンス
- クラスから作られた「実体」
- 例：それぞれの変数（3, "abc", [1,2]）

例：
```python
s = "hello"   # strクラスのインスタンス
a = [1, 2, 3] # listクラスのインスタンス
```
<!-- 
### 簡単なクラスを作ってみる

```python
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"{self.name}さん，こんにちは！")

p = Person("カツオ")
p.greet()
```

出力例
```
カツオさん，こんにちは！
```

- `__init__` はインスタンス生成時に呼ばれる特別なメソッド
- `self` は「自分自身」を指す
 -->

## ファイルの操作

ファイル操作には **with 構文** を使用するのが安全．

### ファイルの書き込み

```python
with open("message.txt", "w") as f:
    f.write("1行目\n")
    f.write("2行目\n")
```

### ファイルの読み取り

```python
with open("message.txt", "r") as f:
    text = f.read()
    print(text)
```

```{note}
**演習2**

テキストファイル `message.txt` に，好きな文章を3行書き込み，その内容を読み取って1行ずつ表示せよ．
```

```python
with open("message.txt", "w") as f:
    f.write("グラタンでも食べますか？\n")
    f.write("そうですか\n")
    f.write("お腹いっぱいなんですね\n")
with open("message.txt", "r") as f:
    text = f.read()
    print(text)
```


### CSVファイルの操作

書き込み
```python
import csv
with open("scores.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["名前", "国語", "数学"])
    writer.writerow(["カツオ", 70, 80])
    writer.writerow(["コンブ", 90, 85])
    writer.writerow(["ナミヘー", 65, 70])
```

読み込み
```python
import csv
with open("scores.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
```

## pandasを用いたCSVファイルの操作

pandasのインストール

Jupyter Lab のセルで実行：
```python
!pip install pandas
```

### CSVファイルの読み取り

```python
import pandas as pd
df = pd.read_csv("scores.csv")
df
```

pandas DataFrame という型として表形式で表示される．

### 統計処理

平均・最大・最小などがメソッドで簡単に計算できる．
```python
print(df["国語"].mean())
print(df["数学"].max())
print(df.describe())
```

### CSVファイルの書き込み

```python
df.to_csv("output.csv", index=False)
```

### データの取扱い

条件文にすると，条件を満たすかどうかの1列分のDataFrame(Seriesと呼ぶ)が得られる．

```python
sr = df["国語"] <= 80
```

DataFrameの呼び出しに真偽が入ったSeriesを使用すると，真の行のみ抜き出すことができる．

```python
df[sr]
```

```{note}
**演習3**

scores.csvをpandasで読み取り，数学の点数が80以上の行だけ抽出せよ
```

解答例
```python
df[df["数学"] >= 80]
```

## まとめ

- オブジェクトには**メソッド**があり，用途別に使い分ける．
- **クラスとインスタンス**はオブジェクトの基本構造である．
- Pythonでは `with open()` で安全にファイル操作できる．
- CSVは `csv` または `pandas` ライブラリで効率よく扱える．
- pandasは今後の数値計算・データ分析で必須スキル

