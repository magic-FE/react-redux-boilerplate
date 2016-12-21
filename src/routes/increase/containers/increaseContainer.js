import { connect } from 'react-redux';
import { actions } from '../reducers/increase';

import IncreaseComponents from '../components/increaseComponent';

const mapDispatchToProps = actions;

const mapStateToProps = state => ({
  increase: state.increase
});

export default connect(mapStateToProps, mapDispatchToProps)(IncreaseComponents);
