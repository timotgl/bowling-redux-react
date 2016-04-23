import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.es6';
import BowlingGameReducer from './reducers/bowling_game.es6';

const store = createStore(BowlingGameReducer);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
