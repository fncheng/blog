---
title：linux解压缩
---

## unzip

unzip

```sh
$ unzip -o test.zip -d tmp/

-o：不必先询问用户，unzip执行后覆盖原有的文件；
-d<目录>：指定文件解压缩后所要存储的目录；
-n：解压缩时不要覆盖原有的文件；


-j：不处理压缩文件中原有的目录路径；
# unzip -j dist.zip 会将dist.zip内部的文件铺平(flat) 出来
```



## zip

```sh
# -r 递归处理，将./这个目录下所有文件和文件夹打包为当前目录下的html.zip：
zip -r ./dstbackup.zip ./dstbackup
# -q quiet安静模式，不显示指令执行过程。
# -j 只保存文件名称及其内容，而不存放任何目录名称。（所有文件都在压缩包首页中）
```

**⚠️注意：zip压缩会带上目录结构，如果要避免带上目录结构，最简单的方法就是cd进入需要压缩的目录，再执行zip命令。**

排除目录

压缩 example/basic/ 目录内容到 basic.zip 压缩包中 -x 指定排除目录，注意没有双引号将不起作用。

```sh
$ zip -r basic.zip example/basic/ -x "example/basic/node_modules/*" -x "example/basic/build/*" -x "example/basic/coverage/*"
```

