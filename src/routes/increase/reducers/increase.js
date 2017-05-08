// 
import createReducers from '$utils/creators';
import type { Dispatch } from 'redux';

const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
/**
 * [incrementBase description]
 * @param  {Number} value [description]
 * @return {[type]}       [description]
 */
const incrementBase = (value: number = 1) => ({
  type: COUNTER_INCREMENT,
  payload: value,
});

/**
 * actions for this reducer
 */
const doubleAsync = () => (dispatch: Dispatch<*>, getState: () => Object) => {
  setTimeout(() => {
    dispatch(incrementBase(getState().result));
  }, 1200);
};
const increment = incrementBase;

export const actionCreatorMaps = {
  increment,
  doubleAsync,
};

export default createReducers(
  {
    [COUNTER_INCREMENT]: (state, action) => state + action.payload,
  },
  0
);
