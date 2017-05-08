// @flow
import React from 'react';

type TestProps = {
  test1?: number,
  test2: {
    a: string,
    b: number
  }
};
type TestDefaultProps = {
  test1: number
};
type TestState = {
  name: ?string,
  age?: number
};

class Test extends React.Component<TestDefaultProps, TestProps, TestState> {
  static defaultProps = { test1: 1 };
  state = {
    name: 'a',
  };
  render() {
    const { test1, test2 } = this.props;
    return <div>{test1},{test2.a},{test2.b}</div>;
  }
}

export default Test;
