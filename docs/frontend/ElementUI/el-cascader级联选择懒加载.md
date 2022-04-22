## 级联选择器

https://element.eleme.cn/#/zh-CN/component/cascader

```vue
<el-cascader
          v-model="value"
          @change="handleChange"
          @expand-change="hanleExpandChange"
          :props="props"
        ></el-cascader>
```

每次选择的时候都会触发lazyLoad

```js
propsAddr: {
        lazy: true,
        async lazyLoad(node, resolve) {
          console.log(node, 'node')
          const { level, data } = node
          console.log('level: ', level)
          // level 0
          if (level === 0) {
            const res = await getAreaList()
            if (res.data.code === 200) {
              const nodes = res.data.data.map(item => ({
                value: item.code,
                label: item.name,
                leaf: level >= 2
              }))
              resolve(nodes)
            }
          }
        }
```

