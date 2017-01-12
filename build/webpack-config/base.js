const debug = require('debug')('app:webpack:base');
const env = require('../base-config/environment');

const isDev = env.isDev;
const envConfig = env.config;

const pkg = require('../../package.json');

module.exports = (paths) => {
  const App = [paths.src('main.js')];
  const Vendors = envConfig.vendors.filter((dep) => {
    if (pkg.dependencies[dep]) return true;
    return debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from "Vendors" in this file`
    );
  });
  if (isDev) {
    App.unshift('webpack-hot-middleware/client');
  }
  return {
    context: paths.root(),
    entry: {
      app: App,
      vendors: Vendors
    },
    devtool: isDev ? 'eval' : 'cheap-source-map',
    output: {
      filename: '[name].[hash:8].js',
      path: paths.dist(),
      publicPath: '/'
    },
    performance: envConfig.performance
  };
};
