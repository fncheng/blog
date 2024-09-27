startTransition

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

