
class Card {
  constructor(seed){ // seed will be 1 to 52
    this.value = seed % 13 || 13;
    this.name = this.generateName(seed);
    this.suit = this.generateSuit(seed);
  }

  generateName(seed){
    switch(seed % 13) {
      case 1:
        return 'Ace';
      case 2:
        return 'Two';
      case 3:
        return 'Three';
      case 4:
        return 'Four';
      case 5:
        return 'Five';
      case 6:
        return 'Six';
      case 7:
        return 'Seven';
      case 8:
        return 'Eight';
      case 9: 
        return 'Nine';
      case 10: 
        return 'Ten';
      case 11:
        return 'Jack';
      case 12:
        return 'Queen';
      case 0:
        return 'King';
      default:
        return seed % 13;
    }
  }

  generateSuit(seed) {
    let suitIndex = Math.ceil(seed/13);
    switch(suitIndex) {
    case 1:
        return 'Diamonds';
    case 2:
        return 'Clubs';
    case 3:
        return 'Hearts';
    case 4:
        return 'Spades';
    default:
        throw Error(`seed error:  seed: ${seed}, suitIndex: ${suitIndex}, ${this.name}`);
    }
  }
}

module.exports = Card;
