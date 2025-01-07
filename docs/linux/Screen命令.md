## Screen命令

Linux中的Screen可用于将任务在后台运行

### 参考连接

https://www.css3er.com/p/199.html

```bash
$ screen --help
Use: screen [-opts] [cmd [args]]
 or: screen -r [host.tty]

Options:
-4            Resolve hostnames only to IPv4 addresses.
			  # 仅将主机名解析为IPv4地址。
-6            Resolve hostnames only to IPv6 addresses.
-a            Force all capabilities into each window's termcap.
-A -[r|R]     Adapt all windows to the new display width & height.
-c file       Read configuration file instead of '.screenrc'.
-d (-r)       Detach the elsewhere running screen (and reattach here).
-dmS name     Start as daemon: Screen session in detached mode.
-D (-r)       Detach and logout remote (and reattach here).
-D -RR        Do whatever is needed to get a screen session.
-e xy         Change command characters.
-f            Flow control on, -fn = off, -fa = auto.
-h lines      Set the size of the scrollback history buffer.
-i            Interrupt output sooner when flow control is on.
-l            Login mode on (update /var/run/utmp), -ln = off.
-ls [match]   or
-list         Do nothing, just list our SockDir [on possible matches].
			  # 不执行任何操作，仅在可能的匹配项中列出我们的SockDir。
-L            Turn on output logging.
-m            ignore $STY variable, do create a new screen session.
-O            Choose optimal output rather than exact vt100 emulation.
-p window     Preselect the named window if it exists.
			  # 预选命名窗口（如果存在）
-q            Quiet startup. Exits with non-zero return code if unsuccessful.
-Q            Commands will send the response to the stdout of the querying process.
-r [session]  Reattach to a detached screen process.
-R            Reattach if possible, otherwise start a new session.
-s shell      Shell to execute rather than $SHELL.
-S sockname   Name this session <pid>.sockname instead of <pid>.<tty>.<host>.
-t title      Set title. (window's name).
-T term       Use term as $TERM for windows, rather than "screen".
-U            Tell screen to use UTF-8 encoding.
-v            Print "Screen version 4.01.00devel (GNU) 2-May-06".
-wipe [match] Do nothing, just clean up SockDir [on possible matches].
-x            Attach to a not detached screen. (Multi display mode).
-X            Execute <cmd> as a screen command in the specified session.
```



## screen的语法

```bash
screen [-AmRvx -ls -wipe][-d <作业名称>][-h <行数>][-r <作业名称>][-s ][-S <作业名称>]

-A   #将所有的视窗都调整为目前终端机的大小。

-d   #<作业名称> 　将指定的screen作业离线。

-h   #<行数> 　指定视窗的缓冲区行数。

-m  #即使目前已在作业中的screen作业，仍强制建立新的screen作业。

-r    #<作业名称> 　恢复离线的screen作业。

-R   #先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。

-s    #指定建立新视窗时，所要执行的shell。

-S    #<作业名称> 　指定screen作业的名称。

-v 　#显示版本信息。

-x     #恢复之前离线的screen作业。

-ls或--list  #显示目前所有的screen作业。

-wipe  #检查目前所有的screen作业，并删除已经无法使用的screen作业。

-hlep  #查看screen命令的更多使用帮助
```

### 常用screen参数

```bash
screen -S yourname     #新建一个叫yourname的session
Ctrl+a z	#将当前session放到后台执行
screen -ls             #列出当前所有的session
screen -r yourname     #回到yourname这个session
screen -d yourname     #远程detach某个session
screen -d -r yourname  #结束当前session并回到yourname这个session
```

```bash
创建：screen -S ###

查看有多少会话：screen -ls

恢复：screen -r ###

如果不能恢复：先screen -d ###

再screen -r ###

删除 screen -S ### -X quit
```

### DontStarveTogether shell

新建服务

```bash
#!/bin/bash
screen -dmS master #新建master窗口

```



重启服务

```bash
#!/bin/bash
screen_name="master"		#定义变量
cmd="./run_dedicated_servers.sh"

screen -dr master -X quit &&     #screen -dr 将master离线，如果找不到master就建立新的
#创建一个名叫 $screen_name 的session，但暂不进入，可用于系统启动脚本里
screen -dmS $screen_name &&

#向screen发送$cmd命令
screen -X -S $screen_name -p 0 -X stuff $cmd  &&
screen -x -S $screen_name -p 0 -X stuff $'\n'
```



### shell脚本调用screen命令

#### 难点：

shell脚本生成screen后无法执行后面的命令

```bash
#!/bin/bash
screen -dmS master
# 后续命令都无法执行
echo 123
```

经查https://www.cnblogs.com/date/p/10497571.html发现

可以通过后接`bash -c`命令来执行命令

```bash
screen -dmS test bash -c 'ping www.baidu.com'
```

其中 -dmS test 指 后台静默创建名称为 test 的会话，会话名比较重要。

bash -c 'ping www.baidu.com' 指 会话中 执行 ping www.baidu.com 命令