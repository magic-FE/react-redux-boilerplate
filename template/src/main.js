import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import App from './containers/AppContainer';

// store initial
const initialState = window.INITIAL_STATE;
const store = createStore(initialState);

// some setup
const MOUNT_NODE = document.getElementById('root');

const render = () => {
  const routes = require('./routes/index').default(store); // !important
  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  );
};
if (__DEV__ && module.hot) {
  module.hot.accept('./routes/index', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// start render
render();
