import { createReducer } from 'REDUCER_TOOL';

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
    dispatch(incrementBase(getState().counter));
  }, 1200);
};
const increment = () => incrementBase(1);

export const actions = {
  increment,
  doubleAsync
};

export default createReducer({
  [COUNTER_INCREMENT]: (state, action) => state + action.payload
}, 0);
