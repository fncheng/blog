- [参考链接](https://www.cnblogs.com/chengxs/p/10949075.html)



1.Promise版本

```js
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}
(async function () {
  await sleep(3000)
    .then(() => {
      console.log("Hello");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(123);
})();
```

优点：实际上用了setTimeout，没有形成进程阻塞，不会造成性能和负载问题。

缺点：虽然解决了回调函数的嵌套，但是还是不美观，而且异步不彻底，过程中停止执行。

