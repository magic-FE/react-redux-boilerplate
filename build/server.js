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
    // historyApiFallback: true,
    stats: {
      chunkModules: false,
      colors: true,
      chunks: false
    }
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.src('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

module.exports = app;
