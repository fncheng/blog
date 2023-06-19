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

