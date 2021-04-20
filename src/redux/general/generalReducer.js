import { ticketToRideData as data } from "../../ticket-to-ride-data";
import { generalConstants } from "./generalActions";
import { keys, forEach } from "lodash";
import shuffle from "../../utils/shuffle";
import createInitialDeck from "./helpers/createInitialDeck";

export const cardTypes = [
  "purple",
  "white",
  "blue",
  "yellow",
  "orange",
  "black",
  "red",
  "green",
  "locomotive",
];

// const initialDeck = {
//   purple: 12,
//   white: 12,
//   blue: 12,
//   yellow: 12,
//   orange: 12,
//   black: 12,
//   red: 12,
//   green: 12,
//   locomotive: 14,
// };

const initialDeck = createInitialDeck();

const locomotiveField = [];

const initialDestinations = data.destinations;

const initialState = {
  deck: initialDeck,
  locomotiveField,
  destinations: initialDestinations,

  playerHand: {
    locomotive: 0,
    purple: 0,
    white: 0,
    blue: 0,
    yellow: 0,
    orange: 0,
    black: 0,
    red: 0,
    green: 0,
  },

  buildConnectionIds: [],

  roundCount: 0,
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_LOCOMOTIVE_FIELD:
    //   return {
    //     ...state,
    //     locomotiveField: action.payload.value,
    //   };
    //
    // case SET_PLAYER_HAND:
    //   return {
    //     ...state,
    //     playerHand: action.payload.value,
    //   };
    //
    // case SET_BUILD_CONNECTION_IDS:
    //   return {
    //     ...state,
    //     buildConnectionIds: action.payload.value,
    //   };

    case generalConstants.SET_DECK:
      return {
        ...state,
        deck: action.payload.value,
      };

    case generalConstants.SET_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload.value,
      };

    default:
      return state;
  }
};

export default generalReducer;
