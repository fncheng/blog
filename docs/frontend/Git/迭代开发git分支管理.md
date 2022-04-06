### 迭代开发git分支管理

https://zhuanlan.zhihu.com/p/394734031

https://segmentfault.com/a/1190000040505582

https://juejin.cn/post/6844904069652299784

[git flow test和dev分支](https://gist.github.com/ufoe/3899044)

![](https://pic2.zhimg.com/v2-bf2a70c5cb5842de78a5e107a96c22f9_r.jpg)



#### develop 分支

`develop` 为测试分支，用于部署到测试环境（FAT），始终保持最新完成以及 bug 修复后的代码，可根据需求大小程度确定是由 `feature` 分支合并，还是直接在上面开发。

#### 主分支 Master

稳定版本代码分支，不能在此分支直接修改代码， 只接受 hotfix、release 分支的代码合并，每次从 release/hotfix 分支合并必须打版本号 tag，以方便后续的代码追溯。该分支上部署自动化测试脚本，在每次代码提交至该分支后都会触发测试，以此保证主分支核心功能的稳定。
