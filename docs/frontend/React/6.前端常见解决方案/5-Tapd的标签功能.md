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



> 需求：使用createProtal创建组件，当点击页面其他部分时，隐藏组件

```tsx
interface ModalProps {
  show: boolean;
  onClose: (e: MouseEvent) => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      const el = (e.target as HTMLDivElement).closest('.modal');
      console.log(el);
      if (el === null) {
        onClose();
      }
    };
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, [onClose]);

  if (!show) return null;

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <p>This is a modal</p>
      </div>
    </div>,
    document.body
  );
};
```

父组件部分

```tsx
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e: React.MouseEvent) => {
    setIsModalOpen(true);
    e.stopPropagation();
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="App">
      <button onClick={openModal}>Open Modal</button>
      {/* {createPortal(
        <Modal show={isModalOpen} onClose={closeModal} />,
        document.body
      )} */}
      {/* {<Modal show={isModalOpen} onClose={closeModal} />} */}
      <Modal show={isModalOpen} onClose={closeModal} />
    </div>
  );
}
```

这里用到了[Element.closest()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest)

该方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。

[CodeSandBox](https://codesandbox.io/s/createprotal-closet-nk9d9m)
