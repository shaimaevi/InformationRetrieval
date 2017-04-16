
'use strict'

const webpack = require('webpack')
const base = require('./webpack.config.base')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000
const PROXY_URL = `http://${HOST}:${PORT}`

const PROXY_HOST = process.env.PROXY_HOST /* change to '0.0.0.0' to expose externally */ || HOST
const PROXY_PORT = process.env.PROXY_PORT || 9090

const config = base.merge({
  entry: {
    app: [
      // activate HMR for React
      'react-hot-loader/patch',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      `webpack-dev-server/client?http://${PROXY_HOST}:${PROXY_PORT}`,
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    // no chaching
    filename: '[name].js'
  },
  devtool: 'eval', // 'cheap-module-eval-source-map',
  devServer: {
    // Serve content from build path
    contentBase: base.output.path,
    // Reference to public path
    publicPath: base.output.publicPath,
    // Gzip compression
    compress: true,
    // Development port
    port: PROXY_PORT,
    // Minimal Logging
    clientLogLevel: 'none',
    // noInfo: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // For SPA
    historyApiFallback: true,
    // For external use
    host: PROXY_HOST,
    // HMR
    hot: true,
    // Config for minimal console.log mess
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },
    // Proxy
    proxy: {
      '/api': {
        target: PROXY_URL,
        secure: false,
        changeOrigin: true,
        default: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', { 'modules': false }],
              'stage-0',
              'react'
            ],
            plugins: ['react-hot-loader/babel']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin()
  ]
})

module.exports = config
