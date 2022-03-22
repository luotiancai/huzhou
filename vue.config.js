const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.BASE_URL,
  configureWebpack: {
    resolve: {
      alias: {
        _v: resolve('src/views'),
        _c: resolve('src/components'),
        _u: resolve('src/utiles'),
        _a: resolve('src/assets')
      }
    }
  }
}
