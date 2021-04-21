import roundEssentialSelectors from "./roundEssentialSelectors";

const canDrawLocomotive = (state) => {
  const points = roundEssentialSelectors.getPoints(state);

  return points >= 2;
};

const roundDerivativeSelectors = { canDrawLocomotive };

export default roundDerivativeSelectors;
