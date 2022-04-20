Dockerfile

Dockerfile 文件。它是一个文本文件，用来配置 image。

```dockerfile
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
```

- `FROM node:8.4`：该 image 文件继承官方的 node image，冒号表示标签，这里标签是`8.4`，即8.4版本的 node。
- `COPY . /app`：将当前目录下的所有文件（除了`.dockerignore`排除的路径），都拷贝进入 image 文件的`/app`目录。
- `WORKDIR /app`：指定接下来的工作路径为`/app`。
- `RUN npm install`：在`/app`目录下，运行`npm install`命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
- `EXPOSE 3000`：将容器 3000 端口暴露出来， 允许外部连接这个端口。



我们在使用Dockerfile构建docker镜像时，一种方式是使用官方预先配置好的[容器](https://cloud.tencent.com/product/tke?from=10680)镜像。优点是我们不用从头开始构建，节省了很多工作量，但付出的代价是需要下载很大的镜像包。

从头基于空镜像scratch创建一个新的Docker镜像

## Dockerfile命令

### COPY

```dockerfile
COPY [--chown=<user>:<group>] <源路径>... <目标路径>
COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]
```





> 每一个 `RUN` 都是启动一个容器、执行命令、然后提交存储层文件变更。
>
> https://yeasy.gitbook.io/docker_practice/image/dockerfile/workdir