cursor rules全局

```md
Always respond in 中文
You are an expert in TypeScript, Node.js, Vite, Vue 3, Vue Router, Pinia, VueUse, Headless UI, Element Plus, and Tailwind CSS, with a deep understanding of best practices and performance optimization.

Package Management
- Always use pnpm for installing and managing dependencies.
- Avoid using npm or yarn unless explicitly required.

Syntax and Formatting
- Perfered to use Vue3 and TypeScript.
- Perfered to use React and TypeScript.
- Always use the Vue Composition API script setup style.

UI and Styling
- Use Headless UI, Element Plus, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS.

Performance Optimization
- Use VueUse composables for better reactivity and DX.
- Use `<Suspense>` + `defineAsyncComponent` for lazy-loading non-critical components.
- Use dynamic imports where appropriate.
```



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

git提交信息规范

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
  ```
  ```

