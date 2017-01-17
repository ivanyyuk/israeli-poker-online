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
    this.currentRow++;
    this.deck.dealNextTwo(this.playerOne, this.playerTwo);
  }

  updateRowIfNeeded(hands) {
    for (let i = 0; i < hands.length; i++) {
      if (this.playerOne.hands[i].cards[this.currentRow] === 0 ||
        this.playerTwo.hands[i].cards[this.currentRow] === 0) {
          console.log('row failed')
          return;
        }
    }  

    this.currentRow++;
  }

  placeCard(player, x,  cardToPlace) {
    console.log('running', player, x,this.currentRow, cardToPlace);
    console.log(player.nextCard)
    console.log(player === this.playerOne)
    let y = this.currentRow;
    player.hands[x].cards[y] = cardToPlace;
    player.nextCard = {};
    player.cardPosX = -1;
    this.playerOne = player;
  }
}

module.exports = Game;
