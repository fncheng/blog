ElCasader的数据是懒加载，通过选择节点后接口获取的，这个时候要实现数据回显比较麻烦

因为你的modelValue拿到时，Casader的options还没值，导致无法回显





最简单的方法！！！

级联选择器的输入框部分和Panel面板部分解耦

即绿色部分一定要和红色部分解耦

![image-20250522160240580](/Users/cheng/Library/Application Support/typora-user-images/image-20250522160240580.png)

绿色部分只用来做展示，点击绿色部分时弹出红色部分CascaderPanel