const debug = require('debug')('app:webpack:loaders');
const env = require('../base-config/environment');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const __DEV__ = env.__DEV__; // eslint-disable-line 
module.exports = () => {
  const loaders = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }, {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  }, {
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'less-loader']
  }, {
    test: /\.woff(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  }, {
    test: /\.woff2(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  }, {
    test: /\.otf(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  }, {
    test: /\.ttf(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  }, {
    test: /\.eot(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
  }, {
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  }, {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }];
  if (!__DEV__) {
    debug('Apply ExtractTextPlugin to CSS loaders.(非开发环境应用ExtractTextPluginLoaders到css loaders)');
    loaders.filter(loader => loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))).forEach((loader) => {
      const first = loader.loaders[0];
      const rest = loader.loaders.slice(1);
      loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
      delete loader.loaders;
    });
  }
  return loaders;
};
