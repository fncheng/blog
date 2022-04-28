---
title: Lodop打印
---



## Lodop

实现打印必须要执行三个最基本的方法：

```js
LODOP.PRINT_INIT("打印任务名");               //首先一个初始化语句 
LODOP.ADD_PRINT_TEXT(0,0,100,20,"文本内容一");//然后多个ADD语句及SET语句 
LODOP.PRINT();                               //最后一个打印(或预览、维护、设计)语句
```



### 设置纸张

```js
SET_PRINT_PAGESIZE(intOrient, PageWidth,PageHeight,strPageName)
/** 
1.intOrient: 打印方向,  1---纵(正)向打印，固定纸张； 2---横向打印，固定纸张；  3---纵(正)向打印，宽度固定，高度按打印内容的高度自适应；
2.PageWidth: number | string 纸张宽度;
	字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)，如“10mm”表示10毫米。数值等于0时本参数无效。
3.PageHeight: 纸张高度
4.strPageName: 纸张类型
/
LODOP.SET_PRINT_PAGESIZE(1,'100%',"100%","A4");
```

### 超文本打印ADD_PRINT_HTM

ADD_PRINT_HTM(Top, Left, Width, Height, strHtmlContent)

>***\*名称：\****增加超文本打印项(普通模式)
>
>***\*格式：\****ADD_PRINT_HTM(Top,Left,Width,Height,strHtmlContent)
>
>***\*功能：\****增加超文本打印项，设定该打印项在纸张内的位置和区域大小，实现超文本控制打印。
>
>***\*参数：\****
>
>Top：
>
>打印项在纸张内的上边距，也就是在每张纸的上下起点位置，整数或字符型，整数时缺省长度单位为px。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)、px(1/96英寸)、%(百分比)，如“10mm”表示10毫米。
>
>Left：
>
>打印项在纸张内的左边距，也就是在每张纸的左右起点位置，整数或字符型，整数时缺省长度单位为px。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)、px(1/96英寸) 、%(百分比)，如“10mm”表示10毫米。
>
>Width：
>
>打印区域的宽度，整数或字符型，整数时缺省长度单位为px。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)、px(1/96英寸) 、%(百分比)，如“10mm”表示10毫米。本参数可以用RightMargin关键字转义为打印区域相对于纸张的“右边距”。
>
>Height：
>
>打印区域的高度，整数或字符型，整数时缺省长度单位为px。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)、px(1/96英寸) 、%(百分比)，如“10mm”表示10毫米，当内容的高度超出本参数值时，控件会自动分页，后面的内容在下一页对应位置输出。本参数可以用BottomMargin关键字转义为打印区域相对于纸张的“下边距”。
>
>strHtmlContent：
>
>超文本代码内容，字符型，未限制长度。可以是一个完整的页面超文本代码，或者是一个代码段落，也可以是[URL:web地址](URL:web地址)形式的URL地址。
>
>Lodop专有样式和属性有：
>
>●代码中若包含style="page-break-after:always"或style="page-break-before:always"，该元素称为“强制分页元素”，控件会在该元素处分页。
>
>●代码中的标签IMG如果有transcolor属性，则可以实现透明打印图片。例如属性格式为：transcolor="#FFFFFF" 表示用白色作为透明底色，这里的颜色值可以是“#”加三色16进制值组合，也可以是英文颜色名。这个专有属性再配合IMG的position: absolute可以实现“先字后章”的公章打印效果。
>
>●代码中的元素如果包含borderthin属性，如果属性值等于true,则该元素的border在合并单元格时会采用***\*单细线\****模式。
>
>***\*结果\****：无
>
>***\*建议或要求：\****
>
>要求在打印初始化后使用，建议在画线类函数之后调用。注意“强制分页元素”要符合xhtml规范，建议用跨整行的元素，内容不能空，内容可以是“ ”。强制分页符对其它Lodop函数无效，仅适用本函数。
>
>***\*举例一：\****LODOP.ADD_PRINT_HTM(0,0, 300,100,"<hr><font size=5>hello </font>");  
>
>***\*举例二：\****LODOP.ADD_PRINT_HTM("10%",0, "100%","80%","URL:http://www.baidu.com");  
>
>***\*举例三：\****LODOP.ADD_PRINT_HTM("5mm",34,"RightMargin:0.9cm","BottomMargin:9mm",
>
>document.documentElement.innerHTML);



## Lodop打印设置

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/20220421145329.png" style="zoom:67%;" />

数据测试就是模拟数据，最外层为data



VUE模板代码 即写html代码
