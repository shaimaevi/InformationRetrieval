
'use strict'

const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CLIENT_SRC_PATH = 'src/client'
const CLIENT_BLD_PATH = 'dist/client'

module.exports = {
  CLIENT_SRC_PATH,
  CLIENT_BLD_PATH,
  // Merge functions
  merge (config) {
    // union arrays instead of overwrite
    const mergeLogic = (oth, src) => Array.isArray(oth) ? _.union(src, oth) : undefined
    // remove the merge function
    const withoutTheMerge = _.omit(this, ['merge', 'CLIENT_SRC_PATH', 'CLIENT_BLD_PATH'])
    // merge config
    return _.mergeWith(withoutTheMerge, config, mergeLogic)
  },
  // App entry
  entry: {
    app: [
      // App code
      `./${CLIENT_SRC_PATH}/index.js`
    ],
    vendor: [
      // polyfills
      'regenerator-runtime/runtime',
      // for material ui
      'react-tap-event-plugin',
      // react
      'react',
      'react-dom'
    ]
  },
  // Build output
  output: {
    // build output path
    path: path.join(__dirname, CLIENT_BLD_PATH),
    // web-facing root
    publicPath: '/'
  },
  // Module resolving
  resolve: {
    alias: {
      Components: path.resolve(__dirname, CLIENT_SRC_PATH, 'components')
    }
  },
  module: {
    rules: [
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
      title: 'Search engine',
      template: `./${CLIENT_SRC_PATH}/index.html`,
      chunksSortMode: 'dependency',
      mobile: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
}
