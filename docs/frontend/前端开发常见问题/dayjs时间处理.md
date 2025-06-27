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



## 获取时间差

计算时间差

```ts
function to13DigitTimestamp(time: string | number | Date): number {
  const timestamp = new Date(time).getTime()
  return String(timestamp).length === 10 ? timestamp * 1000 : timestamp
}
// 获取时间差
export function getTimeDiff(startDate: string | number | Date, endDate: string | number | Date, type = 'hh:mm:ss') {
  const startTime = to13DigitTimestamp(startDate)
  const endTime = to13DigitTimestamp(endDate)

  const start = dayjs(startTime)
  const end = dayjs(endTime)

  const diffMs = Math.abs(end.diff(start)) // 获取时间差（毫秒）
  const d = dayjs.duration(diffMs)

  // 支持简单的格式类型拓展
  if (type === 'hh:mm:ss') {
    const hours = String(Math.floor(d.asHours())).padStart(2, '0')
    const minutes = String(d.minutes()).padStart(2, '0')
    const seconds = String(d.seconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  if (type === 'mm:ss') {
    const minutes = String(Math.floor(d.asMinutes())).padStart(2, '0')
    const seconds = String(d.seconds()).padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  // 默认返回毫秒数
  return diffMs
}
```

使用dayjs计算时间差，核心方法是

`dayjs(end).diff(start)`

返回两个时间的毫秒差

`dayjs.duration(diffMs)`的作用是什么？

用来**将毫秒差值 `diffMs` 转换为一个可以拆解的“时间段对象”**（`Duration` 实例）

```ts
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const diffMs = 9045000 // 比如 2小时30分45秒 的毫秒值
const d = dayjs.duration(diffMs)

console.log(d.hours())   // 2
console.log(d.minutes()) // 30
console.log(d.seconds()) // 45
```



## 时间差转换和计算

原生实现：

```ts
/**
 * 将 "HH:mm:ss" 格式的持续时间字符串转换为总秒数。
 * 例如: "01:05:30" 会被转换为 3930 秒。
 * @param durationStr 持续时间字符串，格式为 "HH:mm:ss"。
 * @returns 总秒数。
 */
export function durationToSeconds(durationStr: string): number {
  if (!durationStr || typeof durationStr !== 'string') {
    return 0;
  }
  const parts = durationStr.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
}

/**
 * 将总秒数转换为 "HH:mm:ss" 格式的持续时间字符串。
 * 例如: 3930 秒会被转换为 "01:05:30"。
 * @param totalSeconds 总秒数。
 * @returns 格式为 "HH:mm:ss" 的持续时间字符串。
 */
export function secondsToDuration(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    totalSeconds = 0;
  }
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
```



dayjs实现：

```ts
/**
 * 将 "HH:mm:ss" 格式的持续时间字符串转换为总秒数。
 * 例如: "01:05:30" 会被转换为 3930 秒。
 * @param durationStr 持续时间字符串，格式为 "HH:mm:ss"。
 * @returns 总秒数。
 */
export function durationToSeconds(durationStr: string): number {
  if (!durationStr || typeof durationStr !== 'string') {
    return 0;
  }
  // dayjs.duration可以解析HH:mm:ss格式的字符串
  const d = dayjs.duration(durationStr);
  return d.asSeconds();
}

/**
 * 将总秒数转换为 "HH:mm:ss" 格式的持续时间字符串。
 * 例如: 3930 秒会被转换为 "01:05:30"。
 * @param totalSeconds 总秒数。
 * @returns 格式为 "HH:mm:ss" 的持续时间字符串。
 */
export function secondsToDuration(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    totalSeconds = 0;
  }
  const d = dayjs.duration(totalSeconds, 'seconds');
  const hours = String(Math.floor(d.asHours())).padStart(2, '0');
  const minutes = String(d.minutes()).padStart(2, '0');
  const seconds = String(d.seconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
```

dayjs其实不支持dayjs.duration('01:05:30') 这种写法，因为无法识别"HH:mm:ss"

需要手动拆分：

```ts
function parseHHMMSS(str: string): dayjs.Duration {
  const [h, m, s] = str.split(':').map(Number)
  return dayjs.duration({
    hours: h,
    minutes: m,
    seconds: s
  })
}
```

