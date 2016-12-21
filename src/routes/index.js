import CoreLayout from 'LAYOUTS/CoreLayout/CoreLayout';
import { injectReducerFactory } from 'UTILS/reducerTool';
import Home from './home';

const createChildRoute = (path, store) => ({
  path,
  getComponent(nextState, cb) {
    const injectReducer = injectReducerFactory(store);
    // System.import(`./${path}/index`).then((routeModule) => {
    //   const { container, reducer } = routeModule;
    //   injectReducer(`${path}`, reducer);
    //   cb(null, container);
    // });
    require.ensure([], (require) => {
      const routeModule = require('./increase');
      const { container, reducer } = routeModule;
      injectReducer('increase', reducer);
      cb(null, container);
    }, 'increase');
  }
});
// const paths = ['increase'];
export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [createChildRoute('increase', store)]
});

export default createRoutes;
