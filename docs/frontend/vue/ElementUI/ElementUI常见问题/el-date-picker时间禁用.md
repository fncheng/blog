## el-date-picker的时间禁用相关

https://element-plus.org/zh-CN/component/datetime-picker

关联属性：

- disabled-date
- disabled-hours
- disabled-minutes
- disabled-seconds

先看一段代码

```vue
<el-date-picker
  v-model="formData.timeRange"
  range-separator="至"
  start-placeholder="请选择开始时间"
  end-placeholder="请选择结束时间"
  type="datetimerange"
  value-format="YYYY-MM-DD HH:mm:ss"
  :disabled-date="disabledDate"
  :disabled-hours="disabledHours"
  :disabled-minutes="disabledMinutes"
  :disabled-seconds="disabledSeconds"
  :default-time="new Date()"
  style="flex: 1"
  >
</el-date-picker>
```



```ts
//#region el-date-picker时间禁用相关
const disabledDate = (time: Date) => {
  // 获取今天的开始时间（00:00:00）
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  // 禁用今天之前的所有日期
  return time.getTime() < today.getTime()
}

// 生成数字范围数组的辅助函数
const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

const disabledHours = (role: string) => {
  if (role !== 'start') return []
  const nowHour = new Date().getHours()
  return makeRange(0, nowHour - 1)
}

const disabledMinutes = (hour: number, role: string) => {
  if (role !== 'start') return []
  const now = new Date()
  const nowHour = now.getHours()
  const nowMinute = now.getMinutes()
  if (hour !== nowHour) {
    return []
  }
  return makeRange(0, nowMinute - 1)
}

const disabledSeconds = (hour: number, minute: number, role: string) => {
  if (role !== 'start') return []
  const now = new Date()
  const nowHour = now.getHours()
  const nowMinute = now.getMinutes()
  if (hour !== nowHour || minute !== nowMinute) {
    return []
  }
  const nowSecond = new Date().getSeconds()
  return makeRange(0, nowSecond - 1)
}
//#endregion
```



## 默认时间

default-time

选择日期后的默认时间值。 如未指定则默认时间值为 `00:00:00`

:default-time="new Date()" 默认当前时间