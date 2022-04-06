### 使用Vue-Cli

package.json

```json
{
  "name": "frontend-learn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "@vue/composition-api": "^1.0.0-rc.12",
    "core-js": "^3.6.5",
    "element-ui": "^2.15.3",
    "vee-validate": "^3.4.9",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-vue": "^6.2.2",
    "prerender-spa-plugin": "^3.4.0",
    "prettier": "^2.2.1",
    "sass": "^1.26.5",
    "sass-loader": "^8.0.2",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "vue-template-compiler": "^2.6.11"
  }
}
```



使用less

```json
"less": "^3.0.4",
"less-loader": "^5.0.0",
```





#### babel.config.js

```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
}
```

#### .browserslistrc

```js
> 1%
last 2 versions
not dead
```

#### eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': ['error', { semi: false, singleQuote: true }],
  },
}
```



### Use Webpack

#### package.json

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server --config ./build/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./build/webpack.prod.js -o dist",
    "build:dev": "cross-env NODE_ENV=development webpack --config ./build/webpack.prod.js -o dist"
  },
  "dependencies": {
    "axios": "^0.24.0",
    "core-js": "^3.19.1",
    "vue": "^2.6.14",
    "vue-router": "^3.5.3"
  },
  "devDependencies": {
    "@babel/core": "^7.16.0",
    "@babel/preset-env": "^7.16.4",
    "babel-loader": "^8.2.3",
    "copy-webpack-plugin": "^10.2.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.5.1",
    "dotenv": "^10.0.0",
    "eslint": "^8.3.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.1.1",
    "eslint-webpack-plugin": "^3.1.1",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.4.5",
    "mini-svg-data-uri": "^1.4.3",
    "postcss-loader": "^6.2.0",
    "postcss-preset-env": "^7.0.1",
    "sass": "^1.43.4",
    "sass-loader": "^12.3.0",
    "style-loader": "^3.3.1",
    "terser-webpack-plugin": "^5.2.5",
    "ts-loader": "^9.2.6",
    "typescript": "^4.5.4",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "vue-loader": "^15.9.8",
    "vue-template-compiler": "^2.6.14",
    "webpack": "^5.64.0",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.5.0",
    "webpack-merge": "^5.8.0"
  }
}
```

#### eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends: ["plugin:vue/essential", "eslint:recommended"],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'eslint-config-prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 重写prettier验证规则
    'prettier/prettier': [
      'warn',
      // 针对会被 ESLint 格式化的文件类型，Prettier 会作为 ESLint 的一个规则运行并格式化文件，因此需要添加如下配置
      { semi: false, singleQuote: true, trailingComma: 'none' }
    ]
  }
}
```

#### babel.config.js

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { useBuiltIns: 'usage', corejs: 3.19, modules: false }
    ]
  ]
}
```



### Use Webpack4

#### 	package.json

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server --config ./build/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./build/webpack.prod.js -o dist",
    "build:dev": "cross-env NODE_ENV=development webpack --config ./build/webpack.prod.js -o dist"
  },
  "dependencies": {
    "axios": "^0.24.0",
    "core-js": "^3.19.1",
    "vue": "^2.6.14",
    "vue-router": "^3.5.3"
  },
  "devDependencies": {
    "@babel/core": "^7.16.0",
    "@babel/preset-env": "^7.16.4",
    "babel-loader": "^8.2.3",
    "copy-webpack-plugin": "^10.2.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.5.1",
    "dotenv": "^10.0.0",
    "eslint": "^8.3.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.1.1",
    "eslint-webpack-plugin": "^3.1.1",
    "html-webpack-plugin": "4.4.1",
    "less-loader": "6",
    "mini-css-extract-plugin": "^2.4.5",
    "mini-svg-data-uri": "^1.4.3",
    "postcss-loader": "^6.2.0",
    "postcss-preset-env": "^7.0.1",
    "sass": "^1.43.4",
    "sass-loader": "8",
    "style-loader": "^3.3.1",
    "terser-webpack-plugin": "^5.2.5",
    "ts-loader": "^9.2.6",
    "typescript": "^4.5.4",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "vue-loader": "^15.9.8",
    "vue-template-compiler": "^2.6.14",
    "webpack": "4",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.7.2",
    "webpack-merge": "^5.8.0"
  }
}
```

