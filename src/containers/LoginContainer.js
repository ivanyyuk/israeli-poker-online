import React, { Component } from 'react';
import Login from '../components/Login';
import axios from 'axios';
import { AUTH_URL } from '../constants';

export default class LoginContainer extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
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

  render() {
    return(
      <Login handleClick={this.handleClick} />
    )
  }
}
