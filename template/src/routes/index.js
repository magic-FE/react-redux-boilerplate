import CoreLayout from 'LAYOUTS/CoreLayout';
import Home from './home';
import Increase from './increase';

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    Increase(store)
  ]
});

export default createRoutes;
