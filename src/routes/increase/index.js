export default store => ({
  path: 'increase',
  getComponent(nextState, cb) {
    Promise.all([
      System.import('./containers/IncreaseContainer'),
      System.import('./reducers')
    ]).then(([container, reducers]) => {
      store.injectAll(reducers.default);
      cb(null, container.default);
    });
  }
});
