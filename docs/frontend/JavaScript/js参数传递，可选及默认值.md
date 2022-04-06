####  文件下载

header中的Content-Disposition

```js
Response.AppendHeader("Content-Disposition","attachment;filename=FileName.txt"); 
```



#### nginx配置

https://blog.csdn.net/u011519550/article/details/104419016

```nginx
location ~ ^/file  {
    if ($request_filename ~* ^.*?\.(txt|doc|pdf)$){
            add_header Content-Disposition: 'attachment';
            add_header  Content-Type application/octet-stream;
    }        
    root /home/wangjinyu;
```



## js参数传递，可选及默认值

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)关于默认参数值的定义：

> **函数默认参数**允许在没有值或`undefined`被传入时使用默认形参。

在传递参数时，我们可以给参数设置一个默认值，因而当调用函数时，如果该参数没有值，则为默认值。

参数传递的顺序问题

```js
function fn(a, b, c = false, d = 1) {
  console.log(a, b, c, d)
}
fn(1, undefined, undefined, 3)
```

参数默认按定义的顺序传入，如果不够时，后面的会自动省略。

如果要省略中间的...需要自己传入`undefined`。

> null表示"没有对象"，即该处不应该有值。
> undefined表示"缺少值"，就是此处本应有值，但是还没有定义。

当参数较多时，可以使用参数对象

es6解构赋值实现可选参数对象

```js
function doSome({a,b=2,c}){
	console.log(a,b,c)
}
doSome({a:5,c:22})
// 5 2 22
```

