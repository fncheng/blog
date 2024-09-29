## Electron安装

使用vite创建一个electron项目

```sh
pnpm create vite my-electron-demo --template create-electron-vite
```

之后执行pnpm install

遇到的第一个问题

> node_modules/.pnpm/electron@30.5.1/node_modules/electron: Running postinstall script, failed in 567ms
> .../node_modules/electron postinstall$ node install.js

看样子是执行electron包内的脚本node install.js出现了错误

切换成npmjs.org源安装解决

运行pnpm run dev我们的第一个electron项目就启动了

## 如何调试Electron项目

调试 Electron 项目涉及调试 Electron 的两个进程：**主进程**（Main Process）和**渲染进程**（Renderer Process）。调试这两个进程的方法有所不同

### 1. **调试主进程**

主进程在 Electron 中负责管理应用的生命周期、窗口的创建等，类似于 Node.js 环境的代码。调试主进程的方式与调试 Node.js 相似。

#### 方法1: 使用 `--inspect` 标志

你可以通过在启动 Electron 时启用 `--inspect` 标志来调试主进程。在 `package.json` 中修改 `start` 脚本：

```json
"scripts": {
  "start": "electron --inspect=9222 ."
}
```

### 2. **调试渲染进程**

渲染进程负责加载并运行网页（HTML、CSS、JavaScript 等）。渲染进程的调试方法与 Chrome 浏览器调试前端应用类似。

#### 方法1: 使用 Chrome DevTools

Electron 内置了 Chromium，渲染进程中的代码可以像调试普通的网页应用一样在 Chrome DevTools 中调试。

使用快捷键 `Ctrl + Shift + I`（Windows/Linux）或 `Cmd + Option + I`（macOS）打开开发者工具。