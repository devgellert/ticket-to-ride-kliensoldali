import buildingEssentialSelectors from "./buildingEssentialSelectors";

const { getSelectedConnection } = buildingEssentialSelectors;

const getIsConnectionSelected = (state) => {
  return getSelectedConnection(state) !== null;
};

const getIsConnectionSelectedById = (state, id) => {
  if (!getIsConnectionSelected(state)) return false;

  return getSelectedConnection(state).id === id;
};

const buildingDerivativeSelectors = {
  getIsConnectionSelectedById,
};

export default buildingDerivativeSelectors;
