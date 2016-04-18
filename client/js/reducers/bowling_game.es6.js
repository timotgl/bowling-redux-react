const initialGame = {
  players: [],
  started: false,
  ended: false,
  frames: []
};

const MAX_FRAMES = 10;
const MAX_PINS = 10;
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
      let num_players = new_state.players.length;
      let is_last_player = action.player === (num_players - 1);
      rolls.push(action.pins);
      
      if (num_frames === MAX_FRAMES) {
        // We're in the last frame
        // [] or [5] or [10] or [5,4] or [5,5] or
        
        // may roll again if rolls.length < 2
        // may roll again if rolls.length === 2 and sum is >= 10
        // else: end game
        
         
        
        let sum_rolls = rolls.reduce((res, curr) => res+curr, 0);
        let third_roll_allowed = rolls.length === ROLLS_PER_FRAME && sum_rolls >= MAX_PINS;
        
        if (rolls.length < ROLLS_PER_FRAME || third_roll_allowed) {
          // The current player has rolled 0 or 1 times. they get another roll.
          // or
          // The current player has rolled 2 times but rolled a spare or strike.
          // they get another roll.
          console.log('last frame, but player has more rolls');
          return new_state;
        } else {
          if (is_last_player) {
            console.log('last frame, last player, no more rolls, end game');
            new_state.ended = true;
            return new_state;
          } else {
            console.log('last frame, but not last player');
            return new_state;
          }
        }
      } else {
        // Not in the last frame yet
        // Check if frame is complete (all players rolled twice)
        if (rolls.length === ROLLS_PER_FRAME && is_last_player) {
          // Initialize next frame
          let next_frame = new_state.players.map(() => []);
          new_state.frames.push(next_frame);
        }
        return new_state;
      }
    default:
      return game;
  }
}

export default BowlingGameReducer;
