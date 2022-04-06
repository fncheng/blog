### Canvas 绘制图片

### [drawImage](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage#%E4%BD%BF%E7%94%A8_drawimage_%E6%96%B9%E6%B3%95)

- **image** 绘制到上下文的元素。

- **sx** 需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的左上角 X 轴坐标。

- **sy** 需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的左上角 Y 轴坐标。

- dx image左上角在canvas上X轴的坐标

- dy

- **dw** 即dWidth `image`在目标canvas上绘制的宽度

  允许对绘制的`image`进行缩放。 如果不说明， 在绘制时`image`宽度不会缩放。

- **dh** 即dHeight `image`在目标canvas上绘制的高度

  允许对绘制的`image`进行缩放。 如果不说明， 在绘制时`image`高度不会缩放。

![](https://mdn.mozillademos.org/files/225/Canvas_drawimage.jpg)

#### drawImage的方法有三种情况

1.三个参数

```js
// drawImage(image: CanvasImageSource, dx: number, dy: number): void

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
ctx.drawImage(image, dx, dy)
```

2.五个参数

```js
// drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void
ctx.drawImage(image, dx, dy, dw, dh)
```

3.9个参数(用于切片)，通俗的说就是将图片进行特定裁剪然后放到指定的位置

```js
// drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) 
```



##### 已有图片，将img标签中的图片绘制到canvas中

```js
const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 227;
if (!canvas.getContext) {
  console.log("不支持canvas");
}
const ctx = canvas.getContext("2d");
// 获取图片元素
let img = document.querySelector("img");
document.body.appendChild(canvas);

img.onload = () => {
  ctx.drawImage(img, 0, 0);
};
```



##### 从零开始创建图片

```js
let img = document.createElement("img"); // 创建img元素
        img.classList.add("obj");
        img.file = selectedFile;


const canvas = document.createElement("canvas");
if (!canvas.getContext) {
	console.log("不支持canvas");
}
const ctx = canvas.getContext("2d");
img.onload = () => {
  ctx.drawImage(img, 0, 0); // 绘制图片
};
preview.appendChild(canvas);
```



三：根据上面drawImage参数的三种情况，我们来分别实现，看看效果

1：ctx.drawImage(image,dx,dy)：将原始图片绘制到canvas中

```js
img.onload = () => {
  ctx.drawImage(img, 0, 0); // 原始大小绘制图片
};
```

2：ctx.drawImage(image,dx,dy,dw,dh)：给图片设置大小绘制到canvas中

```js
img.onload = () => {
  ctx.drawImage(img, 0, 0, 320, 160); // 设置图片大小绘制图片
};
```

3:ctx.drawImage(image,sx, sy, sw, sh, dx, dy, dw, dh)：切片，将图片进行特定裁剪然后放到指定的位置

```js
img.onload = () => {
  ctx.drawImage(img, 0, 0, 320, 160, 10, 10, 200, 250); // 设置图片大小绘制图片
};
```



关于ctx.drawImage(img, 0, 0) 画出来的图是300\*150大小的，这是因为**canvas的默认画布大小为300×150**。

设置画布大小

```js
const canvas = document.createElement("canvas");
canvas.width = 300; // 设置画布宽度
canvas.height = 227; // 设置画布高度
if (!canvas.getContext) {
  console.log("不支持canvas");
}
const ctx = canvas.getContext("2d");
//创建图片
let img = document.querySelector("img");
img.onload = () => {
  ctx.drawImage(img, 0, 0);
};
document.body.appendChild(canvas);
```





### 将canvas输出为image

1.图片无法绘制，转成的base64 用浏览器打开是空的透明画布

原因是图片还没加载完就输出了

将canvas.toDataURL("image/png");  写在img.onload内后又报错

```js
Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
```

大概意思是**canvas无法执行toDataURL方法：污染的画布无法输出**

受限于 CORS 策略，会存在跨域问题



```js
/** @format */

const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 227;
if (!canvas.getContext) {
  console.log("不支持canvas");
}
/**
 * 原图2560*1440
 */
const toWidth = 1920;
const toHeight = (1920 / 2560) * 1440;
canvas.width = toWidth;
canvas.height = toHeight;
const ctx = canvas.getContext("2d");
//创建图片
let img = document.querySelector("img");
document.body.appendChild(canvas);

// img.setAttribute("crossOrigin", "Anonymous");
img.onload = () => {
  ctx.drawImage(img, 0, 0, toWidth, toHeight);
  const dataURL = canvas.toDataURL("image/png");

  const img1 = new Image();
  img1.src = dataURL;
  img1.width = 160;
  document.body.append(img1);
};
```

