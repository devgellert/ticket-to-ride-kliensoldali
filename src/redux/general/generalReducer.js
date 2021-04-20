import { ticketToRideData as data } from "../../ticket-to-ride-data";
import { generalConstants } from "./generalActions";
import { keys, map } from "lodash";
import shuffle from "../../utils/shuffle";
import createInitialDeck from "./helpers/createInitialDeck";
import createInitialDestinations from "./helpers/createInitialDestinations";

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

const initialState = {
  deck: createInitialDeck(),
  destinations: createInitialDestinations(),
  buildConnectionIds: [],
  roundCount: 0,
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
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
