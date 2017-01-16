import React, { Component } from 'react';

export default ({ handleClick }) => 
  <div className='login'>
    <button onClick={ e => handleClick(e,1) }>Log in as P1</button>
    <button onClick={ e => handleClick(e,2) }>Log in as P2</button>
  </div>
