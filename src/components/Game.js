import React, { Component } from 'react'; 
import Board from './Board';
import Menu from './Menu';
import axios from 'axios';

import { BASE_URL } from '../constants';

import initialState from '../initialState';
import convertToState from '../utils/convertToState';

class Game extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.cardClicker = this.cardClicker.bind(this);
    this.denyMove = this.denyMove.bind(this);
    this.confirmMove = this.confirmMove.bind(this);
  }

  componentDidMount(){
    axios.get(`${BASE_URL}/game/${this.props.params.gameId}`)
      .then(res => res.data)
      .then(gameState => convertToState(gameState))
      .then(state => this.setState(state))
      .then(() => console.log(this.state))
      .catch(console.error);
  }

  cardClicker(x, y) {
    console.log(x,y)
    if (this.state.player.hands[x][y] === 0) {
      this.moveCardPosition(x,this.state.currentRow);
      //game.placeCard(this.state.player, x, y)
    }
  }

  moveCardPosition(x) {
    //player starts with cardPosX and currentRow is the Y
    let y = this.state.currentRow;
    let hands = this.state.player.hands;

    if (this.state.player.cardPosX !== -1 && 
      this.state.player.cardPosX !== x && //so we don't place card where it already is
      this.state.player.hands[x][y] === 0) {
        hands[x][y] = this.state.player.hands[this.state.player.cardPosX][this.state.currentRow];
        hands[this.state.player.cardPosX][this.state.currentRow] = 0;
        this.setState(Object.assign({}, this.state, {
          player: {
            hands: hands,
            cardPosX: x,
            nextCard: {},
            position: 1
          }
        }));
      }
    else if (this.state.player.cardPosX === -1 &&
      this.state.player.hands[x][y] === 0) {
        hands[x][y] = this.state.player.nextCard; 
        this.setState(Object.assign({}, this.state, {
          player: {
            hands: hands,
            cardPosX: x,
            nextCard: {},
            position: 1
          }
        }));
      }
  }

  denyMove() {
    console.log('deny');
    let hands = this.state.player.hands;
    let x = this.state.player.cardPosX;
    let y = this.state.currentRow;
    let nextCard = hands[x][y];
    hands[x][y] = 0
    this.setState({
      player: {
        hands,
        nextCard,
        cardPosX: -1,
        position: 1
      }
    })
  }

  confirmMove() {
    console.log('move it');
    let x = this.state.player.cardPosX;
    let y = this.state.currentRow;
    let playerPosition = this.state.playerPosition;
    let cardToPlace = this.state.player.hands[x][y];
    console.log('asd',cardToPlace)
    //game.placeCard(this.state.player, x, cardToPlace)
    axios.post(`${BASE_URL}/placeCard/${this.props.params.gameId}`, {
      x,y, playerPosition
    })
      .then(res => this.setState(convertToState(res.data)))
      //.then(() => 
        //this.setState(Object.assign({}, game)))
      .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <Board
          cardClicker={this.cardClicker}
          player={this.state.player} 
          opponent={this.state.opponent}
        />
        <Menu denyMove={this.denyMove} confirmMove={this.confirmMove}/>
      </div>
    )
  }
}

export default Game;
