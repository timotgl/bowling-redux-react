import React from 'react';
import { connect } from 'react-redux'

const Monitor = React.createClass({
  render: function() {
    return (
      <div id="state_mmonitor">
        <h2>State monitor</h2>
        <pre>{ JSON.stringify(this.props.game) }</pre>
      </div>
    );
  }
});

// This component will have access to `state` through `this.props.game`
const mapStateToProps = (state) => ({game:state})

// Connect to Redux store
const StateMonitor = connect(mapStateToProps)(Monitor);
export default StateMonitor;
