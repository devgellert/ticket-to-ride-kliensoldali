import { generalConstants } from "./generalActions";
import createInitialDeck from "./helpers/createInitialDeck";
import createInitialDestinations from "./helpers/createInitialDestinations";
import { playerConstants } from "../players/playersActions";

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

    case playerConstants.CARD_DRAW_FROM_FIELD_SUCCESS:
      return {
        ...state,
        field: action.payload.field,
        deck: action.payload.deck,
      };

    default:
      return state;
  }
};

export default generalReducer;
