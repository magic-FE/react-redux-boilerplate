// @flow
declare var __DEV__: boolean;
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
  declare type RouteProps = {
    path: string,
    component: ?React$Component<any, any, any> | ((props?: Object) => React$Element<any>),
    routes?: Array<Object>,
    exact?: boolean
  };
}
