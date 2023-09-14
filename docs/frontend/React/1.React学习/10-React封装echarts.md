## React封装ECharts

第一种方法

```tsx
import React, { useEffect, useRef } from 'react';
import echarts, { ECharts } from 'echarts';

interface PieChartProps {
  data: any;
  option: any;
}

const PieChart: React.FC<PieChartProps> = ({ data, option }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<ECharts | null>(null);

  useEffect(() => {
    if (!chart.current) {
      chart.current = echarts.init(chartRef.current!);
    }

    const resizeListener = () => {
      chart.current!.resize();
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      if (chart.current) {
        chart.current.dispose();
      }

      window.removeEventListener('resize', resizeListener);
    };
  }, []); // 第一个 useEffect 仅在组件挂载时初始化图表

  useEffect(() => {
    if (chart.current) {
      chart.current.setOption(option);
    }
  }, [data, option]); // 第二个 useEffect 用于更新图表数据和配置

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }}></div>;
};

export default PieChart;
```





第二种方法

```tsx
var chart: echarts.ECharts;
const PieChart = ({ data, option }) => {
  const node = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
        chart = echarts.init(node.current);
        const listener = () => {
            chart.resize();
        };
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
            chart.dispose();
        };
    }, []);

    useEffect(() => {
        chart.setOption(option);
    }, [data]);
    return <div style={{ width: '100%', height: '100%' }} ref={node}></div>;
}
```

使用了两个 `useEffect` 钩子，一个用于初始化和清理图表实例，另一个用于在 `data` 属性变化时更新图表数据和配置。

