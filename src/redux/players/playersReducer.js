import { playerConstants } from "./playersActions";
import { PREPARE_NEXT_ROUND_SUCCESS } from "../constants";
import playersEssentialSelectors from "./selectors/playersEssentialSelectors";

const initialState = {
  activePlayerIndex: 0,
  players: [
    {
      name: "Player 1",
      hand: {
        cards: [],
        destinations: [],
      },
      connectionIds: [],
    },
    {
      name: "Player 2",
      hand: {
        cards: [],
        destinations: [],
      },
      connectionIds: [],
    },
  ],
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case playerConstants.SET_ACTIVE_PLAYER_INDEX:
      return {
        ...state,
        activePlayerIndex: action.payload.value,
      };

    case playerConstants.SET_PLAYERS:
      return {
        ...state,
        players: action.payload.value,
      };

    case playerConstants.CARD_DRAW_FROM_FIELD_SUCCESS:
      return {
        ...state,
        players: action.payload.players,
      };

    case PREPARE_NEXT_ROUND_SUCCESS:
      return {
        ...state,
        activePlayerIndex: action.payload.activePlayerIndex,
      };

    case playerConstants.PUSH_TO_BUILD_CONNECTION_IDS:
      const activeIndex = state.activePlayerIndex;

      const newPlayers = [...state.players];
      newPlayers[activeIndex].connectionIds.push(action.payload.id);

      return {
        ...state,
        players: newPlayers,
      };

    default:
      return state;
  }
};

export default playersReducer;
