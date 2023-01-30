---
title: 将本地仓库推送到Github
tags:
- git
description: git常用命令,本地仓库推送到github.
---

<!-- more -->

[<span style="font-size:1.75em">参考链接</span>](https://help.github.com/cn/github/administering-a-repository/setting-repository-visibility)

## 将本地仓库推送到Github的流程

1.打开Git Bash,将当前目录更改为本地仓库

```bash
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]
```

2.在新的本地仓库中添加文件。 这会暂存它们用于第一次提交。 

```bash
$ git add .
# Adds the files in the local repository and stages them for commit. 要取消暂存文件，请使用 'git reset HEAD YOUR-FILE'。
```

3.提交暂存在本地仓库中的文件。 

```bash
$ git commit -m "First commit"
# Commits the tracked changes and prepares them to be pushed to a remote repository. 要删除此提交并修改文件，请使用 'git reset --soft HEAD~1' 并再次提交和添加文件。
```

4.在GitHub建立一个空的仓库,注意不要添加readme.md文件,防止后面报错!

5.在命令提示中，[添加远程仓库的 URL](https://help.github.com/cn/articles/adding-a-remote)（将在该 URL 推送本地仓库）。 

```bash
$ git remote add origin [remote repository URL]
# Sets the new remote
$ git remote -v
# Verifies the new remote URL
```

>  对应的如果远程分支创建错误可以使用`git remote rm`或`git remote remove`命令删除远程URL
>
> ```git
> $ git remote -v
> # 查看当前远程
> > origin  https://github.com/OWNER/REPOSITORY.git (fetch)
> > origin  https://github.com/OWNER/REPOSITORY.git (push)
> > destination  https://github.com/FORKER/REPOSITORY.git (fetch)
> > destination  https://github.com/FORKER/REPOSITORY.git (push)
> 
> $ git remote rm destination
> # 删除远程
> $ git remote -v
> # 验证其已删除
> > origin  https://github.com/OWNER/REPOSITORY.git (fetch)
> > origin  https://github.com/OWNER/REPOSITORY.git (push)
> ```
>
>  **注**：`git remote rm` 不会从服务器中删除远程仓库。 它只是从本地仓库中删除远程及其引用。 
>
> <div style="background-color:#ffdce0">**注**：`git remote rm` 不会从服务器中删除远程仓库。 它只是从本地仓库中删除远程及其引用。</div>

6.推送更改(本地仓库中)到 GitHub。 

```bash
$ git push origin master
# Pushes the changes in your local repository up to the remote repository you specified as the origin
```

### [Git常用命令-易百教程](https://www.yiibai.com/git/git_add.html)





### 一个本地分支对应多个远程分支

```sh
$ git remote set-url --add origin git@gitlab.com:fncheng/blog.git
$ git remote -v                                                   
origin  git@github.com:fncheng/blog.git (fetch)
origin  git@github.com:fncheng/blog.git (push)
origin  git@gitlab.com:fncheng/blog.git (push)
```

表示执行git pull origin时从github拉取，git push origin时会把代码推送到github和gitlab