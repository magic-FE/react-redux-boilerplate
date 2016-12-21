import { connect } from 'react-redux';
import { actions } from '../reducers/Increase';

import IncreaseComponents from '../components/IncreaseComponent';

const mapDispatchToProps = actions;

const mapStateToProps = state => ({
  increase: state.increase
});

export default connect(mapStateToProps, mapDispatchToProps)(IncreaseComponents);
