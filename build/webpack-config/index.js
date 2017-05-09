const debug = require('debug')('app:webpack:index');
const paths = require('../base-config/path');

const alias = require('./alias')(paths);
const base = require('./base')(paths);
const loaders = require('./loaders')();
const plugins = require('./plugins')(paths);

debug('Creating configuration.');
module.exports = Object.assign(
  {
    plugins,
    resolve: {
      alias,
    },
    module: {
      loaders,
    },
  },
  base
);
