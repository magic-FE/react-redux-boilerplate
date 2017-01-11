const express = require('express');
const debug = require('debug')('app:build:server');
const env = require('./base-config/environment');
const paths = require('./base-config/path');

const app = express();

// This rewrites all routes requests to the root /index.html file
app.use(require('connect-history-api-fallback')());

// Apply gzip compression
app.use(require('compression')());

// Apply Webpack HMR Middleware
if (env.isDev) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack-config');
  const compiler = webpack(webpackConfig);
  debug('Apply webpack dev and HMR middleware(开启开发环境插件 webpack-dev 和 HRM 中间件)');
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: paths.src(),
    lazy: false,
    stats: env.config.stats,
    log: debug
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    heartbeat: 3000,
    log: debug
  }));

  app.use(express.static(paths.public()));
} else {
  debug('Server is being run outside of live development mode !');
  app.use(express.static(paths.dist()));
}

module.exports = app;
