export const buildingConstants = {
  SET_SELECTED_CONNECTION: "SET_SELECTED_CONNECTION",
  PUSH_SELECTED_CARD: "PUSH_SELECTED_CARD",
};

const setSelectedConnection = (selectedConnection) => ({
  type: buildingConstants.SET_SELECTED_CONNECTION,
  payload: selectedConnection,
});

const pushSelectedCard = (card) => ({
  type: buildingConstants.PUSH_SELECTED_CARD,
  payload: card,
});

const buildingActions = {
  setSelectedConnection,
  pushSelectedCard,
};

export default buildingActions;
