'use strict'

const Card = require('./Card');

//this takes an array or nested array of numbers and makes card objecs 
//can be used for p1Hand, p2Hand or deck
//returns new array to reassign
const convertNumbersToCardObjects = (cardNumbers) => {
  let arr = [];
  arr =  cardNumbers.map(num => {
    if (typeof num !== 'number'){
      return convertNumbersToCardObjects(num)
    } else if (num !== 0){
      return new Card(num)
    }
    else return 0
  })
  return arr;
  //console.log(arr)
  //for (var i = 0; i < cardNumbers.length; i++) {
    //if (Array.isArray(cardNumbers[i])){
      //arr = arr.concat(convertNumbersToCardObjects(cardNumbers[i]));
    //} else {
      //return new Card(cardNumbers[i])
    //}
  //}

  //console.log(arr)
  //return arr;
}

module.exports = {
  convertNumbersToCardObjects
}
