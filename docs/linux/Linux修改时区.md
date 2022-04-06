查看时区

```sh
$ date -R
Fri, 10 Dec 2021 10:34:12 +0800
```



docker时区问题

https://cloud.tencent.com/developer/article/1626811

```sh
$ docker run \
	-v /etc/timezone:/etc/timezone:ro \
	-v /etc/localtime:/etc/localtime:ro \
```

