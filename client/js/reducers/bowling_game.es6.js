import Constants from '../constants.es6';
import cloneArray from '../lib/clone_array.es6';
import reduceRoll from './roll.es6';

const initialGame = {
  players: [],
  started: false,
  ended: false,
  frames: []
};

const BowlingGameReducer = (game = initialGame, action) => {
  let new_state;
  switch (action.type) {
    case 'RESET':
      return initialGame;
    case 'ADD_PLAYER':
      new_state = Object.assign({}, game);
      new_state.players = game.players.slice();
      new_state.players.push(action.name);
      return new_state;
    case 'START_GAME':
      new_state = Object.assign({}, game, {started: true});

      // Initialize first frame
      let first_frame = new_state.players.map(() => []);
      new_state.frames = cloneArray(game.frames);
      new_state.frames.push(first_frame);
      return new_state;
    case 'ROLL':
      return reduceRoll(game, action);
    default:
      return game;
  }
};

export default BowlingGameReducer;
