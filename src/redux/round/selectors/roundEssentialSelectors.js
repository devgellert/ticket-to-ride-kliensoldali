const getState = (state) => state.round;

const getPoints = (state) => getState(state).points;

const isRoundEnded = (state) => getPoints(state) === 0; // TODO derivative

const getLastRoundsCount = (state) => getState(state).lastRoundsCount;

const getNth = (state) => getState(state).nth;

const getLogs = (state) => getState(state).logs;

const roundEssentialSelectors = {
  isRoundEnded,
  getPoints,
  getLastRoundsCount,
  getNth,
  getLogs,
};

export default roundEssentialSelectors;
