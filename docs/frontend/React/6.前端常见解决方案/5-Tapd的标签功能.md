Tapd的标签功能是通过往body上插入一个组件来实现的

![image-20230901105303487](/Users/cheng/Library/Application Support/typora-user-images/image-20230901105303487.png)



样式

```css
.entity-card-tag-panel {
    cursor: default;
    position: fixed;
    width: 300px;
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 4px 20px 0 rgba(24,43,80,.1);
    border: 1px solid #e8e9ec;
    border-radius: 4px;
    padding-bottom: 8px;
}
```



给标签那一列的单元格添加点击事件

```tsx
const columns: ProColumns<any>[] = [
        {
            title: 'BAV应用名称',
            dataIndex: 'checkName',
            width: 150,
        },
        {
            title: '标签',
            dataIndex: 'tags',
            width: 150,
            onCell: () => ({
                onClick: (e: React.MouseEvent<HTMLTableCellElement>) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setRect(rect);
                    setEditStatus(true);
                    e.stopPropagation() // 这里需要阻止事件冒泡
                },
            }),
        },
  ]
```

另外需要给document.body添加点击事件，点击单元格区域以外就隐藏输入框

```tsx
useEffect(() => {
        setScrollY(getTableScrollY({ extraHeight: 70, ref: node }));
        const listener = () => setEditStatus(false);
        document.body.addEventListener('click', listener);
        return () => {
            document.body.removeEventListener('click', listener);
        };
    }, []);
```

