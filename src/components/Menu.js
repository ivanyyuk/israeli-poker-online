import React from 'react';
import ConfirmButton from './ConfirmButton';
import DenyButton from './DenyButton';

export default ({ denyMove, confirmMove }) => 
  <div className='menu'>
    <DenyButton handleClick={denyMove}/>
    <ConfirmButton handleClick={confirmMove}/>
  </div>
