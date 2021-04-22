import roundEssentialSelectors from "./roundEssentialSelectors";

const canDrawLocomotive = (state) => {
  const points = roundEssentialSelectors.getPoints(state);

  return points >= 2;
};

const canBuild = (state) => {
  const points = roundEssentialSelectors.getPoints(state);

  return points >= 2;
};

const roundDerivativeSelectors = { canDrawLocomotive, canBuild };

export default roundDerivativeSelectors;
