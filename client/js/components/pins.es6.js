import React from 'react';
import { connect } from 'react-redux';
import Constants from '../constants.es6';

const Component = React.createClass({
  /*
   * Map pin positions to their standing up/knocked down status.
   * Example:
   * For num_knocked_pins = 3 we return:
   * [false, false, false, true, true, true, true, true, true, true]
   * (first three positions are knocked down)
   */
  mapPositions: function(num_knocked_pins, max_pins) {
    let positions = Array.from({length: max_pins});

    let mapper;
    if (num_knocked_pins === max_pins) {
      // All pins were knocked down. Show all as standing again.
      mapper = (_item, idx) => true;
    } else {
      mapper = (_item, idx) => (idx + 1) > num_knocked_pins;
    }
    return positions.map(mapper);
  },

  render: function() {
    let pins = this.mapPositions(this.props.knocked_down, Constants.MAX_PINS);
    let render = (pin_is_standing) => {
      let class_name = (pin_is_standing) ? 'standing_pin' : 'no_pin';
      return (
        <span className={class_name}></span>
      );
    };
    /* eslint-disable max-len */
    return (
      <div id="pins" className={(this.props.started) ? '' : 'hidden'}>
        <h2>Pins</h2>
        <p>{render(pins[6])} {render(pins[7])} {render(pins[8])} {render(pins[9])}</p>
        <p>{render(pins[3])} {render(pins[4])} {render(pins[5])}</p>
        <p>{render(pins[1])} {render(pins[2])}</p>
        <p>{render(pins[0])}</p>
      </div>
    );
    /* eslint-enable max-len */
  }
});

/*
 * Count how many pins were knocked down by the last roll.
 */
export function countKnockedDownPins(frames, has_started, has_ended) {
  // Show all pins as standing if game not in progress.
  if (!(has_started && !has_ended)) {
    return 0;
  }

  // The current player hasn't finished their frame yet,
  // so they have less than 2 (frames 1-9) or less than 3 (frame 10) rolls.
  let max_rolls;
  if (frames.length === Constants.MAX_FRAMES) {
    max_rolls = Constants.ROLLS_PER_FRAME + 1;
  } else {
    max_rolls = Constants.ROLLS_PER_FRAME;
  }

  // Find the current players array of rolls in frames
  let last_frame = frames[frames.length - 1];
  let rolls = last_frame.find((player) => player.length < max_rolls);

  return rolls[rolls.length - 1] || 0;
}

const mapStateToProps = (state) => ({
  started: state.started,
  knocked_down: countKnockedDownPins(state.frames, state.started, state.ended)
});

const Pins = connect(mapStateToProps)(Component);
export default Pins;
