## Floating-ui

通过JS原生方式使用

```sh
pnpm add @floating-ui/dom
```

```tsx
import { autoPlacement, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/react'
import { useEffect, useRef } from 'react'
import styles from './index.module.css'

const FloatingDom = () => {
    const referenceEl = useRef(null)
    const floatingEl = useRef(null)

    useEffect(() => {
        if (referenceEl.current && floatingEl.current) {
            const updatePosition = () => {
                computePosition(referenceEl.current!, floatingEl.current!, {
                    middleware: [
                        offset(20),
                        // flip({ padding: 8 }),
                        shift({ padding: 8 })
                        // autoPlacement({ alignment: 'start' })
                    ],
                    placement: 'right'
                    // strategy: 'absolute'
                }).then(({ x, y }) => {
                    floatingEl.current &&
                        Object.assign((floatingEl.current as HTMLElement).style, {
                            left: `${x}px`,
                            top: `${y}px`
                        })
                })
            }
            window.onscroll = () => {
                updatePosition()
            }
            updatePosition()
        }
    }, [])

    return (
        <div className='flex h-[800px] flex-col'>
            <div className='h-[100px]'>111</div>
            <div className={styles.target} ref={referenceEl}>
                referenceEl
            </div>
            <div className={styles.floating} ref={floatingEl}>
                floatingEl
            </div>
        </div>
    )
}

export default FloatingDom
```

当页面滚动时，通过updatePosition来更新弹出层的状态。

也可以不使用window.onscroll。而是使用floating-ui提供的api `autoUpdate`

```tsx
useEffect(() => {
   const cleanup = autoUpdate(referenceEl.current, floatingEl.current, updatePosition)
   return () => {
       cleanup()
   }
}, [])
```

