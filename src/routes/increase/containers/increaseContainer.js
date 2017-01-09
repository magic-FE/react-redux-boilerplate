import { connect } from 'react-redux';
import { actionCreatorMaps } from '../reducers/increase';

import IncreaseComponents from '../components/IncreaseComponent';

const mapDispatchToProps = actionCreatorMaps;

const mapStateToProps = state => ({
  increase: state.increase
});

export default connect(mapStateToProps, mapDispatchToProps)(IncreaseComponents);
