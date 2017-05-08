import { connect } from 'react-redux';
import { actionCreatorMaps as mapDispatchToProps } from './reducers/increase';
import reducers from './reducers';
import type { StoreWithInjectAble } from '$self-define';

import Increase from './components/Increase';

const mapStateToProps = state => ({
  result: state.result,
});
export default (store: StoreWithInjectAble) => {
  store.injectAll(reducers);
  return connect(mapStateToProps, mapDispatchToProps)(Increase);
};
