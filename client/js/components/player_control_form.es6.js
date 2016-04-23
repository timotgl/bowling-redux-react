import React from 'react';
import { connect } from 'react-redux';
import Constants from '../constants.es6';

const Form = React.createClass({
  renderRollButtons: function(player_idx, num_pins) {
    let buttons = [];
    let pin = 1;
    while (pin <= num_pins) {
      let knockDown = this.props.dispatchKnockDown.bind(this, player_idx, pin);
      buttons.push((
        <li key={pin}>
          <button onClick={knockDown}>Knock down {pin} pins</button>
        </li>
      ));
      pin++;
    }
    return buttons;
  },

  render: function() {
    let num_frames = this.props.game.frames.length;

    // Find current frame
    let frame = this.props.game.frames[num_frames - 1];

    // Find first array not filled with two numbers!
    let active_player_index;
    let rolls = frame.find((player, index) => {
      if (player.length <= Constants.ROLLS_PER_FRAME) {
        let is_last_frame = num_frames === Constants.MAX_FRAMES;

        // Test if player rolled spare or strike before
        let sum_rolls = player.reduce((res, curr) => res + curr, 0);
        let was_spare_or_strike = sum_rolls >= Constants.MAX_PINS;

        if (is_last_frame && was_spare_or_strike) {
          active_player_index = index;
          return true;
        } else if (player.length < Constants.ROLLS_PER_FRAME) {
          active_player_index = index;
          return true;
        }
      }
      return false;
    });
    if (!rolls) {
      return (
        <div>
          <h1>Game ended!</h1>
        </div>
      );
    }
    let active_player = this.props.game.players[active_player_index];

    let pins;
    if (rolls.length) {
      // Second roll. Calculate remaining pins or reset to 10.
      pins = Constants.MAX_PINS - rolls[0] || Constants.MAX_PINS;
    } else {
      // First roll
      pins = Constants.MAX_PINS;
    }

    return (
      <div>
        <h1>
          It is {active_player + '\'s'} turn
        </h1>
        <ul>
          {this.renderRollButtons(active_player_index, pins)}
        </ul>
      </div>
    );
  }
});


const mapStateToProps = (state) => ({game: state});
const mapDispatchToProps = (dispatch) => ({
  dispatchKnockDown: (player_index, pins) => {
    return dispatch({type: 'ROLL', player: player_index, pins: pins});
  }
});
const PlayerControlForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default PlayerControlForm;
