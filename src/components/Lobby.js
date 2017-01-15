import React from 'react';
import { Link } from 'react-router';

export default ({ games }) =>
  <div>
    {
        games.map(game => (
          <Link key={game.id} to={`/game/${game.id}`}>
            <li>{game.id} vs {game.playerOne.nickname}</li>
          </Link>
        ))
    }
  </div>

