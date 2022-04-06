---
title: SourceTree的使用
---

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210617173434785.png" alt="image-20210617173434785" style="zoom:50%;" />

执行 pull 操作时，请不要勾选 `"立即提交合并的改动"` 





## sourceTree使用外部差异对比工具

http://www.cxyzjd.com/article/cugxiangzhenwei/89949862

<img src="https://img-blog.csdnimg.cn/20190508130744239.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N1Z3hpYW5nemhlbndlaQ==,size_16,color_FFFFFF,t_70" style="zoom: 50%;" />



### 提交回滚操作

SourceTree中右键"提交回滚"操作，使用的是`git revert`命令

效果是将右键指定的commit内容重置到之前的状态，会产生新的commit

