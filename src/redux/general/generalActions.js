export const generalConstants = {
  SET_DECK: "SET_DECK",
  SET_DESTINATIONS: "SET_DESTINATIONS",
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
