import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import location, { updateLocation } from 'REDUCERS/location';
import createStore from './createInjectAbleStore';

export default (initialState = {}) => {
  const middleware = [thunk];

  const enhancers = [];
  const globalReducerMaps = [];

  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
    // push logger middleware
    const logger = require('redux-logger')(); //eslint-disable-line
    middleware.push(logger);
  }

  const store = createStore(
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    ), { location }
  );
  browserHistory.listen(updateLocation(store));
  // inject global reducers
  store.injectAll(globalReducerMaps);

  // store.asyncReducers = {};

  // // Anywhere, you can call store.unsubscribeHistory() to cancel subscribe;
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  // // Make reducers hot reloadable, see http://mxs.is/googmo
  // if (module.hot) {
  //   module.hot.accept('../utils/reducerTool', () => {
  //     const makeReducer = require('../utils/reducerTool').default;
  //     store.replaceReducer(makeReducer(store.asyncReducers));
  //   });
  // }

  return store;
};
