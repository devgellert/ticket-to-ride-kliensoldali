export const buildingConstants = {
  SET_SELECTED_CONNECTION: "SET_SELECTED_CONNECTION",
  PUSH_SELECTED_CARD: "PUSH_SELECTED_CARD",
  CANCEL_BUILDING_SUCCESS: "CANCEL_BUILDING_SUCCESS",
  SET_HOVER: "SET_HOVER",
};

const setSelectedConnection = (selectedConnection, log) => ({
  type: buildingConstants.SET_SELECTED_CONNECTION,
  payload: {
    selectedConnection,
    log,
  },
});

const pushSelectedCard = (card) => ({
  type: buildingConstants.PUSH_SELECTED_CARD,
  payload: card,
});

const cancelBuildingSuccess = ({ activePlayerCards, log }) => ({
  type: buildingConstants.CANCEL_BUILDING_SUCCESS,
  payload: {
    activePlayerCards,
    log,
  },
});

const setHover = ({ from, to, connectionIds }) => ({
  type: buildingConstants.SET_HOVER,
  payload: { from, to, connectionIds },
});

const buildingActions = {
  setSelectedConnection,
  pushSelectedCard,
  cancelBuildingSuccess,
  setHover,
};

export default buildingActions;
