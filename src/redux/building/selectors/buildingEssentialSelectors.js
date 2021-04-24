const getState = (state) => state.building;

const getSelectedConnection = (state) => getState(state).selectedConnection;

const buildingEssentialSelectors = {
  getSelectedConnection,
};

export default buildingEssentialSelectors;
