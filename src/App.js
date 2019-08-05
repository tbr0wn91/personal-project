import React, {Component} from 'react';
import {Route, Switch, NavLink, withRouter} from 'react-router-dom';
import Login from './components/Home/Login';
import Register from './components/Home/Register';
import Profile from './components/Profile/Profile';
import CreatePlaylist from './components/Playlist/CreatePlaylist';
import {connect} from  'react-redux';
import {getUser} from './redux/reducer'

import './App.scss';
import axios from 'axios';
import DisplayPlaylist from './components/DisplayPlaylist/DisplayPlaylist';

class App extends Component {
  constructor(props){
    super(props)

    this.userSession = this.userSession.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    this.userSession()
  }


  userSession(){
    axios.get('/auth/user_session').then(res =>{
      this.props.getUser(res.data);
    })
  }


  logout(){
    axios.get(`/auth/logout`).then(res =>{
      this.props.history.push('/');
    })
  }

  render(){
    console.log(this.props)
    return (
      <div>
        <header className="header-container">
          <span>Devify</span>
          <div>
            <NavLink exact to='/' activeClassName='active'>Home</NavLink>
            <NavLink exact to='/Register' activeClassName='active'>Register</NavLink>
            <NavLink exact to='/Profile' activeClassName='active'>Profile</NavLink>
            <button onClick={this.logout}>Log Out</button>
          </div>
  
        </header>
      
  
  
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Register"component={Register}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/CreatePlaylist" component={CreatePlaylist}/>
        <Route path="/DisplayPlaylist" component={DisplayPlaylist} />
  
      </Switch>
      </div>
    );
  }
  
}

function mapReduxToProps(reduxState){
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
