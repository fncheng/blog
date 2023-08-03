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



## ProTable

另外通过onLoad属性可以获取ProTable request返回的表格数据

onLoad: (dataSource: T[]) => void



### 搜索框label宽度过小

可以设置[SearchConfig](https://procomponents.ant.design/components/table#search-%E6%90%9C%E7%B4%A2%E8%A1%A8%E5%8D%95)中的labelWidth来解决



## 获取ProForm中的表单数据

可以通过调用 `form.getFieldsValue()` 方法来获取表单所有字段的值

```tsx
<StepsForm.StepForm
    name="detectionMessage"
    title="连接信息"
    formRef={stepForm2}
    layout="horizontal"
    onFinish={handleConnectMsgFinish}
>
    <Button onClick={()=> {
        console.log(stepForm2?.current.getFieldsValue())
    }}>stepForm2</Button>
</StepsForm.StepForm>
```

ProFormList外置Button添加一行数据

```tsx
<Button
  type="dashed"
  style={{ width: "100%" }}
  onClick={() => {
    const list = proFormListRef.current?.getList();
    console.log("list", list);
    proFormListRef.current?.add({
      targetHost: "10.0.0.111",
    });
  }}
>
  <PlusOutlined />
  添加目标主机
</Button>
```

然后隐藏ProFormList自带的creatorButtonProps

```tsx
<ProFormList
  creatorButtonProps={false}
>
</ProFormList>
```



## StepForm的onFinish

表单最后一步提交成功触发，如果返回`true`就会自动重置表单(包括`StepForm`变回第一步)