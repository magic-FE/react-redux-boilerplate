const cssnano = require('cssnano');

module.exports = {
  development: {
    performance: {
      hints: false,
      maxAssetSize: 2000000
    }
  },
  production: {
    performance: {
      hints: 'error',
      maxEntrypointSize: 1500000
    }
  },
  defaults: {
    stats: {
      chunkModules: false,
      colors: true,
      chunks: false
    },
    performance: {
      hints: 'warning'
    },
    vendors: [
      'react',
      'react-redux',
      'react-router',
      'redux',
      'react-dom'
    ],
    postcss: [
      cssnano({
        autoprefixer: {
          add: true,
          remove: true,
          browsers: ['last 2 versions']
        },
        discardComments: {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true
      })
    ]
  }
};
