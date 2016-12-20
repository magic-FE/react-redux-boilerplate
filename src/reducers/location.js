import { createReducer } from 'REDUCER_TOOL';

// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => nextLocation => dispatch(locationChange(nextLocation));

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer({
  [LOCATION_CHANGE]: (state, action) => action.payload
}, null);
