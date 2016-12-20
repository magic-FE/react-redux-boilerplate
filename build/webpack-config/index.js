const debug = require('debug')('app:webpack:index');
const paths = require('../base-config/path');

const alias = require('./alias')(paths);
const base = require('./base')(paths);
const loaders = require('./loaders')();
const plugins = require('./plugins')(paths);

debug('Creating configuration.(创建配置)');
module.exports = {
  entry: {
    app: base.entry_app,
    vendors: base.entry_vendors
  },
  output: base.output,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias
  },
  devtool: base.devtool,
  module: {
    loaders
  },
  performance: { hints: false },
  devServer: base.devServer,
  plugins
};
