---
title: Typora主题
---

## Typora设置

### preface

用Typora很久了,最喜欢的主题是Github,一直想更改其中一些样式,参考了一些方法,今天终于修改了。

### 软件结构

Typora主题配置文件目录为`C:\Users\username\AppData\Roaming\Typora\themes`

MacOS下：

主题配置文件目录为 `~/Library/Application Support/abnerworks.Typora/themes`

图片缓存目录为 `~/Library/Application Support/typora-user-images`



针对我个人最喜欢的Github主题进行修改.

1.将**`块引用`**的左边框设置为黑色,如下所示:

> 这是一段引用

修改的样式代码:

```css
blockquote {
  background: #fff3d4; 
  border-color: #f6b73c;
  padding: 10px 10px 10px 15px;
}

#fff3d4 = rgba(255,243,212,1.0)
```

> 在修改了块引用之后,因为图片的清晰度问题,我再次修改主题.
>
> 是这样的,Typora在插入图片时图片会模糊,这时如果将图片缩放至80%,又会变得很清晰,于是我就想:能不能插入的图片默认设置缩放80%.

在[官方文档](http://support.typora.io/Images/#resize-images)中发现这样一段话

> ### 对齐图像
>
> 目前，Typora不支持图像对齐。但是您可以使用HTML代码，例如`![img](src)`在导出的HTML或PDF中对齐图像。
>
> 同样，默认情况下，如果一个段落仅包含一个图像，则它将居中对齐。它由CSS控制，可以通过[添加自定义CSS](http://support.typora.io/Add-Custom-CSS/)进行更改：
>
> ```css
> p .md-image:only-child{
>     width: auto;
>     text-align: inherit;
> }
> ```
>
> ### 调整图像大小
>
> 有关详细信息，请参见此[链接](http://support.typora.io/Resize-Image/)。

于是我在theme.css文件中添加了如下代码

```css
p .md-image:only-child{
    zoom: 80%;
    text-align: inherit;
}
```

图片的大小就默认缩放至80%了

**<span style="color:red">注意:这里我用的是zoom属性,如果用width属性,图片还是不够清晰,具体原因以后再探究.</span>**

---

做完这些以后md文件转成html上传blog又发现了问题,博客页面上的图片是不会缩放的.

问题所在:

> 修改zoom只是针对Typora的显示,但是网页端的显示是由Hexo渲染的,所以需要修改对应主题(我这里用的是Hexo next主题)的配置文件.可以参考[next主题个性化设置一文](https://siwadiya.github.io/2019/12/15/%E5%8D%9A%E5%AE%A2/next%E4%B8%BB%E9%A2%98%E8%AE%BE%E7%BD%AE/).