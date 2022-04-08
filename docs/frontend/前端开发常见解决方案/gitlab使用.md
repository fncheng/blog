---
title: Gitlab使用
---

自动化部署

gitlab-runner安装

https://docs.gitlab.com/runner/install/linux-repository.html



gitlab ci配置编写





### Gitlab api token配置

https://gitlab.com/-/profile/personal_access_tokens



### Gitlab webhook Jenkins 403错误

Error 403 anonymous is missing the Job/Build Permission

```
jenkins gitlab webhook 403 anonymous is missing the Job/Build permission
```

首先jenkins 某个pipeline 的webhook是有权限控制，并不是任意gitlab中的项目都可以触发。

![image-20220407165407015](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20220407165407015.png)
