'use strict' 

const Game = require('./Game');

const game = new Game();
 game.init();
console.log(game.playerOne.hands)
console.log(game.playerTwo.hands)

