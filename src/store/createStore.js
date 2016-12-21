import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import makeRootReducer from 'UTILS/reducerTool';
import { browserHistory } from 'react-router';
import { updateLocation } from 'REDUCERS/location';

const logger = createLogger();
export default (initialState = {}) => {
  const middleware = [thunk, logger];

  const enhancers = [];
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store));
  if (module.hot) {
    module.hot.accept('../utils/reducerTool', () => {
      System.import('../utils/reducerTool').then((module) => {
        const makeReducer = module.default;
        store.replaceReducer(makeReducer(store.asyncReducers));
      });
    });
  }

  return store;
};
