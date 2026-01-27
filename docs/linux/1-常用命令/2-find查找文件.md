## find命令

[文档](http://c.biancheng.net/view/779.html#:~:text=Linux%20find%E5%91%BD%E4%BB%A4%EF%BC%9A%E5%9C%A8%E7%9B%AE%E5%BD%95%E4%B8%AD%E6%9F%A5%E6%89%BE%E6%96%87%E4%BB%B6%EF%BC%88%E8%B6%85%E8%AF%A6%E8%A7%A3%EF%BC%89%201%20%E5%91%BD%E4%BB%A4%E5%90%8D%E7%A7%B0%EF%BC%9Afind%E3%80%82%202%20%E8%8B%B1%E6%96%87%E5%8E%9F%E6%84%8F%EF%BC%9Asearch%20for%20files,directory%20hierarchy.%203%20%E6%89%80%E5%9C%A8%E8%B7%AF%E5%BE%84%EF%BC%9A%2Fbin%2Ffind%E3%80%82%204%20%E6%89%A7%E8%A1%8C%E6%9D%83%E9%99%90%EF%BC%9A%E6%89%80%E6%9C%89%E7%94%A8%E6%88%B7%E3%80%82%205%20%E5%8A%9F%E8%83%BD%E6%8F%8F%E8%BF%B0%EF%BC%9A%E5%9C%A8%E7%9B%AE%E5%BD%95%E4%B8%AD%E6%9F%A5%E6%89%BE%E6%96%87%E4%BB%B6%E3%80%82)

### 查找文件

```sh
$ # find 搜索路径 [选项] 搜索内容
```

根据文件名

- -name: 按照文件名搜索；
- -iname: 按照文件名搜索，不区分文件名大小；
- -inum: 按照 inode 号搜索；

常见用例：


- 按文件名查找（最常用）： 在当前目录及其子目录下查找名为 App.vue 的文件。

  ```sh
  find . -name "App.vue"
  ```

  注意：这不是模糊搜索，如果要模糊搜索，请使用通配符 `*`

- **忽略大小写查找：**

  ```sh
  find . -iname "index.ts"
  ```

- **查找特定类型的资源：** 只在 `src` 目录下查找所有的 `.scss` 文件。

  ```sh
  find ./src -type f -name "*.scss"
  ```

- **根据文件大小查找：** 寻找项目中超过 500KB 的大文件（比如误传的静态资源）。

  ```sh
  find . -type f -size +500k
  ```

- **查找最近修改过的文件：** 查找过去 24 小时内修改过的 `.ts` 文件。

  ```sh
  find . -name "*.ts" -mtime -1
  ```





## sed

使用`sed`：

- 替换文本：`sed 's/old/new/g' file.txt`

  

- 删除行：`sed '/pattern/d' file.txt`

- 插入行：`sed '2i\new line' file.txt`

```sh
sed 's/foo/bar/g' file.txt # 将文件file.txt中所有的"foo"替换为"bar"
sed '/pattern/d' file.txt # 删除文件file.txt中所有匹配模式"pattern"的行
sed '2i\new line' file.txt # 在文件file.txt的第二行之前插入"new line"
```

