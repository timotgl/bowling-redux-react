import Constants from '../constants.es6';
import cloneArray from '../lib/clone_array.es6';
import reduceRoll from './roll.es6';

const initialGame = {
  players: [],
  started: false,
  ended: false,
  frames: [],
  actions: []
};

const BowlingGameReducer = (game = initialGame, action) => {
  // This is not actually part of a Redux app. Enable action replay for demo.
  let actions_updated = JSON.parse(JSON.stringify(game.actions));
  if (action.type !== 'RESET') {
    actions_updated.push(action);
  }

  let new_state;
  switch (action.type) {
    case 'RESET':
      return initialGame;
    case 'ADD_PLAYER':
      new_state = Object.assign({}, game);
      new_state.actions = actions_updated;

      // Save new player name
      new_state.players = game.players.slice();
      new_state.players.push(action.name);
      return new_state;
    case 'START_GAME':
      new_state = Object.assign({}, game, {started: true});
      new_state.actions = actions_updated;

      // Initialize first frame
      let first_frame = new_state.players.map(() => []);
      new_state.frames = cloneArray(game.frames);
      new_state.frames.push(first_frame);
      return new_state;
    case 'ROLL':
      return reduceRoll(game, action, actions_updated);
    default:
      return game;
  }
};

export default BowlingGameReducer;
