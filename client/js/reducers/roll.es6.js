import Constants from '../constants.es6';
import cloneArray from '../lib/clone_array.es6';

export default function reduceRoll(game, action) {
  // Shortcuts
  let max_pins = Constants.MAX_PINS;
  let rolls_per_frame = Constants.ROLLS_PER_FRAME;
  let max_frames = Constants.MAX_FRAMES;

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

  let reduceRegularFrame = () => {
    // Check if frame is complete (all players rolled twice)
    // or the last player scored a strike.
    let is_strike = (rolls.length === 1) ? rolls[0] === max_pins : false;
    let has_rolled_twice = rolls.length === rolls_per_frame;
    if (is_last_player && (is_strike || has_rolled_twice)) {
      // Initialize next frame
      let next_frame = new_state.players.map(() => []);
      new_state.frames.push(next_frame);
    }
  };

  let reduceLastFrame = () => {
    let sum_rolls = rolls.reduce((res, curr) => res + curr, 0);
    let was_spare_or_strike = sum_rolls >= max_pins;
    let did_regular_rolls = rolls.length === rolls_per_frame;

    // Detect if player has rolled twice already but scored a strike or spare
    let bonus_roll_allowed = did_regular_rolls && was_spare_or_strike;

    if (rolls.length < rolls_per_frame || bonus_roll_allowed) {
      // The current player has rolled 0 or 1 times. they get another roll.
      // or
      // The current player has rolled 2 times but rolled a spare or strike.
      // they get another roll.
    } else if (is_last_player) {
      // last frame, last player, no more rolls, end game
      new_state.ended = true;
    }
  };

  // Apply helper functions
  (num_frames === max_frames) ? reduceLastFrame() : reduceRegularFrame();
  return new_state;
}
