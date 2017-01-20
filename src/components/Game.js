import React from 'react';
import Board from './Board';
import Menu from './Menu';

export default ({ cardClicker, player, opponent, denyMove, confirmMove }) =>
  <div className="App">
    <Board
      cardClicker={cardClicker}
      player={player} 
      opponent={opponent}
    />
    <Menu denyMove={denyMove} confirmMove={confirmMove}/>
  </div>

