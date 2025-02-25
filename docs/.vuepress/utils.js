const fs = require('fs')
const path = require('path')
/**
 * 将相对路径转换为绝对路径
 * @returns
 */
function resolve() {
  let filePath = Array.from(arguments)
  return path.resolve(__dirname, ...filePath)
}
// console.log(resolve('/Users/cheng/Nutstore Files/我的坚果云/blog/docs/frontend/Git/Flow'));
/**
 * 自动设置侧边栏
 * 返回结果为  Array<文件名.md>
 * resolve(filePath) 返回路径全名 将相对路径改为绝对路径
 * @param {String} filePath 路径
 * @returns 一个md文件名的数组
 */
function getSidebar(filePath, count = 0) {
  console.log('filePath: ', filePath)
  let res = []
  // console.log('绝对路径', resolve(filePath))
  fs.readdirSync(resolve(filePath)).map((val) => {
    // console.log('val', val)
    // val 为文件夹或文件的名字
    let absoultePath = resolve('./', filePath, val) // 将文件或文件夹的路径转换为绝对路径
    // console.log('absoultePath: ', absoultePath)
    // 如果是文件夹
    if (fs.statSync(absoultePath).isDirectory()) {
      // console.log('是文件夹')
      res.push({ title: val, children: getSidebar(`${filePath}${val}/`, 1) })
    }
    // 如果是file
    else {
      // console.log('是文件', /md$/i.test(val))
      // count!==0 表示该目录是子菜单， push的值为 '../frontend/Webpack/'.slice(2) + val
      ;/md$/i.test(val) && count === 0 ? res.push(val) : res.push(`${filePath.slice(2)}${val}`)
    }
  })
  res = res.sort((a, b) => a.split('-')[0] - b.split('-')[0])
  return res
  // return fs.readdirSync(resolve(filePath)).filter((val) => /md$/.test(val))
}

/**
 * Constructs a sidebar by reading all markdown files in the specified directory.
 * 返回结果为 Array<目录/文件.md>
 * setSidebar生成的是children的值，适用于更精细化的控制
 *
 * @param {String} filePath - The path to the directory containing markdown files.
 * @returns {Array<String>} An array of strings representing the relative paths to the markdown files.
 */
const setSidebar = (filePath) => {
  const folders = filePath.split('/')
  const name = folders[folders.length - 2]
  return fs
    .readdirSync(resolve(filePath))
    .filter((val) => /md$/i.test(val))
    .sort((a, b) => a.split('-')[0] - b.split('-')[0]) // 排序从小到大
    .map((file) => `${name}/${file}`)
}

module.exports = {
  getSidebar,
  setSidebar
}
