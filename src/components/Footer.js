import PropTypes from "prop-types";
import React, { Component } from "react";

class Footer extends Component {
  static propTypes = {
    expanded: PropTypes.bool.isRequired,
    onExpand: PropTypes.func.isRequired
  };

  getClassName = () =>
    `material-icons nav-container__expand-icon ${
      this.props.expanded ? "rotate-down" : ""
    }`.trim();

  handleClick = () => {
    this.props.onExpand();
  };

  render() {
    return (
      <div className="nav-container__footer" onClick={this.handleClick}>
        <i className={this.getClassName()}>chevron_left</i>
      </div>
    );
  }
}

export default Footer;
