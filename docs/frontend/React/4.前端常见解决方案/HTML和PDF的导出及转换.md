# 方案一：前端生成pdf

## PDF导出

@react-pdf/renderer

[html2pdf](https://github.com/eKoopmans/html2pdf.js)



## HTML导出



## html2pdf

### 导出pdf

```tsx
const opt = {
              margin: 12,
              filename: `${new Date().getTime()}.pdf`,
              image: { type: "jpeg", quality: 1 },
              html2canvas: { scale: 2, allowTaint: true },
              pagebreak: { mode: "avoid-all", after: ".avoidThisRow" }, // 智能分页，防止图片被截断
              enableLinks: true // 支持文本中放链接，可点击跳转
            };
const ele = document.getElementById("app");
html2pdf(ele, opt);
```

其中需要注意的是使用npm包引入的方式使用html2odf会导致报错

解决方法：

可以在index.html模板文件中通过CDN引入后挂载到window上来使用

### 将JSX Element导出

将JSX转成html字符串后通过html2pdf导出

```tsx
import ReactDOMServer from 'react-dom/server';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import './App.css';

function App() {
  const pdfJSX = () => {
    return (
      <>
        <h1>JSX to PDF Convert Example</h1>
        <h2>Hello React</h2> 
      </>
    )
  }

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(pdfJSX());
    // const printElement = pdfJSX();

    html2pdf().from(printElement).save();
  }

  return (
    <div className="App">
      <button onClick={printHandler}>Print</button>
    </div>
  );
}

export default App;
```

这个方案对于导出带图表的html来说不可行



参考：

[Converting JSX to downloadable pdf in react](https://dev.to/kazmi066/converting-jsx-to-downloadable-pdf-in-react-20bh)



# 方案二：后端生成pdf