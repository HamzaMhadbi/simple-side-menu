import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { Link } from "react-router-dom";

class SubMenuItems extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    setPathname: PropTypes.func,
    opened: PropTypes.bool,
    path: PropTypes.string,
    defaultIconClassName: PropTypes.string
  };

  static defaultProps = {
    opened: true,
    path: null
  };

  getClassName = (to, path = this.props.path) =>
    `sub-menu__item ${path === to ? "sub-menu__item--active" : ""}`.trim();

  setCurrentRoute = path => {
    this.props.setPathname(null, path);
  };

  _renderItem = ({ item: { icon, title, to, iconClassName }, index }) => (
    <li
      key={index.toString()}
      className={this.getClassName(to)}
      onClickCapture={() => this.setCurrentRoute(to)}
    >
      <Link className="sub-menu__link" to={to}>
        {icon && typeof icon === "string" ? (
          <i
            key="icon"
            className={`${iconClassName ||
              this.props.defaultIconClassName} sub-menu__icon`}
          >
            {icon}
          </i>
        ) : (
          icon
        )}
        <span key="title" className="sub-menu__title">
          {title}
        </span>
      </Link>
    </li>
  );

  _renderClassName = opened =>
    `sub-menu ${!opened ? "display-none" : ""}`.trim();

  render() {
    const { opened, items } = this.props;
    return (
      <ul className={this._renderClassName(opened)}>
        {items.map((item, index) => this._renderItem({ item, index }))}
      </ul>
    );
  }
}

export default SubMenuItems;
