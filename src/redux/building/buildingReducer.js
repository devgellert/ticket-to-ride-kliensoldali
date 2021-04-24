import { buildingConstants } from "./buildingActions";
import { BUILD_SUCCESS, PREPARE_NEXT_ROUND_SUCCESS } from "../constants";

const initialState = {
  selectedConnection: null,
  selectedCards: [],
};

const buildingReducer = (state = initialState, action) => {
  switch (action.type) {
    case buildingConstants.SET_SELECTED_CONNECTION:
      return {
        ...state,
        selectedConnection: action.payload,
      };

    case buildingConstants.PUSH_SELECTED_CARD:
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload],
      };

    case BUILD_SUCCESS:
      return {
        ...state,
        selectedCards: [],
        selectedConnection: null,
      };

    case PREPARE_NEXT_ROUND_SUCCESS:
      return {
        ...state,
        selectedConnection: null,
        selectedCards: [],
      };

    default:
      return state;
  }
};

export default buildingReducer;
