---
title: github action构建
---




```yaml
# This workflow will do a clean install of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: build and deploy CI

on:
  push:
    branches: [ dev ]
  pull_request:
    branches: [ dev ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x, 14.x, 16.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    # 安装依赖
    - run: yarn
    # 打包构建
    - run: yarn doc:build
    # 发布到GitHub Pages
    - name: Deploy
      

```



## github action只在指定push时才会构建

上面的github action在每次git push时都会去构建，这样一来实际上比较浪费

我需要在git push添加某个参数时才会自动构建

可以使用以下代码来指定条件，从而控制何时触发构建：

```yaml
on:
  push:
    branches:
      - master
    paths:
      - '**'
   # ...
    if: ${{ contains(github.event.head_commit.message, '[build]') }}
```

这段代码会在Git push时，将代码推送到“master”分支时触发。同时，它指定了可选参数“[build]”，只有在push时提交的消息中包含该参数时，Github Actions才会执行后续的构建过程。

其中，`if`关键词可以用于指定条件，它接受一个表达式作为参数。在这个例子中，使用了$ { {}}语法来指定Github Actions运行之前必须满足的条件。`contains()`方法用于检查推动消息是否包含 `[build]` 参数。如果包含，则触发Github Actions构建过程，否则不触发。

如果您想在提交信息中添加 `[build]` 参数，可以这样写：

```sh
git commit -m "[build] add new features"
```

需要注意的是`if` 语句只对步骤（step）本身起作用，而不是后面的步骤

将GitHub Pages构建流程修改后：

```yml
steps:
  - name: Checkout
    if: ${{ contains(github.event.head_commit.message, '[build]') }}
    uses: actions/checkout@master

  - name: vuepress-deploy
    if: ${{ contains(github.event.head_commit.message, '[build]') }}
    uses: jenkey2011/vuepress-deploy@master
```

这样设置后两个steps都会去判断git push的message中是否有[build]字段

但是每次推送后还是会先创建一个Ubuntu环境

可以给job也加上判断吗

当然可以。和workflow中的jobs类似，您可以使用条件表达式对单独的job进行筛选，只有满足特定条件时才会运行。以下是示例：

```yml
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'push' }}

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Build
        run: make build

      - name: Test
        run: make test

  deploy:
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'push' && github.ref == 'refs/heads/main' }}

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Build
        run: make build

      - name: Deploy to production
        run: ./deploy.sh
```



最终我们的workflow就会变成这样

当不满足构建要求后，workflow会直接跳过，避免了性能的浪费



### ACCESS_TOKEN

secrets.ACCESS_TOKEN通常是指Classic tokens（传统令牌）而不是Fine-grained tokens（细粒度令牌）。
