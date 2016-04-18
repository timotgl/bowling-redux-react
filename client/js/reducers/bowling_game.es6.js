const initialGame = {
  players: [],
  started: false,
  frames: []
};

const BowlingGameReducer = (game = initialGame, action) => {
  console.log('Reducing action:', action);
  let new_state;
  switch (action.type) {
    case 'ADD_PLAYER':
      new_state = Object.assign({}, game);
      new_state.players.push(action.name);
      return new_state;
    case 'START_GAME':
      new_state = Object.assign({}, game, {started: true});

      // Initialize first frame
      let first_frame = game.players.map(() => []);
      new_state.frames.push(first_frame);
      return new_state;
    case 'ROLL':
      return game;
    default:
      return game;
  }
}

export default BowlingGameReducer;
