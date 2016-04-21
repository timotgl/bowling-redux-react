TODO:
 * Refactor current end of game logic
 * Scoreboard with current and final score
 * Pin monitor with image of pin
 * Action log view, clicking an action resets the state to that moment *after*
   the action was processed
 * Add textual info to index.html (this is a demo of...)
 * Describe in README.md how to install and run demo

Minimum (keep in mind the optional requirements):

 * Implement a scoring system for a bowling game according to these rules:
  - A game consists of 10 frames.
  - In general each frame has 2 rolls.
  - In general a player scores the number of pins knocked down.
  - If the player knocks down all 10 pins on the first roll it’s a strike.
    The player scores 10 plus the number of pins knocked down in the next two
    rolls.
  - If the player knocks down all 10 pins in two rolls it’s a spare.
    The player scores 10 plus the number of pins knocked down in the next roll.

 * A player who bowls a strike in the tenth (final) frame is awarded two extra
   balls so as to allow the awarding of bonus points. If both these balls also
   result in ten pins knocked down each, a total of 30 points (10 + 10 + 10)
   is awarded for the frame. These bonus points do not count on their own,
   however. They only count as the bonus for the strike.
 
 * The most points that can be scored in a single frame is 30 points
 * Therefore a perfect game is 300 points (30 points in all 10 frames)
   which is 12 strikes in a row

* Simple visualisation of the game.

Optional:
 * Add support for the last frame in the game:
  - The player gets additional rolls in the last frame: one additional for a
    spare after the second roll or two extra rolls for a strike.
 * Create a method that randomly throws a roll (one roll is 1-10 pins
knocked down), and progresses the scoring.
 * Support multiple players.



spare: roll counts as (number of pins) + the pins of the next roll
strike: roll counts as (number of pins) + the pins of the next two rolls

a frame can have one of 3 outcomes:
 * strike (all ten down in the first ball)
    frame = [10, 0-10]
 * spare (all ten down by the second ball)
    [r1, r2] with r1+r2 = 10
 * open (one or more missed pins still standing after the second ball)
    [r1, r2] with r1 + r2 < 10

// array with up to ten items, one for each completed frame.
game = {
  players: [
    'player1',
    'player2'
  ],
  frames: [
    [
      [3, 5],
      [10, 10]
    ],
    [
      [2, 8],
      [0, 4]
    ]
  ]
};

// initial state
game = {
  players: [],
  frames: []
}

// finished state
game = {
  players: ['p1', 'p2'],
  frames: [
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10]],
    [[3, 5], [10, 10, 10]],
  ]
}

Actions:
{type: 'ADD_PLAYER', name: 'player1'}
{type: 'START_GAME'}
{type: 'ROLL', player: 'player1', pins: 5}

// Redux reducer
/*
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state -1;
    default:
      return state;
  }
}
*/



/*
const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);
*/

//const {createStore} = Redux;
//const store = createStore(counter);



//store.subscribe(render);
