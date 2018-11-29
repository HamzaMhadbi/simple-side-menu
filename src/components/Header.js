import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class Header extends PureComponent {
  static propTypes = {
    to: PropTypes.string,
    logo: PropTypes.string,
    title: PropTypes.string,
    headerClassName: PropTypes.string,
    logoClassName: PropTypes.string,
    titleClassName: PropTypes.string
  };

  static defaultProps = {
    to: "/",
    logo: null,
    title: null,
    headerClassName: "nav-container__header",
    logoClassName: "nav-container__logo",
    titleClassName: "nav-container__title"
  };

  render() {
    const {
      to,
      logo,
      title,
      headerClassName,
      logoClassName,
      titleClassName
    } = this.props;
    return (
      <Link className={headerClassName} to={to}>
        {logo && <img className={logoClassName} src={logo} />}
        {title && <h2 className={titleClassName}>{title}</h2>}
      </Link>
    );
  }
}

export default Header;
