'use strict'

const Player = require('./Player');
//const Board = require('./Board.js')
const Deck = require('./Deck');

class Game {
  constructor() {
    this.playerOne = new Player(1);
    this.playerTwo = new Player(2);
    //this.board = new Board();
    this.deck = new Deck();
    this.currentRow = 0;
  }

  init() {
    this.deck.shuffle();
    this.deck.dealInitial(this.playerOne, this.playerTwo);
  }
}

module.exports = Game;
