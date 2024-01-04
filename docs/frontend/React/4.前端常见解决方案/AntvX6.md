# X6

## 画布缩放

```tsx
graph = new Graph({
                container: refContainer.current,
                background: {
                    color: "#F2F7FA",
                },
                // 网格
                grid: {
                    visible: true,
                },
  // 拖动
                panning: {
                    enabled: true,
                },
  // 缩放
                mousewheel: {
                    enabled: true,
                },
            });
						// 开启对齐线插件
            graph.use(
                new Snapline({
                    enabled: true,
                })
            );
            graph.fromJSON(nodeData); // 渲染元素
            graph.centerContent(); // 居中显示
```



## 绘制矩形

鼠标按下时开始绘制，松开结束绘制，矩形的长度和宽度为鼠标移动的距离

```tsx
let rectNode1: Node;
            let startPoint: any;
            graph.on("blank:mousedown", (e) => {
                console.log("e", e);
                startPoint = { x: e.x, y: e.y };
                rectNode1 = graph.addNode({
                    shape: "rect",
                    width: 0,
                    height: 0,
                    x: startPoint.x,
                    y: startPoint.y,
                    zIndex: 0,
                    attrs: {
                        body: {
                            fill: "#d7d7",
                            stroke: "#d7d7",
                            strokeWidth: 2,
                        },
                    },
                });
            });
            graph.on("blank:mousemove", (e) => {
                if (rectNode1) {
                    const width = e.x - startPoint.x;
                    const height = e.y - startPoint.y;
                    rectNode1.size(width, height);
                }
            });
```



