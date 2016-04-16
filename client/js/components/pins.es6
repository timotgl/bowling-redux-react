const Pins = ({pins}) => (
  <div id="pins">
    <p>{(pins[6]) ? 'I': '_'} {(pins[7]) ? 'I': '_'} {(pins[8]) ? 'I': '_'} {(pins[9]) ? 'I': '_'}</p>
    <p>{(pins[3]) ? 'I': '_'} {(pins[4]) ? 'I': '_'} {(pins[5]) ? 'I': '_'}</p>
    <p>{(pins[1]) ? 'I': '_'} {(pins[2]) ? 'I': '_'}</p>
    <p>{(pins[0]) ? 'I': '_'}</p>
  </div>
);

export default Pins;
