const express = require('express');
const debug = require('debug')('app:server');
const webpack = require('webpack');

const env = require('./base-config/environment');
const paths = require('./base-config/path');

const webpackConfig = require('./webpack-config');
const app = express();

// This rewrites all routes requests to the root /index.html file
app.use(require('connect-history-api-fallback')())

// Apply gzip compression
app.use(require('compression')())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (env.__DEV__) {
  const compiler = webpack(webpackConfig)
  debug('Enable webpack dev and HMR middleware(开启开发环境插件 webpack-dev 和 HRM 中间件)')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: paths.src(),
    lazy: false,
    stats: {
      chunkModules: false,
      colors: true,
      chunks: false
    }
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  app.use(express.static(paths.public()))
} else {
  debug(
    'Server is being run outside of live development mode ! ' +
  )
  app.use(express.static(paths.dist()))
}

module.exports = app;
