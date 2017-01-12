import React, { Component } from 'react';
import Lobby from '../components/Lobby';
import axios from 'axios';

import { BASE_URL } from '../constants';

export default class LobbyContainer extends Component {
  constructor(props){
    super(props);
    this.getLoggedInUser = this.getLoggedInUser.bind(this);
    console.log(props)
  }

  getLoggedInUser(){
   return axios.get(`${BASE_URL}/myGames/1`)
      .then(res => res.data)
      .then(user => user)
      .catch(console.error);
  }

  componentDidMount() {
    this.getLoggedInUser()
      .then(user => console.log(user));
  } 
  render() {
    return (
      <Lobby />
    )
  }
}
