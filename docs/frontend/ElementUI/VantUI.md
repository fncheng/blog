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



### van-tabs

**组件从隐藏状态切换到显示状态时，底部条位置错误？**

使用wx:if 后底部条位置还是错乱，这是因为需要绑定active属性

```vue
<van-tabs id="tabs" wx:if="{{ active !== 0 }}" active="{{ activeTab2 }}" bind:change="onChangeTab2"
    custom-class="tabs-bar">
    <van-tab title="客户信息"></van-tab>
    <van-tab wx:if="{{ active === 1 || active === 2 }}" title="潜力信息"></van-tab>
    <van-tab wx:if="{{ active === 1 }}" title="医院信息"></van-tab>
  </van-tabs>
```

