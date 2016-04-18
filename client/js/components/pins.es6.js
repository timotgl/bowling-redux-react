import React from 'react'
import { connect } from 'react-redux'

const MAX_PINS = 10;
const ROLLS_PER_FRAME = 2;

const Component = React.createClass({
  lastRolls: function(frames) {
    let frame = frames[frames.length - 1];
    return frame.find((player) => player.length < ROLLS_PER_FRAME);
  },
  
  render: function() {
    let rolls = (this.props.game.started) ? this.lastRolls(this.props.game.frames) : [];
    let remaining_pins;
    if (rolls.length) {
      let last_roll = rolls[rolls.length -1];
      remaining_pins = MAX_PINS - last_roll || MAX_PINS;
    } else {
      remaining_pins = MAX_PINS;
    }
    let p = Array.from(Array(MAX_PINS)).map((_item, idx) => {
      return (idx + 1) > (MAX_PINS - remaining_pins);
    });
    return (
      <div id="pins">
        <h2>Pins</h2>
        <p>{(p[6]) ? 'I': '_'} {(p[7]) ? 'I': '_'} {(p[8]) ? 'I': '_'} {(p[9]) ? 'I': '_'}</p>
        <p>{(p[3]) ? 'I': '_'} {(p[4]) ? 'I': '_'} {(p[5]) ? 'I': '_'}</p>
        <p>{(p[1]) ? 'I': '_'} {(p[2]) ? 'I': '_'}</p>
        <p>{(p[0]) ? 'I': '_'}</p>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({game:state});
const Pins = connect(mapStateToProps)(Component);
export default Pins;
