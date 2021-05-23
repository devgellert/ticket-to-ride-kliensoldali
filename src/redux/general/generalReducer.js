import { generalConstants } from "./generalActions";
import createInitialDeck from "./helpers/createInitialDeck";
import createInitialDestinations from "./helpers/createInitialDestinations";
import { playerConstants } from "../players/playersActions";
import {
  CARD_DRAW_FROM_FIELD_SUCCESS,
  INIT_GAME_SUCCESS,
  JOIN_SUCCESS,
  SYNC_STATE,
} from "../constants";
import generalEssentialSelectors from "./selectors/generalEssentialSelectors";

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
    case SYNC_STATE:
      return {
        ...generalEssentialSelectors.getState(action.payload.state),
      };
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

    case INIT_GAME_SUCCESS:
      return {
        ...state,
        field: action.payload.field,
        deck: action.payload.deck,
        destinations: action.payload.destinations,
      };

    case CARD_DRAW_FROM_FIELD_SUCCESS:
      return {
        ...state,
        field: action.payload.field,
        deck: action.payload.deck,
      };

    case playerConstants.CARD_DRAW_FROM_DECK_SUCCESS:
      return {
        ...state,
        deck: action.payload.deck,
      };

    case JOIN_SUCCESS:
      return {
        ...state,
        destinations: action.payload.destinations,
        deck: action.payload.deck,
      };

    default:
      return state;
  }
};

export default generalReducer;
