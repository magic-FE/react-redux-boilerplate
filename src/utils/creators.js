const createReducers = (actionHandles, initialState) =>
  (state = initialState, action) => {
    const handler = actionHandles[action.type];
    return handler ? handler(state, action) : state;
  };

export default createReducers;
