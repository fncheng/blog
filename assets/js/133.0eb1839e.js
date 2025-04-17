(window.webpackJsonp=window.webpackJsonp||[]).push([[133],{420:function(t,s,a){"use strict";a.r(s);var n=a(8),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"react-与-vue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-与-vue"}},[t._v("#")]),t._v(" React 与 Vue")]),t._v(" "),s("p",[t._v("直接在render方法中为元素事件定义事件处理函数，最大的问题是，每次render调用时，都会重新创建一次新的事件处理函数，带来额外的性能开销，组件所处层级越低，这种开销就越大，因为任何一个上层组件的变化都可能会触发这个组件的render方法。当然，在大多数情况下，这种性能损失是可以不必在意的。")]),t._v(" "),s("h2",{attrs:{id:"react-与-vue-不同点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-与-vue-不同点"}},[t._v("#")]),t._v(" React 与 Vue 不同点")]),t._v(" "),s("h3",{attrs:{id:"_1-immutable和proxy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-immutable和proxy"}},[t._v("#")]),t._v(" 1.Immutable和Proxy")]),t._v(" "),s("p",[t._v("React和Vue的一个突出区别就是Immutable 数据不可变性")]),t._v(" "),s("p",[t._v("Vue讲究的是双向绑定，修改状态时直接对数据进行赋值")]),t._v(" "),s("p",[t._v("而React则是每次更新组件都不要直接修改 state 里的数据，而是生成一个新的 state 来替换")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setState")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("list")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'new data'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("h3",{attrs:{id:"_2-re-render机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-re-render机制"}},[t._v("#")]),t._v(" 2.re-render机制")]),t._v(" "),s("p",[t._v("在 React 中，组件的重新渲染是通过 "),s("code",[t._v("setState")]),t._v("触发，是可控的；")]),t._v(" "),s("p",[t._v("而Vue是响应式系统，一旦响应式数据发生变化，Vue 会自动追踪到这些变化，并触发视图更新，是不可控的")]),t._v(" "),s("h3",{attrs:{id:"数据更新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据更新"}},[t._v("#")]),t._v(" 数据更新")]),t._v(" "),s("p",[t._v("React useState是异步的，这就导致我们不能像vue那样修改数据后立刻调接口，因为这样使用的请求参数仍然是原来的值。")]),t._v(" "),s("p",[t._v("React 不会立即更新组件的状态，而是将状态更新放入队列，并在稍后的某个时刻批量处理这些更新。这可以提高性能，因为可以批量处理多个状态更新，避免了不必要的渲染。")]),t._v(" "),s("p",[t._v("如果想要在更新数据后调接口，可以使用useEffect来监听数据的变化")]),t._v(" "),s("p",[t._v("Vue数据更新是同步的")]),t._v(" "),s("p",[t._v("这使得在 Vue 中更容易追踪数据的变化，但也可能导致性能问题，尤其是在大型应用中频繁更新数据时。")]),t._v(" "),s("p",[t._v("useEffect和useAsyncEffect")]),t._v(" "),s("div",{staticClass:"language-tsx line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-tsx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("getData")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" res "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("request")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/bavJob/detail")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            method"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n           "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("useEffect")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  getData\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br")])]),s("div",{staticClass:"language-tsx line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-tsx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("getData")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" res "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("request")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/bavJob/detail")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            method"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n           "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("useAsyncEffect")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("getData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br")])]),s("h3",{attrs:{id:"数据流动-组件状态的更新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据流动-组件状态的更新"}},[t._v("#")]),t._v(" 数据流动（组件状态的更新）")]),t._v(" "),s("p",[t._v("今天重温Vue，发现Vue和React一样，都可以将修改父组件值的方法通过props传递给子组件，然后子组件调用这个方法就可以修改对应值了。这个体现了单向数据流的特点，即组件状态只能从父流向子")]),t._v(" "),s("p",[t._v("而Vue还多了一个emit，$emit 触发一个自定义事件，父组件监听该事件并响应。允许数据从子组件流向父组件。这是一种典型的父子组件通信模式，通常用于将子组件中的数据传递给父组件，以便在父组件中进行处理或显示。")]),t._v(" "),s("h3",{attrs:{id:"vue的emit允许子组件将数据传递到父组件-这难道不是双向数据流吗"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue的emit允许子组件将数据传递到父组件-这难道不是双向数据流吗"}},[t._v("#")]),t._v(" vue的emit允许子组件将数据传递到父组件，这难道不是双向数据流吗")]),t._v(" "),s("p",[t._v("尽管 Vue.js 中可以使用 "),s("code",[t._v("emit")]),t._v(" 来实现子组件向父组件的数据传递，但这并不等同于传统意义上的双向数据流，因为数据的更改仍然是通过父组件来控制的。子组件通过 "),s("code",[t._v("emit")]),t._v(" 向上传递数据，但父组件仍然需要监听事件并决定如何处理这些数据，然后才能将数据传递回子组件。")]),t._v(" "),s("p",[t._v("总之，Vue.js 的数据流动是单向的")]),t._v(" "),s("h3",{attrs:{id:"在setstate后立刻调接口-请求参数不是最新的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在setstate后立刻调接口-请求参数不是最新的"}},[t._v("#")]),t._v(" 在setState后立刻调接口，请求参数不是最新的")]),t._v(" "),s("p",[t._v("这是因为useState是异步的，其实可以这么写")]),t._v(" "),s("div",{staticClass:"language-tsx line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-tsx"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("pageChange")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("page"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pageSize"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" params "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("searchParams"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pageNum"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" page"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" pageSize "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setSearchParams")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("params"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getTableDataFn")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("params"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("这样写getTableDataFn还符合纯函数的风格，输出只与输入有关，无副作用")]),t._v(" "),s("h2",{attrs:{id:"重新渲染"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#重新渲染"}},[t._v("#")]),t._v(" 重新渲染")]),t._v(" "),s("p",[t._v("我们知道在Vue中，当一个组件的state发生变化，而这个state没有在视图中使用到时，组件是不会重新渲染的")]),t._v(" "),s("p",[t._v("而在React中，只要state变化了就会触发re-render")]),t._v(" "),s("h2",{attrs:{id:"生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[t._v("#")]),t._v(" 生命周期")]),t._v(" "),s("p",[t._v("在 Vue.js 中，子组件的更新并不会直接触发父组件的 "),s("code",[t._v("updated")]),t._v(" 钩子。")]),t._v(" "),s("h3",{attrs:{id:"watch和useeffect、computed和usememo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#watch和useeffect、computed和usememo"}},[t._v("#")]),t._v(" watch和useEffect、computed和useMemo")]),t._v(" "),s("p",[t._v("在Vue.js中，"),s("code",[t._v("watch")]),t._v(" 是一个选项，用于监视数据的变化，并在数据变化时执行相应的操作。当监听的数据变化时，可以执行一些副作用，比如发起网络请求、执行动画等。")]),t._v(" "),s("p",[s("code",[t._v("useEffect")]),t._v(" 是 React 中用于处理副作用的 Hook。它接收一个回调函数，在组件渲染时（挂载阶段）或某个特定依赖项发生变化时执行。可以用于处理数据获取、订阅、手动操作 DOM 等副作用。")]),t._v(" "),s("h2",{attrs:{id:"react代码结构书写顺序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react代码结构书写顺序"}},[t._v("#")]),t._v(" React代码结构书写顺序")]),t._v(" "),s("ol",[s("li",[t._v("useState等hooks")]),t._v(" "),s("li",[t._v("自定义hooks")]),t._v(" "),s("li",[t._v("effect等副作用")]),t._v(" "),s("li",[t._v("各种methods")]),t._v(" "),s("li",[t._v("jsx")])])])}),[],!1,null,null,null);s.default=e.exports}}]);