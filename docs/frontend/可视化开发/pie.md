## 饼图

##### 1. 高亮扇区样式

[series-pie.emphasis](https://echarts.apache.org/zh/option.html#series-pie.emphasis)

```js
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: '40',
      //     fontWeight: 'bold'
      //   }
      // },
```



[series-pie.emphasis.scale](https://echarts.apache.org/zh/option.html#series-pie.emphasis.scale)  高亮时禁用扇区放大效果

[color](https://echarts.apache.org/zh/option.html#color) ：修改饼图扇区颜色

##### 2. 设置legend图例和文字的位置

[legend.align](https://echarts.apache.org/zh/option.html#legend.align)

图例标记和文本的对齐。默认自动，根据组件的位置和 orient 决定，当组件的 [left](https://echarts.apache.org/zh/option.html#legend.left) 值为 `'right'` 以及纵向布局（[orient](https://echarts.apache.org/zh/option.html#legend.orient) 为 `'vertical'`）的时候为右对齐，即为 `'right'`。



##### 3. 饼图中间添加文字

```js
graphic: {
   type:"text",
   left:"center",
   top:"45%",
   style:{
       text:"运动达标率",
       textAlign:"center",
       // fill:"#333",
       fontSize:20,
       fontWeight:700
   }
},
```

##### 4. 移动饼图

[series-pie.center](https://echarts.apache.org/zh/option.html#series-pie.center)  

饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。

支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。

##### 4. 饼图过小，设置占满容器

设置series.radius即可

```js
radius: ['70%', '100%']
```



##### 5. 饼图视觉引导线

[series-pie.labelLine](https://echarts.apache.org/zh/option.html#series-pie.labelLine)



##### 6. 饼图tooltip显示百分比

[tooltip.formatter](https://echarts.apache.org/zh/option.html#tooltip.formatter)

```js
option = {
  title: {
    text: '',
    subtext: '',
    left: '5%',
    top: '5%'
  },
  color: ['#49B6FF', '#FF7B8F', '#FB8F67', '#48D4BB'],
  tooltip: {
    trigger: 'item',
    formatter(params){
        console.log('params:',params)
        return `${params.seriesName}<br />${params.marker}${params.data.name} ${params.data.value} ${params.percent}%`
    }
    // formatter: '{d}%'
  },
  legend: {
    orient: 'vertical',
    top: 'middle',
    right: '15%',
    icon: 'pin',
    formatter(name) {
      let singleData = pieData.filter((item) => item.name === name)
      return name + '  ' + singleData[0].value
    },
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '50%',
      center: ['35%', '50%'],
      label:{
        show:false  
      },
      labelLine:{
          show:false
      },
      data: [
        { value: 1048, name: '门急诊' },
        { value: 735, name: '住院' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
```

tootip params:

![image-20210915001339026](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20210915001339026.png)

param.marker 小圆圈图标

param.data 原始数据

param.name x轴值

param.value 传入的数据值

param.percent 百分比



##### 7.饼图数据过小时百分比会显示为0

series.pie.label.formatter

打印param

<img src="/Users/cheng/Library/Application Support/typora-user-images/image-20210926161734449.png" alt="image-20210926161734449" style="zoom:67%;" />

可以看出value=22，而percent=0

解决办法：

```js
formatter(param) {
  if (Number(param.value) && Number(param.percent)) {
    return `${param.percent}%`
  } else return ''
}
```



饼图legend带数据

1.option中设置

```js
option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center',
    data:['Search Engine','Direct'],
    formatter(name){
      let singleData = option.series[0].data.filter((item) => item.name === name)
    if (singleData.length > 0) {
          return name + '  ' + singleData[0].value
     } else return name
    }
  },
}
```



2.手动设置

```js
this.extend.legend.formatter = (name) => {
        let singleData = this.surgeryTypeChartData.rows.filter((item) => item.name === name)
  if (singleData.length > 0) {
    return name + '  ' + singleData[0].value
  } else return name
}
```

