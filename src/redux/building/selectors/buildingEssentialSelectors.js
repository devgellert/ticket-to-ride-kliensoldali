const getState = (state) => state.building;

const getSelectedConnection = (state) => getState(state).selectedConnection;

const getSelectedCards = (state) => getState(state).selectedCards;

const getHover = (state) => getState(state).hover;

const buildingEssentialSelectors = {
  getSelectedConnection,
  getSelectedCards,
  getHover,
};

export default buildingEssentialSelectors;
