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

## Antd Modal 确定按钮可以快速点击多次

Antd Modal 的确定按钮在默认情况下确实允许快速重复点击，这可能会导致用户重复提交数据

可以给footer部分按钮添加disabled属性

```tsx
<Modal
  visible={modalVisible}
  onCancel={() => setModalVisible(false)}
  footer={
    <Button onClick={handleSubmit} disabled={isSubmitting}>
      确定
    </Button>
  }
>
  Modal 内容
</Modal>
```



## ProForm

ProForm系列的表单通过name属性来作为绑定值，不需要你提前声明变量，在提交的时候会自动生成对象

比如

```tsx
function Example() {
  const onFinish = (values: any) => {
    console.log(values); // {inputField: 'xxxxx'}
  };

  return (
    <ProForm onFinish={onFinish} name="exampleForm">
      <ProFormText
        label="输入框"
        name={'inputField'}
        rules={[{ required: true, message: '请输入内容' }]}
      />
    </ProForm>
  );
}
```

如果你绑定的值是对象中的





## Antd ProFormSwitch

ProFormSwitch组件与Switch组件不同，没有 **checked** 属性

正确的做法是将值存储在表单的数据中，并使用 `initialValue` 和 `name` 属性进行绑定。下面是一个示例代码：

```tsx
import { ProForm, ProFormSwitch } from '@ant-design/pro-form';

function Example() {
  return (
    <ProForm initialValues={{ switch: true }} onFinish={(values) => console.log(values)}>
      <ProFormSwitch
        label="ProFormSwitch"
        name="switch"
      />
    </ProForm>
  );
}
```

`ProFormSwitch` 组件中的 `name` 属性将会与表单数据中的 `switch` 字段进行绑定，实现值的双向绑定。当我们在界面上点击开关时，组件内部会更新表单数据中 `switch` 字段的值，从而实现了值的动态修改。

需要注意的是，在使用 `initialValues` 属性时，需要将表单的 `onFinish` 属性设置为回调函数，当表单提交时，回调函数会将表单数据传递给我们进行处理。
