[官方文档](https://www.tailwindcss.cn/docs)

[Vue-CLI 使用TailwindCSS](https://tailwindchina.com/guides/installing-tailwindcss-with-vue-cli.html#%E5%9C%A8-vue-%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AE%89%E8%A3%85-tailwindcss)



Tailwindcss 换算 4 = 1rem = 16px；1=4px=0.25rem





如果出现如下错误

```sh
Syntax Error: Error: PostCSS plugin autoprefixer requires PostCSS 8.
```



### 报错

```sh
Error: PostCSS plugin tailwindcss requires PostCSS 8.
```

需要按照**[PostCSS 7 兼容性版本](https://www.tailwindcss.cn/docs/installation#post-css-7)**





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

/* page {
  padding-left: 10rpx;
  padding-right: 10rpx;
  word-break: break-all;
} */

/* position */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fixed {
  position: fixed;
}

.block {
  display: block;
}

.inline-block {
  display: inline-block;
}

.flex {
  display: flex;
}

.grid {
  display: grid;
}

.flex-col {
  flex-direction: column;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.justify-evenly {
  justify-content: space-evenly;
}

.items-center {
  align-items: center;
}

.items-end {
  align-items: flex-end;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-auto {
  flex: 1 1 auto;
}

.flex-2 {
  flex: 2;
}

.flex-4 {
  flex: 4;
}

/* border-radius */
.rounder-md {
  border-radius: 0.25rem;
}
.rounder-lg {
  border-radius: 0.375rem;
}
.rounder-xl {
  border-radius: 0.75rem;
}
.rounder-2xl {
  border-radius: 1rem;
}
.rounded-full {
  border-radius: 9999px;
}

/* float */
.float-right {
  float: right;
}

.float-left {
  float: left;
}

/* overflow */
.overflow-hidden {
  overflow: hidden;
}

.overflow-scroll {
  overflow: scroll;
}

/* width */
.w-full {
  width: 100%;
}

.w-half {
  width: 50%;
}
.w-1-3 {
  width: 33.33%;
}
.w-4 {
  width: 1rem;
}

.w-8 {
  width: 2rem;
}

.w-16 {
  width: 4rem;
}

.w-24 {
  width: 6rem;
}

.w-28 {
  width: 7rem;
}

.w-32 {
  width: 8rem;
}

.m-w-max {
  min-width: max-content;
}

/* height */
.h-full {
  height: 100%;
}

.h-4-5 {
  height: 80%;
}

.h-10 {
  height: 2.5rem;
}

/* padding */
.pl-4 {
  padding-left: 1rem;
}
.pr-2 {
  padding-right: 0.5rem;
}
.pr-4 {
  padding-right: 1rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-2-5 {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}
.pb-4 {
  padding-bottom: 1rem;
}
/* margin */
.ml-4 {
  margin-left: 1rem;
}

.mr-4 {
  margin-right: 1rem;
}

.mr-8 {
  margin-right: 2rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mt-4 {
  margin-top: 1rem;
}
.mt-8 {
  margin-top: 2rem;
}
.mt-16 {
  margin-top: 4rem;
}

/* fontSize */
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

/* font-weight */
.font-light {
  font-weight: 300;
}

.font-normal {
  font-weight: 400;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

/* text-align */
.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

/* font-color */
.text-black {
  color: rgba(0, 0, 0, 1);
}

.text-white {
  color: rgba(255, 255, 255, 1);
}

.text-gray-500 {
  color: rgba(107, 114, 128, 1);
}

/* line-height */
.leading-loose {
  line-height: 2;
}

.leading-10 {
  line-height: 2.5rem;
}

/* cursor */
.cursor-pointer {
  cursor: pointer;
}

/* grid布局 */
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

/* gap */
.gap-x-2 {
  column-gap: 0.5rem;
}

.gap-x-4 {
  column-gap: 1rem;
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

