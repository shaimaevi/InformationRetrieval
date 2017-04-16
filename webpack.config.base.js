
'use strict'

const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // Merge functions
  merge (config) {
    // union arrays instead of overwrite
    const mergeLogic = (oth, src) => Array.isArray(oth) ? _.union(src, oth) : undefined
    // remove the merge function
    const withoutTheMerge = _.omit(this, ['merge'])
    // merge config
    return _.mergeWith(withoutTheMerge, config, mergeLogic)
  },
  // App entry
  entry: {
    app: [
      // App code
      './src/index.js'
    ],
    vendor: [
      // polyfills
      'regenerator-runtime/runtime',
      // for material ui
      'react-tap-event-plugin',
      // react
      'react',
      'react-dom',
      // router
      'react-router-dom',
      'history/createBrowserHistory'
    ]
  },
  // Build output
  output: {
    // build output path
    path: path.join(__dirname, 'dist'),
    // web-facing root
    publicPath: '/'
  },
  // Module resolving
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src', 'components')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  plugins: [
    // Separate vendors
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // browser caching
    }),
    // Create html
    new HtmlWebpackPlugin({
      title: 'Mycure v3',
      template: './src/index.html',
      chunksSortMode: 'dependency',
      mobile: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
}
