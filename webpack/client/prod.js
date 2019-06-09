/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const { resolve } = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = require('./common')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    bundle: resolve(__dirname, '../../', 'client')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss/u,
        exclude: /node_modules/u,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'client/styles/[name].css',
      chunkFilename: 'client/styles/[id].css'
    })
  ]
})
