const getState = (state) => state.round;

const getPoints = (state) => getState(state).points;

const isRoundEnded = (state) => getPoints(state) === 0; // TODO derivative

const roundEssentialSelectors = {
  isRoundEnded,
  getPoints,
};

export default roundEssentialSelectors;
