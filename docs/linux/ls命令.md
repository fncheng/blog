---
title: ls命令
tags:
- linux
description: ls命令是linux下最常用的命令。ls命令就是list的缩写.缺省下ls用来打印出当前目录的清单,如果ls指定其他目录,那么就会显示指定目录里的文件及文件夹清单。 通过ls 命令不仅可以查看linux文件夹包含的文件,而且可以查看文件权限(包括目录、文件夹、文件权限),查看目录信息等等。ls 命令在日常的linux操作中用的很多!
---

## Linux ls命令

**语法**

```bash
ls [选项] [目录名]
```

**常用参数**

-a, –all 列出目录下的所有文件，包括以 . 开头的隐含文件

-A 同-a，但不列出“.”(表示当前目录)和“..”(表示当前目录的父目录)。

-c 配合 -lt：根据 ctime 排序及显示 ctime (文件状态最后更改的时间)配合 -l：显示 ctime 但根据名称排序否则：根据 ctime 排序

-C 每栏由上至下列出项目

–color[=WHEN] 控制是否使用色彩分辨文件。WHEN 可以是'never'、'always'或'auto'其中之一

-d, –directory 将目录象文件一样显示，而不是显示其下的文件。

-D, –dired 产生适合 Emacs 的 dired 模式使用的结果

-f 对输出的文件不进行排序，-aU 选项生效，-lst 选项失效

-g 类似 -l,但不列出所有者

-G, –no-group 不列出任何有关组的信息

-h, –human-readable 以容易理解的格式列出文件大小 (例如 1K 234M 2G)

–si 类似 -h,但文件大小取 1000 的次方而不是 1024

-H, –dereference-command-line 使用命令列中的符号链接指示的真正目的地

–indicator-style=方式 指定在每个项目名称后加上指示符号<方式>：none (默认)，classify (-F)，file-type (-p)

-i, –inode 印出每个文件的 inode 号

-I, –ignore=样式 不印出任何符合 shell 万用字符<样式>的项目

-k 即 –block-size=1K,以 k 字节的形式表示文件的大小。

-l 除了文件名之外，还将文件的权限、所有者、文件大小等信息详细列出来。

-L, –dereference 当显示符号链接的文件信息时，显示符号链接所指示的对象而并非符号链接本身的信息

-m 所有项目以逗号分隔，并填满整行行宽

-o 类似 -l,显示文件的除组信息外的详细信息。  

-r, –reverse 依相反次序排列

-R, –recursive 同时列出所有子目录层

### ls -lh命令

功能: 查看权限

```bash
$ ls -lh
total 600K
drwxr-xr-x 1 qq862 197609    0 1月  18 17:37 node_modules/
-rw-r--r-- 1 qq862 197609  782 1月  18 17:34 package.json
-rw-r--r-- 1 qq862 197609 243K 1月  18 17:37 package-lock.json
drwxr-xr-x 1 qq862 197609    0 2月   3 17:01 public/
drwxr-xr-x 1 qq862 197609    0 11月 10 12:05 scaffolds/
drwxr-xr-x 1 qq862 197609    0 12月 13 20:57 source/
drwxr-xr-x 1 qq862 197609    0 11月 26 12:41 themes/
```

