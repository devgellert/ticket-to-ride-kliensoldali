import roundEssentialSelectors from "./roundEssentialSelectors";

const canDrawLocomotive = (state) => {
  const points = roundEssentialSelectors.getPoints(state);

  return points >= 2;
};

const hasPointsToBuild = (state) => {
  const points = roundEssentialSelectors.getPoints(state);

  return points >= 2;
};

const roundDerivativeSelectors = {
  canDrawLocomotive,
  hasPointsToBuild,
};

export default roundDerivativeSelectors;
