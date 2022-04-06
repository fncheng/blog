## 折线图

### 双y轴设置

yAxis设置为数组-对象，series.yAxisIndex指定哪个轴

```js
option = {
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



##### 坐标轴改成百分比%

[yAxis.axisLabel.formatter](https://echarts.apache.org/zh/option.html#yAxis.axisLabel.formatter)

```js
// 使用字符串模板，模板变量为刻度默认标签 {value}
formatter: '{value} kg'
// 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
formatter: function (value, index) {
    return value + 'kg';
}
```



##### 坐标轴添加单位

[yAxis.name](https://echarts.apache.org/zh/option.html#yAxis.name)
