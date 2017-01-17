'use strict'

const router = require('express').Router();
const Game = require('../db/db').model('game');
const { mutateForFrontEnd, addPlayerPositionAndReturnNewCopy, hideCardsIfNecessary } = require('../game/utils');


router.get('/:id', function(req, res, next) {
  //console.log(req.session)
  Game.findEntireGameById(req.params.id)
    .then(game => {
      //console.log(game.playerOneId, game.playerTwoId, req.session.userId)
      let playerPosition;
      if (game.playerOneId === req.session.userId) playerPosition = 1;
      if (game.playerTwoId === req.session.userId) playerPosition = 2;
      console.log('/id', playerPosition, game.playerOneId, game.playerTwoId, req.session.userId)
      game = addPlayerPositionAndReturnNewCopy(game, playerPosition)
      console.log('after adding', game)
      res.send(mutateForFrontEnd(game))
    })
    .catch(next);
});


module.exports = router;
