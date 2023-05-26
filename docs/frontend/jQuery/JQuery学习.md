---
title: JQuery学习
tags:
- JavaScript
- JQuery
---

## 导入jQuery

1. 官网下载jQuery文件

2. 通过cdn导入jQuery

   - **[官方cdn](https://code.jquery.com/)**

     **jQuery 1.x:**

     `<script   src="https://code.jquery.com/jquery-1.12.4.js"   integrity="sha256-Qw82+bXyGq6MydymqBxNPYTaUXXq7c8v3CwiYwLLNXU="   crossorigin="anonymous"></script>`

   - **[Google cdn](https://developers.google.com/speed/libraries#jquery)**

     **3.x snippet:**

     `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>`

     **2.x snippet:**

     `<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>`

     **1.x snippet:**

     `<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>`

   - **[Boot cdn](https://www.bootcdn.cn/jquery/)**

     **版本:1.12.4**

     ```html
     <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.js"></script>
     ```

## 文档就绪事件

将 jQuery 函数位于一个 document ready 函数中： 

这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码。

如果在文档没有完全加载之前就运行函数，操作可能失败。

```js
 $(document).ready(function(){
   // 开始写 jQuery 代码...
 }); 
```

```js
 $(function(){
   // 开始写 jQuery 代码...
 }); 
```

以上两种写法等效

JQuery语法:

<article style="color:blue;font-weight:700">$("触发对象").触发条件(function () {<br>
    <div style="text-indent:2rem">$("要操作的对象,CSS选择符写法").要操作的方法(参数);</div>
})</article>

例如:

<article style="color:red;font-weight:700">$("#btn").click(function () {<br>
    <div style="text-indent:2rem">$(".container").append("divclass="box">1\div>");</div>
})</article>

例如:

```js
$("#btn").click(function () {
    $(".container").append("<div class=\"box\">1</div>");
})
```

### jQuery 捕获

#### jQuery DOM 操作

**text()**类似于原生js的**innerText**

**html()**类似于原生js的**innerHTML**

#### 获取属性 - attr()

jQuery attr() 方法用于获取属性值。

```js
$("button").click(function(){
  alert($("#w3s").attr("href"));
});
```





jquery对象和dom对象的转换

```js
const div = $('.box') // jquery对象
const div = $('.box')[0] // dom对象
// 等效于
const div = document.querySelector('.box')
```





### jquery正则匹配

https://www.jianshu.com/p/d954529d4c14
