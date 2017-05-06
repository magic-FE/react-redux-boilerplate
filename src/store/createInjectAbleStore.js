/**
 * author: lelandrichardson
 * https://github.com/lelandrichardson/redux-injectable-store
 */
import { createStore, combineReducers } from 'redux';

const FAKE_INITIAL_REDUCER_NAMESPACE = '___';
const IDENTITY_REDUCER = (state = null) => state;

const makeEmptyReducerMap = () => ({
  // putting this here because `combineReducers` will complain if there isn't at least
  // one reducer initially.
  [FAKE_INITIAL_REDUCER_NAMESPACE]: IDENTITY_REDUCER
});

const createInjectableStore = (preloadedState, enhancer, defaultReducers) => {
  let reducers = defaultReducers || makeEmptyReducerMap();
  const store = createStore(combineReducers(reducers), preloadedState, enhancer);

  const replace = () => {
    store.replaceReducer(combineReducers(reducers));
  };

  const clearReducers = () => {
    reducers = defaultReducers || makeEmptyReducerMap();
  };

  const inject = (namespace, reducer) => {
    if (reducers[namespace] == null) {
      reducers[namespace] = reducer;
      replace();
    }
  };

  const injectAll = (reducerMap) => {
    let hasChanged = false;
    Object.keys(reducerMap).forEach((namespace) => {
      if (reducers[namespace] == null) {
        reducers[namespace] = reducerMap[namespace];
        hasChanged = true;
      }
    });
    if (hasChanged) {
      replace();
    }
  };

  return {
    ...store,
    inject,
    injectAll,
    clearReducers
  };
};

export default createInjectableStore;
