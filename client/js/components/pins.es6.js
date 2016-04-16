import React from 'react';

const Pins = React.createClass({
  render: function () {
    let p = this.props.pins;
    return (
      <div id="pins">
        <p>{(p[6]) ? 'I': '_'} {(p[7]) ? 'I': '_'} {(p[8]) ? 'I': '_'} {(p[9]) ? 'I': '_'}</p>
        <p>{(p[3]) ? 'I': '_'} {(p[4]) ? 'I': '_'} {(p[5]) ? 'I': '_'}</p>
        <p>{(p[1]) ? 'I': '_'} {(p[2]) ? 'I': '_'}</p>
        <p>{(p[0]) ? 'I': '_'}</p>
      </div>
    );
  }
});

export default Pins;
