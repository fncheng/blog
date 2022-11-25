https://zhuanlan.zhihu.com/p/68563760

## 设备像素、设备独立像素和屏幕密度

- **设备像素** / 设备物理像素

  指设备物理像素

  比如Pro13 设备像素2560 × 1600  ( 2k屏 )

- **设备独立像素** / 设备显示像素

  显示器缩放后的像素

  在 175% 缩放下，设备独立像素,通过window.screen.width/ window.screen.height 查看，为 1463 × 915 刚好与2560 × 1600 是 1: 1.75 的关系。===>  1个设备独立像素对应 1.75 个设备像素，即1显示1.75

- 屏幕密度

  设备像素 / 设备独立像素 = 屏幕密度

  一般像1920*1080的Windows笔记本电脑缩放100%时的屏幕密度就是1，

  2k（2560✖️1600）屏的笔记本缩放为200%时，设备独立像素就是1280✖️800，此时屏幕密度为2

- **innerWidth和innerHeight 窗口尺寸** => 视口宽高

  前提条件: 浏览器默认缩放比时

  Windows缩放为100%时,Pro13 浏览器 innerWidth是2560,正好对应设备像素，而当缩放为175%时，innerWidth是1463，1 innerWidth = 1.75 设备像素

  innerWidth实际上是浏览器窗口的宽度，screen.width是设备的窗口宽度。

> 一般我们常用的px 用于表示显示像素

在小程序中，比如iPhone6的显示像素是`375*667` px，而iPhone6的物理像素是`750*1334`px，dpr=2 即屏幕密度。



### offsetWidth、clientWidth

**`Element.clientWidth`** 元素的内部宽度 （不包括border）

**`offsetWidth`** 元素布局宽度 （包括border）

> offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。

offsetWidth即元素的宽度

### offsetLeft、 offsetTop

分别表示当前元素相对于其 [offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 元素的顶部内边距左边、上边的距离。

offsetParent通常是指body。



### 显示器缩放比与浏览器缩放时的开发

2560*1440 分辨率的屏幕 ( 比如13.3寸MacBook ) 一般使用时都是缩放至 1440\*900，开发时浏览器的像素就是1440\*900，此时将浏览器缩放至75%，浏览器的宽高就变成了1920\*1080了。



## 图片响应式

img标签的sizes属性和srcset属性

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

**srcset**定义了我们允许浏览器选择的图像集，以及每个图像的大小。在每个逗号之前，我们写：

1. 一个**文件名** (`elva-fairy-480w.jpg`.)
2. 一个空格
3. **图像的固有宽度**（以像素为单位）（480w）——注意到这里使用`w`单位，而不是你预计的`px`。这是图像的真实大小，可以通过检查你电脑上的图片文件找到（例如，在Mac上，你可以在Finder上选择这个图像，然后按 Cmd + I 来显示信息）。

**sizes**定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择—我们在之前已经讨论了一些提示。在这种情况下，在每个逗号之前，我们写：

1. 一个**媒体条件**（`(max-width:480px)`）——你会在 [CSS topic](https://developer.mozilla.org/en-US/docs/Learn/CSS)中学到更多的。但是现在我们仅仅讨论的是媒体条件描述了屏幕可能处于的状态。在这里，我们说“当可视窗口的宽度是480像素或更少”。
2. 一个空格
3. 当媒体条件为真时，图像将填充的**槽的宽度**（`440px`）