const debug = require('debug')('app:webpack:base');
const env = require('../base-config/environment');

const __DEV__ = env.__DEV__;

const pkg = require('../../package.json');

module.exports = (paths) => {
  const App = [paths.src('main.js')];
  const Vendors = [
    'react',
    'react-redux',
    'react-router',
    'redux',
    'react-dom'
  ].filter((dep) => {
    if (pkg.dependencies[dep]) return true;
    return debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`Vendors\` in this file`
    );
  });
  if (__DEV__) {
    App.unshift('webpack-hot-middleware/client');
    App.unshift('react-hot-loader/patch');
  }
  return {
    context: paths.root(),
    entry_vendors: Vendors,
    entry_app: App,
    devtool: __DEV__ ? 'eval' : 'cheap-source-map',
    output: {
      filename: '[name].[hash:8].js',
      path: paths.dist(),
      publicPath: '/'
    }
  };
};
