import React from 'react'
import Pins from './pins.es6'
import NewPlayerForm from './new_player_form.es6'

const Root = React.createClass({
  render: function() {
    return (
      <div>
        <Pins pins={[true, false, true, true, false, true, true, true, false, true]} />
        <NewPlayerForm />
      </div>
    );
  }
});

export default Root;
