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
    // console.log(fs.statSync(resolve(val)))
    // if (fs.statSync(val).isDirectory()) {
    //   console.log(123)
    // }
  })
  // console.log('result', res)
  return res
  // return fs.readdirSync(resolve(filePath)).filter((val) => /md$/.test(val))
}
function main(path) {
  let res = []
  res.push(utilSidebar(resolve(path)))
  console.log('res', res)
}
/**
 * @description:
 * @param {*} absoultePath 绝对路径
 * @return {*}
 */
function utilSidebar(path) {
  fs.readdirSync(path).map((val) => {
    // console.log('val', val)
    // val 为文件夹或文件的名字
    let absoultePath = resolve(path, val) // 将文件或文件夹的路径转换为绝对路径
    // console.log('absoultePath: ', absoultePath)
    // 如果是文件夹
    if (fs.statSync(absoultePath).isDirectory()) {
      console.log('是文件夹')
      return { title: val, children: [utilSidebar(absoultePath)] }
    }
    // 如果是file
    else {
      // console.log('是文件', /md$/i.test(val))
      return /md$/i.test(val) && val
    }
  })
}
console.log('%j', getSidebar('../frontend/Git/'))
// console.log(JSON.stringify(setSidebar('../frontend/JavaScript/')))
// console.log('%j', main('../frontend/JavaScript/'))

module.exports = getSidebar
