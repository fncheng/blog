### Mockjs

http://mockjs.com/examples.html#Name



### mock数据

Time   '@time'

随机数字

```js
Mock.mock({
  "number|1-100": 100   // 随机数字1-100内
})
// 有规律的数字
"number|+1": 202  // 202开始自增1
```



随机id

```js
@id // 随机id
@ip // 随机ip地址
"number|1-100": 100   // 随机数字1-100内
"number|+1": 202  // 202开始自增1

// 时间
@date
Random.date('yyyy-MM-dd')
@time
```

