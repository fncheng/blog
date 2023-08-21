## 柱状图

- 设置柱子颜色： [series-pie.data.itemStyle.color](https://echarts.apache.org/zh/option.html#series-pie.data.itemStyle.color)
- x轴坐标文字 45度斜着显示 [xAxis.axisLabel.rotate](https://echarts.apache.org/zh/option.html#xAxis.axisLabel.rotate) number
- 设置柱状图条柱的宽度：[series-bar.barWidth](https://echarts.apache.org/zh/option.html#series-bar.barWidth)、barMaxWidth、barMinWidth



##### 1. 设置横向柱状图

- **柱状图的横向与纵向的设置与x轴和y轴的设置有关。**
- **将柱状图从纵向改成横向显示，只需要交换xAxis和yAxis中的设置即可。**

```js
yAxis: {
  data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
},
xAxis: {},
series: [
  {
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }
]
```



##### 2. x轴标签label换行显示

当x轴标签超过一定长度时会导致该列标签不显示，可以设置换行。

[xAxis.axisLabel.formatter](https://echarts.apache.org/zh/option.html#xAxis.axisLabel.formatter)

```js
axisLabel: {
  formatter: function(val, index) {
    const XLABEL_LENGTH = 6 // 每行显示字数
    if (val.length > XLABEL_LENGTH) {
      let arr = val.split('')
      arr.splice(XLABEL_LENGTH, 0, '\n')
      let res = arr.join('')
      return res
    } else return val
  }
},
```



##### 3. 柱状图series.data 可以按照{name, value}的格式来设置

```js
option = {
    xAxis: {
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [
            { name:'Mon',value: 120},{name:'Tue',value:200}
            ],
        // data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
};
```



##### 4. 强制显示所有x轴标签

[xAxis.axisLabel.interval](https://echarts.apache.org/zh/option.html#xAxis.axisLabel.interval) = 0

坐标轴刻度标签的显示间隔，在类目轴中有效。

默认会采用标签不重叠的策略间隔显示标签。

可以设置成 0 强制显示所有标签。

如果设置为 `1`，表示『隔一个标签显示一个标签』，如果值为 `2`，表示隔两个标签显示一个标签，以此类推。



##### 5.柱状图显示数据

 [series-bar.label](https://echarts.apache.org/zh/option.html#series-bar.label)

```js
label: {
        show: true,
        position: 'top'
      },
```

