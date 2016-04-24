import React from 'react';
import { connect } from 'react-redux';

const Component = React.createClass({
  renderActions: function() {
    return (
      <li>Actions go here</li>
    );
  },

  render: function() {
    let started = JSON.stringify(this.props.started);
    let players = JSON.stringify(this.props.players);
    let frames = JSON.stringify(this.props.frames);
    let ended = JSON.stringify(this.props.ended);
    return (
      <div id="history_browser">
        <h2>History browser</h2>
        <button onClick={this.props.reset}>Reset</button>
        <ol>
          {this.renderActions()}
        </ol>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  started: state.started,
  players: state.players,
  frames: state.frames,
  ended: state.ended
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch({type: 'RESET'})
});

const HistoryBrowser = connect(mapStateToProps, mapDispatchToProps)(Component);
export default HistoryBrowser;
