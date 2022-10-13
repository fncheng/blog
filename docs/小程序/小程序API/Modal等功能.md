### 界面交互

#### wx.showModal

```js
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```



#### [wx.showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html)



#### [wx.showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)

**以 [Promise 风格](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html#异步-API-返回-Promise) 调用**：支持

```js
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
```



<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20211130105643937.png" alt="image-20211130105643937" style="zoom:80%;" />

#### [wx.showActionSheet](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html)

```js
wx.showActionSheet({
  itemList: ['A', 'B', 'C'],
  success (res) {
    console.log(res.tapIndex)
  },
  fail (res) {
    console.log(res.errMsg)
  }
})
```



<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20211130135121092.png" alt="image-20211130135121092" style="zoom:80%;" />



### 数据存储

