export const generalConstants = {
  SET_DECK: "SET_DECK",
};

const setDeck = (value) => ({
  type: generalConstants.SET_DECK,
  payload: { value },
});

const generalActions = {
  setDeck,
};

export default generalActions;
