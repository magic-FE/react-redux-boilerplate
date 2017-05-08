// @flow
import React from 'react';
import { Route } from 'react-router-dom';

export default (routeProps: routeProps) => {
  return (
    <Route
      path={routeProps.path}
      exact={routeProps.exact}
      render={props => <routeProps.component {...props} routes={routeProps.routes} />}
    />
  );
};
