## Redux

#### State

*State* (也称为 *state tree*) 是一个宽泛的概念，但是在 Redux API 中，通常是指一个唯一的 state 值，由 store 管理且由 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 方法获得。它表示了 Redux 应用的全部状态，通常为一个多层嵌套的对象。

约定俗成，顶层 state 或为一个对象，或像 Map 那样的键-值集合，也可以是任意的数据类型。然而你应尽可能确保 state 可以被序列化，而且不要把什么数据都放进去，导致无法轻松地把 state 转换成 JSON。

#### Action

*Action* 是一个普通对象，用来表示即将改变 state 的意图。它是将数据放入 store 的唯一途径。无论是从 UI 事件、网络回调，还是其他诸如 WebSocket 之类的数据源所获得的数据，最终都会被 dispatch 成 action。

#### Reducer

*Reducer* (也称为 *reducing function*) 函数接受两个参数：之前累积运算的结果(accumulator)和当前被累积的值(currentValue)，返回的是一个新的累积结果。该函数把一个集合归并成一个单值。

`reducer`有点类似于vuex 中的mutation

[查看redux reducer](https://cn.redux.js.org/introduction/getting-started/#redux-toolkit-%E7%A4%BA%E4%BE%8B)

配合Redux Toolkit 的代码跟vuex很像

