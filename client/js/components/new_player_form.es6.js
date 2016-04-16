import React from 'react';

const NewPlayerForm = React.createClass({
  addPlayer: function(submitEvent) {
    submitEvent.preventDefault();
    console.log('add player called - call store.dispatch. name=', this.state.name);
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

export default NewPlayerForm;
