import { generalConstants } from "./generalActions";
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
  field: [],
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

    case generalConstants.INIT_GAME_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default generalReducer;
