import React from 'react';
import { connect } from 'react-redux'

const Component = React.createClass({
  render: function() {
    return (
      <div id="state_mmonitor">
        <h2>State monitor</h2>
        <pre>{ JSON.stringify(this.props.game) }</pre>
      </div>
    );
  }
});

const mapStateToProps = (state) => ({game:state});
const StateMonitor = connect(mapStateToProps)(Component);
export default StateMonitor;
