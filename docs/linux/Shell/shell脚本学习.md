打包shell

```sh
#!/bin/bash

# 获取当前时间并格式化为MMddHHmm
SOURCE_DIR="skybox-dialog"
TIMESTAMP=$(date +"-%m%d-%H%M")

# 设置压缩包名称
ZIP_NAME="${SOURCE_DIR}-Build${TIMESTAMP}.zip"


if [ ! -d "${SOURCE_DIR}" ]; then
    echo "错误：${SOURCE_DIR}目录不存在"
    echo "创建${SOURCE_DIR}目录"
    mkdir -p ${SOURCE_DIR}
    echo "创建成功"
fi

# 运行构建命令
echo "正在构建项目..."
cd ${SOURCE_DIR}
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "构建失败，退出打包流程"
    exit 1
fi

echo "构建成功，开始打包..."
cd ..

# 创建压缩包
echo "正在创建压缩包 ${ZIP_NAME}..."
zip -r "${ZIP_NAME}" ${SOURCE_DIR}/

# 检查压缩是否成功
if [ $? -eq 0 ]; then
    echo "压缩包创建成功：${ZIP_NAME}"
else
    echo "压缩包创建失败"
    exit 1
fi
```



### 1.8构建脚本

1.8版本采用monorepo架构，各子项目的目录层级都有变化

```sh
#!/bin/bash

# 获取当前时间并格式化为MMddHHmm
PROJECT_DIR="app/agent-base"
SOURCE_DIR="skybox-base"
TIMESTAMP=$(date +"-%m%d-%H%M")

# 设置压缩包名称
ZIP_NAME="${SOURCE_DIR}-Build${TIMESTAMP}.zip"

# 检查项目目录是否存在
if [ ! -d "${PROJECT_DIR}" ]; then
    echo "错误：${PROJECT_DIR}目录不存在"
    exit 1
fi

# 进入项目目录
cd ${PROJECT_DIR}

# 检查skybox-base目录是否存在
if [ ! -d "${SOURCE_DIR}" ]; then
    echo "错误：${SOURCE_DIR}目录不存在"
    echo "正在创建${SOURCE_DIR}目录..."
    mkdir -p "${SOURCE_DIR}"
    echo "创建成功"
fi

# 运行构建命令
echo "正在构建项目..."
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "构建失败，退出打包流程"
    exit 1
fi

echo "构建成功，开始打包..."

# 创建压缩包
echo "正在创建压缩包 ${ZIP_NAME}..."
zip -r "../../${ZIP_NAME}" ${SOURCE_DIR}/

# 检查压缩是否成功
if [ $? -eq 0 ]; then
    echo "压缩包创建成功：${ZIP_NAME}"
    echo "压缩包位置：$(pwd)/../../${ZIP_NAME}"
else
    echo "压缩包创建失败"
    exit 1
fi
```

