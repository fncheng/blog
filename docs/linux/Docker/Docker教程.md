---
title: Docker使用教程
---



http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html

## 安装

#### Install Docker Engine

1. Update the `apt` package index, and install the *latest version* of Docker Engine and containerd, or go to the next step to install a specific version:

   ```sh
   $ sudo apt-get update
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
   # docker-ce-cli：作用是 docker 命令行工具包
   # containerd.io：作用是容器接口相关包
   ```

```bash
# 验证是否安装成功
$ docker version
# 或者
$ docker info
```

docker和docker-ce的区别？

CE( Community Edition)是社区版

EE(Docker Enterprise Edition)是企业版

### 开始

```sh
docker run -d -p 80:80 docker/getting-started
```

- `-d` -以分离模式运行容器（在后台）
- `-p 80:80` -将主机的端口80映射到容器中的端口80
- `docker/getting-started` -要使用的图像

> 您可以组合单个字符标志来缩短完整命令。例如，上面的命令可以写为：
>
> ```sh
> docker run -dp 80:80 docker/getting-started
> ```



### Q：docker镜像和容器有什么区别？

https://zhuanlan.zhihu.com/p/120982681

容器是由镜像实例化而来，这和我们学习的面向对象的概念十分相似，我们可以把镜像看作类，把容器看作类实例化后的对象。

也可以说镜像是文件, 容器是进程。 容器是基于镜像创建的, 即容器中的进程依赖于镜像中的文件, 这里的文件包括进程运行所需要的可执行文件， 依赖软件， 库文件， 配置文件等等...

### Q: docker 镜像alpine/buster/slim 有什么区别

#### 1.大小不同

```sh
docker pull --quiet python：3.8 
docker pull --quiet python：3.8.3 
docker pull --quiet python：3.8.3-slim 
docker pull --quiet python：3.8.3-alpine 
docker镜像
```

![](https://miro.medium.com/max/875/1*_G4THS8_oj2ogauQ_kzPnA.png)

slim 瘦身版



### Docker镜像搜索

https://hub.docker.com/_/docker

### docker run运行容器

```sh
$ docker run <image name>
$ docker <object> <command> <options>

$ docker container run <image name>
```

- `object` 表示将要操作的 Docker 对象的类型。这可以是 `container`、`image`、`network` 或者 `volume` 对象。
- `command` 表示守护程序要执行的任务，即 `run` 命令。
- `options` 可以是任何可以覆盖命令默认行为的有效参数，例如端口映射的 `--publish` 选项。



```sh
$ docker container run --volume $(pwd):/home/node/app node:slim node /home/node/app/index.js
# 将当前目录(pwd) 映射到容器的/home/node/app 并执行 "node /home/node/app/index.js" 命令
```



## 下载images

### docker pull拉取images

从镜像仓库拉取镜像。

```sh
$ docker pull [OPTIONS] NAME[:TAG|@DIGEST]
Pull an image or a repository from a registry

Options:
  -a, --all-tags                Download all tagged images in the repository
      --disable-content-trust   Skip image verification (default true)
      --platform string         Set platform if server is multi-platform
                                capable
  -q, --quiet                   Suppress verbose output

```



### 查看下载的docker镜像

```sh
$ docker images
```

```sh
$ docker --help
Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes
```

## 运行image

### docker run

```sh
$ docker run --help

Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container

Options:
      --add-host list                  Add a custom host-to-IP mapping
                                       (host:ip)
  -a, --attach list                    Attach to STDIN, STDOUT or STDERR
      --blkio-weight uint16            Block IO (relative weight),
                                       between 10 and 1000, or 0 to
                                       disable (default 0)
      --blkio-weight-device list       Block IO weight (relative device
                                       weight) (default [])
      --cap-add list                   Add Linux capabilities
      --cap-drop list                  Drop Linux capabilities
      --cgroup-parent string           Optional parent cgroup for the
                                       container
      --cgroupns string                Cgroup namespace to use
                                       (host|private)
                                       'host':    Run the container in
                                       the Docker host's cgroup namespace
                                       'private': Run the container in
                                       its own private cgroup namespace
                                       '':        Use the cgroup
                                       namespace as configured by the
                                                  default-cgroupns-mode
                                       option on the daemon (default)
      --cidfile string                 Write the container ID to the file
      --cpu-period int                 Limit CPU CFS (Completely Fair
                                       Scheduler) period
      --cpu-quota int                  Limit CPU CFS (Completely Fair
                                       Scheduler) quota
      --cpu-rt-period int              Limit CPU real-time period in
                                       microseconds
      --cpu-rt-runtime int             Limit CPU real-time runtime in
                                       microseconds
  -c, --cpu-shares int                 CPU shares (relative weight)
      --cpus decimal                   Number of CPUs
      --cpuset-cpus string             CPUs in which to allow execution
                                       (0-3, 0,1)
      --cpuset-mems string             MEMs in which to allow execution
                                       (0-3, 0,1)
  -d, --detach                         Run container in background and
                                       print container ID
      --detach-keys string             Override the key sequence for
                                       detaching a container
      --device list                    Add a host device to the container
      --device-cgroup-rule list        Add a rule to the cgroup allowed
                                       devices list
      --device-read-bps list           Limit read rate (bytes per second)
                                       from a device (default [])
      --device-read-iops list          Limit read rate (IO per second)
                                       from a device (default [])
      --device-write-bps list          Limit write rate (bytes per
                                       second) to a device (default [])
      --device-write-iops list         Limit write rate (IO per second)
                                       to a device (default [])
      --disable-content-trust          Skip image verification (default true)
      --dns list                       Set custom DNS servers
      --dns-option list                Set DNS options
      --dns-search list                Set custom DNS search domains
      --domainname string              Container NIS domain name
      --entrypoint string              Overwrite the default ENTRYPOINT
                                       of the image
  -e, --env list                       Set environment variables
      --env-file list                  Read in a file of environment variables
      --expose list                    Expose a port or a range of ports
      --gpus gpu-request               GPU devices to add to the
                                       container ('all' to pass all GPUs)
      --group-add list                 Add additional groups to join
      --health-cmd string              Command to run to check health
      --health-interval duration       Time between running the check
                                       (ms|s|m|h) (default 0s)
      --health-retries int             Consecutive failures needed to
                                       report unhealthy
      --health-start-period duration   Start period for the container to
                                       initialize before starting
                                       health-retries countdown
                                       (ms|s|m|h) (default 0s)
      --health-timeout duration        Maximum time to allow one check to
                                       run (ms|s|m|h) (default 0s)
      --help                           Print usage
  -h, --hostname string                Container host name
      --init                           Run an init inside the container
                                       that forwards signals and reaps
                                       processes
  -i, --interactive                    Keep STDIN open even if not attached
      --ip string                      IPv4 address (e.g., 172.30.100.104)
      --ip6 string                     IPv6 address (e.g., 2001:db8::33)
      --ipc string                     IPC mode to use
      --isolation string               Container isolation technology
      --kernel-memory bytes            Kernel memory limit
  -l, --label list                     Set meta data on a container
      --label-file list                Read in a line delimited file of labels
      --link list                      Add link to another container
      --link-local-ip list             Container IPv4/IPv6 link-local
                                       addresses
      --log-driver string              Logging driver for the container
      --log-opt list                   Log driver options
      --mac-address string             Container MAC address (e.g.,
                                       92:d0:c6:0a:29:33)
  -m, --memory bytes                   Memory limit
      --memory-reservation bytes       Memory soft limit
      --memory-swap bytes              Swap limit equal to memory plus
                                       swap: '-1' to enable unlimited swap
      --memory-swappiness int          Tune container memory swappiness
                                       (0 to 100) (default -1)
      --mount mount                    Attach a filesystem mount to the
                                       container
      --name string                    Assign a name to the container
      --network network                Connect a container to a network
      --network-alias list             Add network-scoped alias for the
                                       container
      --no-healthcheck                 Disable any container-specified
                                       HEALTHCHECK
      --oom-kill-disable               Disable OOM Killer
      --oom-score-adj int              Tune host's OOM preferences (-1000
                                       to 1000)
      --pid string                     PID namespace to use
      --pids-limit int                 Tune container pids limit (set -1
                                       for unlimited)
      --platform string                Set platform if server is
                                       multi-platform capable
      --privileged                     Give extended privileges to this
                                       container
  -p, --publish list                   Publish a container's port(s) to
                                       the host
  -P, --publish-all                    Publish all exposed ports to
                                       random ports
      --pull string                    Pull image before running
                                       ("always"|"missing"|"never")
                                       (default "missing")
      --read-only                      Mount the container's root
                                       filesystem as read only
      --restart string                 Restart policy to apply when a
                                       container exits (default "no")
      --rm                             Automatically remove the container
                                       when it exits
      --runtime string                 Runtime to use for this container
      --security-opt list              Security Options
      --shm-size bytes                 Size of /dev/shm
      --sig-proxy                      Proxy received signals to the
                                       process (default true)
      --stop-signal string             Signal to stop a container
                                       (default "SIGTERM")
      --stop-timeout int               Timeout (in seconds) to stop a
                                       container
      --storage-opt list               Storage driver options for the
                                       container
      --sysctl map                     Sysctl options (default map[])
      --tmpfs list                     Mount a tmpfs directory
  -t, --tty                            Allocate a pseudo-TTY
      --ulimit ulimit                  Ulimit options (default [])
  -u, --user string                    Username or UID (format:
                                       <name|uid>[:<group|gid>])
      --userns string                  User namespace to use
      --uts string                     UTS namespace to use
  -v, --volume list                    Bind mount a volume
      --volume-driver string           Optional volume driver for the
                                       container
      --volumes-from list              Mount volumes from the specified
                                       container(s)
  -w, --workdir string                 Working directory inside the container
```

#### [运行Jenkins](https://www.jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/)

```sh
$ docker run -d --name jenkins -p 8081:8080 -v /data/jenkins_home:/var/jenkins_home jenkins/jenkins:lts;
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

https://www.cnblogs.com/goloving/p/15092088.html

--rm 选项不能与 -d 同时使用（或者说同时使用没有意义），即只能自动清理 foreground 容器，不能自动清理 detached 容器。

### docker ps

查看当前正在运行的容器

- `-a, --all`：列出所有的容器，包括停止运行的容器
- `-s, --size`：显示容器的大小
- `-q, --quiet`：仅显示容器ID
- `-f, --filter`：过滤器，支持`key=value`的格式进行过滤，多个过滤器使用`-f "key=value" -f "key=value"`格式



### docker start

docker启动之前已运行过的容器

```sh
$ sudo docker ps -a
$ sudo docker start CONTAINER ID
```





### docker rm 

docker rm 命令可以用来删除一个或者多个已经停止的 Docker容器。该命令后面的 CONTAINER 可以是容器Id，或者是容器名。



### docker exec

```sh
$ docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
 Run a command in a running container

Options:
  -d, --detach               Detached mode: run command in the background
      --detach-keys string   Override the key sequence for detaching a container
  -e, --env list             Set environment variables
      --env-file list        Read in a file of environment variables
  -i, --interactive          Keep STDIN open even if not attached
      --privileged           Give extended privileges to the command
  -t, --tty                  Allocate a pseudo-TTY
  -u, --user string          Username or UID (format: <name|uid>[:<group|gid>])
  -w, --workdir string       Working directory inside the container
```



### docker stop

停止容器使用`docker container stop`或者`docker stop`命令，该命令会向容器内的主进程发送`SIGTERM`信号，等待一段时间后，再发送`SIGKILL`命令。

```sh
Usage:  docker stop [OPTIONS] CONTAINER [CONTAINER...]

Stop one or more running containers
Options:
  -t, --time int   Seconds to wait for stop before killing it (default 10)
```





参考：

https://nkcoder.github.io/posts/docker/docker-container-list-stop-remove/
