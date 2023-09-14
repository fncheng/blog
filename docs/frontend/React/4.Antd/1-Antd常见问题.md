# Antd常见问题

## Form

默认是通过htmlType="submit" 来触发表单提交

如果我不需要htmlType="submit"，而是自定义按钮来提交

```tsx
<Button
  onClick={() => {
    // form.validateFields()
    // 或者
    myRef.current?.validateFields()
  }}
/>
```

### Form设置trigger触发时间

在ElementUI表单校验中，可以设置trigger属性来实现触发时机

在Antd中，通过设置Form.Item的validateTrigger属性来实现

rules也有validateTrigger属性，但是官方描述中 **设置触发验证时机，必须是 Form.Item 的 validateTrigger 的子集**

表明Form.Item中的validateTrigger是必填的

输入时就校验表单

修改`validateTrigger` 为 "onChange"

Form.Item的validateTrigger默认为onChange，所以修改rule的validateTrigger为onChange时可以省略Form.Item的不用写

```tsx
<Form.Item
  label='Username'
  name='username'
  rules={[
    { required: true, message: 'Please input your username!' },
    {
      validator: (rule, value, callback) => {
        console.log(value)
        if (Number(value) < 100) {
          return Promise.reject('must > 100')
        }
      },
      validateTrigger: 'onChange'
    }
  ]}
>
  <Input />
</Form.Item>
// 或者
<Form.Item
  label="Username"
  name="username"
  validateTrigger={["onChange", "onBlur"]}
  rules={[
    { required: true, message: "Please input your username!" },
    {
      validator: (rule, value, callback) => {
        console.log(value);
        if (Number(value) < 100) {
          return Promise.reject("must > 100");
        }
        return Promise.resolve();
      },
      validateTrigger: "onBlur",
    },
  ]}
>
  <Input />
</Form.Item>;
```

## Form.Item给Switch绑定字段

### Form.Item valuePropName

当Item内部是Switch时，校验无法触发，这时需要设置Item的valuePropName属性为checked

valuePropName该属性为 `getValueProps` 的封装，自定义 `getValueProps` 后会失效

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

## Antd的Form.Item内的Input不能实现真正意义上的双向绑定

本来Form.Item内的Input组件是如下实现双向绑定的

```tsx
<Input
   value={formState.username}
   onChange={(e) => setFormState({ ...formState, username: e.target.value })}
 />
```

我在无意中给表单设置rules时发现的，如果不给Item设置name属性，rules将不会生效

而一旦设置了name属性后，Item内的Input就会失去双向绑定（可以试着修改数据，但是UI不会改变）

**因此，Antd Form 设置name绑定后，表单就变成非受控表单了**

```tsx
<Form.Item
  label='Username'
  name='username'
  rules={[
    { required: true, message: 'Please input your username!' },
    {
      validator: (rule, value, callback) => {
        console.log(value)
        if (Number(value) < 100) {
          return Promise.reject('must > 100')
        }
        return Promise.resolve()
      },
      validateTrigger: 'onBlur'
    }
  ]}
>
  <Input
    value={formState.username}
    onChange={(e) => setFormState({ ...formState, username: e.target.value })}
  />
</Form.Item>
```

在antd的表单组件中。如果给每个item组件设置了name。那么就不需要去手动实现双向绑定了。只需要通过
form.setFieldsValue方法。将对应的数据传过去。from组件就会根据对应的name和字段名来双向绑定。

### 如果我需要Input和我定义的值绑定，并且能够表单校验

方法一：使用 `getFieldDecorator`

方法二：使用 `useForm` 钩子

```tsx
 // 当 data 发生变化时，更新表单字段的值
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
```

这样Item的name属性就可以和Input的value属性一起使用了

### Antd的Form是非受控表单

不过也支持受控表单

1. 使用getFieldDecorator，但是getFieldDecorator在Antd4中已被废弃

2. 使用useForm hooks，对于非受控表单，可以使用 `getFieldsValue` 或 `setFieldsValue` 方法来操作表单字段的值



## Form.Item如何绑定一个对象的属性

你可以使用对象的属性路径来绑定对应的值。

在 Form.Item 组件的 name 属性中使用了一个数组 `['user', 'name']` 和 `['user', 'email']` 来表示对象属性的路径。

```tsx
<Form initialValues={initialValues} onFinish={handleSubmit}>
  <Form.Item label="Name" name={['user', 'name']}>
    <Input />
  </Form.Item>
  <Form.Item label="Email" name={['user', 'email']}>
    <Input />
  </Form.Item>
  <button type="submit">Submit</button>
</Form>
```

### form.submit()和form.validateFields()

https://github.com/fncheng/react-learn/issues/10

1. `form.submit()`: 这个方法用于手动提交表单。当你调用 `form.submit()` 时，它会触发表单的提交操作，即执行 onFinish 回调函数。在 onFinish 回调函数中，你可以获取到表单的所有值，并进行相应的处理。
2. `form.validateFields()`: 这个方法用于手动触发表单字段的校验。当你调用 `form.validateFields()` 时，它会对表单中的所有字段进行校验，然后返回一个 Promise 对象。你可以通过 `.then()` 方法来处理校验结果，或者使用 async/await 来等待校验完成。

### form.resetFields

重置一组字段到 initialValues



## form.getFieldValue

Antd的form.getFieldValue和form.getFieldsValue是实时的，但是不会 导致页面更新，因此不是响应式的



## Antd Form labelCol和wrapperCol对齐

控制label和field输入区域对齐的参数

```tsx
<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}></Form>
```

这么设置可以让表单的label和输入区域对齐

![image-20230825171437486](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230825171437486.png)



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

## Table

### Table定义类型

```tsx
import { Table, TableColumnType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnType<DataType>[] = [
  { dataIndex: "name", title: "姓名" },
  { dataIndex: "age", title: "年龄" }
];
```

或者使用ColumnsType

```tsx
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  { dataIndex: "name", title: "姓名" },
  { dataIndex: "age", title: "年龄" }
];
```

### Antd Table sort触发请求

在Antd Table中，要实现点击表头排序后触发请求的功能，你可以使用Table组件的`onChange`属性和排序相关的state来实现。

首先，你需要在父组件中维护一个`sorter`和`sortOrder`的状态，并将它们传递给Table组件的`onChange`属性。

```jsx
import { Table } from 'antd';

class MyTable extends React.Component {
  state = {
    data: [...], // 表格数据
    sorter: {
      field: '',
      order: ''
    }
  };

  handleTableChange = (pagination, filters, sorter) => {
    // 更新排序状态
    this.setState({ sorter });

    // 发起请求，根据排序状态获取数据
    this.fetchData(sorter.field, sorter.order);
  };

  fetchData = (field, order) => {
    // 发起请求，获取数据
    // 根据field和order参数进行排序，返回排序后的数据
    // 更新state中的data状态
  };

  render() {
    const { data, sorter } = this.state;

    const columns = [
      { title: 'ID', dataIndex: 'id', sorter: true },
      { title: 'Name', dataIndex: 'name', sorter: true },
      // ...
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        onChange={this.handleTableChange}
        sorter={sorter}
      />
    );
  }
}
```

## Table filterDropdown自定义筛选

filterDropdown属性是一个函数

```tsx
filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, close }) => React.ReactNode
```

其中有个参数confirm用于通知Table组件用户完成了筛选操作（这里的完成指的是用户已经输入的关键词并点击搜索），筛选后的数据需要触发相应回调函数

**当调用confirm后会发生什么**

当调用 `confirm` 方法后，会触发 Table 组件的筛选操作。

1. 根据当前列的筛选条件，Table 组件会更新相应列的筛选值，并根据新的筛选值重新渲染表格。
2. Table 组件会将最新的筛选值传递给 `onChange` 回调函数的 `filters` 参数，以便你可以获取最新的筛选数据并进行处理。
3. 如果你在 `onChange` 回调函数中执行了一些与筛选相关的操作，例如过滤数据、重新请求接口等，这些操作将会在调用 `confirm` 方法后被触发。

查看filterDropdown源码

```tsx
const propFilteredKeys = filterState?.filteredKeys;
const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(propFilteredKeys || []);
// ....
dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (selectedKeys: Key[]) => onSelectKeys({ selectedKeys }),
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
      close: () => {
        triggerVisible(false);
      },
    });

	const doFilter = ({ closeDropdown } = { closeDropdown: true }) => {
    if (closeDropdown) {
      triggerVisible(false);
    }
    internalTriggerFilter(getFilteredKeysSync());
  };
 // ======================= Submit ========================
  const internalTriggerFilter = (keys?: Key[]) => {
    const mergedKeys = keys && keys.length ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }

    if (isEqual(mergedKeys, filterState?.filteredKeys, true)) {
      return null;
    }

    triggerFilter({
      column,
      key: columnKey,
      filteredKeys: mergedKeys,
    });
  };
```

confirm会触发doFilter，而doFilter会触发`internalTriggerFilter(getFilteredKeysSync())`，其中getFilteredKeysSync()用于获取搜索关键词，该函数返回一个`string[]`

## Antd Table设置单元格点击事件

通过onCell属性设置

```tsx
const columns: ProColumns<DrsApplicationInfo>[] = [
  {
		title: '备注',
    dataIndex: 'remark',
    width: 200,
    onCell: (record) => ({
        onDoubleClick: () => {
            setEditingKey(record.uuid);
        },
    }),
]
```

## 设置单元格可编辑

第一种思路是给表格每行数据RowData加一个editing属性，用于控制是否处于编辑状态，这样做会导致可以同时编辑多行数据，如果只能编辑一行数据需要做额外处理。

第二种思路是设置一个key，当要编辑的行id === key时，该行进入编辑状态

https://codesandbox.io/s/antd-table-dan-yuan-ge-ke-bian-ji-lyr4mm

## Antd Table fixed后错位

错位问题实际上是表头最右侧多出了一个th元素导致的

当给Table设置`scroll: x: '100%', y: '100%'`时反而不会出现错位

经测试设置overflow-y: scroll 可以解决错位问题并且保持表格原貌

给表格设置滚动条并解决错位问题

```tsx
/**
 * 给ProTable的body部分设置滚动条
 * @param {number} options.extraHeight 表格body底部到可视区域的距离（默认为 70）
 * @param {RefObject} options.ref  ProTable组件ref
 * @returns {string} 返回表格的垂直滚动高度
 */
export const getTableScrollY = ({
    extraHeight = 70,
    ref,
}: {
    extraHeight?: number;
    ref: RefObject<HTMLDivElement>;
}) => {
    const tSearch: HTMLElement | null | undefined = ref.current?.querySelector(
        'div.ant-pro-table-search',
    );
    const tBody = ref.current?.querySelector('div.ant-table-body');
    if (tSearch) {
        tSearch.style.marginBottom = '10px';
    }
    /**
     * scrollElement 用于解决表格fixed时出现错位的问题
     * 给表格y轴设置overflow-y: scroll时就不会出现错位
     */
    const scrollElement: HTMLElement | null | undefined = ref.current?.querySelector(
        '.ant-table-cell-fix-right.ant-table-cell-fix-right-first',
    );

    if (tBody) {
        const { top }: DOMRect = tBody!.getBoundingClientRect();
        const height = `calc(100vh - ${top + extraHeight}px)`;
        const oldStyle = tBody?.getAttribute('style');
        const newStyle = `min-height: ${height};overflow-y: ${scrollElement ? 'scroll' : 'auto'}`;
        tBody?.setAttribute('style', `${oldStyle} ${newStyle}`);
        return height;
    } else throw new Error('ProTable必须设置scroll属性');
};
```

具体代码封装见[issues/27#issuecomment-1237690093](https://github.com/fncheng/vue-learn/issues/27#issuecomment-1237690093)

## Antd Table column设置ellipsis不生效

设置onCell后即可

```tsx
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: 200,
            ellipsis: true,
            onCell: (record) => ({
                style: {
                    maxWidth: 200,
                }
            }),
```

## Antd Table rowSelection

```tsx
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

<Table
  loading={tableLoading}
  columns={bavColumns}
  dataSource={data}
  rowSelection={{
      type: 'radio',
      selectedRowKeys,
      onChange: (selectedRowKeys: React.Key[], selectedRows) => {
				console.log('selectedRowKeys: ', selectedRowKeys, selectedRows);
					setSelectedRowKeys(selectedRowKeys);
				},
			}}
></Table>
```

默认情况下Table组件的 rowSelection 功能需要通过点击复选框来触发。如果希望点击表格的任意位置都能选中行，可以自定义行的点击事件

```tsx
const handleRowClick = (record) => {
    const isSelected = selectedRows.some(row => row.id === record.id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(row => row.id !== record.id));
    } else {
      setSelectedRows([...selectedRows, record]);
    }
  };
<Table
  columns={columns}
  dataSource={data}
  rowSelection={{
    selectedRowKeys: selectedRows.map(row => row.id),
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
          },
  }}
  onRow={(record) => ({
    onClick: () => handleRowClick(record),
  })}
/>
```







## CSS Modules修改Antd内部样式

如同Vue的`:deep`一样，CSS Module使用`:global`来实现

```less
.listWrapper {
    :global {
        .ant-list-items {
            max-height: 400px;
            overflow-y: auto;
        }
    }
}
.listWrapper {
    :global .ant-list-items {
        max-height: 400px;
        overflow-y: auto;
    }
}Ï
```





## TimePicker.RangePicker value回显

```tsx
<TimePicker.RangePicker
  value={[
    moment(formState.executePlan.startDate, "HH:mm"),
    moment(formState.executePlan.endDate, "HH:mm"),
  ]}
  format={"HH:mm"}
  onChange={(time, timeString) => {
    setFormState({
      executePlan: {
        ...formState.executePlan,
        startDate: timeString[0],
        endDate: timeString[1],
      },
    });
  }}
/>;
```

当清空RangePicker的值时会遇到显示validate Time的问题

```tsx
const showRangePickerValue = () => {
  if (formState.executePlan.startDate && formState.executePlan.endDate)
    return [
      moment(formState.executePlan.startDate, "HH:mm"),
      moment(formState.executePlan.endDate, "HH:mm"),
    ];
  return null;
};

<Item label="启动时间" required>
  <TimePicker.RangePicker
    value={showRangePickerValue()}
    format={"HH:mm"}
    onChange={(time, timeString) => {
      setFormState({
        executePlan: {
          ...formState.executePlan,
          startDate: timeString[0],
          endDate: timeString[1],
        },
      });
    }}
  />
</Item>;
```



## TimePicker的国际化

修改DatePicker的locale

```tsx
import moment from 'moment';
import 'moment/locale/zh-cn'; // 导入中文语言包

moment.locale('zh-cn'); // 设置 moment 使用中文语言包
```

首先导入了 `moment.js` 库，并导入了中文语言包。然后，使用 `moment.locale()` 方法将日期库设置为中文语言。



## Antd的Card组件

```tsx
<Card title="123" style={{ height: 300 }}>
                <div style={{ height: '100%' }}>456</div>
            </Card>
```

![image-20230822145932109](https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230822145932109.png)

最终设置的div是在ant-card-body内部的

正确的做法是给Card组件设置bodyStyle属性并设置height
