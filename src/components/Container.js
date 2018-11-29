import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class Container extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
  };

  static defaultProps = {
    className: "",
    children: null
  };

  render() {
    const { className, children } = this.props;
    return <div className={`container ${className}`.trim()}>{children}</div>;
  }
}

export default Container;
