import React from 'react';
import { connect } from 'react-redux';
import Constants from '../constants.es6';

const Component = React.createClass({
  renderRollButtons: function(player_index, num_pins) {
    let buttons = [];
    let pin = 1;
    while (pin <= num_pins) {
      let knockDown = this.props.dispatchKnockDown.bind(this, player_index, pin);
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
    console.log('frame', num_frames);

    // Find current frame
    let frame = this.props.game.frames[num_frames - 1];

    // Find first array not filled with two numbers!
    let active_player_index;
    let rolls = frame.find((player, index) => {
      if (player.length <= Constants.ROLLS_PER_FRAME) {
        // player = [] or [5] or [5,5]
        let sum_rolls = player.reduce((res, curr) => res + curr, 0);
        if (num_frames === Constants.MAX_FRAMES && sum_rolls >= Constants.MAX_PINS) {
          console.log('last frame and player did spare or strike');
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
      console.log('no active player found. frame=', frame);
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
const PlayerControlForm = connect(mapStateToProps, mapDispatchToProps)(Component);
export default PlayerControlForm;
