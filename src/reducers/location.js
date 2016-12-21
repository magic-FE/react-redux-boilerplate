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
export const updateLocation = ({ dispatch }) =>
  nextLocation =>
  dispatch(locationChange(nextLocation));

export default (state = null, action) =>
(action.type === LOCATION_CHANGE ? action.payload : state);
