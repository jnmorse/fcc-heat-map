const { resolve } = require('path')

module.exports = {
  output: {
    path: resolve(__dirname, '..', 'build')
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/u,
        exclude: /node_modules/u,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
