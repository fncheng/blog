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

### ProFormDependency

> ProFormDependency 是一个简化版本的 Form.Item，它默认内置了 noStyle 与 shouldUpdate，我们只需要配置 name 来确定我们依赖哪个数据，ProFormDependency 会自动处理 diff 和并且从表单中提取相应的值。

ProFormDependency 是 Ant Design Pro Form 中用于处理表单项之间的依赖关系的工具。它用于实现在某个表单项的值发生变化时，触发其他表单项的显示、隐藏或其他操作。

以下是 `ProFormDependency` 的一般用法：

```tsx
<ProFormDependency name={['aaa']}>
  {({ aaa }) =>
  //判断aaa的值是否等于111，如果等于就显示该组件
    aaa === '111' && (
      <ProFormDateTimePicker
        label="日期"
        width="md"
        name="date"
        placeholder="选择日期"
        rules={[{ required: true }]}
      />
    )
  }
</ProFormDependency>
```

````tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// 创建一个 Context
const ProFormDependencyContext = createContext();

const ProFormDependency = ({ name, children }) => {
  // 使用 useState 来保存依赖项的值
  const [dependencies, setDependencies] = useState({});
  
  // 使用 useEffect 来监听依赖项的变化
  useEffect(() => {
    // 根据依赖项的变化，更新状态
    setDependencies((prevDependencies) => {
      const newDependencies = { ...prevDependencies };
      name.forEach((dependency) => {
        // 根据具体的逻辑更新依赖项的值
        newDependencies[dependency] = /* 根据实际情况获取依赖项的值 */;
      });
      return newDependencies;
    });
  }, [/* 根据实际情况传入依赖项 */]);

  return (
    // 将依赖项的值提供给子组件
    <ProFormDependencyContext.Provider value={dependencies}>
      {children(dependencies)}
    </ProFormDependencyContext.Provider>
  );
};

// 自定义 Hook，用于在子组件中获取依赖项的值
const useProFormDependency = () => {
  return useContext(ProFormDependencyContext);
};

export { ProFormDependency, useProFormDependency };
````



### Form.Item和dependencies属性

当dependencies依赖的字段更新后，Form.Item内部也会随之更新

```tsx
<Form.Item label='lll' dependencies={['ipaddress']}>{(form)=> {
    console.log('props: ', form.getFieldValue('ipaddress'));
    return <Input value={form.getFieldValue('ipaddress')} />
}}</Form.Item>

// noStyle用于取消默认div的占位
<Form.Item dependencies={["ipaddress"]} noStyle>
	{(props) => {
	    const ipaddress = props.getFieldValue("ipaddress");
	    console.log("props: ", ipaddress);
	    return ipaddress > 10 ? (
	        <Form.Item label="dsada" name={"ipaddress2"}>
	            <Input />
	        </Form.Item>
	    ) : null;
	}}
</Form.Item>
```







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

可以设置[SearchConfig](https://procomponents.ant.design/components/table#search-%E6%90%9C%E7%B4%A2%E8%A1%A8%E5%8D%95)中的labelWidth为auto来解决

### formRef

ProTable的formRef用于获取查询表单的form实例

```tsx
const formRef = useRef<FormInstance>();
```



### ProTable搜索区域自定义

ProTable生成的搜索区域默认只能容纳三个输入框，可以通过SearchConfig中的span自定义

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```

在TailWindCSS中

```css
{
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```





### 获取ProForm中的表单数据

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

### 搜索框字段转换

search transform

```tsx
{
    title: '验证结果',
    dataIndex: 'status',
    valueType: 'select',
    search: {
        transform: (value) => ({ statusList: value }),
    },
    fieldProps: {
        options: [
            { label: '成功', value: '2' },
            { label: '失败', value: '-3,0,3,5,6,7' },
        ],
    },
    width: 100,
    renderText: (value) => showVertifyStatus(value),
},
```

### Antd ProTable columns fieldProps.options无效

```tsx
const [opts, setOpts] = useState<any[]>([]);
// 其中opts会从接口获取数据，但是发现setOpts后表单中的选项没有变化
{
            title: "角色",
            dataIndex: "role",
            width: 200,
            valueType: "select",
            fieldProps: {
                mode: "multiple",
                options: opts
                showSearch: true,
                onSearch: (newValue: string) => {
                    console.log("newValue: ", newValue);
                },
            },
        }
```

经查发现需要使用request属性来获取远程数据https://github.com/ant-design/pro-components/issues/7570

```tsx
{
            title: "角色",
            dataIndex: "role",
            width: 200,
            valueType: "select",
            request: async () => {
                let res = await getAllRole();
                return res.map((item) => ({
                    label: item.name,
                    value: item.uuid,
                }));
            },
            fieldProps: {
                mode: "multiple",
                showSearch: true,
                onSearch: (newValue: string) => {
                    console.log("newValue: ", newValue);
                },
            },
        }
```







## StepForm的onFinish

表单最后一步提交成功触发，如果返回`true`就会自动重置表单(包括`StepForm`变回第一步)

