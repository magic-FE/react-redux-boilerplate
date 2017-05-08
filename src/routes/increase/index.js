import type { StoreWithInjectAble } from '$self-define';

export default (store: StoreWithInjectAble) => () =>
  import('./IncreaseContainer').then(result => result.default(store));
