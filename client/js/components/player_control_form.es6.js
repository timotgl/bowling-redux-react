import React from 'react'
import { connect } from 'react-redux'

const Component = React.createClass({
  render: function() {
    return (
      <h1>Player control form</h1>
    );
  }
});


const mapStateToProps = (state) => ({game: state});
const mapDispatchToProps = (dispatch) => ({
  dispatch: (name) => dispatch({type: 'ADD_PLAYER', name: name})
});
const PlayerControlForm = connect(mapStateToProps, mapDispatchToProps)(Component);
export default PlayerControlForm;
