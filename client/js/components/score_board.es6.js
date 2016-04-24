import React from 'react';
import { connect } from 'react-redux';
import Constants from '../constants.es6';

const Head = React.createClass({
  render: function() {
    // Enumerate frames as column headings
    let frame_cells = Array.from({length: Constants.MAX_FRAMES}).map(
      (_i, idx) => (<td key={idx}>Frame {idx + 1}</td>)
    );

    return (
      <thead>
        <tr>
          <td>Player</td>
          {frame_cells}
          <td>Score</td>
        </tr>
      </thead>
    );
  }
});

const Body = React.createClass({
  /*
   * Extract all rolls for one player from frames array.
   */
  framesForPlayer: function(all_frames, player_index, max_frames) {
    let frames = all_frames.map((frame) => frame[player_index]);

    // Pad empty frames to maintain row length equal in table.
    let num_empty_frames = max_frames - frames.length;
    let empty_frames = Array.from({length: num_empty_frames}).map(() => []);

    return frames.concat(empty_frames);
  },

  /*
   * Calculate the current score for one player.
   */
  scoreForPlayer: function(frames, max_frames, max_pins) {
    // Flatten array of frames so we only have numbers (rolls).
    let rolls = [].concat.apply([], frames);

    // Initialize multipliers with a factor of 1 for each roll.
    let multipliers = rolls.slice().map(() => 1);

    // Loop through frames with roll_idx matching the position of the last roll
    // in the current frame. This is used to increase the respective multiplier.
    // We skip the last frame, since it can't result in bonus points for the
    // next frame anymore.
    let roll_idx = -1;
    frames.slice(0, max_frames - 1).forEach((frame) => {
      roll_idx += frame.length;

      // Detect strike or spare (mutually exclusive).
      let all_pins = frame.reduce((res, curr) => res + curr, 0) === max_pins;
      let is_strike = all_pins && frame.length === 1;
      let is_spare = all_pins && frame.length === Constants.ROLLS_PER_FRAME;

      // Is there a following roll which could count as bonus?
      if (roll_idx < rolls.length - 1) {
        // Count first bonus for a strike or spare
        if (is_strike || is_spare) {
          multipliers[roll_idx + 1]++;
          // Count second bonus, for a strike only
          if (is_strike && roll_idx < rolls.length - 2) {
            multipliers[roll_idx + 2]++;
          }
        }
      }
    });

    // Sum up individual rolls multiplied with their bonus factor.
    return rolls.reduce((res, curr, index) => {
      return res + curr * multipliers[index];
    }, 0);
  },

  renderRow: function(player, index) {
    let frames = this.framesForPlayer(
      this.props.frames, index, Constants.MAX_FRAMES
    );
    let rolls = frames.map(this.renderFrameCell);
    let score = this.scoreForPlayer(
      frames, Constants.MAX_FRAMES, Constants.MAX_PINS
    );
    return (
      <tr key={index}>
        <td>{player}</td>
        {rolls}
        <td>{score}</td>
      </tr>
    );
  },

  renderFrameCell: function(rolls, index) {
    let scores = rolls.map((roll, idx) => (
      <span key={idx} className="roll-score">{roll}</span>
    ));
    return (
      <td key={index}>
        {scores}
      </td>
    );
  },

  render: function() {
    return (
      <tbody>
        {this.props.players.map(this.renderRow)}
      </tbody>
    );
  }
});

const Table = React.createClass({
  render: function() {
    return (
      <div id="scoreboard" className={(this.props.started) ? '' : 'hidden'}>
        <h2>Scoreboard</h2>
        <table>
          <Head />
          <Body players={this.props.players} frames={this.props.frames} />
        </table>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  started: state.started,
  players: state.players,
  frames: state.frames
});

const ScoreBoard = connect(mapStateToProps)(Table);
export default ScoreBoard;
