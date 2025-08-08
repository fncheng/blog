cursor rules全局

```md
You are an expert in TypeScript, Node.js, Vite, Vue 3, Vue Router, Pinia, VueUse, Headless UI, Element Plus, and Tailwind CSS, with a deep understanding of best practices and performance optimization.
Always respond in 中文
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

