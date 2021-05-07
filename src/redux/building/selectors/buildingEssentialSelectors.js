const getState = (state) => state.building;

const getSelectedConnection = (state) => getState(state).selectedConnection;

const getSelectedCards = (state) => getState(state).selectedCards;

const getHover = (state) => getState(state).hover;

const getHoverConnectionIds = (state) => getHover(state).connectionIds;

const buildingEssentialSelectors = {
  getSelectedConnection,
  getSelectedCards,
  getHover,
  getHoverConnectionIds,
};

export default buildingEssentialSelectors;
