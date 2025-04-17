(window.webpackJsonp=window.webpackJsonp||[]).push([[378],{665:function(s,t,a){"use strict";a.r(t);var e=a(8),n=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"进程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#进程"}},[s._v("#")]),s._v(" 进程")]),s._v(" "),t("h3",{attrs:{id:"查看进程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查看进程"}},[s._v("#")]),s._v(" 查看进程")]),s._v(" "),t("h2",{attrs:{id:"ps-process-status"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ps-process-status"}},[s._v("#")]),s._v(" ps (Process Status)")]),s._v(" "),t("p",[s._v("https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/ps.html")]),s._v(" "),t("blockquote",[t("p",[s._v("ps命令列出的是当前那些进程的快照，就是执行ps命令的那个时刻的那些进程，如果想要动态的显示进程信息，就可以使用top命令。")])]),s._v(" "),t("p",[s._v("linux上进程有5种状态:")]),s._v(" "),t("ol",[t("li",[s._v("运行(正在运行或在运行队列中等待)")]),s._v(" "),t("li",[s._v("中断(休眠中, 受阻, 在等待某个条件的形成或接受到信号)")]),s._v(" "),t("li",[s._v("不可中断(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)")]),s._v(" "),t("li",[s._v("僵死(进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放)")]),s._v(" "),t("li",[s._v("停止(进程收到SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU信号后停止运行运行)")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-aux")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("USER")]),s._v("       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 用户")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("ol",[t("li",[t("p",[t("strong",[s._v("USER:")]),s._v(" 进程所属的用户。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("PID (Process ID):")]),s._v(" 进程的唯一标识符，用于在系统中识别和管理进程。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("%CPU:")]),s._v(" 进程使用的 CPU 百分比。它表示进程在最近一次更新时占用 CPU 的百分比。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("%MEM:")]),s._v(" 进程使用的物理内存百分比。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("VSZ (Virtual Memory Size):")]),s._v(" 进程使用的虚拟内存的大小，以 KB 为单位。这包括进程使用的所有虚拟内存，包括实际物理内存和交换空间。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("RSS (Resident Set Size):")]),s._v(" 进程实际占用的物理内存的大小，以 KB 为单位。它表示进程当前在 RAM 中的实际占用。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("TTY:")]),s._v(" 终端类型。如果进程是在终端上启动的，这里将显示终端类型，否则显示 "),t("code",[s._v("?")]),s._v("。")])]),s._v(" "),t("li",[t("p",[s._v("STAT:")]),s._v(" "),t("p",[s._v("进程状态。常见的状态包括：")]),s._v(" "),t("ul",[t("li",[t("p",[t("strong",[s._v("D (Disk Sleep):")]),s._v(" 不可中断，通常是进程在等待磁盘 I/O。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("R (Running):")]),s._v(" 进程正在运行。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("S (Sleeping):")]),s._v(" 进程处于休眠状态。")])]),s._v(" "),t("li",[t("p",[s._v("T 停止 traced or stopped")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("Z (Zombie):")]),s._v(" 进程已经终止，但是其父进程还没有等待回收它的资源。")])])])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("START:")]),s._v(" 进程启动的时间。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("TIME:")]),s._v(" 进程累计的 CPU 使用时间。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("COMMAND:")]),s._v(" 进程的命令行。表示进程是通过哪个命令启动的。")])])]),s._v(" "),t("h2",{attrs:{id:"top工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#top工具"}},[s._v("#")]),s._v(" top工具")]),s._v(" "),t("p",[s._v("输出内容：")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("VIRT：Virtual Memory Size (KiB)\t意味着进程虚拟空间的大小, 是真实使用的内存,加上映射进程自己使用的内存(如, X server使用显卡内存), 加上映射磁盘文件使用的内存(主要是加载共享程序库文件), 加上与其他进程共享的内存. VIRT代表进程当前时刻有多少内存可以访问.")]),s._v(" "),t("blockquote",[t("p",[s._v("The  total amount of virtual memory used by the task.  It includes all code, data and shared libraries plus pages that have been swapped out and pages that have been mapped but not used.")])])]),s._v(" "),t("li",[t("p",[s._v("RES：Resdient Memory Size    意味驻留内存大小, 是当前进程真正占用物理内存的精确反映. (直接与%MEM列相对应.) RES始终要比VIRT小, 因为多数程序依赖C库文件.")])]),s._v(" "),t("li",[t("p",[s._v("SHR    表示VIRT里有多少其实是共享部分(库文件使用的内存). 关系到库文件里, 并不是整个的库文件会驻留. 如, 如果程序仅用到了库文件里的少数函数, 整个库文件会映射并被计算到VIRT和SHR里, 但只有库文件包含用到的函数那部分真正加载到内存并被计算到RES里.")])])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("PID "),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("USER")]),s._v("      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"htop"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#htop"}},[s._v("#")]),s._v(" htop")]),s._v(" "),t("h4",{attrs:{id:"防止进程重复显示"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#防止进程重复显示"}},[s._v("#")]),s._v(" 防止进程重复显示")]),s._v(" "),t("p",[s._v("按F2")]),s._v(" "),t("p",[s._v("选择 Display options")]),s._v(" "),t("p",[s._v("选择 Hide userland threads")]),s._v(" "),t("h3",{attrs:{id:"查看内存占用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查看内存占用"}},[s._v("#")]),s._v(" 查看内存占用")]),s._v(" "),t("h2",{attrs:{id:"限制内存使用cgroup"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#限制内存使用cgroup"}},[s._v("#")]),s._v(" 限制内存使用cgroup")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://fuckcloudnative.io/posts/understanding-cgroups-part-1-basics/",target:"_blank",rel:"noopener noreferrer"}},[s._v("cgroup使用教程"),t("OutboundLink")],1)]),s._v(" "),t("h3",{attrs:{id:"安装cgroup-tools"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装cgroup-tools"}},[s._v("#")]),s._v(" 安装cgroup-tools")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" cgroup-tools\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"配置cgroup规则"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置cgroup规则"}},[s._v("#")]),s._v(" 配置cgroup规则")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("$ cgconfigparser "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-h")]),s._v("\nUsage: cgconfigparser "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-h"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-f mode"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-d mode"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-s mode"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-t "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("tuid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(":"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("tgid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-a "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("agid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(":"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("auid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-l FILE"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("-L DIR"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\nParse and load the specified cgroups configuration "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-a")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("tuid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(":"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("tgid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\t\tDefault owner of "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("groups")]),s._v(" files and directories\n  -d, "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--dperm")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("mode\t\tDefault group directory permissions\n  -f, "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--fperm")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("mode\t\tDefault group "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" permissions\n  -h, "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--help")]),s._v("\t\t\tDisplay this "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("help")]),s._v("\n  -l, "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--load")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("FILE\t\tParse and load the cgroups configuration "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n  -L, --load-directory"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("DIR\tParse and load the cgroups configuration files from a directory\n  -s, "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--tperm")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("mode\t\tDefault tasks "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" permissions\n  "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-t")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("tuid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(":"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("tgid"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\t\tDefault owner of the tasks "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("p",[s._v("https://askubuntu.com/questions/836469/install-cgconfig-in-ubuntu-16-04")]),s._v(" "),t("p",[s._v("/etc/cgconfig.conf")]),s._v(" "),t("div",{staticClass:"language-ini line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ini"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Since systemd is working well, this section may not be necessary.")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Uncomment if you need it")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# mount {")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cpuacct = /cgroup/cpuacct;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# memory = /cgroup/memory;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# devices = /cgroup/devices;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# freezer = /cgroup/freezer;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# net_cls = /cgroup/net_cls;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# blkio = /cgroup/blkio;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cpuset = /cgroup/cpuset;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cpu = /cgroup/cpu;")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# }")]),s._v("\n\ngroup limitcpu{\n  cpu {\n    "),t("span",{pre:!0,attrs:{class:"token key attr-name"}},[s._v("cpu.shares")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token value attr-value"}},[s._v("400;")]),s._v("\n  }\n}\n\ngroup limitmem{\n  memory {\n    "),t("span",{pre:!0,attrs:{class:"token key attr-name"}},[s._v("memory.limit_in_bytes")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token value attr-value"}},[s._v("512m;")]),s._v("\n  }\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br")])]),t("p",[s._v("/etc/cgrules.conf")]),s._v(" "),t("div",{staticClass:"language-ini line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-ini"}},[t("code",[s._v("user:process                                         subsystems   group\n"),t("span",{pre:!0,attrs:{class:"token section"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token section-name selector"}},[s._v("user")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")])]),s._v(":/usr/lib/chromium-browser/chromium-browser   cpu,memory      browsers\n"),t("span",{pre:!0,attrs:{class:"token section"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token section-name selector"}},[s._v("user")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")])]),s._v(":/usr/bin/clementine                        cpu,memory     media-players\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# [user]为您的用户名")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"报错"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#报错"}},[s._v("#")]),s._v(" 报错")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#error at line number 1 at �:syntax error")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#Error: failed to parse file /etc/cgconfig.conf")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#cgconfigparser; error loading /etc/cgconfig.conf: Have multiple paths for the same #namespace")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("参考：https://blog.51cto.com/u_15127628/2735513")]),s._v(" "),t("h3",{attrs:{id:"linux-内存测试工具memtester"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux-内存测试工具memtester"}},[s._v("#")]),s._v(" Linux 内存测试工具memtester")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" memtester\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("$ memtester 100m "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 表示测试100m内存 3次")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])])])}),[],!1,null,null,null);t.default=n.exports}}]);