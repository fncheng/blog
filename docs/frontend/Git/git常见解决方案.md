---
title: git常见解决方案
---



## Git sidebar



### 使用brew 的git

```sh
$ brew link --overwrite git

# To relink, run:
#  brew unlink git && brew link git
```

## 本地分支追踪远程分支

有时候不小心删掉了远程分支，或者是改变了远程分支的名字，导致本地分支无法拉取对应的代码

这就需要设置本地分支追踪指定的远程分支。

#### --set-upstream-to=\<upstream>

#### -u

```sh
git branch dev --set-upstream-to=origin/dev
# 不指定本地分支的话 默认当前分支
git branch --set-upstream-to=origin/dev
```

或者是 -u

```sh
git branch -u origin/dev
```

