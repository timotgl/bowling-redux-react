import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root.es6'


const initialState = {
  players: [],
  frames: []
};

const addPlayer = (state = initialState, action) => {
  if (action.type === 'ADD_PLAYER') {
    let new_state = Object.assign({}, state);
    new_state.players.push(action.name);
    return new_state;
  } else {
    return state;
  }
}

const store = createStore(addPlayer);

ReactDOM.render(<Root />, document.getElementById('root'));
