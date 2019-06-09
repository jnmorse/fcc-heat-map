/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const { resolve } = require('path')
const webpackNodeExternals = require('webpack-node-externals')

const base = require('../base')

module.exports = merge(base, {
  name: 'server',
  target: 'node',

  externals: [webpackNodeExternals()],

  entry: {
    server: resolve(__dirname, '../../', 'server')
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },

  mode: 'production'
})
