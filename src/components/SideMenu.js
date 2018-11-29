import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import SideMenuItem from "./SideMenuItem";
import Footer from "./Footer";

class SideMenu extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    items: PropTypes.array.isRequired,
    header: PropTypes.element,
    isExpandable: PropTypes.bool,
    defaultIconClassName: PropTypes.string
  };

  static defaultProps = {
    isOpen: true,
    header: null,
    isExpandable: false,
    defaultIconClassName: "material-icons"
  };

  state = {
    expanded: false,
    currentRoute: {
      index: 0,
      path: null
    }
  };

  menuRef = null;

  componentDidMount() {
    let currentRoute = {
      index: 0,
      path: "/"
    };
    const { pathname } = window.location;
    const { items } = this.props;
    items.forEach((item, index) => {
      if (item.to && pathname.indexOf(item.to) !== -1) {
        currentRoute = {
          index,
          path: item.to
        };
        return;
      } else if (item.subItems) {
        item.subItems.forEach(subItem => {
          if (pathname.indexOf(subItem.to) !== -1) {
            currentRoute = {
              index,
              path: subItem.to
            };
            return;
          }
        });
      }
    });
    this.setState({ currentRoute });
  }

  setMenuRef = ref => {
    this.menuRef = ref;
  };

  getClassName = (isOpen, isExpandable) => {
    let className = "nav-container";
    if (isExpandable) {
      className += this.state.expanded
        ? " nav-container--expanded"
        : !isOpen
        ? " nav-container--closed"
        : "";
      return className;
    } else if (!isOpen) className += " nav-container--closed";

    return className;
  };

  onExpand = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  onChangePathname = (index, path) => {
    this.setState({
      currentRoute: {
        index,
        path
      }
    });
  };

  render() {
    const {
      items,
      isOpen,
      isExpandable,
      header,
      defaultIconClassName
    } = this.props;
    const { expanded } = this.state;
    return [
      <nav
        key="nav-container"
        className={this.getClassName(isOpen, isExpandable)}
      >
        {header}
        <ul className="side-menu" ref={this.setMenuRef}>
          {items.map(
            (
              { icon, title, subItems, isCollapsible, to, iconClassName },
              index
            ) => (
              <SideMenuItem
                key={index.toString()}
                item={{
                  icon,
                  title,
                  to,
                  index,
                  iconClassName
                }}
                subItems={subItems}
                isCollapsible={isCollapsible}
                onChangePathname={this.onChangePathname}
                currentRoute={this.state.currentRoute}
                defaultIconClassName={defaultIconClassName}
              />
            )
          )}
        </ul>
        {isExpandable && (
          <Footer onExpand={this.onExpand} expanded={expanded} />
        )}
      </nav>,
      <div
        key="nav-container__separator"
        className={`nav-container__separator ${
          expanded
            ? "nav-container__separator--expanded"
            : !isOpen
            ? "nav-container__separator--hidden"
            : ""
        }`.trim()}
      />
    ];
  }
}

export default SideMenu;
