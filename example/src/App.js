import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Header, SideMenu } from "simple-side-menu";

import "./style.css";

class App extends PureComponent {
  state = {
    isOpen: true,
    isExpandable: true
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
              <div className="btn-menu" onClick={this.toggleMenu}>
                <i className="material-icons btn-menu__icon">menu</i>
              </div>
            </nav>
            <Route exact path="/" component={Dashboard} />
            <Route path="/group/new" component={AddGroup} />
            <Route path="/group/person/new" component={AddPerson} />
            <Route
              path="/notifications/active"
              component={NotificationsActive}
            />
            <Route path="/notifications/off" component={NotificationsOff} />
            <Route path="/settings/profile" component={Profile} />
            <Route path="/settings/apps" component={Application} />
            <Route path="/sign-out" component={LogOut} />
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
    to: "/"
  },
  {
    title: "Group",
    isCollapsible: true,
    icon: "group",
    subItems: [
      {
        title: "New group",
        icon: "group_add",
        to: "/group/new"
      },
      {
        title: "New person",
        icon: "person_add",
        to: "/group/person/new"
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
        to: "/notifications/active"
      },
      {
        title: "Off",
        icon: "notifications_off",
        to: "/notifications/off"
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
        to: "/settings/profile"
      },
      {
        title: "Applications",
        icon: <i className="material-icons">apps</i>,
        to: "/settings/apps"
      }
    ]
  },
  {
    title: "Sign out",
    icon: <i className="ion-log-out" />,
    to: "/sign-out"
  }
];
