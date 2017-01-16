'use strict'

const router = require('express').Router();
const Game = require('../db/db').model('game');
const { mutateForFrontEnd } = require('../game/utils');


router.get('/:id', function(req, res, next) {
  console.log(req.session)
  Game.findEntireGameById(req.params.id)
    .then(game => {
      res.send(mutateForFrontEnd(game))
    })
    .catch(next);
});


module.exports = router;
