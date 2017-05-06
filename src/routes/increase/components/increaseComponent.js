import React, { PropTypes } from 'react';

export const Increase = props => (
  <div >
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
  increase: PropTypes.number.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired
};

export default Increase;
