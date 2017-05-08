// 
import React from 'react';

type props = {
  result: number,
  doubleAsync: () => void,
  increment: () => void
};

export const Increase = (props: props) => {
  return (
    <div>
      <h2>Counter: {props.result}</h2>
      <button className="btn btn-default" onClick={() => props.increment()}>
        Increment
      </button>
      {' '}
      <button className="btn btn-default" onClick={() => props.doubleAsync()}>
        Double (Async)
      </button>
    </div>
  );
};

export default Increase;
