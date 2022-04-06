## 记一次heic格式图片转换

自ios15开始，iPhone默认拍出来的照片格式为heic格式，由于浏览器不支持heic格式的图片。所以在web端需要自行转换。

转换工具：使用heic2any

[getting-started](https://github.com/alexcorvi/heic2any/blob/master/docs/getting-started.md)

[heic2any使用教程codesandbox](https://codesandbox.io/s/heic-conversion-forked-l16cq?file=/src/index.js)

[源代码](https://github.com/alexcorvi/heic2any/blob/master/src/heic2any.ts)

```js
heic2any({
  blob: selectedFile, // 将heic转换成一个buffer数组的图片
  toType: 'image/jpeg', //要转化成具体的图片格式，可以是png/gif
  quality: 0.6, // 图片的质量，参数在0-1之间
}).then(
  async (
    /**
     * @description:
     * @param {Blob} result Blob类型
     */
    result
  ) => {
    console.log('result: ', result)

    /* 预览图片 */
    let reader = new FileReader()
    reader.onload = (e) => {
      let imgBase64 = e.target.result
      console.log('imgBase64: ', imgBase64)
      img.src = imgBase64
      img.height = 320
    }
    reader.readAsDataURL(result)
    /* 压缩图片 */
    let compressFile = await this.compressPic(result)
    /* 调用上传图片 */
    this.uploadFile(compressFile)
  }
)
```

配合compressorjs压缩图片

```js
/**
 * @description: 压缩图片
 * @param {File} file
 * @return {*}
 */
 compressPic(file) {
  console.log('开始压缩', file)
  return new Promise((resolve) => {
    new Compressor(file, {
      quality: 0.6,
      success(res) {
        console.log('res: ', res)
        resolve(res)
      }
    })
  })
}
```

