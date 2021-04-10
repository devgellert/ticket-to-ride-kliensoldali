import { SET_LOCOMOTIVE_FIELD, SET_PLAYER_HAND } from "./constants";

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
