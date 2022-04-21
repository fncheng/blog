插件主页：https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar

## Vue2支持

1.安装`@vue/runtime-dom`

```sh
yarn add @vue/runtime-dom
```



2.配置tsconfig.json

```json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "build",
    "config",
    "dist",
    "static",
  ],
  "vueCompilerOptions": {
    "experimentalCompatMode": 2,
    "experimentalTemplateCompilerOptions": {
      "compatConfig": {
        "MODE": 2
      }
    }
  }
}
```

