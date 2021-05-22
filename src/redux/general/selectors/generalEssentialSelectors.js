const getState = (state) => state.general;

const getDeck = (state) => getState(state).deck;

const getDestinations = (state) => getState(state).destinations;

const getField = (state) => getState(state).field;

const generalEssentialSelectors = {
  getState,
  getDeck,
  getDestinations,
  getField,
};

export default generalEssentialSelectors;
