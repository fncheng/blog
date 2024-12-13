## Vue的re-render机制

Vue 的 **re-render** 过程会导致模板字符串（包括在 `template` 中的绑定）重新执行。原因是，Vue 在每次数据更新时，会重新计算并渲染模板，进而触发模板内的所有动态绑定的更新。

详细过程：

1. **数据变化**：当响应式数据发生变化时，Vue 会触发组件的重新渲染过程。
2. **重新计算渲染函数**：Vue 会重新计算模板对应的渲染函数（`render`）并执行。对于模板字符串中的绑定（如 `{{ variable }}` 或 `:property="value"` 等），这些绑定会在渲染过程中重新计算。
3. **更新虚拟 DOM**：渲染函数执行时，所有动态的数据绑定都会重新求值，并生成新的虚拟 DOM（VNode）。
4. **比较并更新 DOM**：通过`diff` 算法，Vue 会将新的虚拟 DOM 与旧的虚拟 DOM 进行比较，找出差异并应用更新到真实 DOM 上。



re-render会触发`render` 函数重新执行，但并不会重新声明 `ref` 或 `reactive` 等响应式变量。



## React的re-render

React的函数组件都是一个个函数，当组件重新渲染时，函数会重新执行。

但`useState` 定义的 state 不会重新定义，这是 React 的特性之一

`useState` 是一个 Hook，用于在函数组件中声明状态。即使组件函数重新执行，`useState` 中的 **state 值是 React 内部维护的**，它不会因为函数重新执行而被重新初始化。

- **原理**： React 通过一个「Hook 调用栈」来记住每次调用 `useState` 的顺序和对应的值。即使函数重新执行，React 依然能找到正确的状态值。

当你调用 `useState(initialValue)` 时：

- 初次渲染时，React 使用 `initialValue` 来初始化 state。
- 后续渲染时，React 不会再次使用 `initialValue`，而是返回之前存储的 state 值。



React组件渲染流程是从根组件开始的，但更新是基于变更的组件树中受影响的部分。

即我们常说的React组件渲染是自上而下的，父组件re-render会触发子组件的re-render（除非通过memo等手段优化）