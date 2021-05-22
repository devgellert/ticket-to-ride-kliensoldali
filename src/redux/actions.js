import {
  SET_BUILD_CONNECTION_IDS,
  SET_LOCOMOTIVE_FIELD,
  SYNC_STATE,
  SET_PLAYER_HAND,
  PREPARE_NEXT_ROUND_SUCCESS,
  BUILD_SUCCESS,
} from "./constants";

export const syncState = (state) => ({
  type: SYNC_STATE,
  payload: {
    state,
  },
});

export const setLocomotiveField = (value) => ({
  type: SET_LOCOMOTIVE_FIELD,
  payload: {
    value,
  },
});

export const setPlayerHand = (value) => ({
  type: SET_PLAYER_HAND,
  payload: {
    value,
  },
});

export const setBuildConnectionIds = (value) => ({
  type: SET_BUILD_CONNECTION_IDS,
  payload: {
    value,
  },
});

export const prepareNextRoundSuccess = ({ activePlayerIndex }) => ({
  type: PREPARE_NEXT_ROUND_SUCCESS,
  payload: {
    activePlayerIndex,
  },
});

export const buildSuccess = ({ cardsToPutBackToHand, selectedConnection }) => ({
  type: BUILD_SUCCESS,
  payload: {
    cardsToPutBackToHand,
    selectedConnection,
  },
});
