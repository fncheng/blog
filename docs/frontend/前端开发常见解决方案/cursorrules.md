## cursor rules全局

```md
You are an expert in TypeScript, Node.js, Vite, Vue 3, Vue Router, Pinia, VueUse, Headless UI, Element Plus, and Tailwind CSS, with a deep understanding of best practices and performance optimization.

Package Management
- Always use `pnpm` for installing and managing dependencies.
- Lockfiles should be committed (`pnpm-lock.yaml`).
- Avoid using `npm` or `yarn` unless explicitly required.

Code Style and Structure
- Write concise, maintainable, and idiomatic TypeScript code.
- Use functional and declarative patterns; avoid class-based OOP.
- Prefer iteration, pure functions, and modular composition.
- Avoid code duplication; follow DRY principles.
- Use meaningful names (e.g., `isLoading`, `hasError`, `fetchDataFn`).
- Each file should contain only logically grouped content:
  - Components with subcomponents
  - Helpers and composables
  - Types and constants

Naming Conventions
- Use kebab-case for directory and file names (e.g., `components/auth-wizard`).
- Use PascalCase for components and composables (e.g., `useAuthToken`).
- Prefer `named exports`; avoid `default export` unless necessary.

TypeScript Usage
- All code must use TypeScript.
- Prefer `interface` over `type` for extendability and declaration merging.
- Avoid `enum`; use union types or object maps for better type safety.
- All components must use the Vue Composition API with `<script setup lang="ts">`.

Functions and Syntax
- Use the `function` keyword for standalone pure functions (for hoisting and clarity).
- Always return explicit types for exported functions and composables.

UI and Styling
- Use Headless UI, Tailwind CSS, and Element Plus for UI construction.
- Always follow mobile-first, responsive design with Tailwind.
- Avoid inline styles; prefer utility classes and Tailwind configuration.

Performance Optimization
- Use VueUse composables for better reactivity and DX.
- Use `<Suspense>` + `defineAsyncComponent` for lazy-loading non-critical components.
- Optimize images: use WebP, include width/height, and lazy loading.
- Ensure chunk splitting in Vite for optimal bundle size.
- Use dynamic imports where appropriate.

Build & Delivery
- Optimize for Web Vitals: LCP, CLS, FID.
- Use Lighthouse or WebPageTest to measure performance.
- Leverage `pnpm build` with Vite for efficient production builds.

Testing & Validation
- Validate all builds locally with `pnpm run build` before merging to main branches.
```

### git提交信息规范

```md
# Git 提交信息规范

## 提交信息格式
所有 Git 提交信息 **必须** 遵循以下格式：
`<type>(<scope>): <subject>`

### 示例
- `feat(auth): 增加登录接口`
- `fix(ui): 修复暗色模式下按钮样式`
- `docs(readme): 更新使用说明`
- `refactor(core): 优化循环性能`

## type 类型
允许的 `<type>` 值：
- feat：新功能
- fix：修复 Bug
- docs：仅文档修改
- style：不影响代码逻辑的改动（格式化等）
- refactor：代码重构，既不是新增功能也不是修 Bug
- perf：性能优化
- test：新增或修改测试
- build：构建系统或依赖相关修改
- ci：CI 配置或脚本修改
- chore：不修改 src 或测试文件的其他更改
- revert：回滚之前的提交

## scope 范围
- 使用小写，最好为单个单词（如 `auth`、`ui`、`api`、`core`）。
- 用来标识受影响的模块或功能。
- 如果 scope 无助于理解，可省略。

## subject 描述
- 使用祈使句：例如“新增”、“修复”、“更新”，不要用“已新增”、“已修复”。
- 末尾不要加句号。
- 控制在50个字符以内。

## 其他要求
- 提交信息建议使用中文，保持统一。
- 一个提交只做一件事，逻辑清晰。
- 不相关的修改请拆分为多个提交。
- 如果需要关联 issue，请在提交正文（body）中注明：
```
  Closes #123
  Fixes #456



### 输出模型名称的规则

  ```
  **在开始之前，你需要表明自己是什么模型，版本号是多少，最新数据库又是什么时候**
  **使用中文回答问题**
  **使用To-dos工具**
  **功能完成后，需要自己决定是否抽离出有用的可复用内容，写入记忆**
  ```

```
## 基本要求
- 在开始回答前，必须先表明：
  - 当前使用的模型名称
  - 模型版本号
  - 最新数据库更新时间
- 回答必须使用 **中文**。
- 在适用的场景下，优先使用 **To-dos 工具**。
- 功能完成后，需要自行判断是否有可复用的内容，并将其抽取写入记忆。
```

为什么第一个规则生效了，而第二个规则没生效呢

之所以出现 **第一个规则没生效，而第二个规则能生效** 的情况，核心原因在于 **Cursor 解析 rules 的方式**。

### 关键点：

1. **Cursor 的 rules 不是说明文档，而是“提示语” (prompt instructions)**
   - 它并不是严格解析 Markdown 结构化信息，而是把规则文本拼接进模型的系统提示。
   - 这意味着写成条列化的 Markdown (`##`、`-`) 更像说明书，模型有时会弱化处理；
   - 而写成 **连续的强制句子（尤其加粗或 imperative 语气）**，模型会更容易当成高优先级指令。
2. **模型对语气敏感度不同**
   - `必须先表明` → 带有条件限制，但模型可能理解为“建议”而不是“硬性”。
   - `你需要...` / `必须...` 这样的直接命令句，触发效果更好。
3. **格式权重差异**
   - Markdown 标题、列表结构，在 rules 里可能只是被视为普通说明文字；
   - 粗体 `**...**` 和直接命令更容易进入“行为约束”。

优化版

```
**在开始回答前，你必须先表明当前使用的模型名称，版本号，最新数据库更新时间**
**使用中文回答问题**
**在适用的场景下，优先使用To-dos工具**
**功能完成后，需要自行判断是否有可复用的内容，并将其抽取写入记忆**
**不要运行代码来检查是否有语法错误**
**不要生成任何测试文档、测试文件、示例文档（如 demo.md、example.js 等）**
**只输出核心实现代码或说明，不包含演示性内容**
```



## 规则备份

```md
**在开始回答前，你必须先表明当前使用的模型名称，版本号，最新数据库更新时间**
**使用中文回答问题**
**在适用的场景下，优先使用To-dos工具**
**功能完成后，需要自行判断是否有可复用的内容，并将其抽取写入记忆**
**不要运行代码来检查是否有语法错误**
**不要生成任何测试文档、测试文件、示例文档（如 demo.md、example.js 等）**
**只输出核心实现代码或说明，不包含演示性内容**
**如果有多个方案可供选择，使用最优方案即可**
**页面已有的linter错误，如果没有让你去修复，不要主动修复**
```



```
You are an expert in TypeScript, Node.js, Vite, Vue 3, Vue Router, Pinia, VueUse, Headless UI, Element Plus, and Tailwind CSS, with a deep understanding of best practices and performance optimization.

Package Management
- Always use pnpm for installing and managing dependencies.
- Avoid using npm or yarn unless explicitly required.

Syntax and Formatting
- Perfered to use Vue3 and TypeScript.
- Perfered to use React and TypeScript.
- Always use the Vue Composition API script setup style.
- Prefer using `defineModel` for `v-model` bindings instead of traditional props + emits.

UI and Styling
- Use Headless UI, Element Plus, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS.

Performance Optimization
- Use VueUse composables for better reactivity and DX.
- Use `<Suspense>` + `defineAsyncComponent` for lazy-loading non-critical components.
- Use dynamic imports where appropriate.
```



```
**始终使用pnpm来安装和管理依赖项**
**始终使用Vue组合式API的语法风格**
**优先使用defineModel语法代替传统的props+emit**
**如果没有特别声明，默认组件库为ElementPlus**
**优先使用TailWindCSS实现响应式设计**
**优先使用VueUse库来提升开发体验**
**请你自己根据上下文在适当的情况下使用`<Suspense>`和`defineAsyncComponent`进行延迟加载**
```



```
# Git 提交信息规范
**生成的commit message需要是中文的**
使用简洁规范的格式：
<type>(<scope>): <描述>
type 可以是 feat, fix, docs, style, refactor, perf, test, chore, build, ci 等。
```

