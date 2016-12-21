import CoreLayout from 'LAYOUTS/CoreLayout/CoreLayout';
import { injectReducerFactory } from 'UTILS/reducerTool';
import Home from './home';

const createChildRoute = (path, store) => ({
  path,
  getComponent(nextState, cb) {
    const injectReducer = injectReducerFactory(store);
    System.import(`./${path}/index`).then((routeModule) => {
      const { container, reducer } = routeModule;
      injectReducer(`${path}`, reducer);
      cb(null, container);
    });
  }
});
const paths = ['increase'];
export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: paths.map(path => createChildRoute(path, store))
});

export default createRoutes;
