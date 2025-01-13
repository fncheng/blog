## setTimeout和setInterval

使用 `setTimeout` 代替 `setInterval` 有几个好处，尤其在处理异步操作时：

**避免重叠调用**:

- `setInterval` 会在每隔固定时间间隔调用回调函数，而不管上一次调用是否完成。这可能会导致多个异步操作并行运行，尤其当操作耗时较长时，可能会导致重叠和竞态条件。
- `setTimeout` 可以在异步操作完成后再设置下一次调用，确保每次操作是顺序进行的，不会有重叠。



### 使用setTimeout封装成具有setInterval效果的函数

