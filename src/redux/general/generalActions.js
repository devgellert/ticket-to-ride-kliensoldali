export const generalConstants = {
  SET_DECK: "SET_DECK",
  SET_DESTINATIONS: "SET_DESTINATIONS",
  INIT_GAME_SUCCESS: "INIT_GAME_SUCCESS",
};

const setDeck = (value) => ({
  type: generalConstants.SET_DECK,
  payload: { value },
});

const setDestinations = (value) => ({
  type: generalConstants.SET_DESTINATIONS,
  payload: { value },
});

const generalActions = {
  setDeck,
  setDestinations,
};

export default generalActions;
