/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const { resolve } = require('path')
const webpack = require('webpack')

const common = require('./common')

module.exports = merge(common, {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      resolve(__dirname, '../../', 'client')
    ]
  },
  devtool: 'eval-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss/u,
        exclude: /node_modules/u,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [new webpack.HashedModuleIdsPlugin()]
})
