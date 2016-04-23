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
          <td>Final Score</td>
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

    // Flatten array of frames
    let rolls = [].concat.apply([], frames);

    // Initialize multipliers
    let multipliers = rolls.slice().map(() => 1);

    // Account for strikes in frames 1-9 (skip 10th)
    rolls.slice(0, max_frames - 1).forEach((roll, idx) => {
      if (roll === max_pins) {
        // Strike detected.
        // Increase the multipliers for the next two rolls, if present.
        if (idx < rolls.length - 1) {
          multipliers[idx + 1]++;
          if (idx < rolls.length - 2) {
            multipliers[idx + 2]++;
          }
        }
      }
    });

    // frames  [1       2       3       4       5       6       7       8       9       10]
    // indexes [0,  1,  2,  3,  4,  5]
    // rolls = [4,  6,  1, 10,  4,  6,  1,  2,  1,  2,  1,  2,  1,  2,  1,  2,  1,  2,  5,  5,  3]
    // multi = [1,  1,  2,  1,  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
    return rolls.reduce((res, curr, index) => {
      return res + curr * multipliers[index]
    }, 0);
  },

  renderRow: function(player, index) {
    let frames = this.framesForPlayer(this.props.frames, index, Constants.MAX_FRAMES);
    let cells = frames.map(this.renderFrameCell);
    let final_score = this.scoreForPlayer(
      frames, Constants.MAX_FRAMES, Constants.MAX_PINS
    );
    return (
      <tr key={index}>
        <td>{player}</td>
        {cells}
        <td>{final_score}</td>
      </tr>
    );
  },

  renderFrameCell: function(rolls, index) {
    // rolls = [], [5], [4,5]
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
  renderFrameCells: function(frames) {

  },

  render: function() {
    return (
      <div id="scoreboard">
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
  players: state.players,
  frames: state.frames
});

const ScoreBoard = connect(mapStateToProps)(Table);
export default ScoreBoard;
