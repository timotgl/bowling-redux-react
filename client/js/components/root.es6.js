import React from 'react'
import { connect } from 'react-redux'
import Pins from './pins.es6'
import StateMonitor from './state_monitor.es6'
import NewPlayerForm from './new_player_form.es6'
import StartGameButton from './start_game_button.es6'
import PlayerControlForm from './player_control_form.es6'

const MIN_PLAYERS = 2;

const Component = React.createClass({
  render: function() {
    let num_players = this.props.game.players.length;
    let num_frames = this.props.game.frames.length;
    
    return (
      <div>
        <StateMonitor />
        <Pins pins={[true, false, true, true, false, true, true, true, false, true]} />
        <div>
          {(num_frames >= 1) ? (
            <PlayerControlForm />
          ) : (
            <div>
              <NewPlayerForm />
              {(num_players >= MIN_PLAYERS) ? (
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
