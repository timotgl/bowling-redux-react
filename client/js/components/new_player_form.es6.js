import React from 'react'
import { connect } from 'react-redux'

const Form = React.createClass({
  addPlayer: function(submitEvent) {
    submitEvent.preventDefault();
    let name = this.state.name;
    console.log('add player called - call store.dispatch. name=', name);
    this.props.dispatch(name);
  },
  
  setName: function(changeEvent) {
    this.setState({
      name: changeEvent.target.value
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


const mapStateToProps = (state) => ({
  game: state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (name) => dispatch({type: 'ADD_PLAYER', name: name})
});

const NewPlayerForm = connect(mapStateToProps,mapDispatchToProps)(Form);
export default NewPlayerForm;
