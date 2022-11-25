以van-tab为例，

原理是在tab下方有一个div，而不是用border配合active样式来实现

```html
<view class="tabs" bind:tap="changeTab">
  <view class="tab-item {{active==='1'&& 'active'}}" data-name="1">每日记录</view>
  <view class="tab-item {{active==='2'&& 'active'}}" data-name="2">每周记录</view>
  <view class="tab-item {{active==='3'&& 'active'}}" data-name="3">每月记录</view>
  <view class="tab-line" style="transform: translateX({{tabInstance}}px) translateX(50%); transition-duration: 0.3s;"></view>
</view>
```



```js
changeTab(e) {
    const { name } = e.target.dataset
    const tabInstance = (this.data.screenWidth / 3) * (name - 1)
    console.log('tabInstance: ', tabInstance)
    this.setData({
      active: name,
      tabInstance: tabInstance
    })
  }
```

