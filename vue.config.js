const path = require('path')

module.exports = {
  chainWebpack: config => {
    // config.plugin('copy').tap(args => [...args, [
    //   {
    //     from: path.resolve(__dirname, 'src', 'assets', 'fonts'),
    //     to: path.resolve(__dirname, 'public', 'fonts'),
    //     toType: 'dir',
    //     test: /\.(tff|woff2|woff|eot)$/,
    //     ignore: [
    //       '.txt'
    //     ]
    //   }
    // ]])
  }
}
