const initialGame = {
  players: [],
  started: false,
  frames: []
};

const ROLLS_PER_FRAME = 2;

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
      let first_frame = new_state.players.map(() => []);
      new_state.frames.push(first_frame);
      return new_state;
    case 'ROLL':
      new_state = Object.assign({}, game);
      let num_frames = new_state.frames.length;
      let frame = new_state.frames[num_frames - 1];
      let rolls = frame[action.player];
      rolls.push(action.pins);
      
      let num_players = new_state.players.length;
      let is_last_player = action.player === (num_players - 1);
      
      // Check if frame is complete (all players rolled twice)
      if (rolls.length === ROLLS_PER_FRAME && is_last_player) {
        // Initialize next frame
        let next_frame = new_state.players.map(() => []);
        new_state.frames.push(next_frame);
      }
      return new_state;
    default:
      return game;
  }
}

export default BowlingGameReducer;
