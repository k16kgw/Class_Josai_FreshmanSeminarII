# 第3回　制御構文2：繰り返し

### 到達目標

- `for`文を使って決まった回数の処理を繰り返せる．
- `while`文を使って条件が成り立つ間，処理を繰り返せる．
- `break`を使って繰り返しを終了できる．

## 前回の復習

第2回では，条件式と`if`文を使って処理を分岐した．

```python
number = 7

if number % 2 == 0:
    print("偶数")
else:
    print("奇数")
```

## Jupyter Notebookの準備

1. `Documents（書類）/Fresh2`フォルダでPython 3のNotebookを新規作成する．
2. ファイル名を`3_{学籍番号}_{氏名}.ipynb`へ変更する．

## for文

`for`文は，値を順番に取り出しながら処理を繰り返す．

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

`while`文は，条件が`True`である間，処理を繰り返す．

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

`break`は繰り返しを終了する．
`continue`は残りの処理を飛ばして次の繰り返しへ進む．

```python
for number in range(1, 11):
    if number == 6:
        break
    if number % 2 == 0:
        continue
    print(number)
```

````{note} 演習
1から30までの整数について，次の規則で表示するプログラムを作成する．

- 3の倍数：「Fizz」
- 5の倍数：「Buzz」
- 3と5の両方の倍数：「FizzBuzz」
- それ以外：整数をそのまま表示

`for`文と`if`文を組み合わせること．
````

## エラーが出たとき

- `for`または`while`の行末にコロン`:`があるか確認する．
- 繰り返す処理が同じ深さでインデントされているか確認する．
- `range`の終点は含まれないことに注意する．
- `while`文が終了しない場合は，条件に使う変数が更新されているか確認する．

## まとめ

- `for`文は回数や要素が決まった繰り返しに適している．
- `while`文は条件に基づく繰り返しに適している．
- 次回は処理をまとめて再利用する関数を扱う．
