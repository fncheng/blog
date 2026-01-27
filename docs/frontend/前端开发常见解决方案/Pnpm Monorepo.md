## Pnpm workspace Monorepo

如果你的项目最终也会发展成多个包共存，
 建议直接在 `pnpm-workspace.yaml` 里写：

```yaml
packages:
  - apps/*
  - agents-components/*
```

### ✅ 一、Monorepo 的基础结构（最终长这样）

```sh
your-project/
├── packages/
│   ├── web/            # 你的原 Vue3 + Vite 项目，放这里
│   ├── shared/         # 通用工具库（utils、types、hooks）
│   └── ui/             # 可选：组件库（用 Vue3 + TS）
├── package.json        # 工作区（workspace）
├── pnpm-workspace.yaml # 声明 workspace
└── tsconfig.json       # 根 tsconfig（可选）
```

**重点**：你的原项目整体移动到 `packages/web` 里即可，Vite 不需要特别调整即可正常工作。



### 访问localhost提示找不到页面

> 必须要在vite.config中写明host: 'localhost'，后才能通过localhost:7101去访问项目

🧩 核心原因：Vite 默认绑定的是 **127.0.0.1 (IPv4)** 或 **::1 (IPv6)**，而不是 “localhost”

Vite 默认的 `server.host` 是：

```
127.0.0.1
```

但 **“localhost” 不一定等于 127.0.0.1**。



### 在子仓库中安装依赖 pnpm add -F

```sh
pnpm add @puppeteer/browsers -F common
# 在shared/common中安装@puppeteer/browsers
```



### 公共包要使用需要先安装

比如common下的com-tracker

在package.json 的 dependencies

```sh
"dependencies": {
  "@kangc/v-md-editor": "^2.3.18",
  "@vue/shared": "^3.5.13",
  "browser-md5-file": "^1.1.1",
  "com-tracker": "workspace:^",
}
```





### 全局安装

```sh
pnpm add @vueuse/core -w
```

解释：

- `-w` 或 `--workspace-root`
   表示安装到 workspace 根目录
- 所有 `packages/*` 内的应用都会使用这份依赖
