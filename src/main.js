import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import App from './containers/AppContainer';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.INITIAL_STATE;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
let render = () => {
  const routes = require('./routes/index').default(store); // !important
  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  );
};
if (__DEV__ && module.hot) {
  const AppContainer = require('react-hot-loader').AppContainer; // eslint-disable-line
  const renderApp = () => {
    const routes = require('./routes/index').default(store); // !important
    ReactDOM.render(
      <AppContainer><App store={store} routes={routes} /></AppContainer>,
      MOUNT_NODE
    );
  };
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
    render();
  });
}
// ========================================================
// Go!
// ========================================================
render();
