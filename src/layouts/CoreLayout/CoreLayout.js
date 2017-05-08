import React, { PropTypes } from 'react';
import Header from 'COMPONENTS/Header';
import 'STYLES/core.less';
import './CoreLayout.less';
import Counter from '../Counter';

const CoreLayout = (props) => {
  const { children } = props;
  return (
    <div className="container text-center">
      <Counter />
      <Header />
      <div className="core-layout__viewport">{children}</div>
    </div>
  );
};
CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default CoreLayout;
