---
title: TailWindCSS
---



[官方文档](https://www.tailwindcss.cn/docs)

[Vue-CLI 使用TailwindCSS](https://tailwindchina.com/guides/installing-tailwindcss-with-vue-cli.html#%E5%9C%A8-vue-%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AE%89%E8%A3%85-tailwindcss)



Tailwindcss 换算 4 = 1rem = 16px；1=4px=0.25rem

## tailwind固定height

如果我想实现高度70px

```html
<div class="h-[70px]">
  <!-- ... -->
</div>
```



## postcss项目使用tailwindcss2

如果出现如下错误

```sh
Syntax Error: Error: PostCSS plugin autoprefixer requires PostCSS 8.
```

### 报错

```sh
Error: PostCSS plugin tailwindcss requires PostCSS 8.
```

需要按照**[PostCSS 7 兼容性版本](https://www.tailwindcss.cn/docs/installation#post-css-7)**

```sh
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

```js
module.exports = {
  purge: ['src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
```





## 



### util

适用于小程序

```css
/**app.wxss**/
@import "./assets/iconfont.wxss";
@import "./mixin";

page,
view,
text {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

page {
  padding-left: 10rpx;
  padding-right: 10rpx;
  padding-bottom: env(safe-area-inset-bottom);
}
```



### grid布局

```css
/* grid布局 */
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.gap-x-2 {
  column-gap: 0.5rem;
}

.gap-x-4 {
  column-gap: 1rem;
}
```

