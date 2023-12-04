---
title: linux进程与服务
---

## 进程

### 查看进程

## ps (Process Status)

https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/ps.html

> ps命令列出的是当前那些进程的快照，就是执行ps命令的那个时刻的那些进程，如果想要动态的显示进程信息，就可以使用top命令。

linux上进程有5种状态:

1. 运行(正在运行或在运行队列中等待)
2. 中断(休眠中, 受阻, 在等待某个条件的形成或接受到信号)
3. 不可中断(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)
4. 僵死(进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放)
5. 停止(进程收到SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU信号后停止运行运行)



```sh
$ ps -aux 
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
# 用户
```

1. **USER:** 进程所属的用户。

2. **PID (Process ID):** 进程的唯一标识符，用于在系统中识别和管理进程。

3. **%CPU:** 进程使用的 CPU 百分比。它表示进程在最近一次更新时占用 CPU 的百分比。

4. **%MEM:** 进程使用的物理内存百分比。

5. **VSZ (Virtual Memory Size):** 进程使用的虚拟内存的大小，以 KB 为单位。这包括进程使用的所有虚拟内存，包括实际物理内存和交换空间。

6. **RSS (Resident Set Size):** 进程实际占用的物理内存的大小，以 KB 为单位。它表示进程当前在 RAM 中的实际占用。

7. **TTY:** 终端类型。如果进程是在终端上启动的，这里将显示终端类型，否则显示 `?`。

8. STAT:

    进程状态。常见的状态包括：

   - **D (Disk Sleep):** 不可中断，通常是进程在等待磁盘 I/O。

   - **R (Running):** 进程正在运行。
   - **S (Sleeping):** 进程处于休眠状态。
   - T 停止 traced or stopped
   - **Z (Zombie):** 进程已经终止，但是其父进程还没有等待回收它的资源。

9. **START:** 进程启动的时间。

10. **TIME:** 进程累计的 CPU 使用时间。

11. **COMMAND:** 进程的命令行。表示进程是通过哪个命令启动的。







## top工具

输出内容：

- VIRT：Virtual Memory Size (KiB)	意味着进程虚拟空间的大小, 是真实使用的内存,加上映射进程自己使用的内存(如, X server使用显卡内存), 加上映射磁盘文件使用的内存(主要是加载共享程序库文件), 加上与其他进程共享的内存. VIRT代表进程当前时刻有多少内存可以访问.

  >The  total amount of virtual memory used by the task.  It includes all code, data and shared libraries plus pages that have been swapped out and pages that have been mapped but not used.

- RES：Resdient Memory Size    意味驻留内存大小, 是当前进程真正占用物理内存的精确反映. (直接与%MEM列相对应.) RES始终要比VIRT小, 因为多数程序依赖C库文件.

- SHR    表示VIRT里有多少其实是共享部分(库文件使用的内存). 关系到库文件里, 并不是整个的库文件会驻留. 如, 如果程序仅用到了库文件里的少数函数, 整个库文件会映射并被计算到VIRT和SHR里, 但只有库文件包含用到的函数那部分真正加载到内存并被计算到RES里.

```sh
PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command

```



### htop

#### 防止进程重复显示

按F2

选择 Display options

选择 Hide userland threads



### 查看内存占用



## 限制内存使用cgroup

[cgroup使用教程](https://fuckcloudnative.io/posts/understanding-cgroups-part-1-basics/)

### 安装cgroup-tools

```sh
$ sudo apt install cgroup-tools
```

### 配置cgroup规则

```sh
$ cgconfigparser -h
Usage: cgconfigparser [-h] [-f mode] [-d mode] [-s mode] [-t <tuid>:<tgid>] [-a <agid>:<auid>] [-l FILE] [-L DIR] ...
Parse and load the specified cgroups configuration file
  -a <tuid>:<tgid>		Default owner of groups files and directories
  -d, --dperm=mode		Default group directory permissions
  -f, --fperm=mode		Default group file permissions
  -h, --help			Display this help
  -l, --load=FILE		Parse and load the cgroups configuration file
  -L, --load-directory=DIR	Parse and load the cgroups configuration files from a directory
  -s, --tperm=mode		Default tasks file permissions
  -t <tuid>:<tgid>		Default owner of the tasks file
```

https://askubuntu.com/questions/836469/install-cgconfig-in-ubuntu-16-04

/etc/cgconfig.conf

```ini
# Since systemd is working well, this section may not be necessary.
# Uncomment if you need it
#
# mount {
# cpuacct = /cgroup/cpuacct;
# memory = /cgroup/memory;
# devices = /cgroup/devices;
# freezer = /cgroup/freezer;
# net_cls = /cgroup/net_cls;
# blkio = /cgroup/blkio;
# cpuset = /cgroup/cpuset;
# cpu = /cgroup/cpu;
# }

group limitcpu{
  cpu {
    cpu.shares = 400;
  }
}

group limitmem{
  memory {
    memory.limit_in_bytes = 512m;
  }
}
```

/etc/cgrules.conf

```ini
user:process                                         subsystems   group
[user]:/usr/lib/chromium-browser/chromium-browser   cpu,memory      browsers
[user]:/usr/bin/clementine                        cpu,memory     media-players
# [user]为您的用户名
```



### 报错

```sh
#error at line number 1 at �:syntax error
#Error: failed to parse file /etc/cgconfig.conf
#cgconfigparser; error loading /etc/cgconfig.conf: Have multiple paths for the same #namespace

```



参考：https://blog.51cto.com/u_15127628/2735513



### Linux 内存测试工具memtester

```sh
sudo apt install memtester
```

```sh
$ memtester 100m 3
# 表示测试100m内存 3次
```

