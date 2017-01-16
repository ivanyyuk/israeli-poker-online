'use strict'

const _ = require('lodash');
const Card = require('./Card');

//this takes a numver, array or nested array of numbers
//and makes card objecs or zero for no card 
//can be used for p1Hand, p2Hand or deck or nextcard
//returns new array to reassign
const convertNumbersToCardObjects = (cardNumbers) => {
  if (typeof cardNumbers === 'number')
    return cardNumbers === 0 ? 0 : new Card(cardNumbers);

  //we only get here if dealing with array
  let arr = [];
  arr =  cardNumbers.map(num => {
    if (typeof num !== 'number'){
      return convertNumbersToCardObjects(num);
    } else if (num !== 0){
      return new Card(num)
    } else return 0;
  })
  return arr;
}

const mutateForFrontEnd = (game)  => {
  //game = game.toJSON(); 
  //console.log(game.playerPosition)
  game.p1Hands = convertNumbersToCardObjects(game.p1Hands);
  game.p2Hands = convertNumbersToCardObjects(game.p2Hands);
  game.p1NextCard = convertNumbersToCardObjects(game.p1NextCard);
  game.p2NextCard = convertNumbersToCardObjects(game.p2NextCard);
  //let obj = _.pickBy(game, (value, key) => {
    //return (key.includes('p1') || key.includes('p2'));
  //})
  //_.forIn(obj, (value, key) => {
    //obj[key] = convertNumbersToCardObjects(value)
  //});
  return game;
}


module.exports = {
  convertNumbersToCardObjects,
  mutateForFrontEnd
}
