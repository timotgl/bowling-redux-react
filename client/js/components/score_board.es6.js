import React from 'react'
import { connect } from 'react-redux'
import Constants from '../constants.es6'

const Head = React.createClass({
  render: function() {
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
  renderRow: function(player, index) {
    // TODO: extract rolls for one player from frames array!
    let frames = [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7], [8,8], [9,9], [10,10]];
    let cells = frames.map(this.renderFrameCell);
    // frames = [[4,5], [9]]
    // all rolls only for that player
    
    // TODO: calc final score
    let final_score = 90;
    return (
      <tr>
        <td>{player}</td>
        {cells}
        <td>{final_score}</td>
      </tr>
    );
  },
  
  renderFrameCell: function(rolls, index) {
    // rolls = [], [5], [4,5]
    return (
      <td key={index}>{JSON.stringify(rolls)}</td>
    );
  },
  
  render: function() {
    let rows = this.props.players.map(this.renderRow);
    
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
});

const Table = React.createClass({
  renderFrameCells: function(frames) {
    
  },
  
  render: function() {  
    console.log('Table.render() called');  
    console.log(this.props.players);
    console.log(this.props.frames);
    return (
      <div id="scoreboard">
        <h2>Scoreboard</h2>
        <table style={{border: '1px solid gray'}}>
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
export default ScoreBoard
