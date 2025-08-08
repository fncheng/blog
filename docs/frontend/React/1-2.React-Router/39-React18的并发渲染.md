---
title: React18并发渲染
---



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

使用React-Window提供的虚拟渲染实现虚拟列表

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



## ReactRouter loader使用

传统的权限控制我们可能是这样做的：在useEffect中获取权限，有权限则渲染没有则返回null，这种一般有个问题就是页面结构会先渲染一遍

从接口获取数据并渲染到页面上我们可能是这样做的：在useEffect中获取数据，并setState触发页面更新

// 接口

```ts
export const useNumber = async () => {
  const response = await fetch('http://127.0.0.1:3000/test/getNumber')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data.number
}
```

页面

```tsx
import { useEffect, useState } from 'react'
import { useNumber } from './useNumber'

const About1: React.FC = () => {
  const [number, setNumber] = useState(0)

  const getNumber = async () => {
    const number = await useNumber()
    setNumber(number)
  }

  useEffect(() => {
    getNumber()
  }, [])
  console.log('render')
  return <div style={{ color: 'red' }}>Here is the number: {number}</div>
}

export default About1
```

很明显，上面的render会输出两次

我们来看下Waterfall中的输出：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20240915144739000.png" alt="image-20240915144739000" style="zoom:67%;" />



这里我使用了按需加载，所以显示请求页面的js文件再是调接口，可以发现是按顺序排队执行，共计耗时3s+200ms

### 使用loader

在 React Router 6 中，`loader` 是用于在页面加载前获取数据的机制。通过 `loader`，你可以在渲染组件之前异步获取数据，并将其传递给你的路由组件。

// loader.ts

```ts
import { useNumber } from './useNumber'

export const userLoader = async () => {
  const number = await useNumber()
  return { number }
}

```

在路由表中添加loader

`{ path: "/about", element: <About />, loader: userLoader }`

```tsx
import { useLoaderData } from "react-router-dom";

const About: React.FC = () => {
  const userLoaderData = useLoaderData() as UserData
  console.log('userLoaderData: ', userLoaderData)

  console.log('render')

  return (
    <main>
      <h1>Let's loading some data</h1>
      <div style={{ color: 'red' }}>
        <h3>About: {userLoaderData.number}</h3>
      </div>
    </main>
  )
}

export default About;
```

查看Waterfall中发现请求在前，js文件在后

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20240915150003912.png" alt="image-20240915150003912" style="zoom:67%;" />

这样就会导致页面在请求接口过程中出现长时间空白，如果接口请求时间过长的话。

**继续优化**

#### 1.使用defer

```ts
import { defer } from 'react-router-dom'
import { useNumber } from './useNumber'

export const userLoader = async () => {
  const number = useNumber()
  return defer({ number })
}
```

**使用 `defer` 的优势**：

- `defer` 允许你将异步数据加载的 Promise 包装在一个对象中。这种方式可以确保 `Suspense` 和 `Await` 组件能够正确处理异步加载状态和数据渲染。

`defer` 的目的是将异步数据加载的操作推迟到实际需要渲染数据的时候。这意味着你可以直接将 Promise 对象返回，而不是等待 Promise 解析完成。

#### 2.使用Suspense提供fallback UI，并和 Await 组件配合

`Await` 组件用于处理从 `defer` 返回的 Promise，并在数据加载完成后渲染实际内容。

```tsx
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

interface UserData {
  number: boolean
}

const About: React.FC = () => {
  const userLoaderData = useLoaderData() as UserData
  console.log('userLoaderData: ', userLoaderData)

  console.log('render')

  return (
    <main>
      <h1>Let's loading some data</h1>
      <Suspense fallback={<div>Loading number...</div>}>
        <Await resolve={userLoaderData.number}>
          {(data) => {
            return (
              <div style={{ color: 'red' }}>
                <h3>About: {data}</h3>
              </div>
            )
          }}
        </Await>
      </Suspense>
    </main>
  )
}
```

页面表现为先加载Suspense内提供的fallback内容，当接口请求完毕后再将数据更新到对应位置，而组件的render只打印了一遍

`Await` 组件会等到 Promise 解析完成后再渲染实际内容。

我们来看Waterfall：

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20240915151054421.png" alt="image-20240915151054421" style="zoom:67%;" />

可以很明显的看到接口请求和页面资源文件并行执行



### 结论

- **条件渲染**：适用于简单的场景，当数据加载逻辑相对简单时，直接在组件内部处理数据加载和条件渲染可以更直接、易于理解。
- **`Suspense` 和 `Await`**：适用于更复杂的场景，特别是当你希望将数据加载和组件渲染逻辑分离，并且需要处理并行数据加载时。这种方式可以让组件在数据加载期间渲染 `fallback` 内容，改善用户体验，同时支持更复杂的异步数据处理逻辑。



### 实际应用

PieChart组件

```tsx
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

interface PieChartProps {
    data: any[] | undefined;
}

var chart: echarts.ECharts;

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const node = useRef<HTMLDivElement>(null);
    const option: echarts.EChartsOption = {
        tooltip: {
            trigger: "item",
        },
        legend: {
            top: "5%",
            left: "center",
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data,
            },
        ],
    };

    useEffect(() => {
        chart = echarts.init(node.current);
        const listener = () => {
            chart.resize();
        };

        window.addEventListener("resize", listener);
        return () => {
            chart.dispose();
            window.removeEventListener("resize", listener);
        };
    }, []);
    useEffect(() => {
        if (data) {
            chart.setOption(option);
        }
    }, [data]);

    return <div style={{ width: "100%", height: "100%" }} ref={node}></div>;
};

export default PieChart;
```

DashBoard

```tsx
const BAVDashBoard = () => {
    const [appData, setAppData] = useState<AppDataType>();
    
    const fetchAppData = async () => {
        let res = await queryApp();
        if (res.body) {
            setAppData(res.body);
        }
    };

    return (
        <div style={{ flex: 1, height: 230 }}>
            <PieChart data={appData?.apps} />
        </div>
    )
}
```

这里就可以用Await和loader来进行优化

```tsx
const { data: number, error, loading, run } = useAbortRequest(useNumber);

export const userLoader = async () => {
    const abortController = new AbortController()
    const { signal } = abortController
    const number = useNumber(signal)
    const name = useName(signal)
    const data = useFetchPieData()
    return defer({ number, name, data, abortController })
}

<Suspense fallback={<Loading />}>
    <Await resolve={pieData}>
        {(data) => {
            return <PieChart data={data} />
        }}
    </Await>
</Suspense>
```



这样即美化了页面空白时的显示，又减少了请求时间



## 原理分析

### 1.loader函数并发执行

`loader` 是 `React Router 6` 中的一个新功能，允许你在路由级别加载数据。`loader` 函数会在路由渲染之前执行，用于获取页面渲染所需的异步数据。`loader` 返回的通常是一个 Promise，这个 Promise 可以包含从接口请求数据或其他异步资源（例如本地存储的数据等）。

当页面加载时，`loader` 函数与组件的 JavaScript 资源文件是**并行**加载的。具体原理是：

- **并行执行：** `loader` 会异步运行，它不会阻塞浏览器去加载页面的静态资源文件（例如 JavaScript 文件、CSS 文件等）。因此，接口请求和页面资源文件加载会并行进行。
- **延迟渲染：** 页面会等到 `loader` 返回的数据就绪后，才真正开始渲染组件，避免因缺少数据而导致页面错误或内容不完整。

### 2.defer的并行加载

defer返回一个 Promise，并且可以分阶段返回数据

defer将数据请求的结果包装成一个 Promise，而页面的静态资源可以先行加载。

```ts
export async function loader() {
  return defer({
    number: fetch('/api/number'),  // 延迟加载的接口数据
    pieData: fetch('/api/pieData') // 另一个延迟加载的数据
  });
}
```

`Suspense` 和 `Await` 的作用是确保页面资源和接口数据能够并行加载，并且不会阻塞组件渲染的过程。





## 使用Vue实现并发渲染

我们可以用vue-router的beforeEnter来实现类似的效果

```ts
{
    path: 'about1',
        component: () => import('@/pages/About1.vue'),
            beforeEnter: (to, from, next) => {
                const { number, name, abortController } = useFetchData()
                to.meta.number = number
                to.meta.name = name
                to.meta.abortController = abortController
                next()
            }
},
```

这里的 number 和 name 都是promise

在页面中

```ts
const number = ref()
const name = ref()

const route = useRoute()
const abortController = route.meta.abortController

const getLoader = async () => {
    const numberVal = await route.meta.number
    number.value = numberVal
    const nameVal = await route.meta.name
    name.value = nameVal
}

getLoader()

onBeforeUnmount(() => {
    abortController.abort('请求取消')
})
```

这段代码中，如果numberVal执行的时间比nameVal长，那么页面会在numberVal 执行完后一次性渲染更新所有内容

**使用Promise.all**

```ts
const getLoader = async () => {
    const [numberVal2, nameVal2] = await Promise.all([route.meta.number, route.meta.name])
    number.value = numberVal2
    name.value = nameVal2
}
```

与上面不同的是，Promise.all会等待所有promise都完成后才会进行页面更新。

**使用then**

```ts
const getLoader = async () => {
    const numberVal = route.meta.number
    const nameVal = route.meta.name
    numberVal.then((n) => {number.value = n})
    nameVal.then((n) => {name.value = n})
}
```

这段代码的效果是先执行完的先更新，后执行完的后更新，不用考虑谁比较快。



## 在Vue中封装一个Await组件

Await组件

```vue
<template>
    <slot v-if="error" name="error"></slot>
    <slot v-else name="default" :data="data"></slot>
</template>

<script setup lang="ts">
import { defineOptions, ref } from 'vue'

defineOptions({ name: 'AwaitComponent' })

const props = defineProps<{ resolve: any }>()
defineSlots<{ default: (props: { data: any }) => any; error: () => any }>()

const data = ref(null)
const error = ref<boolean>(false)

await props.resolve
    .then((res) => (data.value = res))
    .catch((e) => {
        console.error(e)
        error.value = true
    })
</script>
```

不能采用下面这种写法：

因为只有Await组件的渲染被阻塞了，外部的Suspense组件检测到阻塞，会认为内容尚未准备好，于是Suspense到fallback部分才会显示。所以必须在setup顶层等待resolve的执行完成

```ts
const init = async () => {
    try {
        data.value = await props.resolve
    } catch (e) {
        console.error(e)
        error.value = true
    }
}

await init()
```



接收两个插槽

组件的props resolve接收一个promise，这个promise在组件内fullfilled后被通过data传递给父组件（跟render props有点像，也是传递给父组件，不过是通过回调函数）

父组件配合Suspense使用

```vue
<template>
	<Suspense>
    	<template #fallback>Please wait...</template>
			<Await :resolve="number">
    			<template #default="slotProps">
					<div :style="{ color: 'red' }">Number: {{ slotProps.data }}</div>
    			</template>
    			<template #error>
					<div>Error</div>
   			    </template>
			</Await>
		</template>
	</Suspense>
</template>
<script setup lang="ts">
    const Await: (typeof import('../components/Await.vue'))['default'] = defineAsyncComponent(
        () => import('../components/Await.vue')
    )
</script>
```

