const fs = require('fs')

const path = require('path')
/**
 * 将相对路径转换为绝对路径
 * @returns
 */
function resolve() {
  let filePath = Array.from(arguments)
  console.log('filePath: ', filePath)
  return path.resolve(__dirname, ...filePath)
}

function setSidebar(filePath, folderName) {
  const filesArr = fs.readdirSync(resolve(filePath)).filter((val) => /md$/i.test(val))
  const result = res.map((val) => `${folderName}/${val}`)
  // console.log('filePath', result)
  return filesArr.map((val) => `${folderName}/${val}`)
}
// setSidebar('../frontend/vue/Vue学习/', 'Vue学习')

/**
 * 输入目录名，后返回该目录下所有文件，并加上folerName作为前缀
 * @param {*} filePath
 * @param {*} folderName
 * @returns
 */
const setSidebar = (filePath, folderName) =>
  fs
    .readdirSync(resolve(filePath))
    .filter((val) => /md$/i.test(val))
    .map((file) => `${folderName}/${val}`)

