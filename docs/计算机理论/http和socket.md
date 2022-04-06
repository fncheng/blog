[Http、Socket、WebSocket之间联系与区别](https://www.cnblogs.com/aspirant/p/11334957.html)

socket和http的区别：

Http协议：简单的对象访问协议，对应于应用层。 Http协议是基于TCP链接的。

tcp协议：对应于传输层
ip协议：对应与网络层

Socket是对TCP/IP协议的封装，Socket本身并不是协议，而是一个调用接口（API），通过Socket，我们才能使用TCP/IP协议。



icmp和tcp

### ping和traceroute

ping就是发送一个ICMP查询报文给某服务器，以测试该服务器是否可达



#### 为什么traceroute比ping需要更长的时间？

https://qastack.cn/server/109926/why-does-traceroute-take-much-longer-than-ping

ping与traceroute路径上最后一次的时间大致相同
