
const Card = require('./Card');

class Deck {
  constructor() {
    this.cards = this.generateNumericalDeck();
    this.index = 0;
  }

  generateNumericalDeck() {
    let deck = [];
    for (let i = 1; i <= 52; i ++) {
      //deck.push(new Card(i));
      deck.push(i);
    }
    return deck
  }

  convertNumericalToObjects() {
    return this.cards.map(card => new Card(card))
  }

  shuffle() { //Fisher-Yates algorithm
    for (let i = this.cards.length - 1; i >= 0; i--) {
      let temp = this.cards[i];
      let random = Math.floor(Math.random() * (i + 1)); //random number between 0 and i inclusive
      this.cards[i] = this.cards[random];
      this.cards[random] = temp;
    } 
  }

  dealInitial(p1, p2) {
    for (let i = 0; i < 5; i++) {
      p1[i][0] = this[this.index];
     this.index++;
      p2[i][0] = this[this.index];
      this.index++;
    }
   return  this.save();
  }

  dealNextTwo(p1, p2) { 
    p1.nextCard = this.cards[this.index];
    this.index++;
    p2.nextCard = this.cards[this.index];
    this.index++;
  }
}

module.exports = Deck;

