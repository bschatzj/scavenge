import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './Home/HomePage'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Profile from './Profile/Profile'
import Game from './Game/Game'
import TaskDisplay from './Game/TaskDisplay';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/game/:id" component={Game} />
      <Route exact path="/game/:id/:task" component={TaskDisplay} />
    </Switch>
  );
}

export default App;
