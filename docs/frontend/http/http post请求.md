---
title: http post请求
---

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST

**HTTP `POST` 方法** 发送数据给服务器. 请求主体的类型由 [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 首部指定.

PUT 和[`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST)方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用）。连续调用同一个POST可能会带来额外的影响，比如多次提交订单。

一个 `POST` 请求通常是通过 [HTML 表单](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms)发送, 并返回服务器的修改结果. 在这种情况下, content type 是通过在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) 元素中设置正确的 `enctype` 属性, 或是在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) 元素中设置 `formenctype` 属性来选择的:

> **`enctype`**
>
> 当 `method` 属性值为 `post` 时，`enctype` 就是将表单的内容提交给服务器的 [MIME 类型](http://en.wikipedia.org/wiki/Mime_type) 。可能的取值有：
>
> - `application/x-www-form-urlencoded`：未指定属性时的默认值。
> - `multipart/form-data`：当表单包含 `type=file` 的 [`input`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素时使用此值。
> - `text/plain`：出现于 HTML5，用于调试。
>
> 这个值可被 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)、`<input type="submit">` 或 `<input type="image">` 元素上的 `formaction` 属性覆盖。

- `application/``x-www-form-urlencoded`: 数据被编码成以 `'&'` 分隔的键-值对, 同时以 `'='` 分隔键和值. 非字母或数字的字符会被 [percent-encoding](https://developer.mozilla.org/zh-CN/docs/Glossary/percent-encoding): 这也就是为什么这种类型不支持二进制数据(应使用 `multipart/form-data` 代替).
- `multipart/form-data`
- `text/plain`

当 POST 请求是通过除 HTML 表单之外的方式发送时, 例如使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest), 那么请求主体可以是任何类型