import roundEssentialSelectors from "./roundEssentialSelectors";

const canDrawLocomotive = (state) => {
  const points = roundEssentialSelectors.getPoints(state);

  return points >= 2;
};

const hasPointsToBuild = (state) => {
  const points = roundEssentialSelectors.getPoints(state);

  return points >= 2;
};

const isGameEnded = (state) => {
  const lastRoundsCount = roundEssentialSelectors.getLastRoundsCount(state);

  return lastRoundsCount === 0;
};

const roundDerivativeSelectors = {
  canDrawLocomotive,
  hasPointsToBuild,
  isGameEnded,
};

export default roundDerivativeSelectors;
