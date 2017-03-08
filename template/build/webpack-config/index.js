const debug = require('debug')('app:webpack:index');
const paths = require('../base-config/path');

const alias = require('./alias')(paths);
const base = require('./base')(paths);
const loaders = require('./loaders')();
const plugins = require('./plugins')(paths);

debug('Creating configuration.(创建配置)');
module.exports = Object.assign({
  plugins,
  resolve: {
    alias
  },
  module: {
    loaders
  }
}, base);
