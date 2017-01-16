import React, { Component } from 'react';

export default ({ handleClick, logout, getMe }) => 
  <div className='login'>
    <button onClick={ e => handleClick(e,1) }>Log in as P1</button>
    <button onClick={ e => handleClick(e,2) }>Log in as P2</button>
    <button onClick={logout}> Logout </button>
    <button onClick={getMe}> Get Me </button>
  </div>
