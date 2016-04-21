import React from 'react'
import { connect } from 'react-redux'
import Constants from '../constants.es6'
import Pins from './pins.es6'
import StateMonitor from './state_monitor.es6'
import NewPlayerForm from './new_player_form.es6'
import StartGameButton from './start_game_button.es6'
import PlayerControlForm from './player_control_form.es6'

const Component = React.createClass({
  render: function() {
    let num_players = this.props.game.players.length;
    return (
      <div>
        <StateMonitor />
        <Pins />
        <div>
          {(this.props.game.started) ? (
            <PlayerControlForm />
          ) : (
            <div>
              <NewPlayerForm />
              {(num_players >= Constants.MIN_PLAYERS) ? (
                <StartGameButton />
              ) : ''}
            </div>
          )}
        </div>
      </div>
    );
  }
});

const Root = connect((state) => ({game: state}))(Component);
export default Root;
