# Ant Charts

水波图

https://charts.ant.design/examples/progress-plots/liquid/#basic

```tsx
interface LiquidWrapperProps {
    percent?: number;
    title: string;
}
function LiquidWrapper({ percent, title }: LiquidWrapperProps) {
    const _percent = (percent && percent * 0.01) || 0;
    const config: LiquidConfig = {
        height: 158,
        percent: _percent,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
    };
    return (
        <>
            <span className={styles.liquidTitle}>{title}</span>
            <Liquid {...config} />
        </>
    );
}
```



## Columns堆叠柱状图label不显示

由于数据过小，导致柱状图太矮，标签不展示

```tsx
label: {
  layout: [
    // 柱形图数据标签位置自动调整
    {
        type: 'interval-adjust-position',
    }, // 数据标签防遮挡
    // {
    //     type: 'interval-hide-overlap', // 将这一段注释掉
    // }, // 数据标签文颜色自动调整
    {
        type: 'adjust-color',
    },
  ],
  // value=0时不展示标签
  formatter: (content) => (content.value === 0 ? '' : content.value),
}
```

