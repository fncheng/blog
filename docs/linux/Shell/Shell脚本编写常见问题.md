---
title: Shell脚本常见问题
tags:
- Linux
---

- 等待上一任务执行完再执行下一任务

[Wait命令](https://wangchujiang.com/linux-command/c/wait.html)

https://www.jianshu.com/p/a31461ee5260



Linux中的>,>>和<的区别？

\>> 是追加内容

\> 是覆盖原有内容



### 输入重定向和输出重定向

https://www.runoob.com/linux/linux-shell-io-redirections.html

输出重定向就是将原本的输出（比如从终端输出）变到从其他地方输出（比如输出到文件）

输入重定向则相反，改为从其他地方（比如文件）获取输入，而不是从终端获取输入。

`>`和`>>`是输出重定向

`<`是输入重定向



#### 输出重定向的妙用

比如

```bash
$ wc -l << EOF
    欢迎来到
    菜鸟教程
    www.runoob.com
EOF
3          # 输出结果为 3 行
$
```

sftp上传

```sh
$ sftp xxx.xx.xx.xx << EOF

```



wc命令

统计文件的字节数、字数、行数

```bash
wc test.txt
# 输出结果
7     8     70     test.txt
# 行数 单词数 字节数 文件名
```

在<< EOF后可以执行别的命令，比如在sftp中put文件的命令

#### shell中的 \ 反斜杠有什么作用？

https://unix.stackexchange.com/questions/368753/what-does-this-command-with-a-backslash-at-the-end-do

> 可以使命令跨越多行(更容易阅读长命令)



### 命令中的 `*` 和 `**`

```sh
ll */src # 展示当前目录下所有目录内的 src 目录内容
ll **/src # 展示当前目录下所有目录内的src 目录内容，递归
```



### 常见问题

1. 输入重定向 << EOF 遇到 Pseudo-terminal will not be allocated because stdin is not a terminal.
