## Gulp

gulpfile.js

项目根目录中的gulpfile.js，是Gulp的配置文件。下面就是一个典型的gulpfile.js文件。

```js
const gulp = require('gulp')

function defaultTask(cb) {
  // place code for your default task here
  console.log(123)
  cb()
}

gulp.task('minify', function () {
  gulp.src('./main.js').pipe(gulp.dest('build'))
})

exports.default = defaultTask
```

