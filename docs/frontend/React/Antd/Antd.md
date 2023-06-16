## Antd Form Rules

Antd Form表单使用的也是async validator

Ant Design Pro 中的 Form 组件的 asyncValidator 属性已经不再支持使用回调（callback）函数的方式，而是要求使用 Promise 来处理异步校验。

一般我们可以通过返回一个 Promise 对象来实现异步校验，例如：

```tsx
const validateString = async (rule, value) => {
  const pattern = /\s/;
  if (!value) {
    return Promise.reject('输入不能为空！');
  }
  if (pattern.test(value)) {
    return Promise.reject('输入不能包含空格，请删除空格后再试！');
  }
  return Promise.resolve();
}
```



### Form设置trigger触发时间

在ElementUI表单校验中，可以设置trigger属性来实现触发时机

在Antd中，通过设置Form.Item的validateTrigger属性来实现

rules也有validateTrigger属性，但是官方描述中 **设置触发验证时机，必须是 Form.Item 的 validateTrigger 的子集**

表明Form.Item中的validateTrigger是必填的

