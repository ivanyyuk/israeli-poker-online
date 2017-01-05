import React from 'react';

export default ({ card, x, y, handleClick }) =>
  <span className="card"
    onClick={ () => handleClick(x, y) }
  ><img src={ card ? `/images/cards/${card.name}_of_${card.suit}.svg` : null }
      alt={card ? `${card.name} of ${card.suit}` : 'o'} /></span>

