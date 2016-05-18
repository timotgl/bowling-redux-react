# Bowling game demo with Redux and React
[Live demo available](http://timotaglieber.de/bowling-redux-react/). A simulation of a bowling game (not an actual game) in JavaScript for the browser. This project was created as an exercise to better understand Redux and its concept of a single, global app state. It applies reducer functions whenever an action in the game is dispatched to the Redux store:

 * New player added
 * Start game
 * A player knocks down a number of pins

These actions cause the reducer functions to mutate the state of the game. The state tree is a simple structure:

```
{
  players: [],
  started: false,
  frames: [],
  ended: false
};
```

The `players` array will be filled with the participating players. `started` signals that the game has started and we're done adding new players. Once this is the case, `frames` will be filled with nested arrays representing the player's rolls during all ten frames of the bowling game. `ended` signals that we have played all frames, including the potential bonus rolls, and the game is over.

Most of the heavy lifting is done by `reduceRoll`, and the React components `ScoreBoard` and `PlayerControlForm`. The tenth frame of a bowling game introduces a couple of constraints for the end-of-game logic since a third roll is granted to players who score a strike or spare. `PlayerControlForm` determines who's turn it is to roll, `reduceRoll` determines when it's time to proceed to the next frame. The `ScoreBoard` calculates each player's score, accounting for bonuses from spares and strikes as far as applicable. All this information is derived solely from the state tree, which maintains it's simple structure at all times.

The state tree also records all game actions in a hidden property `actions` to enable action replay during the game. The game can be reset to any previous state by performing a `RESET` action and then replaying all actions that happened up to the chosen point in time.

## How to install and run
 1. Do `npm install`
 2. Run `webpack-dev-server`
 3. Open `client/index.html` in your browser
