## Vuex配合localStorage数据持久化

mutation的方法更新state里面的数据，顺便更新localStorage。

这样在强制刷新页面后，先从localStorage中读取数据，存到Vuex。

localStorage的读取性能没Vuex好，因为localStorage是读磁盘，Vuex是读内存。

