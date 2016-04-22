import Constants from '../constants.es6'
import cloneArray from '../lib/clone_array.es6'

export default function reduceRoll(game, action) {
  // Clone old state
  let new_state = Object.assign({}, game);
  new_state.frames = cloneArray(game.frames);
  
  let num_frames = new_state.frames.length;
  let num_players = new_state.players.length;
  
  // Extract last frame and the current player's array of rolls
  let frame = new_state.frames[num_frames - 1];
  let rolls = frame[action.player];
  
  // Save number of knocked down pins
  rolls.push(action.pins);
  
  // Detect if current player is the last in order
  let is_last_player = action.player === (num_players - 1);
  
  if (num_frames === Constants.MAX_FRAMES) {
    // We're in the last frame
    let sum_rolls = rolls.reduce((res, curr) => res+curr, 0);
    
    // Detect if player has rolled twice already but scored a strike or spare
    let third_roll_allowed = rolls.length === Constants.ROLLS_PER_FRAME && sum_rolls >= Constants.MAX_PINS;
    
    if (rolls.length < Constants.ROLLS_PER_FRAME || third_roll_allowed) {
      // The current player has rolled 0 or 1 times. they get another roll.
      // or
      // The current player has rolled 2 times but rolled a spare or strike.
      // they get another roll.
      return new_state;
    } else {
      if (is_last_player) {
        // last frame, last player, no more rolls, end game
        new_state.ended = true;
        return new_state;
      } else {
        // last frame, but not last player
        return new_state;
      }
    }
  } else {
    // Not in the last frame yet
    // Check if frame is complete (all players rolled twice)
    if (rolls.length === Constants.ROLLS_PER_FRAME && is_last_player) {
      // Initialize next frame
      let next_frame = new_state.players.map(() => []);
      new_state.frames.push(next_frame);
    }
    return new_state;
  }
}
