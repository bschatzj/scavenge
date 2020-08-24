import React, {useEffect, useState} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './Home/HomePage'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Profile from './Profile/Profile'
import Game from './Game/Game'
import TaskDisplay from './Game/TaskDisplay';
import PrivateRoute from './utils/PrivateRoute'
import Header from './Header/Header'
import {useLocation} from 'react-router-dom'

function App() {
  
  const location = (useLocation().pathname)

  return (
    <>
    {location == '/' || location =='/login' || location == '/register' ? null : <Header /> }
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/game/:id" component={Game} />
      <PrivateRoute exact path="/game/:id/:task" component={TaskDisplay} />
      <Route path="/" component={Home} />
    </Switch>
    </>
  );
}

export default App;
