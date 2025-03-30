# gitconfig配置文件

# gitconfig includeIf 管理多用户

### 查看git配置

```sh
git config --list
# 查看本地配置
git config --local --list
```

### 修改git配置

大部分的配置可以通过 `git config` 来配置，比如常见的设置用户名和密码。

```sh
git config user.name "Ein Verne"
git config user.email "some@one.com"
# 修改全局配置
git config --global user.name "xxxx"
```

一份正常的 `~/.gitconfig` 配置可能是这样的

```ini
[user]
	name = someone
	email = someone@gmail.com
[core]
	excludesfile = /Users/someone/.gitignore_global
[difftool "sourcetree"]
	cmd = opendiff \"$LOCAL\" \"$REMOTE\"
	path =
[mergetool "sourcetree"]
	cmd = /Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \"$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
	trustExitCode = true
[commit]
	template = /Users/someone/.stCommitMsg
[includeIf "gitdir:~/play/"]
    path = .gitconfig-play
[includeIf "gitdir:~/projects/"]
    path = .gitconfig-wk
```

注意到最后的 `includeIf` 配置。

上面两行表示的意思就是对于 `~/play/` 下面的项目，使用 `~/.gitconfig-play` 配置。

看一下 `~/.gitconfig-play` 的配置。

```ini
[user]
	email = some@play.com
	name = Alex
```



## 设置单个仓库的用户和邮箱

```sh
git config --local user.name "你的用户名"
git config --local user.email "你的邮箱"
```

