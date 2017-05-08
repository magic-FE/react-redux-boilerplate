// @flow
export type props = {
  path: string,
  component: () => ReactElement<*>,
  routes?: Array<Object>,
  exact?: boolean
};
