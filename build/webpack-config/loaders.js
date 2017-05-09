const debug = require('debug')('app:webpack:loaders');
const env = require('../base-config/environment');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = env.__DEV__;
const isProd = env.__PRO__;
module.exports = () => {
  const rules = [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{ loader: 'babel-loader' }],
    },
    {
      test: /\.json$/,
      use: [{ loader: 'json-loader' }],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            minimize: isProd,
          },
        },
      ],
    },
    {
      test: /\.(less|css)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            minimize: isProd,
            module: true,
            camelCase: true,
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: !isProd,
          },
        },
      ],
    },
    {
      test: /\.(png|jpg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024 * 4,
            useRelativePath: isProd,
            name: `images/[name].${env.config.hash}.[ext]`,
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|otf|ttf|eot)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10,
            useRelativePath: isProd,
            name: `fonts/[name].${env.config.hash}.[ext]`,
          },
        },
      ],
    },
    {
      test: /\.(txt|svg)$/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    },
  ];
  if (!isDev) {
    debug('Apply ExtractTextPlugin to CSS loaders.');
    rules
      .filter(
        rule => rule.use && rule.use.find(loaderObj => /css/.test(loaderObj.loader.split('?')[0]))
      )
      .forEach(rule => {
        const first = rule.use[0];
        const rest = rule.use.slice(1);
        rule.loader = ExtractTextPlugin.extract({
          fallback: first,
          loader: rest,
        });
        delete rule.use;
      });
  }
  return rules;
};
