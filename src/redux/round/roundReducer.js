import { playerConstants } from "../players/playersActions";
import { PREPARE_NEXT_ROUND_SUCCESS } from "../constants";

const initialState = {
  points: 2,
  nth: 0,
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
      };

    default:
      return state;
  }
};

export default roundReducer;
