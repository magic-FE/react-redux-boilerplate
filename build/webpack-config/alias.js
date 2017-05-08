/**
 * https://docs.npmjs.com/files/package.json#name,
 * this alias name have to not support package name;
 */
module.exports = paths => ({
  '$utils': paths.src('utils'),
  '$components': paths.src('components'),
  '$containers': paths.src('containers'),
  '$styles': paths.src('styles'),
  '$reducers': paths.src('reducers'),
  '$layouts': paths.src('layouts'),
  '$flow-typed': paths.root('flow-typed'),
});
