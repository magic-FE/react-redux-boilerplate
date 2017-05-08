// @flow
import React from 'react';
import Header from '$components/Header';
import RouteWithSubRoutes from '$components/RouteWithSubRoutes';
import bundleLoader from '$utils/bundle';
import Home from './home';
import Increase from './increase';
import type { StoreWithInjectAble } from '$self-define';

function routes(store): Array<routeProps> {
  return [
    {
      path: '/',
      component: bundleLoader(Home),
      exact: true,
    },
    {
      path: '/increase',
      component: bundleLoader(Increase(store)),
    },
  ];
}
export default (store: StoreWithInjectAble) => (
  <div>
    <Header />
    {routes(store).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </div>
);
