import React from 'react';

export default ({ handleClick, buttonText }) =>
  <span className='confirm-button'>
    <button onClick={handleClick} >{buttonText}</button>
  </span>

