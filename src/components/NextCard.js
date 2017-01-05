import React from 'react';
import Card from './Card.js';

export default ({ card, cardClicker }) =>
  <div className='next-card'>
    <Card card={card} handleClick={cardClicker} /> 
  </div>

