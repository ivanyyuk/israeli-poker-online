import React, { Component } from 'react';
import Login from '../components/Login';
import axios from 'axios';
import { AUTH_URL } from '../constants';

export default class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
    this.getMe = this.getMe.bind(this);
  }

  handleClick(e,pIndex){
    console.log(AUTH_URL)
    axios.post(AUTH_URL, {
      email: `p${pIndex}@gmail.com`,
      password: 'test'
    })
    //axios.get('http://localhost:8000/session')
      .then(res => console.log(res.data))
      .catch(console.error);
  }

  logout() {
    axios.get('http://localhost:8000/logout')
      .then(res => console.log(res))
      .catch(console.error);
  }

  getMe() {
    axios.get('http://localhost:8000/me')
      .then(res => console.log(res))
      .catch(console.error);
  }

  render() {
    return(
      <Login getMe={this.getMe} logout={this.logout} handleClick={this.handleClick} />
    )
  }
}
