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



## Antd Table fixed后错位

错位问题实际上是表头最右侧多出了一个th元素导致的

当给Table设置`scroll={{ x: '100%', y: '100%' }}`时反而不会出现错位

经测试设置overflow-y: scroll 可以解决错位问题并且保持表格原貌

给表格设置滚动条并解决错位问题

```ts
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
