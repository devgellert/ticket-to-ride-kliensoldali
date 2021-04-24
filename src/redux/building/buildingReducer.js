import { buildingConstants } from "./buildingActions";

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

    default:
      return state;
  }
};

export default buildingReducer;
