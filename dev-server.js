var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err) {
  /* eslint-disable no-console */
  if (err) {
    return console.log(err)
  }

  console.log('Listening at http://localhost:3000/')
  /* eslint-enable */
})
