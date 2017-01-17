'use strict'

const router = require('express').Router();
const Game = require('../db/db').model('game');
const { mutateForFrontEnd, addPlayerPosition } = require('../game/utils');


router.get('/:id', function(req, res, next) {
  //console.log(req.session)
  Game.findEntireGameById(req.params.id)
    .then(game => {
      //console.log(game.playerOneId, game.playerTwoId, req.session.userId)
      let playerPosition;
      if (game.playerOneId === req.session.userId) playerPosition = 1;
      if (game.playerTwoId === req.session.userId) playerPosition = 2;
      addPlayerPosition(game, playerPosition)
      res.send(mutateForFrontEnd(game))
    })
    .catch(next);
});


module.exports = router;
