import React from 'react';
import {Route, Switch, Navlink} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() =>{
        return <div>This is the Home path</div>
      }} />
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
  );
}

export default App;
