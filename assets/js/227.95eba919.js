(window.webpackJsonp=window.webpackJsonp||[]).push([[227],{513:function(s,a,t){"use strict";t.r(a);var n=t(8),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"jenkins入门"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jenkins入门"}},[s._v("#")]),s._v(" Jenkins入门")]),s._v(" "),a("p",[s._v("https://www.jenkins.io/zh/doc/")]),s._v(" "),a("p",[s._v("官网教程非常详细 => "),a("a",{attrs:{href:"https://www.jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/",target:"_blank",rel:"noopener noreferrer"}},[s._v("构建node环境"),a("OutboundLink")],1)]),s._v(" "),a("h3",{attrs:{id:"运行jenkins"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运行jenkins"}},[s._v("#")]),s._v(" "),a("a",{attrs:{href:"https://www.jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/",target:"_blank",rel:"noopener noreferrer"}},[s._v("运行Jenkins"),a("OutboundLink")],1)]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-u")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" jenkins "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8081")]),s._v(":8080 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /data/jenkins_home:/var/jenkins_home "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  jenkinsci/blueocean"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-u")]),s._v(" root "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v(":8080 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" jenkins-data:/var/jenkins_home "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v(" \n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /var/run/docker.sock:/var/run/docker.sock "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$HOME")]),s._v('"')]),s._v(":/home "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v(" \n  jenkins/jenkins:lts\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -d //启动在后台")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# --name //容器名字")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -p //端口映射（8081：宿主主机端口，8080：容器内部端口）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -v //数据卷挂载映射（/data/jenkins_home：宿主主机目录，另外一个即是容器目录）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# enkins/jenkins:lts //Jenkins镜像（最新版）")]),s._v("\n  -d, "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--detach")]),s._v("                         Run container "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" background and\n                                       print container ID\n  -v, "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--volume")]),s._v(" list                    Bind "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mount")]),s._v(" a volume\n      --volume-driver string           Optional volume driver "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" the\n  -p, "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--publish")]),s._v(" list                   Publish a container's port"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" to\n                                       the "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("host")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br")])]),a("p",[s._v("--rm 选项不能与 -d 同时使用（或者说同时使用没有意义），即只能自动清理 foreground 容器，不能自动清理 detached 容器。")]),s._v(" "),a("p",[s._v("jenkinsci/blueocean 与 jenkins/jenkins")]),s._v(" "),a("p",[s._v("jenkins/jenkins是官方不带任何插件的，jenkinsci/blueocean包含了Blue Ocean插件。")]),s._v(" "),a("p",[s._v("建议使用jenkinsci/blueocean")]),s._v(" "),a("h3",{attrs:{id:"访问-jenkins-blue-ocean-docker-容器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#访问-jenkins-blue-ocean-docker-容器"}},[s._v("#")]),s._v(" 访问 Jenkins/Blue Ocean Docker 容器")]),s._v(" "),a("h3",{attrs:{id:"jenkins任务类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jenkins任务类型"}},[s._v("#")]),s._v(" "),a("a",{attrs:{href:"https://www.cnblogs.com/101718qiong/p/9450325.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("jenkins任务类型"),a("OutboundLink")],1)]),s._v(" "),a("h4",{attrs:{id:"jenkins-freestyle-任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jenkins-freestyle-任务"}},[s._v("#")]),s._v(" jenkins freestyle 任务")]),s._v(" "),a("h3",{attrs:{id:"jenkins管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jenkins管理"}},[s._v("#")]),s._v(" jenkins管理")]),s._v(" "),a("ol",[a("li",[s._v("在url后添加指令")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("http://192.168.240.179:8080/exit "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 关闭")]),s._v("\nhttp://192.168.240.179:8080/restart "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启")]),s._v("\nhttp://192.168.240.179:8080/reload "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重新加载配置")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"jenkins-push时自动触发构建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jenkins-push时自动触发构建"}},[s._v("#")]),s._v(" Jenkins push时自动触发构建")]),s._v(" "),a("p",[s._v("Jenkins webhook配置 => https://www.jianshu.com/p/f90013658c38")]),s._v(" "),a("p",[s._v("webhooks需要在GitHub页面配置https://www.cnblogs.com/hd92/p/11138010.html")]),s._v(" "),a("p",[s._v("jenkins github ssh凭证配置 => https://zhuanlan.zhihu.com/p/387980967")]),s._v(" "),a("h3",{attrs:{id:"generic-webhook-trigger"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#generic-webhook-trigger"}},[s._v("#")]),s._v(" generic-webhook-trigger")]),s._v(" "),a("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20211213091915161.png",alt:"image-20211213091915161"}}),s._v(" "),a("blockquote",[a("p",[s._v("在Gitea配置好webhook后可以测试是否可以使用")])]),s._v(" "),a("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20211213093732513.png",alt:"image-20211213093732513"}}),s._v(" "),a("h2",{attrs:{id:"常见问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见问题"}},[s._v("#")]),s._v(" 常见问题")]),s._v(" "),a("ol",[a("li",[s._v("docker启动问题")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" jenkins "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8081")]),s._v(":8080 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /data/jenkins_home:/var/jenkins_home "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n \t"),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /etc/timezone:/etc/timezone:ro "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /etc/localtime:/etc/localtime:ro "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  jenkinsci/blueocean\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -v /etc/timezone:/etc/timezone:ro 和 -v /etc/localtime:/etc/localtime:ro \\")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 表示将宿主机的时区文件同步到容器内，解决时区问题")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("p",[s._v("执行上述命令后")]),s._v(" "),a("p",[s._v("sudo docker ps 没有显示，sudo docker ps -a后显示了容器，表示容器没有正常启动，并且STATUS：exited(1)")]),s._v(" "),a("p",[s._v("原因是：权限的问题")]),s._v(" "),a("p",[s._v("正确的做法是以root用户启动")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-u")]),s._v(" root\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("No valid crumb was included in the request")])]),s._v(" "),a("p",[s._v("https://blog.51cto.com/u_13589448/2066437")]),s._v(" "),a("h3",{attrs:{id:"gitlab-webhook-jenkins-403错误"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-webhook-jenkins-403错误"}},[s._v("#")]),s._v(" Gitlab webhook Jenkins 403错误")]),s._v(" "),a("p",[s._v("Error 403 anonymous is missing the Job/Build Permission")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("jenkins gitlab webhook 403 anonymous is missing the Job/Build permission\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("首先jenkins 某个pipeline 的webhook是有权限控制，并不是任意gitlab中的项目都可以触发。")]),s._v(" "),a("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20220407165407015.png",alt:"image-20220407165407015"}}),s._v(" "),a("h3",{attrs:{id:"gitlab-api-token配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-api-token配置"}},[s._v("#")]),s._v(" Gitlab api token配置")]),s._v(" "),a("p",[s._v("https://gitlab.com/-/profile/personal_access_tokens")])])}),[],!1,null,null,null);a.default=e.exports}}]);