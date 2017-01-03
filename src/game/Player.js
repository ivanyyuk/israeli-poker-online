'use strict'

const Hand = require('./Hand');

class Player {
  constructor(position, name){ //integer 1 or 2 to denote player
    this.position = position;
    this.hands = [
      new Hand(),
      new Hand(),
      new Hand(),
      new Hand(),
      new Hand()
    ];
    this.name = name;
    this.nextCard = {};
  }
}

module.exports = Player;

