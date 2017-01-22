import React, { Component } from 'react';
import Lobby from '../components/Lobby';
import axios from 'axios';

import { BASE_URL } from '../constants';

export default class LobbyContainer extends Component {
  constructor(props){
    super(props);
    this.getLoggedInUser = this.getLoggedInUser.bind(this);
    this.state = {
      games: []
    }
  }

  getLoggedInUser(){
   return axios.get(`${BASE_URL}/myGames/1`)
      .then(res => res.data)
      .then(games => games)
      .catch(console.error);
  }

  componentDidMount() {
    this.getLoggedInUser()
      .then(games => {
        console.log(games) 
        this.setState({  games })
      })
      .catch(console.error)
  } 

  render() {
    return (
      <div>
        {this.props.children}
      <Lobby games={this.state.games}/>
    </div>

    )
  }
}
