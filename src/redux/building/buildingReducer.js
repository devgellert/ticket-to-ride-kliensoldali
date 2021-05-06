import { buildingConstants } from "./buildingActions";
import { BUILD_SUCCESS, PREPARE_NEXT_ROUND_SUCCESS } from "../constants";

const initialState = {
  selectedConnection: null,
  selectedCards: [],
  hover: {
    from: null,
    to: null,
    connectionIds: [],
  },
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
        // selectedCards: [],
      };

    case buildingConstants.CANCEL_BUILDING_SUCCESS:
      return {
        ...state,
        selectedCards: [],
        selectedConnection: null,
      };

    case buildingConstants.UNSELECT_CARD_SUCCESS:
      return {
        ...state,
        selectedCards: action.payload.selectedCards,
      };

    case buildingConstants.SET_HOVER:
      return {
        ...state,
        hover: action.payload,
      };
    default:
      return state;
  }
};

export default buildingReducer;
