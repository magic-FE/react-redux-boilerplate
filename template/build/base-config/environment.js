const NODE_ENV = process.env.NODE_ENV || 'development';
const envConfigs = require('./configs');

module.exports = {
  /**
   * why?  you can see:
   * https://fb.me/react-minification
   * http://stackoverflow.com/questions/30030031
   */
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV)
  },
  env: NODE_ENV,
  isDev: NODE_ENV === 'development',
  isProd: NODE_ENV === 'production',
  isTest: NODE_ENV === 'test',
  config: Object.assign(envConfigs.defaults, envConfigs[NODE_ENV] || {})
};
