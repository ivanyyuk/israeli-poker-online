import React from 'react';
import PlayerHand from './PlayerHand';
import OpponentHand from './OpponentHand';
import NextCard from './NextCard';


export default ({ playerOne, playerTwo, cardClicker }) =>
  <div className='board'>
    <div className='opponent-board'>
      <OpponentHand cardClicker={cardClicker} hands={playerTwo.hands} />
      <NextCard cardClicker={cardClicker} card={playerTwo.nextCard} />
    </div>
    <hr/>
    <div className='player-board'>
      <PlayerHand cardClicker={cardClicker} hands={playerOne.hands} />
      <NextCard cardClicker={cardClicker} card={playerOne.nextCard} />
    </div>
  </div>


