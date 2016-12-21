// import { injectReducer } from 'REDUCER_TOOL';

// export default store => ({
//   path: 'counter',
//   getComponent(nextState, cb) {
//     require.ensure([], (require) => {
//       const Counter = require('./containers/CounterContainer').default;
//       const reducer = require('./reducers/Counter').default;
//       injectReducer(store, { key: 'counter', reducer });
//       cb(null, Counter);
//     }, 'counter');
//   }
// });
import container from './containers/increaseContainer';
import reducer from './reducers/increase';
import component from './components/increaseComponent';

export default component;
export { reducer, container, component };
