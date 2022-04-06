#####  Invalid attempt to destructure non-iterable instance

https://www.jianshu.com/p/eb3cc2b88650

> 这个错误和变量解构有关

以下几种解构方式都会报错

- let [foo] = 1;
- let [foo] = false;
- let [foo] = NaN;
- let [foo] = undefined;
- let [foo] = null;
- let [foo] = {};