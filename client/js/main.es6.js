import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root.es6'


const initialGame = {
  players: [],
  frames: []
};

const bowlingGame = (game = initialGame, action) => {
  let new_state;
  switch (action.type) {
    case 'ADD_PLAYER':
      console.log('ADD_PLAYER');
      new_state = Object.assign({}, game);
      new_state.players.push(action.name);
      return new_state;
    case 'START_GAME':
      console.log('START_GAME');
      new_state = Object.assign({}, game);
      new_state.frames.push([]);
      return new_state;
    case 'ROLL':
      console.log('START_GAME');
      return game;
    default:
      console.log('Unknown action');
      return game;
  }
}

const game = createStore(bowlingGame);

ReactDOM.render(
  <Provider store={game}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
