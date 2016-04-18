import React from 'react'
import { connect } from 'react-redux'

const Component = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.startGame}>Start Game</button>
    );
  }
});


const mapStateToProps = (state) => ({game: state});
const mapDispatchToProps = (dispatch) => ({
  startGame: () => dispatch({type: 'START_GAME'})
});

const StartGameButton = connect(mapStateToProps, mapDispatchToProps)(Component);
export default StartGameButton;
