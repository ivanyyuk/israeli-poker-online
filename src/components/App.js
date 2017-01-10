import React, { Component } from 'react';
import './App.css';
import Game from './Game';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import Login from './Login';

class App extends Component {
  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/game' component={Game} />
        <Route path='/' component={Login} />
      </Router>
    )
  }
}

export default App;
