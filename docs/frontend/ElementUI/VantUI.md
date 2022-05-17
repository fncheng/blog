---
title: VantUI常见问题
---

### DropdownMenu



### Van-uploader

[codesandbox](https://codesandbox.io/s/vant-issue-moban-forked-n6k54?file=/src/App.vue)

Van-uploader **after-read**方法在文件读取完毕后触发，多张图片上传也只会触发一次。



### van-search

本质上是input，可以使用 model:value 双向绑定

```vue
<view>
  <van-search class="w-full" use-left-icon-slot="{{ true }}"
    use-right-icon-slot="{{true}}" model:value="{{ searchString }}"
    placeholder="搜索（医生、医院）" bind:search="onChangeSearch">
    <van-icon slot="right-icon" name="search" />
  </van-search>
</view>
```

