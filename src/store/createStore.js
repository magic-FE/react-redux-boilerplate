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

  // Anywhere, you can call store.unsubscribeHistory() to cancel subscribe;
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('../utils/reducerTool', () => {
      const makeReducer = require('../utils/reducerTool').default;
      store.replaceReducer(makeReducer(store.asyncReducers));
    });
  }

  return store;
};
