const getState = (state) => state.round;

const isRoundEnded = (state) => getState(state).points === 0;

const roundEssentialSelectors = {
  isRoundEnded,
};

export default roundEssentialSelectors;
