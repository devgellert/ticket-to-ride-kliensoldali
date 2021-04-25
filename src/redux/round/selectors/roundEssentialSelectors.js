const getState = (state) => state.round;

const getPoints = (state) => getState(state).points;

const isRoundEnded = (state) => getPoints(state) === 0; // TODO derivative

const getLastRoundsCount = (state) => getState(state).lastRoundsCount;

const roundEssentialSelectors = {
  isRoundEnded,
  getPoints,
  getLastRoundsCount,
};

export default roundEssentialSelectors;
