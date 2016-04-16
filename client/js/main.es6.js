console.log('main.es6 loaded');

import React from 'react';
import ReactDOM from 'react-dom';
import Pins from './components/pins.es6';

ReactDOM.render(
  <Pins pins={[true, false, true, true, false, true, true, true, false, true]} />,
  document.getElementById('root')
);
