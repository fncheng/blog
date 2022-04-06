---
title: gitignore的使用
---

### 创建.gitignore文件

#### 使用git bash

- 根目录下右键选择“Git Bash Here”进入bash命令窗口；
- 输入`vim .gitignore`命令，打开文件（没有文件会自动创建）；
- 按i键切换到编辑状态，输入规则，例如node_modules/，然后按Esc键退出编辑，输入:wq保存退出。

### 常用规则

```bash
/mtk/ 过滤整个文件夹
*.zip 过滤所有.zip文件
/mtk/do.c 过滤某个具体文件

!src/   不过滤该文件夹
!*.zip   不过滤所有.zip文件
!/mtk/do.c 不过滤该文件
```

以上规则意思是：被过滤掉的文件就不会出现在你的GitHub库中了，当然本地库中还有，只是push的时候不会上传。

### git忽略已经提交的文件

https://github.com/wujunchuan/wujunchuan.github.io/issues/18#issue-213430690

已经提交的文件在.gitignore中添加是无效的

此时可以这样做:

> `git rm --cached {fileName}` //删除本地缓存
> 更新本地`gitignore`文件,忽略目标文件(fileName)
> 最后`git commit -m 'We don't need that fileName`

**注意，这种方法下somefiles只会在提交者的磁盘中保留，如果其他开发者拉取你的commit后，他们磁盘内的这些文件也会消失**

### 白名单模式

````sh
# 忽略一切
*
# 把所有的文件夹重新包含进来
# 这是怎么做到的呢？ 看第6条规则
!*/
# 把想要的文件或文件夹重新包含进来
# 这里为啥不能用： !src/* 呢，因为有斜杠时星号不能匹配斜杠，
# 导致src/里的子目录被忽略了，只包含进src/下的文件了
# 这里为啥不能用： !src/ 呢，因为以斜杠(/)结尾只能匹配目录
!src/**
!AndroidManifest.xml
# 如果不把所有文件夹包含进来，则需要先把res/目录包含进来才行
!res/drawable/**
````

