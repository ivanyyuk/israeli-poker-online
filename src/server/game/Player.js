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
    if (position === 1) {
      this.cardPosX = -1;
    }
  }
}

module.exports = Player;

