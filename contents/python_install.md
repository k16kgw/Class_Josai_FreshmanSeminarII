# Anacondaをインストール済みのマシンでPythonを使用する

通常，Anacondaをインストールすると同時にPythonを使えるように設定されている．

1. `$ python --version`
  - `Python 3.13.5`のようにバージョンが表示される． → 終了
  - `command not found: python`と表示される． → 次へ
2. $ python3 --version`
  - `Python 3.13.5`のようにバージョンが表示される． → 終了
  - `command not found: python3`と表示される． → 次へ
3. `$ conda --version`
  - `command not found: conda`と表示される． → Anacondaをインストールする．
  - `conda 25.5.1`のようにバージョンが表示される． → 次の節へ

## Anacondaがインストールされているがpythonのパスが通っていない場合

1. `$ conda info`
  - `base environment :`以下のパスを取得する．ここでは`/Users/username/anaconda3`とする．
2. `$ echo $SHELL`でシェルを確認する．
  - zshの場合（`/bin/zsh`）
    1. `~/.zshrc`に`export PATH="$HOME/anaconda3/bin:$PATH"`を追記する（vimを使用）．
    2. `$ source ~/.zshrc`で設定を反映する．
    3. `$ which python`でパスが通ったことを確認する．
  <!-- - bashの場合（`/bin/bash`） -->
