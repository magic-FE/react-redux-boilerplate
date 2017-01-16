const debug = require('debug')('app:webpack:loaders');
const env = require('../base-config/environment');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = env.isDev;
module.exports = () => {
  const rules = [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{ loader: 'babel-loader' }]
  }, {
    test: /\.json$/,
    use: [{ loader: 'json-loader' }]
  }, {
    test: /\.css|\.less|\.sass$/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: env.config.css
    }, {
      loader: 'postcss-loader'
    }]
  }, {
    test: /\.(png|jpg)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }]
  }];
  if (!isDev) {
    debug('Apply ExtractTextPlugin to CSS loaders.(非开发环境应用ExtractTextPluginLoaders到css loaders)');
    rules.filter(rule => rule.loaders && rule.loaders.find(loaderObj => /css/.test(loaderObj.loader.split('?')[0])))
      .forEach((loaderObj) => {
        const first = loaderObj.loaders[0]; // except style-loader
        const rest = loaderObj.loaders.slice(1);
        loaderObj.loader = ExtractTextPlugin.extract({ fallbackLoader: first, loader: rest.join('!') });
        delete loaderObj.loaders;
      });
  }
  return rules;
};
