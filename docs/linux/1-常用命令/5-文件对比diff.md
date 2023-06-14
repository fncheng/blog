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

