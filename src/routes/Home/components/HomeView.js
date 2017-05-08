// @flow
import React from 'react';
import HomeViewLess from './HomeView.less';
export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt="A magic!"
      className={HomeViewLess.magic}
      src="/images/magic.png"
    />
  </div>
);

export default HomeView;
