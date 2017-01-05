
const Card = require('./Card');

class Deck {
  constructor() {
    this.cards = this.generateDeck();
    this.index = 0;
  }

  generateDeck() {
    let deck = [];
    for (let i = 1; i <= 52; i ++) {
      deck.push(new Card(i));
    }
    return deck;
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
      p1.hands[i].cards[0] = this.cards[this.index];
     this.index++;
      p2.hands[i].cards[0] = this.cards[this.index];
      this.index++;
    }
  }

  dealNextTwo(p1, p2) { 
    p1.nextCard = this.cards[this.index];
    this.index++;
    p2.nextCard = this.cards[this.index];
    this.index++;
  }
}

module.exports = Deck;

