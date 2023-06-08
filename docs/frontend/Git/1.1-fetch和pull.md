# fetch和pull

## fetch和pull

一直以来我拉代码用的都是git pull
看到有说不要用git pull，可能会看不到冲突解决，尽量用git fetch + git merge

### fetch

```
git fetch <远程主机名> <远程分支名>:<本地分支名>
```

例如从远程的origin仓库的master分支下载代码到本地并新建一个temp分支

```
git fetch origin master:temp
```

如果上述没有冒号，则表示将远程`origin`仓库的`master`分支拉取下来到本地当前分支。

git fetch 后代码不会合并，需要手动执行`git merge`合并

但是我之前使用sourceTree拉代码的时候有冲突都会弹框提示，然后解决冲突后才能commit
于是看了下sourceTree的命令行，发现sourceTree执行的是先git fetch master，再git pull master。

取消勾选合并代码后，执行 git pull --no-commit
此命令和 fetch 效果类似