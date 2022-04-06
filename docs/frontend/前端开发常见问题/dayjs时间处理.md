### 前一天、后一天

add 向后

substract 向前

```js
dayjs().subtract(1,'day').format('YYYY-MM-DD') // 当前时间前一天
```





### 获取年、月、日的最后一天

#### 1. 原生js

```js
// 语法
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);

new Date(2021,07,0).getTime() // 获取月份的最后一天，返回一个时间戳 
```

#### 2. dayjs或moment插件

dayjs提供了`startOf`和`endOf`两个方法用来获取开始日期和结束日期

```js
dayjs().startOf('year').format('YYYY-MM-DD-HH-mm-ss') // 今年一月1日上午 00:00
dayjs().startOf('month').format('YYYY-MM-DD-HH-mm-ss') // 本月1日上午 00:00
dayjs().startOf('isoWeek').format('YYYY-MM-DD-HH-mm-ss') // 本周的第一天上午 00:00 (根据 ISO 8601) ( 依赖 IsoWeek 插件 ) 周一为一周的第一天
```





### 时间戳

13位时间戳

```js
new Date().getTime()
```

10位时间戳

```js
```

