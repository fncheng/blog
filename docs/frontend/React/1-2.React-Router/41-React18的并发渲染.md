## startTransition和Suspense对异步组件的优化

Suspense用于包裹懒加载（即异步）的组件，以便在组件还未完全加载时显示中间态

而在 `startTransition` 内部更新状态也可以触发懒加载

那么，Suspense内部包裹lazy懒加载组件，可以平稳的过渡并显示中间态fallback，而startTransition却不可以，那么startTransition存在的意义何在？

`startTransition`可以告诉 React 哪些更新是低优先级的，从而在处理这些更新时不阻塞高优先级的用户输入（如点击、输入框内容等）

```tsx
export default function App() {
  const [text,setText] = useState('Initial Text')
  const [items,setItems] = useState<number[]>([])
  const [isPending,setIsPending]= useState(false)
  
  const handleClick = () => {
    setIsPending(true)
    setText("Text updated immediately!");
    
    startTransition(()=> {
      updateItems()
      setIsPending(false); 
    })
  }
  const updateItems = () => {
    const newItems = Array.from({ length: 10000 }, (_, i) => i + 1);
    setItems(newItems);
  }
  
  return (
    <div>
      <h3>{text}</h3>
      <StyledAntdButton ref={ref} type='primary' onClick={handleClick}>click Me</StyledAntdButton>
      {isPending && <p>Updating list...</p>}
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

使用React-Window提供的虚拟渲染

```tsx
import { FixedSizeList as List } from 'react-window';

export default function App() {
  const [text,setText] = useState('Initial Text')
  const [items,setItems] = useState<number[]>([])
  const [isPending,setIsPending]= useState(false)

  const handleClick = () => {
    setIsPending(true)
    setText("Text updated immediately!");
    
    startTransition(()=> {
      updateItems()
      setIsPending(false)
    })
  }
  const updateItems = () => {
    const newItems = Array.from({ length: 10000 }, (_, i) => i + 1);
    setItems(newItems);
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>Item {items[index]}</div>
  )

  return (
    <div>
      <StyledButton css={appClass} onClick={() => setCount(count + 1)}>{count}</StyledButton>
      <h3>{text}</h3>
      <StyledAntdButton ref={ref} type='primary' onClick={handleClick}>click Me</StyledAntdButton>
      {isPending && <p>Updating list...</p>}
     
      <List height={400} itemCount={items.length} itemSize={30} width={300}>{Row}</List>
    </div>
  );
}
```

如果lazy懒加载的组件没有通过Suspense包裹或startTransition处理，渲染时则会抛出错误：

> React Router caught the following error during render Error: A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.