import React from 'react'
import { connect } from 'react-redux'

const MAX_PINS = 10;
const ROLLS_PER_FRAME = 2;

const Component = React.createClass({
  knockDown: function(player_index, pins) {
    let player_name = this.props.game.players[player_index];
    console.log(player_name, 'knocks down', pins, 'pins');
  },
  
  renderRollButtons: function(player_index, num_pins) {
    let buttons = [];
    let pin = 1;
    while (pin <= num_pins) {
      let knockDown = this.knockDown.bind(this, player_index, pin);
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
      if (player.length < ROLLS_PER_FRAME) {
        active_player_index = index;
        return true;
      }
    });
    let active_player = this.props.game.players[active_player_index];
    
    let pins;
    if (rolls.length) {
      // Second roll
      console.log('second roll, calc remaining pins');
    } else {
      // First roll
      pins = MAX_PINS;
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
  dispatch: (name) => dispatch({type: 'ADD_PLAYER', name: name})
});
const PlayerControlForm = connect(mapStateToProps, mapDispatchToProps)(Component);
export default PlayerControlForm;
