import React from 'react';
import Card from './Card';

export default ({ hands, cardClicker }) =>
  <div className='player-hand'>
    {
      hands.map((hand,handIndex) =>
        <div key={handIndex} className='card-column'>{
          hand.cards.map(( card,rowIndex ) => 
            <Card key={rowIndex} card={card}
              handleClick={cardClicker} 
            x={handIndex} y={rowIndex}
              />
        )
        }
      </div>
      )
    }
  </div>

