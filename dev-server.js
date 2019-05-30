/* eslint-env node */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true
}).listen(3000, 'localhost', err => {
  /* eslint-disable no-console */
  if (err) {
    return console.log(err)
  }

  return console.log('Listening at http://localhost:3000/')
  /* eslint-enable */
})
