import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './Home/HomePage'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Profile from './Profile/Profile'
import Game from './Game/Game'
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/game/:id" component={Game} />
    </Switch>
  );
}

export default App;
