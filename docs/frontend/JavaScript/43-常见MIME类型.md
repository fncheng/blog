### 常见 Excel 文件格式及 MIME 类型

| 文件扩展名 | 格式说明                               | MIME 类型                                                    |
| ---------- | -------------------------------------- | ------------------------------------------------------------ |
| `.xls`     | 旧版 Excel（二进制格式）               | `application/vnd.ms-excel`                                   |
| `.xlsx`    | 新版 Excel（OpenXML 格式）             | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| `.xlsm`    | 含有宏的新版 Excel 文件                | `application/vnd.ms-excel.sheet.macroEnabled.12`             |
| `.xltx`    | Excel 模板（OpenXML 格式）             | `application/vnd.openxmlformats-officedocument.spreadsheetml.template` |
| `.xltm`    | 含宏的 Excel 模板                      | `application/vnd.ms-excel.template.macroEnabled.12`          |
| `.csv`     | 逗号分隔值文件（Excel 可打开）         | `text/csv`                                                   |
| `.ods`     | OpenDocument Spreadsheet（非微软格式） | `application/vnd.oasis.opendocument.spreadsheet`             |

```ts
const allowedMimeTypes = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/markdown',
  'text/x-markdown',
  'application/pdf',
  'image/jpeg',
  'image/png',
  'audio/mpeg',
  'audio/wav'
  // 'audio/mp3'
]
```

