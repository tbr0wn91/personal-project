import React, { Component } from "react";
import { Route, Switch, NavLink, withRouter } from "react-router-dom";
import Login from "./components/Home/Login";
import Register from "./components/Home/Register";
import Profile from "./components/Profile/Profile";
import CreatePlaylist from "./components/Playlist/CreatePlaylist";
import { connect } from "react-redux";
import { getUser } from "./redux/reducer";

import "./App.scss";
import axios from "axios";
import DisplayPlaylist from "./components/DisplayPlaylist/DisplayPlaylist";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSideBar: false
    };

    this.userSession = this.userSession.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleSideBarFunc = this.toggleSideBarFunc.bind(this);
  }

  componentDidMount() {
    this.userSession();
  }

  userSession() {
    axios.get("/auth/user_session").then(res => {
      this.props.getUser(res.data);
    });
  }

  toggleSideBarFunc() {
    this.setState(prevState => {
      return {
        toggleSideBar: !prevState.toggleSideBar
      };
    });
  }

  logout() {
    axios.get(`/auth/logout`).then(res => {
      this.props.history.push("/");
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <header className="header-container">
          <div className="devify">Devify</div>
          <div className="menu-container">
            <button className="toggle-button" onClick={this.toggleSideBarFunc}>
              { this.state.toggleSideBar ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>
          <nav className={this.state.toggleSideBar ? "show" : ""}>
            <NavLink className="links" exact to="/" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              className="links"
              exact
              to="/Register"
              activeClassName="active"
            >
              Register
            </NavLink>
            <NavLink
              className="links"
              exact
              to="/Profile"
              activeClassName="active"
            >
              Profile
            </NavLink>
            <button className="mobile-logout" onClick={this.logout}>
              Log out
            </button>
          </nav>
          <button className="logout" onClick={this.logout}>
            Log Out
          </button>
        </header>

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/Profile" component={Profile} />
          <Route path="/CreatePlaylist" component={CreatePlaylist} />
          <Route path="/DisplayPlaylist" component={DisplayPlaylist} />
        </Switch>
      </div>
    );
  }
}

function mapReduxToProps(reduxState) {
  return reduxState;
}

const mapDispatchToProps = {
  getUser
};

const connectInvoked = connect(
  mapReduxToProps,
  mapDispatchToProps
);

export default withRouter(connectInvoked(App));
