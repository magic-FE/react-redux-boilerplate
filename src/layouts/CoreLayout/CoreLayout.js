import React from 'react';
import Header from '$components/Header';
import RouteWithSubRoutes from '$components/RouteWithSubRoutes';
import '$styles/core.less';
import { coreLayoutViewport } from './CoreLayout.less';
import Counter from '../Counter';
import type { StoreWithInjectAble, RouteProps } from '$self-define';
type props = {
  routes: (store: StoreWithInjectAble) => Array<RouteProps>,
  store: StoreWithInjectAble
};

const CoreLayout = (props: props) => {
  return (
    <div className="container text-center">
      <Counter />
      <Header />
      <div className={coreLayoutViewport}>
        {props.routes(props.store).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </div>
    </div>
  );
};
export default CoreLayout;
