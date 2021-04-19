const getState = (state) => state.players;

const getPlayers = (state) => getState(state).players;

const getActivePlayerIndex = (state) => getState(state).activePlayerIndex;

const getActivePlayer = (state) =>
  getState(state).players[getState(state).activePlayerIndex];

const playersSelectors = {
  getPlayers,
  getActivePlayerIndex,
  getActivePlayer,
};

export default playersSelectors;
