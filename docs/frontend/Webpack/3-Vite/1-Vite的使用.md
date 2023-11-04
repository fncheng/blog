# Vite

## 处理图片

<img src="https://minimax-1256590847.cos.ap-shanghai.myqcloud.com/img/image-20230315153812420.png" alt="image-20230315153812420" style="zoom: 50%;" />

这是因为vite无法识别.PNG格式的文件，提示你需要在vite.config.js中配置assetsInclude字段。

```js
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.PNG']
})
```

这样设置之后便可以识别PNG文件了

## vite动态导入

我们在从vue2迁移到vue3时使用过一个api [import.meta.glob](https://cn.vitejs.dev/guide/features.html#glob-import)来解决动态导入的问题

- `import.meta.glob`: 通过动态导入`默认懒加载`，通过遍历加 `then` 方法可拿到对应的模块文件详情信息
- `import.meta.globEager`: 直接引入所有的模块, 即静态 `import`

两种方式都支持绝对路径和相对路径导入，不支持alias等路径别名

Vite 也支持带变量的动态导入

```js
const module = await import(`./dir/${file}.js`)
```

但是变量只支持一层深的文件名，如果file是`foo/bar`，导入将会失败

如果需要深层次的动态导入，可以使用glob导入



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
