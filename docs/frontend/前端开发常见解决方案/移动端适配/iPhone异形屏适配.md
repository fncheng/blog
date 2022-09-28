## iPhoneX异形屏的适配



Safari给webkit新增了[四个预定义的常量](https://github.com/w3c/csswg-drafts/pull/1819)：safe-area-inset-left, safe-area-inset-right, safe-area-inset-top和 safe-area-inset-bottom

> 当我们设置viewport-fit:contain,也就是默认的时候时;设置safe-area-inset-left, safe-area-inset-right, safe-area-inset-top和 safe-area-inset-bottom等参数时不起作用的。

首先需要设置meta viewport属性

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
```



iPhone横屏显示时

未设置安全区域时显示效果是这样的：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/IMG_1421.jpeg" style="zoom:67%;" />



设置安全区域

```css
body {
  padding-top: env(safe-area-inset-top);   /* 为导航栏+状态栏的高度 88px */            
  padding-left: env(safe-area-inset-left);   /* 如果未竖屏时为0 */               
  padding-right: env(safe-area-inset-right); /* 如果未竖屏时为0 */                
  padding-bottom: env(safe-area-inset-bottom); /* 为底下圆弧的高度 34px */       
}
```



当设置了安全区域后：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/IMG_1420.jpeg"/>



两边会留白



env用法

```css
env( <custom-ident> , <declaration-value>? )
```

第一个参数是四个预定义常量中选择，第二个参数是可选参数，如果环境变量不可用，则使用该参数。

环境变量为用户代理定义的预定义值。



[Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/?hmsr=funteas.com&utm_medium=funteas.com&utm_source=funteas.com)

https://blog.csdn.net/sd19871122/article/details/80989704

[MDN CSS env](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env())





## 底部小横条适配

有这样一个需求：

当是异形屏时，底部确定按钮需要保持安全边距；当不是异形屏时，底部按钮需要8px的bottom。

可以通过[css3的max、min函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max())来实现

```css
.button {
  max(8px, env(safe-area-inset-bottom))
}
```

