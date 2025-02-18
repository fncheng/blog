---
title: git fork的使用
---



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



## git fork的使用

添加上游（upstream）

```sh
git remote add upstream https://github.com/original-repo/main-project.git
```

然后检查

```sh
git remote -v
```

输出示例

```txt
origin    https://github.com/yourname/custom-project.git (fetch)
origin    https://github.com/yourname/custom-project.git (push)
upstream  https://github.com/original-repo/main-project.git (fetch)
upstream  https://github.com/original-repo/main-project.git (push)
```



### 拉取上游更新

**方式 1：使用 `merge`（合并方式）**

```sh
git fetch upstream
git checkout main
git merge upstream/main
```

**方式 2：使用 `rebase`（重写提交历史，推荐）**

```sh
git fetch upstream
git checkout main
git rebase upstream/main
```





> 如果原仓库有很多分支，fork的仓库也会有很多分支吗，但是我不需要这么多分支

只同步 `main` 并丢弃其他分支

如果你已经拉取了很多 `upstream` 分支，但你只想保留 `main`，可以重置 `git fetch` 的行为。

**删除 `upstream` 远程仓库**

```sh
git remote remove upstream
```

**重新添加 `upstream` 并指定只跟踪 `main`**

```sh
git remote add upstream <upstream_repo_url>
git fetch upstream main
```

**同步 `main` 并合并**

```sh
git checkout main
git merge upstream/main
```





### 方法 1：手动 Fork 后，仅克隆指定分支

> 适用于：**你只能在 Gitee/GitHub 上 Fork 整个仓库，但本地只想拉取某个分支**

1️⃣ **先在 Gitee/GitHub 上 Fork 仓库**（默认 Fork 所有分支）。
2️⃣ **本地克隆时，只拉取一个分支**

```sh
git clone --single-branch --branch develop https://gitee.com/yourname/repo.git
```





### 方法 2：使用 `git remote` 只同步某个分支

> 适用于：**你不想在 Gitee/GitHub 上 Fork 整个仓库，而是想手动同步指定分支**

1️⃣ **初始化一个空仓库**（不克隆全部内容）：

```sh
git init repo
cd repo
```

2️⃣ **添加远程仓库（但不下载所有分支）**：

```sh
git remote add origin https://gitee.com/original/repo.git
```

3️⃣ **只拉取某个分支**：

```sh
git fetch origin <分支名>
git checkout -b <分支名> origin/<分支名>
```

4️⃣ **添加你的 Fork 仓库为远程**（用于提交代码）：

```sh

```

5️⃣ **推送到你的 Fork 仓库**：





如果你有原仓库的写入权限，git push upstream --delete dev 会删除原仓库的dev分支

```sh
git push upstream --delete dev
```



