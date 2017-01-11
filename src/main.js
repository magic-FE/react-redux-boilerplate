import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import App from './containers/AppContainer';

// store initial
const initialState = window.INITIAL_STATE;
const store = createStore(initialState);

// some setup
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default(store); // !important
  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  );
};
if (isDev && module.hot) {
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react').default; // eslint-disable-line
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };
  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };
  module.hot.accept('./routes/index', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// start render
render();
