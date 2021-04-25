export const buildingConstants = {
  SET_SELECTED_CONNECTION: "SET_SELECTED_CONNECTION",
  PUSH_SELECTED_CARD: "PUSH_SELECTED_CARD",
  CANCEL_BUILDING_SUCCESS: "CANCEL_BUILDING_SUCCESS",
  UNSELECT_CARD_SUCCESS: "UNSELECT_CARD_SUCCESS",
  SET_HOVER: "SET_HOVER",
};

const setSelectedConnection = (selectedConnection) => ({
  type: buildingConstants.SET_SELECTED_CONNECTION,
  payload: selectedConnection,
});

const pushSelectedCard = (card) => ({
  type: buildingConstants.PUSH_SELECTED_CARD,
  payload: card,
});

const cancelBuildingSuccess = ({ activePlayerCards }) => ({
  type: buildingConstants.CANCEL_BUILDING_SUCCESS,
  payload: {
    activePlayerCards,
  },
});

const unselectCardSuccess = ({ selectedCards, activePlayerCards }) => ({
  type: buildingConstants.UNSELECT_CARD_SUCCESS,
  payload: {
    selectedCards,
    activePlayerCards,
  },
});

const setHover = ({ from, to }) => ({
  type: buildingConstants.SET_HOVER,
  payload: { from, to },
});

const buildingActions = {
  setSelectedConnection,
  pushSelectedCard,
  cancelBuildingSuccess,
  unselectCardSuccess,
  setHover,
};

export default buildingActions;
