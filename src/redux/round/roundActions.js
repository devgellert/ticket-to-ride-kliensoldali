export const roundConstants = {
  SET_LAST_ROUNDS_COUNT: "SET_LAST_ROUNDS_COUNT",
  PUSH_LOG: "PUSH_LOG",
};

const setLastRoundsCount = ({ value }) => ({
  type: roundConstants.SET_LAST_ROUNDS_COUNT,
  payload: {
    value,
  },
});

const pushLog = ({ value }) => ({
  type: roundConstants.PUSH_LOG,
  payload: {
    value,
  },
});

const roundActions = {
  setLastRoundsCount,
  pushLog,
};

export default roundActions;
