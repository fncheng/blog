## 解压

unzip

```sh
$ unzip -o test.zip -d tmp/

-o：不必先询问用户，unzip执行后覆盖原有的文件；
-d<目录>：指定文件解压缩后所要存储的目录；
-n：解压缩时不要覆盖原有的文件；


-j：不处理压缩文件中原有的目录路径；
# unzip -j dist.zip 会将dist.zip内部的文件铺平(flat) 出来
```

