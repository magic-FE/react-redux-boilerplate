import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

type props = {
  routes: {},
  store: {}
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
