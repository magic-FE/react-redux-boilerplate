declare module '$self-define' {
  declare type StoreWithInjectAble = {
    inject: (namespace: any, reducer: any) => void,
    injectAll: (reducerMap: any) => void,
    clearReducers: () => void,
    dispatch: {
      type: any
    },
    getState(): any,
    subscribe(listener: () => void): () => void,
    replaceReducer(nextReducer: (state: any, action: any) => any): void
  };
  declare type routeProps = {
    path: string,
    component: (props?: Object) => React$Element<any>,
    routes?: Array<Object>,
    exact?: boolean
  };
}
