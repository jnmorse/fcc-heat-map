/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')

const base = require('../base')

module.exports = merge(base, {
  name: 'client',
  target: 'web',

  output: {
    filename: 'client/js/[name].js',
    chunkFilename: 'client/js/[id].js'
  },

  module: {
    rules: []
  }
})
