const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../..');

function base() {
  const args = [ROOT_PATH].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

module.exports = {
  root: base,
  src: base.bind(null, 'src'),
  dist: base.bind(null, 'dist'),
  server: base.bind(null, 'server')
};
