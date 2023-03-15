# Vite

## 处理图片

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230315153812420.png" alt="image-20230315153812420" style="zoom: 50%;" />

这是因为vite无法识别.PNG格式的文件，提示你需要在vite.config.js中配置assetsInclude字段。

```js
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.PNG']
})
```

这样设置之后便可以识别PNG文件了

## vite动态导入

我们在从vue2迁移到vue3时使用过一个api [import.meta.glob](https://fncheng.github.io/blog/frontend/vue/Vue3/%E4%BB%8Evue2%E8%BF%81%E7%A7%BB%E5%88%B0vue3.html#%E8%B7%AF%E7%94%B1%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5)来解决动态导入的问题

- `import.meta.glob`: 通过动态导入`默认懒加载`，通过遍历加 `then` 方法可拿到对应的模块文件详情信息
- `import.meta.globEager`: 直接引入所有的模块, 即静态 `import`

两种方式都支持绝对路径和相对路径导入，不支持alias等路径别名