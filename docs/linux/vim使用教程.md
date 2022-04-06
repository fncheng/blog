---
title: vim使用学习
tags:
- linux
- vim

---

**Vim进入和退出命令**

1. :w 保存文件但不**退出**vi.
2. :w file 将修改另外保存到file中，不**退出**vi.
3. :w! 强制保存，不推出vi.
4. :wq 保存文件并**退出**vi.
5. :wq! 强制保存文件，并**退出**vi.
6. :q 不保存文件，**退出**vi.
7. :q! 不保存文件，强制**退出**vi.
8. :e! 放弃所有修改，从上次保存文件开始再编辑

<!-- more -->

![](https://i.loli.net/2020/02/29/Lms4So3gw1ixyGW.png)

![](https://www.runoob.com/wp-content/uploads/2015/10/vi-vim-cheat-sheet-sch.gif)





### iTerm2 vim复制问题

iTerm2中vim默认是无法复制的

**解决方案**

iterm2 > Preferences > Profiles > Terminal > Enable mouse reporting 去掉勾选



### Vim快速移动光标

gg：移动到文件首行

G：移动到文件尾行



j：下一行		h: 前一个单词

k：上一行		l: 后一个单词

数字n+ j/k ，下/上 n行
