import {
  SET_LOCOMOTIVE_FIELD,
  SET_PLAYER_LOCOMOTIVES_IN_HAND,
} from "./constants";

export const setLocomotiveField = (value) => ({
  type: SET_LOCOMOTIVE_FIELD,
  payload: {
    value,
  },
});

export const setPlayerLocomotivesInHand = (value) => ({
  type: SET_PLAYER_LOCOMOTIVES_IN_HAND,
  payload: {
    value,
  },
});
