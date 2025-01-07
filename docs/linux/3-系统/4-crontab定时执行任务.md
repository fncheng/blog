## Crontab定时任务

### 目录介绍

[菜鸟教程](https://www.runoob.com/w3cnote/linux-crontab-tasks.html)

https://www.runoob.com/linux/linux-comm-crontab.html

- /var/spool/cron/ 目录下存放的是每个用户包括root的crontab任务，每个任务以创建者的名字命名
- /etc/crontab 这个文件负责调度各种管理和维护任务。
- /etc/cron.d/ 这个目录用来存放任何要执行的crontab文件或脚本。
- 我们还可以把脚本放在/etc/cron.hourly、/etc/cron.daily、/etc/cron.weekly、/etc/cron.monthly目录中，让它每小时/天/星期、月执行一次。

**时间格式如下：**

```
f1 f2 f3 f4 f5 program
```

- 其中 f1 是表示分钟，f2 表示小时，f3 表示一个月份中的第几日，f4 表示月份，f5 表示一个星期中的第几天。program 表示要执行的程序。
- 当 f1 为 * 时表示每分钟都要执行 program，f2 为 * 时表示每小时都要执行程序，其馀类推
- 当 f1 为 a-b 时表示从第 a 分钟到第 b 分钟这段时间内要执行，f2 为 a-b 时表示从第 a 到第 b 小时都要执行，其馀类推
- 当 f1 为 */n 时表示每 n 分钟个时间间隔执行一次，f2 为 */n 表示每 n 小时个时间间隔执行一次，其馀类推
- 当 f1 为 a, b, c,... 时表示第 a, b, c,... 分钟要执行，f2 为 a, b, c,... 时表示第 a, b, c...个小时要执行，其馀类推

```
*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- 星期中星期几 (0 - 7) (星期天 为0)
|    |    |    +---------- 月份 (1 - 12) 
|    |    +--------------- 一个月中的第几天 (1 - 31)
|    +-------------------- 小时 (0 - 23)
+------------------------- 分钟 (0 - 59)
```



### [Linux Crontab命令定时任务基本语法](https://wzfou.com/crontab/)

- 编辑crontab定时执行任务

```bash
crontab -e
```

- 

```bash
*/1 * * * *  /usr/bin/touch  /home/cheng/.klei/namee.txt
```

需要注意的是: crontab中使用的路径均为绝对路径**注意：**当程序在你所指定的时间执行后，系统会发一封邮件给当前的用户，显示该程序执行的内容，若是你不希望收到这样的邮件，请在每一行空一格之后加上 > /dev/null 2>&1 即可，如：

```bash
# 每天01:00
0 1 * * * /usr/bin/bash /home/cheng/.klei/dstbackup.sh > /dev/null 2>&1
# 10:00的每分钟 10:01, 10:02, 10:03...
* 10 * * * /usr/bin/echo 555 > /dev/null 2>&1
# 每个星期1的10:00
0 10 * * 1
```





[Crontab计算器](https://tool.lu/crontab/)



1. where is the location of crontab file in Linux？

A：`/var/spool/cron/crontabs/`

