import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Header, SideMenu } from "simple-side-menu";
import Switch from "react-switch";

import "./style.css";

class App extends PureComponent {
  state = {
    isOpen: true,
    isExpandable: true
  };

  toggleMenuSelection = isExpandable => {
    this.setState({ isExpandable });
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { isExpandable, isOpen } = this.state;
    return (
      <Router>
        <Container>
          <SideMenu
            isOpen={isOpen}
            header={
              <Header
                logo="https://cdn-images-1.medium.com/max/1200/1*YsPpBr_PgtyTR6CFDmKU9g.png"
                title="Side Menu"
              />
            }
            items={ITEMS}
            isExpandable={isExpandable}
          />
          <div className="main">
            <nav className="nav-bar">
              <div className="nav-bar__left">
                {!isExpandable && (
                  <div className="btn-menu" onClick={this.toggleMenu}>
                    <i className="material-icons btn-menu__icon">menu</i>
                  </div>
                )}
                <h1 className="title">Side Menu</h1>
              </div>
              <label className="nav-bar__right" htmlFor="normal-switch">
                <span className="label">IS EXPANDABLE</span>
                <Switch
                  onChange={this.toggleMenuSelection}
                  checked={isExpandable}
                  id="normal-switch"
                />
              </label>
            </nav>
            <Route exact path="/simple-side-menu/" component={Dashboard} />
            <Route path="/simple-side-menu/group/new" component={AddGroup} />
            <Route
              path="/simple-side-menu/group/person/new"
              component={AddPerson}
            />
            <Route
              path="/simple-side-menu/notifications/active"
              component={NotificationsActive}
            />
            <Route
              path="/simple-side-menu/notifications/off"
              component={NotificationsOff}
            />
            <Route
              path="/simple-side-menu/settings/profile"
              component={Profile}
            />
            <Route
              path="/simple-side-menu/settings/apps"
              component={Application}
            />
            <Route path="/simple-side-menu/sign-out" component={LogOut} />
          </div>
        </Container>
      </Router>
    );
  }
}

export default App;

const RoutePath = ({ path }) => <h4 className="path">{path}</h4>;

const Dashboard = () => <RoutePath path="/dashboard" />;
const AddGroup = () => <RoutePath path="/group/new" />;
const AddPerson = () => <RoutePath path="/group/person/new" />;
const NotificationsActive = () => <RoutePath path="/notifications/active" />;
const NotificationsOff = () => <RoutePath path="/notifications/off" />;
const Profile = () => <RoutePath path="/settings/profile" />;
const Application = () => <RoutePath path="/settings/apps" />;
const LogOut = () => <RoutePath path="/sign-out" />;

const ITEMS = [
  {
    title: "Dashboard",
    iconClassName: "fa fa-dashboard",
    icon: "",
    to: "/simple-side-menu"
  },
  {
    title: "Group",
    isCollapsible: true,
    icon: "group",
    subItems: [
      {
        title: "New group",
        icon: "group_add",
        to: "/simple-side-menu/group/new"
      },
      {
        title: "New person",
        icon: "person_add",
        to: "/simple-side-menu/group/person/new"
      }
    ]
  },
  {
    title: "Notifications",
    icon: "notifications",

    subItems: [
      {
        title: "Active",
        icon: "notifications_active",
        to: "/simple-side-menu/notifications/active"
      },
      {
        title: "Off",
        icon: "notifications_off",
        to: "/simple-side-menu/notifications/off"
      }
    ]
  },
  {
    title: "Settings",
    isCollapsible: true,
    iconClassName: "ion-gear-b",
    subItems: [
      {
        title: "Profile",
        icon: "person",
        to: "/simple-side-menu/settings/profile"
      },
      {
        title: "Applications",
        icon: <i className="material-icons">apps</i>,
        to: "/simple-side-menu/settings/apps"
      }
    ]
  },
  {
    title: "Sign out",
    icon: <i className="ion-log-out" />,
    to: "/simple-side-menu/sign-out"
  }
];
