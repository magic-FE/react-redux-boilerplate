
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  __DEV__: NODE_ENV === 'development',
  __PROD__: NODE_ENV === 'production',
  __TEST__: NODE_ENV === 'test',
};
