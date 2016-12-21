import React from 'react';

export const Increase = props => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {props.increase}</h2>
    <button className="btn btn-default" onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className="btn btn-default" onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
);

Increase.propTypes = {
  increase: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
};

export default Increase;
