const initialGame = {
  players: [],
  frames: []
};

const BowlingGameReducer = (game = initialGame, action) => {
  console.log('Reducing action:', action);
  let new_state;
  switch (action.type) {
    case 'ADD_PLAYER':
      new_state = Object.assign({}, game);
      new_state.players.push(action.name);
      return new_state;
    case 'START_GAME':
      new_state = Object.assign({}, game);
      new_state.frames.push([]);
      return new_state;
    case 'ROLL':
      return game;
    default:
      return game;
  }
}

export default BowlingGameReducer;
