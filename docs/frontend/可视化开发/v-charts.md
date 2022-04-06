[doc](https://v-charts.js.org/#/)

v-charts 的数据由指标和维度组成。

指标即y轴，维度即x轴



图表的 setting 属性中统一有两个配置：

- dimension 用于指定维度
- metrics 用于指定指标



## chartData

### Columns

维度，x轴 

- 默认columns第一项为维度
- 默认columns第二项起为指标

rows

指标，y轴





v-chart pie legend后跟数据

> 设置legend.formatter

```vue
<template>
  <ve-ring :data="chartData" :settings="chartSettings" :extend="extend"></ve-ring>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        dimension: 'name',
        metrics: 'value',
      }
      this.extend = {
        legend: {
          show: true,
        }
      }
      return {
        chartData: {
          columns: ['name', 'value'],
          rows: [
            { 'name': '1/1', 'value': 1393 },
            { 'name': '1/2', 'value': 3530 },
            { 'name': '1/3', 'value': 2923 },
            { 'name': '1/4', 'value': 1723 },
            { 'name': '1/5', 'value': 3792 },
            { 'name': '1/6', 'value': 4593 }
          ]
        }
      }
    },
    created(){
      console.log('this.chartData',this.chartData)
      this.extend.legend.formatter = (name) => {
        console.log('name',name)
      	let singleData = this.chartData.rows.filter((item) =>
        	(item.name === name)
        )
          console.log('sigleData: ', singleData)
          return name + '  ' + singleData[0].value
      }
    }
  }
</script>
```

