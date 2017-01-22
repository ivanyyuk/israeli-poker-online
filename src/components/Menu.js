import React from 'react';
import ActionButton from './ActionButton';

export default ({ denyMove, confirmMove }) => 
  <div className='menu'>
    <ActionButton handleClick={denyMove} buttonText='Deny Move' />
    <ActionButton handleClick={confirmMove} buttonText='Confirm Move' />
  </div>
