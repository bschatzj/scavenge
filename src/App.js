import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './Home/HomePage'

function App() {
  return (
    <Switch>
      
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
