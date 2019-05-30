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
    extensions: ['.js', '.jsx', '.scss']
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
    rules: [
      {
        test: /\.jsx?$/u,
        include: PATHS.app.src,
        exclude: /node_modules/u,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss/u,
        include: PATHS.app.src,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}

if (target === 'development') {
  finalConfig = merge(config, {
    mode: 'development',
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
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
} else {
  finalConfig = merge(config, { mode: 'production' })
}

module.exports = finalConfig
