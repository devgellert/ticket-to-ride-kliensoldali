export const roundConstants = {
  SET_LAST_ROUNDS_COUNT: "SET_LAST_ROUNDS_COUNT",
};

const setLastRoundsCount = ({ value }) => ({
  type: roundConstants.SET_LAST_ROUNDS_COUNT,
  payload: {
    value,
  },
});

const roundActions = {
  setLastRoundsCount,
};

export default roundActions;
