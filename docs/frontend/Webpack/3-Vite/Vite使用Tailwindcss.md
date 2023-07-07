## Vite使用TailwindCSS

将TailwindCSS作为一个PostCSS插件安装是将其与webpack、Rollup、Vite 和 Parcel 等构建工具集成的最无缝方式。

[using-postcss](https://www.tailwindcss.cn/docs/installation/using-postcss)

**第一步**

安装相应依赖

```sh
yarn add -D tailwindcss postcss autoprefixer
```

**第二步**

```sh
npx tailwindcss init -p 
```

- `npx` 是一个 Node.js 工具，可以在不安装全局包的情况下运行命令。
- `tailwindcss` 是一个流行的 CSS 框架，它使用类名而不是自定义 CSS 样式来定义样式。
- `init` 是一个命令，它会在您的项目中生成一个 `tailwind.config.js` 文件，这是 Tailwind CSS 的配置文件。
- `-p` 或 `--full` 标志会将 `tailwind.config.js` 文件生成为完整配置文件，包括所有默认选项和注释。

使用此命令后，`tailwind.config.js` 文件将包含默认配置，例如颜色和字体系列，您可以根据需要进行调整。该文件还包含用于自定义和扩展 Tailwind CSS 的其他选项，例如添加其他插件，自定义主题等。

然后修改tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**第三步**

在index.css中加入如下代码

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## tailwind导致Antd button透明问题

在tailwind.config.js中加入如下代码关闭tailwind默认预设

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
```

