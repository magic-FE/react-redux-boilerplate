import createReducers from 'UTILS/creators';

const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
/**
 * [incrementBase description]
 * @param  {Number} value [description]
 * @return {[type]}       [description]
 */
const incrementBase = (value = 1) => ({
  type: COUNTER_INCREMENT,
  payload: value
});

/**
 * actions for this reducer
 */
const doubleAsync = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch(incrementBase(getState().increase));
  }, 1200);
};
const increment = () => incrementBase(1);

export const actionCreatorMaps = {
  increment,
  doubleAsync
};

export default createReducers({
  [COUNTER_INCREMENT]: (state, action) => state + action.payload
}, 0);
