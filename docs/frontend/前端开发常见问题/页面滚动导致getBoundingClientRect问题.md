## 页面滚动导致getBoundingClientRect问题

页面滚动到底部，再跳转至一个新的页面，新的页面会使用getBoundingClientRect计算元素的top值，但是发现计算出来的top值居然是负值，而且是个很大的数字

问了gpt，说是原因可能如下：

1. **异步布局计算：** 当你滚动到页面底部时，可能触发了一些异步的布局计算或动画效果，导致页面元素的位置信息在你跳转到第二个页面时尚未稳定。这可能会影响 `getBoundingClientRect` 返回的值。
2. **页面滚动的持久性：** 页面的滚动位置在跳转到新页面后并不会被自动重置。如果你在第一个页面底部滚动，然后跳转到第二个页面，第二个页面仍然会保留滚动位置。这可能导致获取的元素位置信息相对于新页面视口的顶部有一定的偏移。

分析了下应该是

于是我在进入页面时，手动设置scrollTo(0,0)

