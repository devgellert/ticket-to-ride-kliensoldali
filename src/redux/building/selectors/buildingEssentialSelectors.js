const getState = (state) => state.building;

const getSelectedConnection = (state) => getState(state).selectedConnection;

const getSelectedCards = (state) => getState(state).selectedCards;

const buildingEssentialSelectors = {
  getSelectedConnection,
  getSelectedCards,
};

export default buildingEssentialSelectors;
