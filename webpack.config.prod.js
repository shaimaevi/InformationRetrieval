
'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const base = require('./webpack.config.base')

const config = base.merge({
  output: {
    // add chaching
    filename: '[name].[chunkhash].js'
  },
  devtool: 'nosources-source-map', // 'source-map',
  // Testing performance
  performance: {
    hints: 'warning'
  },
  // Profiling
  profile: true,
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
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // CSS
    new ExtractTextPlugin({
      filename: 'style-[hash].css',
      disable: false,
      allChunks: true
    }),
    // Minimize
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    // Compress
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // Stats
    new Visualizer({
      filename: '../stats-dst.html'
    }),
    // Create icons / manifest
    new FaviconsWebpackPlugin({
      logo: './src/logo.png',
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: '#fff',
      title: 'Mycure App',
      online: true,
      preferOnline: true,
      icons: {
        // FIXME: inject manifest to html
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true,
        favicons: true
      },
      // FIXME: Extra Manifest details for android
      extraManifest: {
        appDescription: 'Mycure V3 Webapp',
        version: '3.0',
        // For mobile
        start_url: '/?homescreen=1',
        orientation: 'portrait',
        display: 'standalone'
      }
    })
  ]
})

module.exports = config
