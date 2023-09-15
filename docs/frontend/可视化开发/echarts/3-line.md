## 折线图

### 双y轴设置

yAxis设置为数组-对象，series.yAxisIndex指定哪个轴

```js
option = {
    tooltip: {
        trigger: 'axis'
    },
    legend:{
        data:['治愈好转人次','好转率']
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [{
        type: 'value',
        position:'left'
    },{
        type:'value',
        position:'right'
    }],
    series: [{
        name:'治愈好转人次',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        yAxisIndex:0, // y轴第一个,通过这个判断左右
        smooth: true
    },
    {   name: '好转率',
        data: [100, 200, 300, 323, 1622, 1322, 788],
        type: 'line',
        yAxisIndex:1, // y轴第二个
        smooth: true
    }
    ]
};
```

当x轴为time时间时，刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。

```ts
option = {
  legend: {
    data: ['image总数','当天新增image数']
  },
  xAxis: {
    type: 'time'
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: [
    {
      type: 'value',
      position: 'left'
    },
    {
      type: 'value',
      position: 'right'
    }
  ],
  series: [
    {
      name: 'image总数',
      data: [
        ['2023-08-20', 8],
        ['2023-08-21', 10],
        ['2023-08-22', 18],
        ['2023-08-23', 23],
        ['2023-08-24', 32]
      ],
      type: 'line',
      yAxisIndex: 0, // y轴第一个,通过这个判断左右
      smooth: true
    },
    {
      name: '当天新增image数',
      data: [
        ['2023-08-20', 88],
        ['2023-08-21', 132],
        ['2023-08-22', 256],
        ['2023-08-23', 333],
        ['2023-08-24', 248]
      ],
      type: 'line',
      yAxisIndex: 1, // y轴第二个
      smooth: true
    }
  ]
};
```



### Y坐标轴显示对应名称

设置好name即可

```tsx
yAxis: [{
        name: '治愈好转人次',
        type: 'value',
        position:'left',
    },{
        name: '好转率',
        type:'value',
        position:'right',
    }],
```



### 坐标轴改成百分比%

[yAxis.axisLabel.formatter](https://echarts.apache.org/zh/option.html#yAxis.axisLabel.formatter)

```js
// 使用字符串模板，模板变量为刻度默认标签 {value}
formatter: '{value} kg'
// 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
formatter: function (value, index) {
    return value + 'kg';
}
```



### 坐标轴添加单位

[yAxis.name](https://echarts.apache.org/zh/option.html#yAxis.name)



## line折线图鼠标移动时x轴一条竖线

在 Echarts 中实现鼠标移动时默认显示一条竖线，可以通过在 `tooltip` 属性中设置 `trigger: 'axis'`，再为 `axisPointer` 属性设置 `type: 'line'`，来实现默认显示一条竖线。代码如下：

```js
tooltip: {
  trigger: 'axis',
  axisPointer: {
    type: 'line', // 设置触发类型为竖线
    lineStyle: { // 设置竖线样式
      color: '#F00', // 修改竖线颜色为红色
      type: 'solid', // 修改竖线类型为实线
    },
  },
},
```

