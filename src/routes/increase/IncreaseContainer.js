import { connect } from 'react-redux';
import { actionCreatorMaps } from './reducers/increase';

import Increase from './components/Increase';

const mapDispatchToProps = actionCreatorMaps;

const mapStateToProps = state => ({
  result: state.result,
});
export default connect(mapStateToProps, mapDispatchToProps)(Increase);
