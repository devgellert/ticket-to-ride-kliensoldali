import {
  SET_LOCOMOTIVE_FIELD,
  SET_PLAYER_LOCOMOTIVES_IN_HAND,
} from "./constants";
import { ticketToRideData as data } from "../ticket-to-ride-data";

const initialDeck = {
  purple: 12,
  white: 12,
  blue: 12,
  yellow: 12,
  orange: 12,
  black: 12,
  red: 12,
  green: 12,
  locomotive: 14,
};

const locomotiveField = [];

const initialDestinations = data.destinations;

const initialState = {
  deck: initialDeck,
  locomotiveField,
  destinations: initialDestinations,

  playerLocomotivesInHand: {
    purple: 0,
    white: 0,
    blue: 0,
    yellow: 0,
    orange: 0,
    black: 0,
    red: 0,
    green: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCOMOTIVE_FIELD:
      return {
        ...state,
        locomotiveField: action.payload.value,
      };

    case SET_PLAYER_LOCOMOTIVES_IN_HAND:
      return {
        ...state,
        playerLocomotivesInHand: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;
