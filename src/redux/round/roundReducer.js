import { playerConstants } from "../players/playersActions";
import { roundConstants } from "./roundActions";
import { BUILD_SUCCESS, PREPARE_NEXT_ROUND_SUCCESS } from "../constants";

const initialState = {
  points: 2,
  nth: 0,
  lastRoundsCount: null, // null | number
};

const roundReducer = (state = initialState, action) => {
  switch (action.type) {
    case playerConstants.CARD_DRAW_FROM_FIELD_SUCCESS:
      return {
        ...state,
        points: state.points - action.payload.points,
      };
    case playerConstants.CARD_DRAW_FROM_DECK_SUCCESS:
      return {
        ...state,
        points: state.points - 1,
      };

    case PREPARE_NEXT_ROUND_SUCCESS:
      return {
        ...state,
        points: 2,
        nth: state.nth + 1,
        lastRoundsCount:
          state.lastRoundsCount === null ? null : state.lastRoundsCount - 1,
      };

    case playerConstants.PUSH_TO_BUILD_CONNECTION_IDS:
      return {
        ...state,
        points: state.points - 2,
      };

    case BUILD_SUCCESS:
      return {
        ...state,
        points: state.points - 2,
      };

    case roundConstants.SET_LAST_ROUNDS_COUNT:
      return {
        ...state,
        lastRoundsCount: action.payload.value,
      };

    default:
      return state;
  }
};

export default roundReducer;
