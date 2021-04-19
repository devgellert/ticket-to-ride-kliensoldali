const getState = (state) => state.general;

const getRoundCount = (state) => getState(state).roundCount;

const getDeck = (state) => getState(state).deck;

const getDestinations = (state) => getState(state).destinations;

const generalSelectors = {
  getRoundCount,
  getDeck,
  getDestinations,
};

export default generalSelectors;
