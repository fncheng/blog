http.response.end方法

**语法：**

http://nodejs.cn/api/http.html#http_response_end_data_encoding_callback

`response.end([data[, encoding]][, callback])`

**接收参数：**

data ： end()执行完毕后要输出的字符，如果指定了 data 的值，那就意味着在执行完 response.end() 之后，会接着执行一条 response.write(data , encoding);

encoding： 对应data的字符编码



1.response.write():将信息写入http响应输出流。 在resposne.end()之前可以多次使用。

2.response.Flush:向客户端发送当前所有缓冲的输出

3.response.end:将当前所有缓冲的输出发送到客户端，停止该页的执行，并引发EndRequest事件。

4.response.Close：关闭到客户端的套接字连接。



What is chunk in nodejs?

http://nodejs.cn/api/stream/event_data.html

- `chunk` [Buffer](http://nodejs.cn/api/buffer.html#buffer_class_buffer) | String | any数据块。 对于非对象模式的流， `chunk` 可以是字符串或 `Buffer`。 对于对象模式的流， `chunk` 可以是任何 JavaScript 值，除了 `null`。



