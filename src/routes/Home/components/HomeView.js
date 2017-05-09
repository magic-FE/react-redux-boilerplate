// @flow
import React from 'react';
import { magic } from './HomeView.less';
import logo from '$images/magic.png';
export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img alt="A magic!" className={magic} src={logo} />
  </div>
);

export default HomeView;
