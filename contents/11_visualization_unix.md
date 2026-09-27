# 第11回　可視化，UNIX系OSの使い方

### 到達目標

- Matplotlibで作成したグラフを画像として保存できる．
- ターミナルでフォルダを移動し，ファイルを確認できる．
- Pythonファイルをターミナルから実行できる．

## 前回の復習

第10回では，Matplotlibを用いてデータをグラフで表した．

```python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 4, 9])
plt.show()
```

今回はコードを`.py`ファイルへ保存し，ターミナルから実行する．

## 作業の準備

1. Finderで`Documents（書類）/Fresh2`フォルダを確認する．
2. VS Codeで`Fresh`フォルダを開く．
3. `11_{学籍番号}_{氏名}.py`を新規作成する．
4. ターミナルを起動する．

## UNIX系OSとターミナル

macOSやLinuxはUNIX系OSである．
ターミナルでは，文字による命令でファイルやプログラムを操作する．

| コマンド | 動作 |
| --- | --- |
| `pwd` | 現在のフォルダを表示する |
| `ls` | ファイルの一覧を表示する |
| `cd フォルダ` | フォルダを移動する |
| `mkdir 名前` | フォルダを作成する |
| `python ファイル.py` | Pythonファイルを実行する |

`Fresh`フォルダへ移動する．

```console
cd ~/Documents/Fresh2
pwd
ls
```

## Pythonファイルの実行

VS Codeで次のコードを入力して保存する．

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

plt.plot(x, y, marker="o")
plt.xlabel("x")
plt.ylabel("y")
plt.title("Square numbers")
plt.savefig("square.png")
```

ターミナルで実行する．

```console
python 11_{学籍番号}_{氏名}.py
```

実行後に`square.png`が作成されたことを`ls`とFinderで確認する．

```{tip} Pythonコマンド
`python`で実行できない環境では`python3`を試す．
使用するPythonはJupyter Notebookと同じ環境であることが望ましい．
```

````{note} 演習
$x$が0から10までの整数であるとき，$y=2x+1$の折れ線グラフを作成する．

1. VS CodeでPythonファイルを作成する．
2. 軸ラベルとタイトルを付ける．
3. `linear.png`として保存する．
4. ターミナルからPythonファイルを実行する．
5. `linear.png`が作成されたことを確認する．
````

## エラーが出たとき

- `pwd`で現在のフォルダを確認する．
- `ls`でPythonファイルが存在するか確認する．
- ファイルを保存してから実行したか確認する．
- Pythonが見つからない場合は`python3`を試す．
- Matplotlibが見つからない場合は，実行環境がJupyter Notebookと同じか確認する．

## まとめ

- ターミナルでは現在位置とファイル名を確認して操作する．
- `.py`ファイルはPythonのソースコードを保存するファイルである．
- 次回は生成AIを利用し，Pythonでゲームを作成する．
