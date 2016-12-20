import { connect } from 'react-redux';
import { actions } from '../reducers/Counter';

import CounterComponents from '../components/CounterComponent';

const mapDispatchToProps = actions;

const mapStateToProps = state => ({
  counter: state.counter
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponents);
