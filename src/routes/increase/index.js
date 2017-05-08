import type StoreWithInjectAble from '$self-define';

export default (store: StoreWithInjectAble) => () => {
  import('./reducers').then(reducers => {
    store.injectAll(reducers.default);
  });
  return import('./IncreaseContainer');
};
