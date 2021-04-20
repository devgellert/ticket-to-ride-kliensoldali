const getState = (state) => state.general;

const getRoundCount = (state) => getState(state).roundCount;

const getDeck = (state) => getState(state).deck;

const getDestinations = (state) => getState(state).destinations;

const getField = (state) => getState(state).field;

const generalSelectors = {
  getRoundCount,
  getDeck,
  getDestinations,
  getField,
};

export default generalSelectors;
