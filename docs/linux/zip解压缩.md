---
title: linux解压缩命令
tags:
- linux
---

## [Linux下的解压命令小结](https://www.cnblogs.com/cursorhu/p/5891699.html)

https://www.cnblogs.com/cursorhu/p/5891699.html

<!-- more -->

## tar命令

##### 打包程序：tar

必要参数有如下：

- `-A` 新增压缩文件到已存在的压缩
- `-B` 设置区块大小
- `-c` 建立新的压缩文件
- `-d` 记录文件的差别
- `-r` 添加文件到已经压缩的文件
- `-u` 添加改变了和现有的文件到已经存在的压缩文件
- `-x` 从压缩的文件中提取文件
- `-t` 显示压缩文件的内容
- `-z` 支持gzip解压文件
- `-j` 支持bzip2解压文件
- `-Z` 支持compress解压文件
- `-v` 显示操作过程
- `-l` 文件系统边界设置
- `-k` 保留原有文件不覆盖
- `-m` 保留文件不被覆盖
- `-W` 确认压缩文件的正确性
- `-C` 指定相对路径

> tar file_name source

解压：

> 解压缩文件加一个参数x：tar xf a.tar.gz

```bash
[root@104 www]# tar xf wordpress-4.6.15.tar.gz
```

打包并压缩

```bash
tar -zcvf log.tar.gz log2012.log   #打包后，以 gzip 压缩
```

> 注意: 打包时如果不想带上/home/.../  这样的目录前缀，请使用 -C 指定相对路径，即-C 后面指定的是tar的工作目录，再后面才是需要打包的文件
>
> ```bash
> tar -zcvf 压缩包名称.tar.gz -C 工作目录   需要打包的文件的目录
> tar -zcvf master1.tar.gz -C ./.klei/DoNotStarveTogether/MyDediServer/  Master/
> ```

#### 解压命令

```bash
tar -zxvf filename.tar.gz
#解压到打包文件所在的目录,会覆盖该目录

#解压到指定目录
tar -zxvf master1.tar.gz -C ./.klei/DoNotStarveTogether/dstbackup
```

其中zxvf含义分别如下

z: 　　g**z**ip  　　　　　　　   压缩格式

x: 　　e**x**tract　　　　　　　　  解压

v:　　 **v**erbose　　　　　　　　详细信息

f: 　　**f**ile(file=archieve)　　　　文件

> tar 无法对压缩文件进行更新( 如果文件未压缩，则可以通过tar -rvf 命令实现文件添加 )。对于想要通过tar命令更新压缩文件，则只能通过解压压缩文件并更新后重新压缩这一方式实现。

## zip命令

```bash
# -r 递归处理，将./这个目录下所有文件和文件夹打包为当前目录下的html.zip：
zip -r ./dstbackup.zip ./dstbackup
# -q quiet安静模式，不显示指令执行过程。
# -j 只保存文件名称及其内容，而不存放任何目录名称。（所有文件都在压缩包首页中）
```

```bash
-S：包含系统和隐藏文件；
```

**⚠️注意：zip压缩会带上目录结构，如果要避免带上目录结构，最简单的方法就是cd进入需要压缩的目录，再执行zip命令。**

排除目录

压缩 example/basic/ 目录内容到 basic.zip 压缩包中 -x 指定排除目录，注意没有双引号将不起作用。

```sh
$ zip -r basic.zip example/basic/ -x "example/basic/node_modules/*" -x "example/basic/build/*" -x "example/basic/coverage/*"
```



#### 解压unzip

```sh
-o：不必先询问用户，unzip执行后覆盖原有的文件；
-d<目录>：指定文件解压缩后所要存储的目录；
-n：解压缩时不要覆盖原有的文件；

unzip -o test.zip -d tmp/


-j：不处理压缩文件中原有的目录路径；
# unzip -j dist.zip 会将dist.zip内部的文件铺平(flat) 出来
```

