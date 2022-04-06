## Git pull冲突报错

![image](https://user-images.githubusercontent.com/37958055/88894887-3201a380-d27b-11ea-8bbe-488e57ec6d18.png)

> 第一个报错: `Your local changes to the following files would be overwritten by merge:`
> 原因式我在本地仓库修改了某些文件,从而与远程仓库文件不一致,pull会导致我的修改被覆盖,这当然不行的

有两种解决办法:
- 第一个是如果我需要保留我本地的代码
```bash
git stash
git pull origin master
git stash pop
```
stash字面意思存放,储藏
git stash就是为了存储一些冲突的,但是又不想删掉的代码
[相关链接](https://www.cnblogs.com/tocy/p/git-stash-reference.html)

- 第二个如果我不需要保留本地的修改,我就要远程仓库覆盖我的代码
```bash
git reset --hard
git pull origin master
```

git reset --soft/hard 命令，用于在进行错误的提交( commit )后，还没有push到远程分支,想要撤销本次提交

```bash
git reset --soft: 回退到某个版本,只回退了commmit的信息,不会恢复到index file一级。如果还要提交,
直接commit即可

git reset --hard: 重设(reset) 索引和工作目录，自从<commit>以来在工作目录中的任何改变都被丢弃，
并把HEAD指向<commit>。
彻底回退到某个版本,本地的源码会变为上一个版本的内容,撤销的commit中所包含的更改
被冲掉
```

> 第二个报错是因为我本地添加了一些文件,而远程仓库上没有这些文件

解决办法:
```bash
git fetch origin //更新远程跟踪分支
git clean -f //git clean命令用来删除所有没有tracked过的文件,即删除untracked文件
git reset --hard origin/master
```

其中`git fetch origin`命令从远程`refs/heads/`命名空间复制所有分支，并将它们存储到本地的`refs/remotes/ origin/`命名空间中，除非使用分支`.<name>.fetch`选项来指定非默认的`refspec`。

git fetch命令详情参见[git fetch教程](https://www.yiibai.com/git/git_fetch.html)



所以`git pull`时发生冲突,这个时候git分支记录已经到最新了,远程仓库的内容实际上已经拷下来了，但是由于冲突问题,你本地仓库还处在你当前的分支。需要解决冲突才能到最新分支



### git pull 出现 merge branch from dev of '......'的情况

解决办法

1.用git pull --rebase(即git pull -r)代替

```sh
git config --local pull.rebase true
```

项目级的git config 在 .git/config下

```ini
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = Administrator@192.168.0.168:dongcheng/hiip-bi-wxapp.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "dev"]
	remote = origin
	merge = refs/heads/dev
[pull]
	rebase = true
```

