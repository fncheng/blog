---
title: Shell编程
---

### [Shell脚本中循环语句for,while,until用法](https://blog.51cto.com/kling/1252952)

http://c.biancheng.net/cpp/view/7008.html

#### 生成随机数

https://www.jianshu.com/p/e43adcebd73a

#### Date

https://www.runoob.com/linux/linux-comm-date.html

```bash
DATE=`date '+%m%d'`
zip -qr /www/wwwroot/cheng/dst/dstbackup$DATE.zip /home/cheng/.klei/DoNotStarveTo
gether/dstbackup
```

多个命令一起执行 ; && ||

- 每个命令之间用`;`隔开

  各命令的执行结果，不会影响其它命令的执行。换句话说，各个命令都会执行，
  但不保证每个命令都执行成功。

- 每个命令之间用`&&`隔开

  若前面的命令执行成功，才会去执行后面的命令。这样可以保证所有的命令执行完毕后，执行过程都是成功的。

- 每个命令之间用`||`隔开

  ||是或的意思，只有前面的命令执行失败后才去执行下一条命令，直到执行成功
  一条命令为止。

### Shell传递参数

在执行shell脚本时，向脚本传递参数，脚本内获取参数的格式为: **$n**。**n** 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……

```bash
#!/bin/bash
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

运行: ./test.sh  1 2 3

#### 默认参数

- if繁琐方式

```sh
if [ ! $1 ]; then
    $1='default'
fi
```

- 变量为null

  `${var-default}` var默认值default

- 

### 条件判断

https://www.cnblogs.com/kaishirenshi/p/9729800.html

shell中的 `()`、`[]`、`[[]]`: https://www.runoob.com/w3cnote/linux-shell-brackets-features.html

```bash
#!/bin/bash
a=30
b=20
if [[ $a>$b ]]
then echo '1'
else echo '2'
fi
```

基本语法

```sh
if [ command ]; then
     符合该条件执行的语句
fi
```

扩展语法

```sh
if [ command ];then
     符合该条件执行的语句
elif [ command ];then
     符合该条件执行的语句
else
     符合该条件执行的语句
fi
```



### 逻辑运算

在Linux中，每个可执行程序运行完后会有一个整数的返回值，可以使用**`$?`变量**来接收

&&

&&左边的命令（命令1）返回真(即返回0，成功被执行）后，&&右边的命令（命令2）才能够被执行

||



### [linux extglob模式 和rm反选](https://www.cnblogs.com/shuiche/p/10137480.html)

```sh
#开启命令：
shopt -s extglob

#关闭命令：
shopt -u extglob
```

