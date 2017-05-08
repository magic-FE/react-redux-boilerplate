// @flow
/**
 * @author: likun,
 * @from: https://reacttraining.com/react-router/web/guides/code-splitting
 * @description: split code with router;
 */
import React from 'react';

type props = {
  load: () => Promise<any>,
  renderRealComponent: (
    param: ?React$Component<any, any, any>
  ) => React$Element<any>
};

type state = {
  mod: ?React$Component<any, any, any>
};

class Bundle extends React.Component<void, props, state> {
  state = {
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: props) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props: props) {
    if (this.state.mod) {
      return;
    }
    props.load().then(mod => {
      this.setState({
        mod: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    const { mod } = this.state;
    return mod ? this.props.renderRealComponent(mod) : null;
  }
}

export default (loadfn: () => Promise<any>) => () => (
  <Bundle
    load={loadfn}
    renderRealComponent={ImportComponent => React.createElement(ImportComponent)}
  />
);
