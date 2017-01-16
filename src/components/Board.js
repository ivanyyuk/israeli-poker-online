import React from 'react';
import PlayerHand from './PlayerHand';
import OpponentHand from './OpponentHand';
import NextCard from './NextCard';


export default ({ player, opponent, cardClicker }) =>
  <div className='board'>
    <div className='opponent-board'>
      <OpponentHand cardClicker={cardClicker} hands={opponent.hands} />
      <NextCard cardClicker={cardClicker} card={opponent.nextCard} />
    </div>
    <hr/>
    <div className='player-board'>
      <PlayerHand cardClicker={cardClicker} hands={player.hands} />
      <NextCard cardClicker={cardClicker} card={player.nextCard} />
    </div>
  </div>


