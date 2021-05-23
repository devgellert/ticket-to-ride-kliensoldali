import { playerConstants } from "../players/playersActions";
import { roundConstants } from "./roundActions";
import {
  BUILD_SUCCESS,
  CARD_DRAW_FROM_FIELD_SUCCESS,
  INIT_GAME_SUCCESS,
  PREPARE_NEXT_ROUND_SUCCESS,
  SELECT_CARD_FOR_BUILDING_SUCCESS,
  SYNC_STATE,
  UNSELECT_CARD_SUCCESS,
} from "../constants";
import roundEssentialSelectors from "./selectors/roundEssentialSelectors";
import { buildingConstants } from "../building/buildingActions";

const initialState = {
  points: 2,
  nth: 0,
  lastRoundsCount: null, // null | number
  logs: [],
};

const roundReducer = (state = initialState, action) => {
  const { type } = action;
  switch (true) {
    // handling logs
    case [
      UNSELECT_CARD_SUCCESS,
      SELECT_CARD_FOR_BUILDING_SUCCESS,
      buildingConstants.CANCEL_BUILDING_SUCCESS,
      buildingConstants.SET_SELECTED_CONNECTION,
      INIT_GAME_SUCCESS,
    ].includes(type):
      return {
        ...state,
        logs: [action.payload.log, ...state.logs],
      };

    case type === SYNC_STATE:
      return {
        ...roundEssentialSelectors.getState(action.payload.state),
      };

    case type === CARD_DRAW_FROM_FIELD_SUCCESS:
      return {
        ...state,
        points: state.points - action.payload.points,
        logs: [action.payload.log, ...state.logs],
      };

    case type === playerConstants.CARD_DRAW_FROM_DECK_SUCCESS:
      return {
        ...state,
        points: state.points - 1,
        logs: [action.payload.log, ...state.logs],
      };

    case type === BUILD_SUCCESS:
      return {
        ...state,
        points: state.points - 2,
        logs: [action.payload.log, ...state.logs],
      };

    case type === PREPARE_NEXT_ROUND_SUCCESS:
      return {
        ...state,
        points: 2,
        nth: state.nth + 1,
        lastRoundsCount:
          state.lastRoundsCount === null ? null : state.lastRoundsCount - 1,
        logs: [action.payload.log, ...state.logs],
      };

    case type === playerConstants.PUSH_TO_BUILD_CONNECTION_IDS:
      return {
        ...state,
        points: state.points - 2,
      };

    case type === roundConstants.SET_LAST_ROUNDS_COUNT:
      return {
        ...state,
        lastRoundsCount: action.payload.value,
      };

    default:
      return state;
  }
};

export default roundReducer;
