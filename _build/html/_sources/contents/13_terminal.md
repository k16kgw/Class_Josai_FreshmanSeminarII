# UNIX系のOSによるPythonの実行方法

出席パスワード：987654

到達目標
- **ターミナルから Python プログラムを実行**できるようになる．
- Pythonスクリプトと**ファイル操作の関係**を理解する．
- Jupyter / VS Code / ターミナルの役割分担を理解する．
- 将来（研究・レポート・開発）につながる実行環境の基礎を身につける．

---

## 第12回の復習

前回は以下を学んだ：
- ターミナルの基本操作（`ls`, `cd`, `mkdir`, `rm` など）
- vim / VS Code によるファイル編集
- ファイルとフォルダの構造（パス）の考え方
- 各ツールの使い分け

| 用途      | ツール              |
| ------- | ---------------- |
| 試行錯誤・学習 | Jupyter Notebook |
| プログラム作成 | VS Code          |
| 最低限の編集  | vim              |
| 実行・自動化  | ターミナル            |

---

## Jupyter Notebook と Python ファイルの違い

### Jupyter Notebookファイル（`.ipynb`，アイパイエヌビー）

- 途中経過を試しながら書ける
- グラフ・数式・説明をまとめやすい
- **学習・実験・レポート向き**

### Pythonファイル（`.py`）

- ファイル内のプログラムを最初から最後まで一気に実行する．
- 再利用・自動化に向いている．
- **実用・配布・研究向き**

---

## Pythonの環境構築

Pythonがインストールされていることを確認する．

`$ python --version`を実行

※ 行頭の`$`は一般ユーザでの実行を表す記号であり，実際に打ち込むのは`python --version`のみ．

- `Python 3.13.5`のようにバージョンが表示された場合 → 次の節へ
- `command not found: python`と表示された場合 → 以下の原因・解決策を確認

<u>原因</u>
- pythonがインストールされていない．
- pythonへのパスが通っていない（コンピュータがpythonの居場所を知らない）．

<u>解決策</u>
- コマンド名`python`に打ち間違いがないかを確認する．
- python3としてインストールされているかを`$ python3 --version`で確認する．
  - 同様のエラーが出る場合 → 「[Pythonのパスを通す方法](/contents/python_install.md)」（オンラインのリンク：[https://seminar.k16kgw.com/Class_Josai_FreshmanSeminarII/contents/python_install.html](https://seminar.k16kgw.com/Class_Josai_FreshmanSeminarII/contents/python_install.html)）から環境構築を実施する．

---

## ターミナルでPythonファイルを作成して実行する

ターミナルでpythonファイルを実行する場合には次のコマンドを実行する．
`{ファイル名}`をファイル名に書き換える．拡張子`.py`も含める．

```zsh
$ python {ファイル名}
```

1. ターミナルを立ち上げる．
2. フレッシュマンセミナー用のフォルダ `/Users/{ユーザ名}/Documents/Fresh` に移動する．
3. 前回の演習2で作成した`sample.py`ファイルがあることを確認する．（`$ ls`を実行してファイルの存在を確認する）
4. ファイルの中身を確認する．（`$ vim sample.py`で記述内容を確認し，`:q`で閉じる）
5. ファイルを実行する．（`$ python sample.py`）
6. ターミナルの画面に`print`の結果が出ていることを確認できればok．

---

## よくあるエラーとその意味

### Python が見つからない

エラー内容
```text
command not found: python
```

<u>原因</u>

- pythonがインストールされていない．
- pythonへのパスが通っていない（コンピュータがpythonの居場所を知らない）．

<u>解決策</u>

- コマンド名`python`に打ち間違いがないかを確認する．
- python3としてインストールされているかを`$ python3 --version`で確認する．
  - 同様のエラーが出る場合 → 「[Pythonのパスを通す方法](/contents/python_install.md)」（オンラインのリンク：[https://seminar.k16kgw.com/Class_Josai_FreshmanSeminarII/contents/python_install.html](https://seminar.k16kgw.com/Class_Josai_FreshmanSeminarII/contents/python_install.html)）を参考にパスを通す．

### ファイルが見つからない

エラー内容
```text
python: can't open file 'sample.py': [Errno 2] No such file or directory
```

<u>原因</u>

- **現在いるディレクトリに`sample.py`ファイルがない**．

<u>解決策</u>

- `$ ls`で`sample.py`ファイルがあるか確認する．
  - ない場合：`$ pwd`で自分のいるフォルダを確認した上で他のフォルダへ探しに行く．
  - ある場合：ファイル名`sample.py`の打ち間違いがないか確認する．

---
<!-- 
## 入力を受け取るプログラム

```python
name = input("名前を入力してください: ")
print(f"こんにちは，{name}さん")
```

```text
$ python greet.py
名前を入力してください: Alice
こんにちは，Aliceさん
```
 -->
<!-- 
## ファイル入力・出力（復習＋実践）

### ファイルに書き込む

```python
with open("result.txt", "w") as f:
    f.write("計算結果\n")
    f.write("42\n")
```

### ファイルを読む

```python
with open("result.txt", "r") as f:
    text = f.read()
    print(text)
```

ターミナルで `ls` → Pythonで `open()`
→ **同じファイルを扱っている**
 -->

## ターミナルでPython　を実行する利点

- 自動化できる

```text
$ python analyze.py
$ python analyze.py
$ python analyze.py
```

→ 毎回同じ処理を正確に実行できる

- 大量データに強い
  - 数百・数千ファイル
  - 長時間計算
  - 人が操作する必要なし

<!-- 3. 将来につながる

- 研究（数値計算・データ解析）
- サーバ・クラウド
- AI・機械学習
- ソフトウェア開発 -->

GUI は「手作業」
CUI + Python は「仕組み化」

---

```{note}
<span style="color:red">**演習1**</span>

$$
\int_0^1 4x^3 - x dx = \frac{1}{2}
$$

について， 
空間分割数$N = 1000, 3000, 10000, 30000$としたときの**区分求積法**での数値積分の値と真の値との誤差を可視化するプログラムを`main.py`として作成し，ターミナルで実行せよ．
ただし，グラフは横軸を空間分割数$N$，縦軸を誤差とした折れ線グラフを採用するものとし，作成したグラフは`graph.png`ファイルとして保存するものとせよ．

プログラムの作成にあたってはグラフの出力をする必要がないため，`plt.show()`の部分をファイルの保存をする手続き`fig.savefig("plot.png")`に書き換えること．

作成した`main.py`をWebClassの<span style="color:red">「第13回課題」の問1</span>から提出せよ．
（なお今回は最終回のため，<span style="color:red">提出期限は本日2026年1月19日(月)23:59まで</span>と短くしている．）
```

---

## Markdownファイル（`.md`，マークダウン）

- **Markdown**（マークダウン）は，文章を読みやすく書きつつ，簡単な記号だけで **見出し・箇条書き・強調・コード**などの書式を付けられる記法．
- 拡張子は `.md`

<u>使用される場面</u>

- 生成AIで出力される文書は特に指定しない限りMarkdown形式となっていることが多い．
- ブログなどのWebコンテンツはMarkdownに準拠した形式で書かれていることがある．

### 基本記法

<u>見出し</u>

```md
# 大見出し
## 中見出し
### 小見出し
```

<u>箇条書き</u>（半角ハイフン+半角スペース）

```md
- りんご
- みかん
- ばなな
```

<u>番号付き</u>（半角数字+ピリオド+半角スペース）

```md
1. 手順1
2. 手順2
3. 手順3
```

<u>強調</u>

```md
**太字**
*斜体*
```

<u>コード</u>（1行の中でコードを示す）

```md
`python hello.py`
```

<u>複数行のコード</u>

````md
```python
print("Hello")
```
````

<u>リンク</u>

```md
[OpenAI](https://www.openai.com)
```

<u>画像</u>

```md
![説明文](画像ファイルのパス)
```

例（同じフォルダに `graph.png` がある場合）：

```md
![graph](graph.png)
```

### 表示方法

Markdown は原本はただのテキストだが，多くのツールで整形された表示ができる．

- VS Code：プレビュー（右上の「プレビュー」ボタン）
- GitHub：自動で整形表示
- Jupyter：Markdownセルに貼ると整形表示

---

```{note}
<span style="color:red">**演習2**</span>

VS codeまたはvimでマークダウンファイル`myself.md`を作成し，次の指示に従い箇条書きで書き込むこと．
作成した`myself.md`をWebClassの<span style="color:red">「第13回課題」の問2</span>から提出せよ．
（なお今回は最終回のため，<span style="color:red">提出期限は本日2026年1月19日(月)23:59まで</span>と短くしている．）

- 自分を複数の視点から眺めてみる．
- 「私は〇〇なXXである。」という文章を箇条書きで列挙する．
- 「XX」は名詞，「〇〇」はそれを修飾する言葉とする．
- 「XX」や「〇〇」には同じ言葉を2回以上使用してはならない．
- 箇条書きは10個以上作成すること．

例：
```md
- 私は埼玉愛に満ちた埼玉県民である。
- 私は床屋ではほとんど喋らない客である。
...
```

---

## まとめ

- ターミナルから Python を実行できるようになった．
- ファイル・フォルダ・実行が一本につながった．
- Jupyter で学び，Python ファイルで実行する流れを理解した．
- Markdownで文書を作成できるようになった．
