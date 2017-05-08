// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import type { RouteProps } from '$self-define';

export default (routeProps: RouteProps) => {
  return (
    <Route
      path={routeProps.path}
      exact={routeProps.exact}
      render={props => <routeProps.component {...props} routes={routeProps.routes} />}
    />
  );
};
