// @flow
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import type { StoreWithInjectAble } from '$self-define';
type props = {
  routes: React$Element<any>,
  store: StoreWithInjectAble
};

class App extends React.Component<void, props, void> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { routes, store } = this.props;
    return (
      <Provider store={store}>
        <Router>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default App;
