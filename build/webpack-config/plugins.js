const debug = require('debug')('app:webpack:plugins');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const env = require('../base-config/environment');

const isDev = env.__DEV__;
const isProd = env.__PRO__;

module.exports = paths => {
  const plugins = [
    new webpack.DefinePlugin(env),
    new HtmlWebpackPlugin({
      template: paths.src('index.html'),
      hash: false,
      favicon: paths.src('static/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'],
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: env.config.postcss,
      },
    }),
  ];
  if (isDev) {
    debug('Enable HMR,noErrors for development');
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin() // 报错时不退出webpack进程
    );
  } else {
    debug('Apply ExtractTextPlugin.');
    plugins.push(
      new ExtractTextPlugin({
        filename: '[name].[hash:8].css',
        allChunks: true,
      })
    );
  }
  if (isProd) {
    debug('Enable OccurenceOrder,UglifyJs for production.');
    plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(), // 根据模块使用情况 排序模块序号
      new PrepackWebpackPlugin({
        test: /\.js($|\?)/i,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false,
        },
      })
    );
  }
  return plugins;
};
