const debug = require('debug')('app:webpack:loaders');
const env = require('../base-config/environment');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = env.isDev;
module.exports = () => {
  const loaderArray = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }, {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader']
  }, {
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
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
  if (!isDev) {
    debug('Apply ExtractTextPlugin to CSS loaders.(非开发环境应用ExtractTextPluginLoaders到css loaders)');
    loaderArray.filter(loaderObj => loaderObj.loaders && loaderObj.loaders.find(name => /css/.test(name.split('?')[0])))
      .forEach((loaderObj) => {
        const first = loaderObj.loaders[0]; // except style-loader
        const rest = loaderObj.loaders.slice(1);
        loaderObj.loader = ExtractTextPlugin.extract({ fallbackLoader: first, loader: rest.join('!') });
        delete loaderObj.loaders;
      });
  }
  return loaderArray;
};
