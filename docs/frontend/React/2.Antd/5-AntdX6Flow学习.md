# Antd X6

## node和edge的关系

在 Antd x6 中，node（节点）代表图表中的一个具体元素，而 edge（边）代表节点之间的连接关系。节点可以是任何类型的元素，例如图片、文本或自定义的 React 组件。边则用于描述节点之间的连接方式，例如直线、曲线或箭头等。

```tsx
export default class Example extends React.Component {
  private container: HTMLDivElement;

  componentDidMount() {
    const graph = new Graph({
      container: this.container,
      width: 600,
      height: 400,
      // 设置画布背景颜色
      background: {
        color: '#F2F7FA'
      }
    });

    graph.fromJSON(data); // 渲染元素
    graph.centerContent(); // 居中显示
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container;
  };

  render() {
    return (
      <div className="helloworld-app">
        <div className="app-content" ref={this.refContainer} />
      </div>
    );
  }
}
```

grid

```ts
grid?: boolean | number | (Partial<GridManager.CommonOptions> & GridManager.DrawGridOptions);

grid: {
  size: 10,
  visible: true
}
```

grid用来配置网格

### [snapline](https://x6.antv.vision/zh/docs/api/graph/snapline)

对齐线

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230726142232020.png" alt="image-20230726142232020" style="zoom:50%;" />

### panning

平移功能

> #### 注意
>
> 不要同时使用 `scroller` 和 `panning`，因为两种形式在交互上有冲突。

### [MouseWheel](https://x6.antv.vision/zh/docs/api/graph/mousewheel)

```ts
export declare namespace MouseWheel {
    interface Options {
        enabled?: boolean;
        global?: boolean;
        factor?: number;
        minScale?: number; // 最小放大倍数
        maxScale?: number; // 最大放大倍数
        modifiers?: string | ModifierKey[] | null;
        guard?: (e: WheelEvent) => boolean;
        zoomAtMousePosition?: boolean;
    }
}
```



```ts
mousewheel: {
        enabled: true,
        minScale: 0.2,
        maxScale: 4,
        modifiers: ['ctrl', 'meta']
      },
```

