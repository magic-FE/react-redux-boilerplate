const debug = require('debug')('app:webpack:plugins');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = require('../base-config/environment');

const __DEV__ = env.__DEV__;
const __PROD__ = env.__PROD__;

module.exports = (paths) => {
  const plugins = [
    new webpack.DefinePlugin(env),
    new HtmlWebpackPlugin({
      template: paths.src('index.html'),
      hash: false,
      favicon: paths.src('static/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common']
    })
  ];
  if (__DEV__) {
    debug('Enable HMR,noErrors for development(开启开发环境插件)');
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin() //报错时不退出webpack进程
    );
  } else {
    debug('Apply ExtractTextPlugin.(非开发环境开启ExtractTextPlugin)');
    plugins.push(
      new ExtractTextPlugin('[name].[contenthash].css', {
        allChunks: true
      })
    );
  }
  if (__PROD__) {
    debug('Enable OccurenceOrder,Dedupe,UglifyJs for production(开启生产环境打包插件)');
    plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(), //根据模块使用情况 排序模块序号
      new webpack.optimize.DedupePlugin(), //避免重复模块
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    );
  }
  return plugins;
};
