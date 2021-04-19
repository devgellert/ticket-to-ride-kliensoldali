const getState = (state) => state.general;

const getRoundCount = (state) => getState(state).roundCount;

const getDeck = (state) => getState(state).deck;

const generalSelectors = {
  getRoundCount,
  getDeck,
};

export default generalSelectors;
