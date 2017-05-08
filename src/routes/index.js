import React from 'react';
import bundleLoader from '$utils/bundle';
import CoreLayout from '$layouts/CoreLayout';
import Home from './home';
import Increase from './increase';
import type { StoreWithInjectAble, RouteProps } from '$self-define';

const routes = (store): Array<RouteProps> => [
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
export default (store: StoreWithInjectAble) => (
  <CoreLayout routes={routes} store={store} />
);
