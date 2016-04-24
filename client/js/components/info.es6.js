import React from 'react';

const Info = React.createClass({
  render: function() {
    return (
      <div id="info">
        <h1>Bowling game demo with Redux and React</h1>
        <p>
          Describe what this does here.
        </p>
        <h2>Rules</h2>
        <ul>
          <li>
            The minimum number of required players is two.
          </li>
          <li>
            A game consists of ten frames.
          </li>
          <li>
            Knocking down all ten pins in two rolls is called a <em>spare</em>.
          </li>
          <li>
            Knocking down all ten pins with the first roll is called a <em>strike</em>.
          </li>
          <li>
            Frames one through nine consist of two rolls, unless the first roll is a strike. In this case the frame ends.
          </li>
          <li>
            The tenth and last frame ends after two rolls, if less than ten pins were knocked down.<br />
            A third bonus roll is granted to the player, if ten or more pins were knocked down (spare or strike).
          </li>
          <li>
            Each player&quot;s final score is the sum of all knocked down pins plus bonus points for spares and strikes.
          </li>
          <li>
            A spare scores the subsequent roll as bonus points.
          </li>
          <li>
            A strike scores the subsequent two rolls as bonus points.
          </li>
        </ul>
      </div>
    );
  }
});
export default Info;
