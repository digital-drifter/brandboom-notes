const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.devServer
      .host('0.0.0.0')
      .port(process.env.VUE_APP_PORT)
      .public(process.env.VUE_APP_URL)
      .hot(true)
      .https(false)
  }
}
