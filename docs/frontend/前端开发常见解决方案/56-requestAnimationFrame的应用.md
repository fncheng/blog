## requestAnimationFrame和requestIdleCallback以及setTimeout

| 特性       | requestAnimationFrame                       | requestIdleCallback            | setTimeout                |
| ---------- | ------------------------------------------- | ------------------------------ | ------------------------- |
| 执行时机   | 下一帧渲染前（与绘制同步）                  | 浏览器空闲时（或超时后）       | 指定延迟后（宏任务）      |
| 用途       | 动画、读取稳定布局（getBoundingClientRect） | 后台/闲时任务，低优先级工作    | 任意延时/回退/防抖        |
| 精准性     | 高（与帧同步）                              | 低（由浏览器决定）             | 取决于浏览器/标签页可见性 |
| 阻塞渲染？ | 否（在绘制前执行短任务可影响帧率）          | 否（空闲时执行）               | 可能（如果回调执行耗时）  |
| 取消方法   | cancelAnimationFrame(id)                    | cancelIdleCallback(id)         | clearTimeout(id)          |
| 浏览器支持 | 广泛                                        | 支持不均（Safari 需 polyfill） | 全浏览器支持              |

## requestAnimationFrame

场景：帧动画、平滑过渡、需要读取元素最新布局（`getBoundingClientRect()`）并基于此做渲染决策。

## requestIdleCallback

- 场景：预加载数据、统计、日志上报、非关键 DOM 检测（比如延迟展示不影响 UX 的 tooltip）、大批量 DOM 操作可拆成多段等。
- 优点：浏览器忙时不会运行，能避免影响主线程性能；支持 timeout 作为兜底。
- 缺点：跨浏览器支持不一（Safari 不支持），回调执行时间不可保证（可能被无限延后直到浏览器空闲）。

## setTimeout

场景：简单的防抖（debounce）、超时兜底、兼容环境下做 fallback、在页不可见时仍需要按时执行（注意有浏览器 throttle）。

优点：简单、跨浏览器、可设任意延时。

缺点：无法与渲染同步、精度受限（最小延时规则）、当页面不可见/后台标签页会被节流（可能 1000ms+）。