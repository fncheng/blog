# linux解压缩

## unzip

unzip解压文件

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



### zip不带dist目录

-D：压缩文件内不建立目录名称；

```sh
zip -Dr dist.zip dist/*
```

>需要注意的是：macOS的归档实用工具（Archive Utility）在解压ZIP文件时，通常会自动创建一个与ZIP文件同名的目录并将内容解压到该目录中。这是macOS系统的默认行为。
>
>所以如果希望避免这种情况，就需要在命令后使用unzip命令解压文件。

### 创建一个全新的压缩文件而不是添加内容到现有的压缩文件

-m：将文件压缩并加入压缩文件后，删除原始文件，即把文件移到压缩文件中；

```sh
zip -m new_archive.zip file1.txt file2.txt directory/
```

