const getState = (state) => state.players;

const getPlayers = (state) => getState(state).players;

const getActivePlayerIndex = (state) => getState(state).activePlayerIndex;

const playersSelectors = {
  getPlayers,
  getActivePlayerIndex,
};

export default playersSelectors;
