import React, { Component } from 'react';
//import './App.css';
import Game from './Game';
import LobbyContainer from '../containers/LobbyContainer';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import LoginContainer from '../containers/LoginContainer';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

class App extends Component {

  componentDidMount() {
    socket.on('babelfish', function() {
      console.log('bablefish');
    })
    socket.on('movedddd', function(data) {
      console.log(data, 'moved')
    })
  }
  render() {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={LobbyContainer} >
          <Route path='/game/:gameId' component={Game} />
          <Route path='/login' component={LoginContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
