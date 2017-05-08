import React from 'react';
import { Link } from 'react-router-dom';
import './Header.less';

export const Header = () => (
  <div>
    <h1>Magic-FE React Redux Boilerplate</h1>
    <Link to="/">
      Home
    </Link>
    {' · '}
    <Link to="/increase">
      Increase
    </Link>
    {' · '}
    <Link to="/increase2">
      Increase2
    </Link>
  </div>
);

export default Header;
