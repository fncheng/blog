## lsof

查看端口占用

```sh
$ lsof -i:80

COMMAND   PID USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
node    13695 root   20u  IPv4 3281738      0t0  TCP *:http (LISTEN)

lsof -i tcp:5173 # 查看tcp端口占用
```

## netstat

### netstat -tunlp

`netstat -tunlp`是一个用于查看TCP和UDP网络连接以及监听端口的命令。

下面是该命令的详细说明：

- `-t`：显示TCP连接。
- `-u`：显示UDP连接。
- `-n`：以数字形式显示IP地址和端口号，而不进行域名解析。
- `-l`：仅显示监听状态的连接。
- `-p`：显示与每个连接相关的进程ID（PID）和进程名称。



## ss

比 netstat 好用的socket统计信息，iproute2 包附带的另一个工具，允许你查询 socket 的有关统计信息

```sh
$ ss -ntlp | grep 'v2'
LISTEN     0      128         :::16531                   :::*                   users:(("v2",pid=21302,fd=3))
# -n, --numeric   不解析服务名称
# -t, --tcp       仅显示 TCP sockets
# -l, --listening 显示监听状态的 sockets
# -p, --processes 显示使用套接字（socket）的进程
```

```sh
Usage: ss [ OPTIONS ]
       ss [ OPTIONS ] [ FILTER ]
   -h, --help          this message
   -V, --version       output version information
   -n, --numeric       don't resolve service names
   -r, --resolve       resolve host names
   -a, --all           display all sockets # 显示所有socket
   -l, --listening     display listening sockets 显示监听状态的套接字（sockets）
   -o, --options       show timer information
   -e, --extended      show detailed socket information
   -m, --memory        show socket memory usage # 显示socket的内存使用情况
   -p, --processes     show process using socket
   -i, --info          show internal TCP information
   -s, --summary       show socket usage summary
   -b, --bpf           show bpf filter socket information
   -E, --events        continually display sockets as they are destroyed
   -Z, --context       display process SELinux security contexts
   -z, --contexts      display process and socket SELinux security contexts
   -N, --net           switch to the specified network namespace name

   -4, --ipv4          display only IP version 4 sockets
   -6, --ipv6          display only IP version 6 sockets
   -0, --packet        display PACKET sockets
   -t, --tcp           display only TCP sockets
   -u, --udp           display only UDP sockets
   -d, --dccp          display only DCCP sockets
   -w, --raw           display only RAW sockets
   -x, --unix          display only Unix domain sockets
   -f, --family=FAMILY display sockets of type FAMILY

   -A, --query=QUERY, --socket=QUERY
       QUERY := {all|inet|tcp|udp|raw|unix|unix_dgram|unix_stream|unix_seqpacket|packet|netlink}[,QUERY]

   -D, --diag=FILE     Dump raw information about TCP sockets to FILE
   -F, --filter=FILE   read filter information from FILE
       FILTER := [ state STATE-FILTER ] [ EXPRESSION ]
       STATE-FILTER := {all|connected|synchronized|bucket|big|TCP-STATES}
         TCP-STATES := {established|syn-sent|syn-recv|fin-wait-{1,2}|time-wait|closed|close-wait|last-ack|listen|closing}
          connected := {established|syn-sent|syn-recv|fin-wait-{1,2}|time-wait|close-wait|last-ack|closing}
       synchronized := {established|syn-recv|fin-wait-{1,2}|time-wait|close-wait|last-ack|closing}
             bucket := {syn-recv|time-wait}
                big := {established|syn-sent|fin-wait-{1,2}|closed|close-wait|last-ack|listen|closing}
```

