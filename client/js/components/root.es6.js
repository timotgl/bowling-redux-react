import React from 'react';
import { connect } from 'react-redux';
import Constants from '../constants.es6';
import Pins from './pins.es6';
import HistoryBrowser from './history_browser.es6';
import Info from './info.es6.js';
import StateMonitor from './state_monitor.es6';
import ScoreBoard from './score_board.es6';
import NewPlayerForm from './new_player_form.es6';
import StartGameButton from './start_game_button.es6';
import PlayerControlForm from './player_control_form.es6';

const Component = React.createClass({
  render: function() {
    return (
      <div>
        <HistoryBrowser />
        <div>
          <Info />
          <StateMonitor />
          <ScoreBoard />
          <Pins />
          <div>
            {(this.props.has_started) ? (
              <PlayerControlForm />
            ) : (
              <div>
                <NewPlayerForm />
                {(this.props.has_enough_players) ? (
                  <StartGameButton />
                ) : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({
  has_started: state.started,
  has_enough_players: state.players.length >= Constants.MIN_PLAYERS
});

const Root = connect(mapStateToProps)(Component);
export default Root;
