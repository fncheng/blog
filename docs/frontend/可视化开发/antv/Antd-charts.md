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



## line折线图小圆点

我们都知道echarts折线图默认有小圆点，antv中如何实现，设置point属性

```tsx
export default function App() {
  const config: LineConfig = {
    data,
    xField: "name",
    yField: "value",
    smooth: true,
    point: {
      size: 3,
      shape: "circle",
      style: {
        fill: "#fff",
        stroke: "rgba(0,0,0,0.25)",
        lineWidth: 1
      }
    }
  };
  return (
    <div className="App">
      <Line {...config} />
    </div>
  );
}
```

## Antd Charts图片导出

```tsx
/**
 * 返回图表的 dataURL 用于生成图片。
 * @param chart 需要获取 DataURL 的 chart 实例
 * @returns 返回图表的 dataURL
 */
export function toDataURL(chart: any) {
  const canvas = chart.getCanvas();
  const renderer = chart.renderer;
  const canvasDom = canvas.get('el');
  let dataURL = '';
  if (renderer === 'svg') {
    const clone = canvasDom.cloneNode(true);
    const svgDocType = document.implementation.createDocumentType(
      'svg',
      '-//W3C//DTD SVG 1.1//EN',
      'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'
    );
    const svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
    svgDoc.replaceChild(clone, svgDoc.documentElement);
    const svgData = new XMLSerializer().serializeToString(svgDoc);
    dataURL = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
  } else if (renderer === 'canvas') {
    dataURL = canvasDom.toDataURL('image/png');
  }
  return dataURL;
}

/**
 * 图表图片导出
 * @param chart chart 实例
 * @param name 图片名称，可选，默认名为 'G2Chart'
 */
export function downloadImage(chart: any, name: string = 'G2Chart') {
  const link = document.createElement('a');
  const renderer = chart.renderer;
  const filename = `${name}${renderer === 'svg' ? '.svg' : '.png'}`;
  const canvas = chart.getCanvas();
  canvas.get('timeline').stopAllAnimations();

  setTimeout(() => {
    const dataURL = toDataURL(chart);
    if (window.Blob && window.URL && renderer !== 'svg') {
      const arr = dataURL.split(',');
      const mime = arr[0]?.match(/:(.*?);/)?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blobObj = new Blob([u8arr], { type: mime });
      // if (window.navigator?.msSaveBlob) {
      //   window.navigator?.msSaveBlob(blobObj, filename);
      // } else {
        link.addEventListener('click', () => {
          link.download = filename;
          link.href = window.URL.createObjectURL(blobObj);
        });
      // }
    } else {
      link.addEventListener('click', () => {
        link.download = filename;
        link.href = dataURL;
      });
    }
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', false, false);
    link.dispatchEvent(e);
  }, 16);
}
```

