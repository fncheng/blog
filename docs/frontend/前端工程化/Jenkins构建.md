## Jenkins入门

https://www.jenkins.io/zh/doc/

官网教程非常详细 => [构建node环境](https://www.jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/)

### [运行Jenkins](https://www.jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/)

```sh
$ docker run \
	-u root \
	-d --name jenkins \
  -p 8081:8080 \
  -v /data/jenkins_home:/var/jenkins_home \
  jenkinsci/blueocean;
$ docker run \
  --rm \
  -u root \
  -p 8080:8080 \
  -v jenkins-data:/var/jenkins_home \ 
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME":/home \ 
  jenkins/jenkins:lts
# 
# -d //启动在后台
# --name //容器名字
# -p //端口映射（8081：宿主主机端口，8080：容器内部端口）
# -v //数据卷挂载映射（/data/jenkins_home：宿主主机目录，另外一个即是容器目录）
# enkins/jenkins:lts //Jenkins镜像（最新版）
  -d, --detach                         Run container in background and
                                       print container ID
  -v, --volume list                    Bind mount a volume
      --volume-driver string           Optional volume driver for the
  -p, --publish list                   Publish a container's port(s) to
                                       the host
```

--rm 选项不能与 -d 同时使用（或者说同时使用没有意义），即只能自动清理 foreground 容器，不能自动清理 detached 容器。



jenkinsci/blueocean 与 jenkins/jenkins

jenkins/jenkins是官方不带任何插件的，jenkinsci/blueocean包含了Blue Ocean插件。

建议使用jenkinsci/blueocean

### 访问 Jenkins/Blue Ocean Docker 容器

### [jenkins任务类型](https://www.cnblogs.com/101718qiong/p/9450325.html)

#### jenkins freestyle 任务

### jenkins管理

1. 在url后添加指令

```sh
http://192.168.240.179:8080/exit # 关闭
http://192.168.240.179:8080/restart # 重启
http://192.168.240.179:8080/reload # 重新加载配置
```



### Jenkins push时自动触发构建

Jenkins webhook配置 => https://www.jianshu.com/p/f90013658c38

webhooks需要在GitHub页面配置https://www.cnblogs.com/hd92/p/11138010.html

jenkins github ssh凭证配置 => https://zhuanlan.zhihu.com/p/387980967

### generic-webhook-trigger

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20211213091915161.png" alt="image-20211213091915161" style="zoom:67%;" />

> 在Gitea配置好webhook后可以测试是否可以使用

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20211213093732513.png" alt="image-20211213093732513" style="zoom:67%;" />

## 常见问题

1. docker启动问题

```sh
sudo docker run \
        -d --name jenkins \
  -p 8081:8080 \
  -v /data/jenkins_home:/var/jenkins_home \
 	-v /etc/timezone:/etc/timezone:ro \
	-v /etc/localtime:/etc/localtime:ro \
  jenkinsci/blueocean

# -v /etc/timezone:/etc/timezone:ro 和 -v /etc/localtime:/etc/localtime:ro \
# 表示将宿主机的时区文件同步到容器内，解决时区问题
```

执行上述命令后

sudo docker ps 没有显示，sudo docker ps -a后显示了容器，表示容器没有正常启动，并且STATUS：exited(1)

原因是：权限的问题

正确的做法是以root用户启动

```sh
sudo docker run -u root
```

2. No valid crumb was included in the request

https://blog.51cto.com/u_13589448/2066437