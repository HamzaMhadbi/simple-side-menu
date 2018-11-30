# Simple Side Menu

An simple Side menu component written only in React.js and CSS3.
>**Important**: This component must be used with React Router V4 !!

## Demo

[Take a look at the demo](http://HamzaMhadbi.github.io/simple-side-menu)

## Installation

We need to install react router dom firstly if is it not installed

```bash
npm install react-router-dom --save
```

```bash
npm install simple-side-menu --save
```

## Usage

**menu.js**

```javascript
export default [
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
```

**Menu.js**

```javascript
import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Header, SideMenu } from "simple-side-menu";

import MENU_ITEMS from "./menu";

class Menu extends PureComponent {
  state = {
    isOpen: true
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <Router>
        <Container>
          <SideMenu
            isOpen={this.state.isOpen}
            header={<Header logo="../public/logo.png" title="MENU_TITLE" />}
            items={MENU_ITEMS}
          />
          <div className="main">
            <button onClick={this.toggleMenu}>Toggle Me</button>
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

const RoutePath = ({ path }) => <h4>{path}</h4>;

const Dashboard = () => <RoutePath path="/dashboard" />;
const AddGroup = () => <RoutePath path="/group/new" />;
const AddPerson = () => <RoutePath path="/group/person/new" />;
const NotificationsActive = () => <RoutePath path="/notifications/active" />;
const NotificationsOff = () => <RoutePath path="/notifications/off" />;
const Profile = () => <RoutePath path="/settings/profile" />;
const Application = () => <RoutePath path="/settings/apps" />;
const LogOut = () => <RoutePath path="/sign-out" />;

export default Menu;
```

## API

`<SideMenu />`

| Prop                 | Type   | Default        | Description                                                                                                                          |
| -------------------- | ------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| isOpen               | bool    | true           | Scpecify if the side menu must be opened.                                                                                            |
| items                | array  | **Required**   | Property for the configuration of the component SideMenu. check the [menu.js](#usage) |
| header               | elem   | null           | Property for the side menu header. you can use Header component or any JSX element.                                                  |
| isExpandable         | bool   | false          | This property make posibile usage of the expanded mode. **don't use it with toggle menu fonctionnality**.                            |
| defaultIconClassName | string | material-icons | Property for default icon className used for menu item and sub menu item, the Allowed values (material-icons, fa).                   |

`<Header />`

| Prop            | Type   | Default                 | Description                                 |
| --------------- | ------ | ----------------------- | ------------------------------------------- |
| to              | string | /                       | Path of home page                           |
| logo            | string | null                    | The source path for the logo of application |
| title           | string | null                    | The title of the side menu                  |
| headerClassName | string | nav-container\_\_header | the Header className.                       |
| logoClassName   | string | nav-container\_\_logo   | The Logo className.                         |
| titleClassName  | string | nav-container\_\_title  | The title className.                        |

## Styling

```CSS
.nav-container {
  background-color: #db3d44;
}

.sub-menu {
  background-color: #ff6666;
}

.sub-menu__item--active,
.sub-menu__item:hover,
.sub-menu__item:visited,
.menu-item--active,
.menu-item > *:first-child:hover {
  background-color: #af3136;
}

.nav-container__header,
.side-menu,
.menu-item {
	box-shadow: 0 1px 0 #fff !important;
  -webkit-box-shadow:  0 1px 0 #fff !important;
  -moz-box-shadow: 0 1px 0 #fff !important;
}
```
