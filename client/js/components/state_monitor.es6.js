import React from 'react';
import { connect } from 'react-redux';

const Component = React.createClass({
  render: function() {
    let started = JSON.stringify(this.props.started);
    let players = JSON.stringify(this.props.players);
    let frames = JSON.stringify(this.props.frames);
    let ended = JSON.stringify(this.props.ended);
    return (
      <div id="state_monitor">
        <h2>State monitor</h2>
        <pre>
          {'state = {\n'}
          {'  started: ' + started + ',\n'}
          {'  players: ' + players + ',\n'}
          {'  frames:  ' + frames + ',\n'}
          {'  ended:   ' + ended + '\n'}
          {'}'}
        </pre>
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
const StateMonitor = connect(mapStateToProps)(Component);
export default StateMonitor;
