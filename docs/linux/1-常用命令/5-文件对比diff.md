## diff

https://wangchujiang.com/linux-command/c/diff.html

```sh
n1 a n3,n4  
n1,n2 d n3  
n1,n2 c n3,n4 
# 其中，字母"a"、"d"、"c"分别表示添加、删除及修改操作。而"n1"、"n2"表示在文件1中的行号，"n3"、"n4"表示在文件2中的行号。
```



diff对比两个文件时，会逐行对比，导致展示大量不同，

使用-b或--ignore-space-change：不检查空格字符的不同；



## sed

`sed` 在 macOS 和 Linux 之间可能存在差异

如果需要在 macOS 和 Linux 上使用相同的 `sed` 行为，可以考虑使用 GNU `sed`（通常被称为 `gsed` 或在 macOS 上使用 `brew install gnu-sed` 安装）来替代系统默认的 `sed`。

安装gnu-sed后

If you need to use it as "sed", you can add a "gnubin" directory
to your PATH from your bashrc like:

```sh
PATH="/opt/homebrew/opt/gnu-sed/libexec/gnubin:$PATH"
```



## date

```sh
date +"%Y-%m-%d %H:%M:%S"
```

**日期格式：**

- `%Y`：四位数的年份（例如：2023）。
- `%m`：两位数的月份（01 到 12）。
- `%d`：两位数的日（01 到 31）。

**时间格式：**

- `%H`：小时（00 到 23）。
- `%M`：分钟（00 到 59）。
- `%S`：秒（00 到 59）。
