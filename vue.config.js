const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.devServer
      .host('0.0.0.0')
      .port(5000)
      .public('notes.brandboom.localhost')
      .hot(true)
      .https(true)
      .headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      })
      // .proxy({
      //   '/api': {
      //     target: {
      //       host: "0.0.0.0",
      //       protocol: 'https:',
      //       port: 5000
      //     },
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      //   }
      // })
  }
}
