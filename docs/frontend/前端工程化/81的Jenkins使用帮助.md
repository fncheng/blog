启动

```sh
$ docker run \
        -u root \
        -d --name jenkins \
  -p 8081:8080 \
  -v /data/jenkins_home:/var/jenkins_home \
  jenkinsci/blueocean;
```

在已有容器的情况下，直接运行

```sh
$ sudo docker container ps -a
$ sudo docker run jenkinsci/blueocean
```

