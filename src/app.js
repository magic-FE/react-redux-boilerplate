// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test';

const MOUNT_NODE = document.getElementById('root');
const App = () => {
  return <Test test2={{ a: 'a', b: 1 }} />;
};
const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE);
};
render();
