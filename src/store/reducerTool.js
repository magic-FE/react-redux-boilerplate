import { combineReducers } from 'redux';
import locationReducer from 'REDUCERS/location';

const makeRootReducer = asyncReducers => combineReducers({
  location: locationReducer,
  ...asyncReducers
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export const createReducer = (actionHandles, initialState) =>
  (state = initialState, action) => {
    const handler = actionHandles[action.type];
    return handler ? handler(state, action) : state;
  };

export default makeRootReducer;
