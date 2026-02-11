# Vite

## 处理无法识别的图片格式

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230315153812420.png" alt="image-20230315153812420" style="zoom: 50%;" />

这是因为vite无法识别.PNG格式的文件，提示你需要在vite.config.js中配置assetsInclude字段。

```js
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.PNG']
})
```

这样设置之后便可以识别PNG文件了

## vite动态导入和懒加载

我们在从vue2迁移到vue3时使用过一个api [import.meta.glob](https://cn.vitejs.dev/guide/features.html#glob-import)来解决动态导入的问题 ( [传送门](https://fncheng.github.io/blog/frontend/vue/Vue3/1-%E4%BB%8Evue2%E8%BF%81%E7%A7%BB%E5%88%B0vue3.html#%E8%B7%AF%E7%94%B1%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5) )

- `import.meta.glob`: 通过动态导入`默认懒加载`，通过遍历加 `then` 方法可拿到对应的模块文件详情信息
- `import.meta.globEager`: 直接引入所有的模块, 即静态 `import` 

import.meta.globEager已废弃，请使用eager: true

两种方式都支持绝对路径和相对路径导入，不支持alias等路径别名

Vite 也支持带变量的动态导入

```js
const module = await import(`./dir/${file}.js`)
```

但是变量只支持一层深的文件名，如果file是`foo/bar`，导入将会失败

如果需要深层次的动态导入，可以使用glob导入

```tsx
const modules = import.meta.glob('../pages/**/*.vue')
const routesMap: RouteConfig[] = [
  {
    path: '/home',
    component: 'Home/index'
  },
  {
    path: '/about',
    component: 'About/index'
  },
  {
    path: '/create-element',
    component: 'CreateElement/index',
  },
  {
    path: '/mount-blade',
    component: 'MountBlade/index'
  }
]

const handleAsyncRoutes = (routes: RouteConfig[]): RouteRecordRaw[] =>
  routes.map((route) => {
    console.log('route: ', route.component);
    return {
      path: route.path,
      component: modules[`../pages/${route.component}.vue`]
      // component: () => import(`../pages/${route.component}.vue`) 无效
    }
  })
const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes
})
const asyncRoutes = handleAsyncRoutes(routesMap)
asyncRoutes.forEach((route) => router.addRoute(route))
```

### eager: true

立即导入所有匹配文件，并返回这些模块的内容。

效果相当于：

```ts
import icon1 from '@/assets/svg/a.svg'
import icon2 from '@/assets/svg/b.svg'
...
```

### 特点：

- **同步执行**，构建时直接打包进来
- 返回的是 **模块对象本身**
- 不需要再手动 `import()`
- 适合：你在加载时就要用到全部文件





## 在Vite中使用图片

**1.直接使用public目录**

public目录下的图片不会被Vite处理，适用于不会变化的静态资源

**2.使用import语法（推荐）**

Vite 会自动优化并生成带哈希的 URL，避免缓存问题。适用于组件内动态使用的图片。



## vite+react动态引入图片

```tsx
import { useState } from 'react';

function MyComponent() {
  const [images, setImages] = useState(null);
  import('@/assets/images/086.png').then((res) => setImages(res.default))

  // ...

  return (
    <div>
      <img key={index} src={images} />
    </div>
  );
}

export default MyComponent;
```

引入一组图片

```tsx
import { useState } from 'react';

function MyComponent() {
  const [images, setImages] = useState([]);

  const handleClick = async () => {
    const imagePaths = [
      '@/assets/images/dynamic-image-1.jpg',
      '@/assets/images/dynamic-image-2.jpg',
      '@/assets/images/dynamic-image-3.jpg',
    ];
    const loadedImages = await Promise.all(imagePaths.map(path => import(path)));
    setImages(loadedImages.map(image => image.default));
  }

  return (
    <div>
      <button onClick={handleClick}>Load Images</button>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
}

export default MyComponent;
```



在vite中，要使用图片需先通过`import`引入

如果我有一组图片，写很多个 `import` 语句会显得非常繁琐。

在webpack中我们可以使用`require.context()` 函数来创建一个函数，该函数会自动引入 `./assets/images` 目录下的所有以 `.png` 结尾的文件。然后，我们使用 `importAll` 函数来将这些文件一次性全部引入，并放入 `images` 数组中。

```js
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./assets/images', false, /\.png$/));
```

而在 Vite 中，我们可以使用 `import.meta.glob()` 函数来导入一组图片

```js
// 导入 assets/images 目录下所有的 PNG 图片
const pngFiles = import.meta.glob('./assets/images/*.png');
// pngFiles是一个对象

for (const path in pngFiles) {
  if (pngFiles.hasOwnProperty(path)) {
    const url = pngFiles[path]();
    console.log(path, url); // 输出文件路径和 URL
    // 在这里可以进一步处理 URL，例如创建一个图片元素并将其添加到页面上
  }
}
```

需要注意的是，在使用 `import.meta.glob()` 函数时，你需要在字符串中显示地指定文件名中的通配符，而且这种方式只支持识别静态的、不可变的文件路径。



## Vite配置proxy

修改vite.config.ts文件

```ts
export default defineConfig({
  server: {
    proxy: {
      "/agent": {
        target: "http://10.0.0.16:56790",
        changeOrigin: true,
        secure: false,
        // 给header添加属性
        headers: {
          'auth': 'your-auth-token'
        }
      }
    }
  }
})
```



## Vite类似webpack.definePlugin的注入

```ts
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
}
```

有个奇怪的事，

```ts
console.log(`process.env.NODE_ENV`);
```

上面这段代码打印的不是字符串"process.env.NODE_ENV"，而是对应环境变量的值development



与此同时，vite还有import.meta.env



## Vite中使用环境变量

在vite.config.ts中引入env文件并使用

### loadEnv的使用

```ts
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // 加载对应 `mode` 的环境变量
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    return defineConfig({
        server: {
            host: 'localhost',
            port: 8081,
            proxy: {
                '/proxyApi/': {
                    target: env.VITE_DEV_API_PRXOXYAPI,
                    // rewrite: (path) => path.replace(/^\/proxyApi\/skybox-desktop/, ''),
                },
            },
        },
    })

}
```

### 构建时指定环境

```sh
vite build --mode development
```







## Vite import.meta

### Vite通过HTML环境变量替换html模板内容

在index.html中修改

```html
<link rel="icon" type="image/svg+xml" href="%VITE_LOGO_URL%" />
```

然后新建.env文件

```ini
VITE_LOGO_URL = 'rs.png'
```

注意所有变量必须以VITE开头



或者使用插件[vite-plugin-html-config](https://www.npmjs.com/package/vite-plugin-html-config)、[vite-plugin-html-env](https://www.npmjs.com/package/vite-plugin-html-env)

## Vite中的路径处理

new URL('./src', import.meta.url) 和 path.resolve

```ts
const imageUrl = new URL('./images/picture.png', import.meta.url);
console.log(imageUrl.href);
```

这会输出 `picture.png` 文件的绝对 URL。

new URL('./src', import.meta.url)

- 这是在 ES 模块 (ESM) 中构建相对于当前模块的文件或目录 URL 对象的方法。



Vite 会自动将 `public/` 目录下的文件映射到根路径，并且文件路径不需要包含 `public` 前缀。

比如说下面这段代码

```ts
import pdf2 from '/vue-app/pdfjs/web/example2.pdf'
const pdfUrl2 = ref(pdf2)
const pdfViewerUrl = ref(`/vue-app/pdfjs/web/viewer.html?file=${pdfUrl2.value}`)
```

其中/vue-app/是 Vite base，而pdfjs目录是放在public中的，这里不论是import还是pdfViewerUrl的引用，都没有用public作为开头，这是因为Vite 会自动将 `public/` 目录下的文件映射到根路径。

如果修改了base，代码中也需要变更，比较麻烦

优化方案：使用new URL和import.meta来取代

```ts
const pdf2 = new URL('/pdfjs/web/example2.pdf', import.meta.url).href
const pdfUrl2 = ref(pdf2)
const pdfViewerUrl = ref(`/vue-app/pdfjs/web/viewer.html?file=${pdfUrl2.value}`)
```





## typescript项目引入@types/node

需要在tsconfig中配置

```json
{
  //...
  "types": ["node"]
}
```



## Vite指定依赖不打包

external负责告诉Vite哪些依赖不用打包，而是使用外部引入的资源

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue']
    }
  },
})
```

## Vite打包拆分

```ts
build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue']
        }
      }
    }
  },
```

manualChunks 主要有两种配置的形式，可以配置为一个对象或者一个函数。

在对象格式的配置中，key代表 chunk 的名称，value为一个字符串数组，每一项为第三方包的包名。

https://segmentfault.com/a/1190000043891288



## 静态资源copy

[vite-plugin-static-copy](https://www.npmjs.com/package/vite-plugin-static-copy)，类似CopyWebpackPlugin的功能

```ts
import { viteStaticCopy } from "vite-plugin-static-copy";
plugins: [
  viteStaticCopy({
    targets: [
        {
            src: resolve(__dirname, "./static/"),
            dest: resolve(__dirname, "./dist/"),
        },
    ],
	}),
]
```



## Vite开发环境首屏白屏的问题

在 Vite 项目中，依赖项通常会被当作独立的模块直接通过 `ESM`（ES Modules）加载。这与传统的打包工具（如 Webpack）不同，Vite 的开发服务器直接利用浏览器原生支持的 `ESM` 机制。然而，这种方式对某些庞大的第三方依赖包（如 `lodash`、`moment` 等）效率较低。为了解决这个问题，Vite 会对第三方依赖进行**预构建**。

如果不使用预构建，比如我们引入lodash-es中debounce方法

在开发环境下的浏览器中会同时有800多个请求，每个lodash的方法都被请求了一遍

<img src="C:\Users\chengdong2\AppData\Roaming\Typora\typora-user-images\image-20240927153859692.png" alt="image-20240927153859692" style="zoom:67%;" />

预构建的文件在node_modules/.vite/deps目录下

如果是第一次启动（冷启动），要等deps目录内预构建完成页面才会显示出来

如果以下 `3` 个地方都没有改动，`Vite` 将一直使用缓存文件:

1. `package.json` 的 `dependencies` 字段
2. 各种包管理器的 `lock` 文件
3. `optimizeDeps` 配置内容



## Vite项目中移除sass警告

Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.

More info: https://sass-lang.com/d/legacy-js-api

项目中出现如上警告是因为使用了旧的sass api，对应链接中提到了可以用`silenceDeprecations: ['legacy-js-api']`来暂时隐藏警告。

在Vite项目中则需要如下配置

```ts
defineConfig({
    css: {
        preprocessorOptions: {
            sass: {
                silenceDeprecations: ['legacy-js-api']
            }
        }
    }, 
})
```



## Vite中的base和路由Router中的base有什么区别

VueRouter中的base或ReactRouer中的basename是用来给url添加后缀的，比如设置base: '/app'后，

原来访问 `http://localhost:7101/home` 就变成了 `http://localhost:7101/vue-app/home` 



而部署到服务器后，nginx配置可能如下

```nginx
server {
  listen 20003;
  server_name localhost;
  root /opt/homebrew/var/web;

  location /vue-app/ {
    alias /opt/homebrew/var/web/vue-app/dist/;
    expires 1h;
    try_files $uri $uri/ /index.html;
  }
}
```

这时候访问 `http://localhost:20003/vue-app/` 发现无法访问

我们打开Network发现http://localhost:20003/vue-app/ doc文件是可以正常请求到的，但是js、css等资源文件无法请求到

http://localhost:20003/assets/index-DZeKhjX2.js无法命中nginx到规则，应该访问http://localhost:20003/vue-app/assets/index-DZeKhjX2.js 才对

这时候就跟我们的打包工具有关了，Vite的话需要设置build base = '/vue-app/'



## import代码中的node:fs和fs有什么不同

`node:fs` 和 `fs` 本质上是同一个模块，但有一些语义上的区别：

**`node:fs` 是官方推荐的导入方式**（从 Node.js 16.0.0 开始引入）

- 使用 `node:` 前缀可以更明确地表明这是一个 **Node.js 内置模块**，避免与 `node_modules` 目录中的第三方 `fs` 模块发生混淆。
- 这个方式适用于 **ESM（ES 模块）** 和 **CommonJS**。



## 打包时去除debugger和console

Vite使用esbuild时默认不会主动帮你去除console，需要额外配置

```ts
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
```

需要注意的事

| 问题              | 原因                      | 解决办法                                                     |
| ----------------- | ------------------------- | ------------------------------------------------------------ |
| 配置后没生效      | 你用了 `minify: 'terser'` | `terser` 会覆盖 esbuild 的 `drop` 行为，要在 `terserOptions` 里配置 |
| 部分 console 还在 | console 是对象属性被保留  | 这种属于副作用，esbuild 不会删，比如 `window.console.log`    |



## https证书配置

ssl目录下一般有如下文件

| 文件           | 本质                 | 给谁用               | 是否包含私钥 |
| -------------- | -------------------- | -------------------- | ------------ |
| `cert.pem`     | **证书**             | 服务器 / 客户端      | ❌            |
| `private.key`  | **私钥**             | 服务器               | ✅            |
| `generate.cer` | **证书（DER 格式）** | Windows / Java       | ❌            |
| `generate.p12` | **证书 + 私钥打包**  | 浏览器 / 手机 / Java | ✅            |

```ts
https: {
  key: fs.readFileSync(path.resolve(__dirname, '../../ssl/private.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../ssl/cert.pem')),
},
```

