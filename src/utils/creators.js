const createReducers = (actionHandles: Object, initialState: any) => (
  state: any = initialState,
  action: () => Object
) => {
  const handler = actionHandles[action.type];
  return handler ? handler(state, action) : state;
};

export default createReducers;
