const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const PATHS = {
  app: {
    src: path.resolve(__dirname, 'client'),
    build: path.resolve(__dirname, 'public')
  }
}

const target = process.env.NODE_ENV || 'development'

let finalConfig

const config = {
  resolve: {
    extendsions: ['', '.js', '.jsx', '.scss']
  },
  entry: {
    bundle: PATHS.app.src
  },
  output: {
    path: PATHS.app.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/u,
        include: PATHS.app.src,
        loader: 'babel'
      },
      {
        test: /\.scss/u,
        include: PATHS.app.src,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (target === 'development') {
  finalConfig = merge(config, {
    entry: {
      bundle: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        PATHS.app.src
      ]
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
} else {
  finalConfig = merge(config, {})
}

module.exports = finalConfig
