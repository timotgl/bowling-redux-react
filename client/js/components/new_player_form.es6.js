import React from 'react';
import { connect } from 'react-redux';

const Component = React.createClass({
  addPlayer: function(submit_event) {
    submit_event.preventDefault();

    // Call .dispatch on Redux store
    this.props.dispatch(this.state.name);

    // Clear input
    this.setState(this.getInitialState());
  },

  setName: function(change_event) {
    this.setState({
      name: change_event.target.value
    });
  },

  getInitialState: function() {
    return {name: ''};
  },

  render: function() {
    return (
      <form onSubmit={ this.addPlayer }>
        <input
          type="text"
          value={ this.state.name }
          onChange={ this.setName }
          placeholder="Enter player name" />
        <button type="submit">Add Player</button>
      </form>
    );
  }
});


const mapStateToProps = (state) => ({game: state});
const mapDispatchToProps = (dispatch) => ({
  dispatch: (name) => dispatch({type: 'ADD_PLAYER', name: name})
});
const NewPlayerForm = connect(mapStateToProps, mapDispatchToProps)(Component);
export default NewPlayerForm;
