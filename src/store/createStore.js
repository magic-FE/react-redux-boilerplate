import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { updateLocation } from 'REDUCERS/location';

import makeRootReducer from './reducerTool';

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
  // if (module.hot) {
  //   module.hot.accept('./reducerTool', () => {
  //     const reducers = require('./reducerTool').default;
  //     store.replaceReducer(reducers(store.asyncReducers));
  //   });
  // }

  return store;
};
