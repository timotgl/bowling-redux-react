import React from 'react';
import { connect } from 'react-redux';

const Component = React.createClass({
  renderReadableAction: function(action) {
    switch (action.type) {
      case 'ADD_PLAYER':
        return (
          <span>New player: {action.name}</span>
        );
      case 'START_GAME':
        return (
          <span>Start game</span>
        );
      case 'ROLL':
        let player_name = this.props.players[action.player];
        return (
          <span>{player_name} knocks down {action.pins} pins</span>
        );
      default:
        return '';
    }
  },

  renderActions: function(actions) {
    return actions.map((action, idx) => {
      let resetTo = this.replayActions.bind(this, actions, idx);
      let readableAction = this.renderReadableAction(action);
      let class_name = 'action ' + action.type;
      return (
        <li key={idx}>
          <a className={class_name} onClick={resetTo}>{readableAction}</a>
        </li>
      );
    });
  },

  /*
   * Replay all actions up to the given index.
   */
  replayActions: function(actions, index) {
    // Start with the RESET action and add all following ones up to index.
    let replay_actions = [{type: 'RESET'}].concat(actions.slice(0, index + 1));
    replay_actions.forEach((action) => this.props.dispatchAction(action));
  },

  render: function() {
    return (
      <div id="history_browser">
        <h2>History browser</h2>
        <p>Click on any of the actions below to travel back in time.</p>
        <button onClick={this.props.reset}>Restart game</button>
        <ol>
          {this.renderActions(this.props.actions)}
        </ol>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  players: state.players,
  actions: state.actions
});
const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch({type: 'RESET'}),
  dispatchAction: (action) => dispatch(action)
});

const HistoryBrowser = connect(mapStateToProps, mapDispatchToProps)(Component);
export default HistoryBrowser;
