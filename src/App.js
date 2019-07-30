import React from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import Login from './components/Home/Login';

import './App.css';

function App() {
  return (
    <div>
      <header>
        <div>
          <NavLink exact to='/' activeClassName='active'>Home</NavLink>
          <NavLink exact to='/Register' activeClassName='active'>Register</NavLink>
          <NavLink exact to='Profile' activeClassName='active'>Profile</NavLink>
        </div>

      </header>
    


    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Register" render={() =>{
        return <div>This is the Register path</div>
      }}/>
      <Route path="/Profile" render={() =>{
        return <div>This is the Profile path</div>
      }}/>
      <Route path="/CreatePlaylist" render={() =>{
        return <div>This is the CreatePlaylist path</div>
      }}/>
      <Route path="/DisplayPlaylist"render={() =>{
        return <div>This is the Home path</div>
      }} />

    </Switch>
    </div>
  );
}

export default App;
