import React from 'react';
import { NavLink  } from 'react-router-dom';
import HeaderModule from './Header.less';

export const Header = () => (
  <div>
    <h1>Magic-FE React Redux Boilerplate</h1>
    <NavLink exact  to="/" activeClassName={HeaderModule['route--active']}>
      Home
    </NavLink >
    {' · '}
    <NavLink  to="/increase" activeClassName={HeaderModule['route--active']}>
      Increase
    </NavLink >
  </div>
);

export default Header;
