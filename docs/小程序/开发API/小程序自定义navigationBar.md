---
title: 小程序自定义导航栏
---

## 自定义navigationBar

[具体可看这篇教程](https://www.jianshu.com/p/9822d9ee168e)

最主要的是计算出navigationBar的高度：

navigationBarHeight = （胶囊按钮.top - statusBarHeight）* 2 + 胶囊按钮.height

```html
<view class="my-navigation-bar">
  <view class="navigation-container"
    style="height:{{ navigationBarAndStatusBarHeight }}px">
    <!--空白来占位状态栏-->
    <view style="height: {{ statusBarHeight }}px"></view>
    <!--自定义导航栏-->
    <view class="navigation-bar" style="height: {{ navigationBarHeight }}px">
      <view class="navigation-buttons" style="height: {{ menuButtonHeight }}px">
        <van-icon name="arrow-left" custom-class="nav-img" bind:tap="onBack" />
        <!-- ...其余自定义button -->
      </view>
      <view class="navigation-title"
        style="line-height: {{navigationBarHeight}}px">{{title}}</view>
    </view>
  </view>

  <!--空白占位fixed空出的位置-->
  <view
    style="height: {{ navigationBarAndStatusBarHeight }};background: #ffffff">
  </view>
</view>
```

```css
.my-navigation-bar {
  height: 60px;
}

.navigation-container {
  position: fixed;
  width: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: #6278FE;
}

.navigation-bar {
  display: flex;
  align-items: center;
}

.navigation-buttons {
  width: 32px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* border: 1px solid rgba(0, 0, 0, 0.05); */
  box-sizing: border-box;
  border-radius: 15px;
  background-color: transparent;
}

.nav-img {
  height: 16px;
  width: 16px;
  color: #ffffff;
}

.navigation-title {
  position: absolute;
  left: 104px;
  right: 104px;
  /* flex: 1; */
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: '盛蕴CRM',
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight'),
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight'),
    // 胶囊按钮高度
    menuButtonHeight: wx.getStorageSync('menuButtonHeight'),
    // 导航栏和状态栏高度
    navigationBarAndStatusBarHeight:
      wx.getStorageSync('statusBarHeight') +
      wx.getStorageSync('navigationBarHeight'),
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onBack() {
      console.log('navigateBack,1')
      wx.navigateBack({
        delta: 1,
      })
    },
  },
})
```



单个页面可以在page.json中配置使用自定义的还是默认的导航栏。
